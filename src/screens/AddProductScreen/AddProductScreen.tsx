import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  ScrollView,
  ActivityIndicator,
  Alert,
} from 'react-native';
import {Picker} from '@react-native-picker/picker';
import ScreenLayout from '../../components/screenLoyout/ScreenLayout';
import {pickImage, uploadBase64ImageToFirestore} from '../../utils/uploadImage';
import {Product} from '../../types/type';
import {useAddProduct} from '../../hooks/useProduct';
import Input from '../../components/input/Input';
import styles from './AddProductDtyle';

interface ImageData {
  uri: string;
}

const AddProductScreen: React.FC = () => {
  const {addOrUpdateProduct} = useAddProduct();
  const [productName, setProductName] = useState<string>('');
  const [price, setPrice] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [category, setCategory] = useState<
    'snacks' | 'meals' | 'dessert' | 'drinks' | 'vegan'
  >('snacks');
  const [image, setImage] = useState<ImageData | null>(null);
  const [base64Image, setBase64Image] = useState<string | null>(null);
  const [uploading, setUploading] = useState<boolean>(false);
  const [productId, setProductId] = useState<string>('');

  const handlePickImage = async (): Promise<void> => {
    try {
      const result = await pickImage();
      setImage({uri: result.uri});
      console.log('Image base64:', result.base64);
      if (result.base64) {
        setBase64Image('data:image/jpeg;base64,' + result.base64);
        console.log('Image:', result.base64);
      } else {
        setBase64Image(null);
      }
    } catch (error) {
      console.log(error);
      Alert.alert('Error', 'Error selecting image: ' + error);
    }
  };

  const handleAddProductSubmit = async (): Promise<void> => {
    if (!productName || !price || !description || !base64Image) {
      Alert.alert(
        'Missing Information',
        'Please fill all fields and select an image',
      );
      return;
    }
    setUploading(true);

    try {
      const productData = {
        name: productName,
        price: parseFloat(price),
        description,
        category,
      };

      const result = await uploadBase64ImageToFirestore(
        base64Image,
        productData,
      );

      if (result.success) {
        const productId = result.productId || '';
        setProductId(productId);

        const newProduct: Product = {
          id: productId,
          name: productName,
          price: parseFloat(price),
          description,
          category,
          imageUrl: base64Image,
          toppings: {
            id: productId,
            name: productName,
            price: parseFloat(price),
            length: 0,
            map: (
              callback: (topping: {
                id: string;
                name: string;
                price: number;
              }) => any,
            ) => [],
          },
        };
        addOrUpdateProduct(newProduct);
        Alert.alert('Success', 'Product added successfully!');
        resetForm();
      } else {
        Alert.alert('Error', 'Failed to add product: ' + result.error);
      }
    } catch (error: any) {
      Alert.alert('Error', 'Error adding product: ' + error.message);
    } finally {
      setUploading(false);
    }
  };

  const resetForm = (): void => {
    setProductName('');
    setPrice('');
    setDescription('');
    setCategory('snacks');
    setImage(null);
    setBase64Image(null);
  };

  return (
    <ScreenLayout topbarProps="Add Product">
      <ScrollView style={styles.scrollView}>
        <View style={styles.formContainer}>
          <Text style={styles.label}>Product Name</Text>
          <TextInput
            style={styles.input}
            value={productName}
            placeholderTextColor="black"
            onChangeText={setProductName}
            placeholder="Enter product name"
          />

          <Text style={styles.label}>Price</Text>
          <Input
            style={styles.input}
            value={price}
            onChangeText={setPrice}
            placeholder="Enter price"
            keyboardType="numeric"
          />

          <Text style={styles.label}>Description</Text>
          <Input
            style={[styles.input, styles.textArea]}
            value={description}
            onChangeText={setDescription}
            placeholder="Enter product description"
            multiline
            numberOfLines={4}
          />

          <Text style={styles.label}>Category</Text>
          <View style={styles.pickerContainer}>
            <Picker
              selectedValue={category}
              onValueChange={(
                itemValue: 'snacks' | 'meals' | 'dessert' | 'drinks' | 'vegan',
              ) => setCategory(itemValue)}
              style={styles.picker}>
              <Picker.Item label="Snacks" value="snacks" />
              <Picker.Item label="Meals" value="meals" />
              <Picker.Item label="Dessert" value="dessert" />
              <Picker.Item label="Drinks" value="drinks" />
              <Picker.Item label="Vegan" value="vegan" />
            </Picker>
          </View>

          <Text style={styles.label}>Product Image</Text>
          <View style={styles.imageContainer}>
            {image ? (
              <Image source={image} style={styles.previewImage} />
            ) : (
              <View style={styles.placeholderImage}>
                <Text>No image selected</Text>
              </View>
            )}

            <TouchableOpacity style={styles.button} onPress={handlePickImage}>
              <Text style={styles.buttonText}>Select Image</Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity
            style={[styles.button, styles.addButton]}
            onPress={handleAddProductSubmit}>
            {uploading ? (
              <ActivityIndicator color="#fff" size="small" />
            ) : (
              <Text style={[styles.buttonText, styles.addButtonText]}>
                Add Product
              </Text>
            )}
          </TouchableOpacity>

          {productId && (
            <View style={styles.successContainer}>
              <Text style={styles.successText}>
                Product added successfully! ID: {productId}
              </Text>
            </View>
          )}
        </View>
      </ScrollView>
    </ScreenLayout>
  );
};

export default AddProductScreen;
