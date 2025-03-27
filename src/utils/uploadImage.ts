// FirestoreImageService.ts

import firestore, {
  FirebaseFirestoreTypes,
} from '@react-native-firebase/firestore';
import {Platform} from 'react-native';
import * as ImagePicker from 'react-native-image-picker';
import RNFS from 'react-native-fs';
import {FirestoreResponsecc, PickedImage, ProductInfo} from '../types/type';

export const pickImage = (): Promise<PickedImage> => {
  return new Promise((resolve, reject) => {
    const options: ImagePicker.ImageLibraryOptions = {
      mediaType: 'photo',
      includeBase64: true,
      maxHeight: 800,
      maxWidth: 800,
      quality: 1,
    };

    ImagePicker.launchImageLibrary(options, response => {
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

export const getBase64FromUri = async (uri: string): Promise<string> => {
  try {
    const adjustedUri =
      Platform.OS === 'android' && !uri.startsWith('data:image/jpeg;base64,')
        ? `data:image/jpeg;base64,${uri}`
        : uri;
    const base64Data = await RNFS.readFile(adjustedUri, 'base64');
    return base64Data;
  } catch (error) {
    console.error('Error converting image to base64:', error);
    throw error;
  }
};

export const uploadBase64ImageToFirestore = async (
  base64Data: string,
  productInfo: ProductInfo = {},
): Promise<FirestoreResponsecc> => {
  try {
    const docId = firestore().collection('products').doc().id;
    const productData = {
      ...productInfo,
      imageBase64: base64Data,
      createdAt:
        firestore.FieldValue.serverTimestamp() as FirebaseFirestoreTypes.Timestamp,
      id: docId,
    };

    await firestore().collection('products').doc(docId).set(productData);

    return {success: true, productId: docId};
  } catch (error) {
    console.error('Error uploading to Firestore:', error);
    return {
      success: false,
      error: (error as Error).message || 'Failed to upload image',
    };
  }
};
