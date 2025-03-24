// FirestoreImageService.ts

import firestore, { FirebaseFirestoreTypes } from '@react-native-firebase/firestore';
import { Platform } from 'react-native';
import * as ImagePicker from 'react-native-image-picker';
import RNFS from 'react-native-fs';

interface PickedImage {
  uri: string;
  base64?: string;
  fileName: string;
}

interface FirestoreResponse {
  success: boolean;
  productId?: string;
  error?: string;
  imageUrl?: string;
}

interface ProductInfo {
  name?: string;
  description?: string;
  price?: number;
}



export const pickImage = (): Promise<PickedImage> => {
  return new Promise((resolve, reject) => {
    const options: ImagePicker.ImageLibraryOptions = {
      mediaType: 'photo',
      includeBase64: true,
      maxHeight: 800,
      maxWidth: 800,
      quality: 1, 
    };

    ImagePicker.launchImageLibrary(options, (response) => {
      if (response.didCancel) {
        reject('User cancelled image picker');
      } else if (response.errorMessage) {
        reject(`ImagePicker Error: ${response.errorMessage}`);
      } else if (response.assets && response.assets.length > 0) {
        const asset = response.assets[0];
        resolve({
          uri: asset.uri ?? '',
          base64: asset.base64,
          fileName: asset.fileName ?? `image_${Date.now()}.jpg`,
        });
      } else {
        reject('No image data found');
      }
    });
  });
};

// Function to convert an image to Base64 if not already
export const getBase64FromUri = async (uri: string): Promise<string> => {
  try {
    const adjustedUri = Platform.OS === 'android' && !uri.startsWith('data:image/jpeg;base64,')
      ? `data:image/jpeg;base64,${uri}`
      : uri;
    const base64Data = await RNFS.readFile(adjustedUri, 'base64');
    return base64Data;
  } catch (error) {
    console.error('Error converting image to base64:', error);
    throw error;
  }
};

// Function to upload base64 image directly to Firestore
export const uploadBase64ImageToFirestore = async (
  base64Data: string,
  productInfo: ProductInfo = {}
): Promise<FirestoreResponse> => {
  try {
    const docId = firestore().collection('products').doc().id;
    const productData = {
      ...productInfo,
      imageBase64: base64Data, // Storing Base64 directly
      createdAt: firestore.FieldValue.serverTimestamp() as FirebaseFirestoreTypes.Timestamp,
      id: docId,
    };

    await firestore().collection('products').doc(docId).set(productData);

    return { success: true, productId: docId };
  } catch (error) {
    console.error('Error uploading to Firestore:', error);
    return { success: false, error: (error as Error).message || 'Failed to upload image' };
  }
};

// Function to upload large base64 images in chunks (for Firestore's 1MB document limit)
// export const uploadLargeBase64ImageToFirestore = async (
//   base64Data: string,
//   productInfo: ProductInfo = {}
// ): Promise<FirestoreResponse> => {
//   try {
//     const productId = firestore().collection('products').doc().id;

//     // Prepare the main product document
//     const productData = {
//       ...productInfo,
//       hasImage: true,
//       createdAt: firestore.FieldValue.serverTimestamp() as FirebaseFirestoreTypes.Timestamp,
//       id: productId,
//     };

//     await firestore().collection('products').doc(productId).set(productData);

//     // Firestore document limit: 1MB (Store in chunks if needed)
//     if (base64Data.length < 900000) {
//       await firestore().collection('productImages').doc(productId).set({
//         imageBase64: base64Data,
//         productId,
//       });
//     } else {
//       const chunkSize = 800000; // 800KB chunks
//       const chunks: string[] = [];

//       for (let i = 0; i < base64Data.length; i += chunkSize) {
//         chunks.push(base64Data.substring(i, i + chunkSize));
//       }

//       const batch = firestore().batch();

//       chunks.forEach((chunk, index) => {
//         const chunkRef = firestore().collection('productImages').doc(`${productId}_chunk_${index}`);
//         batch.set(chunkRef, {
//           chunk,
//           index,
//           productId,
//           totalChunks: chunks.length,
//         });
//       });

//       await batch.commit();
//     }

//     return { success: true, productId };
//   } catch (error) {
//     console.error('Error uploading large image to Firestore:', error);
//     return { success: false, error: (error as Error).message || 'Failed to upload image' };
//   }
// };
