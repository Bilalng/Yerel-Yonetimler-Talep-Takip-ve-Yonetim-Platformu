import { MaterialCommunityIcons } from '@expo/vector-icons';
import axios from 'axios';
import * as ImagePicker from 'expo-image-picker';
import { useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Image,
  Platform,
  ScrollView,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
  View
} from 'react-native';
import {
  ALERT_TYPE,
  Toast
} from "react-native-alert-notification";
import {
  Button,
  Card,
  IconButton,
  Menu,
  Text,
  TextInput,
  useTheme
} from 'react-native-paper';
import { useAuth } from '../../hooks/useAuth';

const API_BASE_URL = "http://192.168.91.122:8000";

// Birim tipi için interface
interface ServiceUnit {
  id: number;
  name: string;
}

export default function TalepOlusturScreen() {
  const router = useRouter();
  const theme = useTheme();
  const { token } = useAuth();
  
  const [baslik, setBaslik] = useState('');
  const [birim, setBirim] = useState('');
  const [birimId, setBirimId] = useState<number | null>(null);
  const [aciklama, setAciklama] = useState('');
  const [image, setImage] = useState<string | null>(null);
  const [menuVisible, setMenuVisible] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [serviceUnits, setServiceUnits] = useState<ServiceUnit[]>([]);
  const [loadingUnits, setLoadingUnits] = useState(true);
 

  // Birimleri backend'den çek
  useEffect(() => {
  if (token) {
    fetchServiceUnits();
  }
}, [token]);

  const fetchServiceUnits = async () => {
    setLoadingUnits(true);
    try {
      const response = await axios.get(
        `${API_BASE_URL}/api/getService`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      
      const services = response.data?.Services;
    
      if (Array.isArray(services)) {
        // Gelen objelerde `title` kullanılıyor, onu `name` olarak map'leyelim
        const mappedUnits = services.map((item: any) => ({
          id: item.id,
          name: item.title
        }));
        setServiceUnits(mappedUnits);
      } else {
        console.error('Birim verileri doğru formatta değil:', response.data);
      }
    } catch (error) {
      console.error('Birimler yüklenirken hata oluştu:', error);
      Toast.show({
        type: ALERT_TYPE.DANGER,
        title: "Hata",
        textBody: "Birimler yüklenirken bir hata oluştu. Lütfen tekrar deneyiniz",
      });
    } finally {
      setLoadingUnits(false);
    }
  };

  const pickImage = async () => {
    try {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 0.8,
      });

      if (!result.canceled) {
        setUploading(true);
        
        // Get file info to check size
        if (result.assets && result.assets[0]) {
          const selectedImage = result.assets[0];
          
          // Check image format (ensure it's jpg, jpeg, or png)
          const uri = selectedImage.uri;
          const fileExtension = uri.split('.').pop()?.toLowerCase();
          
          if (!['jpg', 'jpeg', 'png'].includes(fileExtension || '')) {
            Toast.show({
              type: ALERT_TYPE.WARNING,
              title: "Desteklenmeyen Format",
              textBody: "Lütfen JPG, JPEG veya PNG formatında bir görsel seçiniz.",
            });
            setUploading(false);
            return;
          }
          
          // Check file size - get approximate size from URI
          try {
            // Only proceed with image that has valid format
            setImage(selectedImage.uri);
          } catch (error) {
            console.error("Dosya boyutu kontrol edilirken hata:", error);
          }
        }
        
        setUploading(false);
      }
    } catch (error) {
      Toast.show({
        type: ALERT_TYPE.DANGER,
        title: "Hata",
        textBody: "Fotoğraf seçilirken bir hata oluştu.",
      });

      setUploading(false);
    }
  };

  const handleSubmit = async () => {
    if (!baslik.trim()) {
      Toast.show({
        type: ALERT_TYPE.WARNING,
        title: "Uyarı",
        textBody: "Lütfen bir başlık giriniz",
      });
      return;
    }

    if (baslik.trim().length < 10) {
      Toast.show({
        type: ALERT_TYPE.WARNING,
        title: "Uyarı",
        textBody: "Başlık en az 10 karakter olmalıdır",
      });
      return;
    }

    if (!birimId) {
      Toast.show({
        type: ALERT_TYPE.WARNING,
        title: "Uyarı",
        textBody: "Lütfen bir birim seçiniz",
      });
      return;
    }

    if (aciklama.trim().length < 10) {
      Toast.show({
        type: ALERT_TYPE.WARNING,
        title: "Uyarı",
        textBody: "Açıklama en az 10 karakter olmalıdır",
      });
      return;
    }

    setSubmitting(true);

    try {
      // Check if token exists
      if (!token) {
        console.error('Token is missing! Auth token:', token);
        Toast.show({
          type: ALERT_TYPE.DANGER,
          title: "Yetkilendirme Hatası",
          textBody: "Oturum bilgileriniz bulunamadı. Lütfen tekrar giriş yapın.",
        });
        return;
      }
      // Create a fresh FormData instance
      const formData = new FormData();
      
      // Add text fields
      formData.append('title', baslik);
      formData.append('service_id', birimId.toString());
      formData.append('status_id', '1'); // Beklemede/Pending durumu için
      formData.append('description', aciklama);
      
      // Add photo if available
      if (image) {
        // Create a new file object for the photo
        const imageUri = Platform.OS === 'ios' ? image.replace('file://', '') : image;
        
        // Optimize photo data structure for React Native FormData
        const photoData = {
          uri: imageUri,
          type: 'image/jpeg', // Force JPEG for better compatibility
          name: 'photo.jpg',  // Use a simple name for better compatibility
        };
        
      
        
        // For React Native, we need to append as 'any' to avoid type errors
        // The actual FormData implementation in React Native accepts this format
        formData.append('photo', photoData as any);
      } else {
    
      }
 
      // Set up correct headers for multipart/form-data with file upload
      const headers = {
        'Accept': 'application/json',
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'multipart/form-data',
      };

      // Log form data for debugging (can't easily display FormData contents)
      
      const response = await axios.post(
        `${API_BASE_URL}/api/addComplaint`,
        formData,
        { headers }
      );

      Toast.show({
        type: ALERT_TYPE.SUCCESS,
        title: "Başarılı",
        textBody: "Talebiniz Başarıyla Oluşturuldu.",
      });
      router.back();
    } catch (error: any) {
      console.error('Talep oluşturulurken hata:', error);
      
      // Log detailed error information
      if (error.response) {
        console.error('Error response status:', error.response.status);
        console.error('Error response data:', JSON.stringify(error.response.data));
      }
      
      // Validation errors (422 status)
      if (error.response && error.response.status === 422) {
        const validationErrors = error.response.data.errors;
        
        if (validationErrors) {
          // Get first error message to display
          const firstErrorKey = Object.keys(validationErrors)[0];
          const errorMessage = validationErrors[firstErrorKey][0];
          
          Toast.show({
            type: ALERT_TYPE.DANGER,
            title: "Doğrulama Hatası",
            textBody: errorMessage || "Formdaki bilgileri kontrol ediniz.",
          });
        } else {
          Toast.show({
            type: ALERT_TYPE.DANGER,
            title: "Doğrulama Hatası",
            textBody: error.response.data.message || "Formdaki bilgileri kontrol ediniz.",
          });
        }
      } else {
        // General error
        Toast.show({
          type: ALERT_TYPE.DANGER,
          title: "Hata",
          textBody: "Talebiniz oluşturulurken bir hata meydana geldi. Lütfen tekrar deneyin.",
        });
      }
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <StatusBar backgroundColor={theme.colors.background} barStyle="dark-content" />
      
      {/* Normal Header */}
      <View style={styles.header}>
        <IconButton
          icon="arrow-left"
          size={24}
          onPress={() => router.back()}
          iconColor={theme.colors.onBackground}
        />
        <Text style={[styles.headerTitle, { color: theme.colors.onBackground }]}>
          Yeni Talep Oluştur
        </Text>
        <View style={{ width: 40 }} />
      </View>
      
      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Form Card */}
        <Card style={styles.formCard} mode="elevated">
          <Card.Content style={styles.cardContent}>
            <View style={styles.cardHeader}>
              <MaterialCommunityIcons 
                name="clipboard-text-outline" 
                size={24} 
                color={theme.colors.primary} 
              />
              <Text style={[styles.sectionTitle, { color: theme.colors.onSurface }]}>
                Talep Bilgileri
              </Text>
            </View>
            
            <View style={styles.inputContainer}>
              <TextInput
                label="Başlık"
                value={baslik}
                onChangeText={setBaslik}
                mode="outlined"
                style={styles.input}
                outlineColor={theme.colors.outline}
                activeOutlineColor={theme.colors.primary}
                contentStyle={{ color: theme.colors.onSurface }}
                left={<TextInput.Icon icon="format-title" color={theme.colors.primary} />}
              />
            </View>
            
            <View style={styles.inputContainer}>
              <Menu
                visible={menuVisible}
                onDismiss={() => setMenuVisible(false)}
                anchor={
                  <TouchableOpacity 
                    style={[
                      styles.selectButton, 
                      { 
                        borderColor: theme.colors.outline,
                        backgroundColor: theme.colors.surfaceVariant
                      }
                    ]}
                    onPress={() => setMenuVisible(true)}
                    disabled={loadingUnits}
                  >
                    {loadingUnits ? (
                      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <ActivityIndicator size="small" color={theme.colors.primary} style={{ marginRight: 8 }} />
                        <Text style={{ color: theme.colors.onSurfaceVariant }}>
                          Birimler Yükleniyor...
                        </Text>
                      </View>
                    ) : (
                      <>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                          <MaterialCommunityIcons 
                            name="office-building-outline" 
                            size={22} 
                            color={birim ? theme.colors.primary : theme.colors.onSurfaceVariant}
                            style={{ marginRight: 10 }}
                          />
                          <Text style={{ 
                            color: birim ? theme.colors.onSurface : theme.colors.onSurfaceVariant,
                            fontWeight: birim ? '500' : 'normal'
                          }}>
                            {birim || "Birim Seçin"}
                          </Text>
                        </View>
                        <MaterialCommunityIcons 
                          name="chevron-down" 
                          size={20} 
                          color={theme.colors.onSurfaceVariant} 
                        />
                      </>
                    )}
                  </TouchableOpacity>
                }
                style={styles.menu}
              >
                {serviceUnits.length === 0 ? (
                  <Menu.Item 
                    title="Birim bulunamadı" 
                    disabled={true} 
                    titleStyle={{ color: theme.colors.onSurfaceVariant }} 
                  />
                ) : (
                  serviceUnits.map((unit) => (
                    <Menu.Item
                      key={unit.id}
                      title={unit.name}
                      onPress={() => {
                        setBirim(unit.name);
                        setBirimId(unit.id);
                        setMenuVisible(false);
                      }}
                      titleStyle={{ color: theme.colors.onSurface }}
                      leadingIcon="office-building"
                    />
                  ))
                )}
              </Menu>
            </View>
            
            <View style={styles.inputContainer}>
              <TextInput
                label="Açıklama"
                value={aciklama}
                onChangeText={setAciklama}
                mode="outlined"
                multiline
                numberOfLines={4}
                style={styles.textArea}
                outlineColor={theme.colors.outline}
                activeOutlineColor={theme.colors.primary}
                contentStyle={{ color: theme.colors.onSurface }}
                left={<TextInput.Icon icon="text-box-outline" color={theme.colors.primary} />}
              />
            </View>
          </Card.Content>
        </Card>
        
        {/* Photo Card */}
        <Card style={styles.formCard} mode="elevated">
          <Card.Content style={styles.cardContent}>
            <View style={styles.cardHeader}>
              <MaterialCommunityIcons 
                name="image-outline" 
                size={24}
                color={theme.colors.primary} 
              />
              <Text style={[styles.sectionTitle, { color: theme.colors.onSurface }]}>
                Fotoğraf Ekle
              </Text>
            </View>
            
            <View style={styles.photoSection}>
              {image ? (
                <View style={styles.imagePreviewContainer}>
                  <Image 
                    source={{ uri: image }} 
                    style={styles.imagePreview} 
                    resizeMode="cover"
                  />
                  <View style={styles.imageOverlay}>
                    <TouchableOpacity
                      style={styles.changePhotoButton}
                      onPress={pickImage}
                    >
                      <MaterialCommunityIcons 
                        name="camera-outline"
                        size={20} 
                        color="white"
                      />
                      <Text style={styles.changePhotoText}>Değiştir</Text>
                    </TouchableOpacity>
                    
                    <TouchableOpacity
                      style={styles.removeButton}
                      onPress={() => setImage(null)}
                    >
                      <MaterialCommunityIcons 
                        name="close-circle" 
                        size={24} 
                        color="white"
                      />
                    </TouchableOpacity>
                  </View>
                </View>
              ) : (
                <TouchableOpacity
                  style={[
                    styles.uploadButton, 
                    { borderColor: theme.colors.outline }
                  ]}
                  onPress={pickImage}
                  disabled={uploading}
                >
                  {uploading ? (
                    <View style={styles.uploadingContainer}>
                      <ActivityIndicator size="large" color={theme.colors.primary} style={{ marginBottom: 12 }} />
                      <Text style={{ color: theme.colors.onSurfaceVariant }}>
                        Yükleniyor...
                      </Text>
                    </View>
                  ) : (
                    <>
                      <View style={styles.uploadIconContainer}>
                        <MaterialCommunityIcons 
                          name="camera-plus-outline" 
                          size={40} 
                          color={theme.colors.primary} 
                        />
                      </View>
                      <Text style={{ color: theme.colors.onSurfaceVariant, marginTop: 12, fontWeight: '500' }}>
                        Fotoğraf Ekle
                      </Text>
                      <Text style={{ color: theme.colors.onSurfaceVariant, fontSize: 12, marginTop: 4, textAlign: 'center' }}>
                        Durumu daha iyi anlatmak için fotoğraf ekleyebilirsiniz
                      </Text>
                    </>
                  )}
                </TouchableOpacity>
              )}
            </View>
          </Card.Content>
        </Card>
        
        {/* Submit Button */}
        <View style={styles.buttonContainer}>
          <Button
            mode="contained"
            onPress={() => {
              handleSubmit();
            }}
            style={styles.submitButton}
            contentStyle={styles.submitButtonContent}
            loading={submitting}
            disabled={submitting || loadingUnits}
            icon="send"
          >
            Talebi Gönder
          </Button>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 8,
    paddingVertical: 16,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    textAlign: 'center',
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: 16,
    paddingBottom: 32,
  },
  formCard: {
    marginBottom: 16,
    borderRadius: 16,
    elevation: 2,
    overflow: 'hidden',
  },
  cardContent: {
    padding: 16,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginLeft: 10,
  },
  inputContainer: {
    marginBottom: 20,
    position: 'relative',
  },
  input: {
    width: '100%',
    backgroundColor: 'transparent',
  },
  textArea: {
    width: '100%',
    minHeight: 120,
    backgroundColor: 'transparent',
  },
  selectButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderRadius: 4,
    padding: 16,
    paddingHorizontal: 16,
    height: 56,
  },
  menu: {
    width: '90%',
    marginTop: 50,
  },
  photoSection: {
    alignItems: 'center',
    marginVertical: 8,
  },
  uploadButton: {
    width: '100%',
    height: 200,
    borderWidth: 1,
    borderStyle: 'dashed',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  uploadIconContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: 'rgba(0, 0, 0, 0.05)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  uploadingContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  imagePreviewContainer: {
    width: '100%',
    position: 'relative',
    borderRadius: 12,
    overflow: 'hidden',
    elevation: 2,
  },
  imagePreview: {
    width: '100%',
    height: 220,
    borderRadius: 12,
  },
  imageOverlay: {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'flex-end',
    backgroundColor: 'rgba(0,0,0,0.3)',
    padding: 12,
  },
  changePhotoButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 20,
    marginRight: 10,
  },
  changePhotoText: {
    color: 'white',
    marginLeft: 4,
    fontSize: 14,
  },
  removeButton: {
    backgroundColor: 'rgba(0,0,0,0.5)',
    borderRadius: 20,
    padding: 6,
  },
  buttonContainer: {
    marginTop: 12,
  },
  submitButton: {
    borderRadius: 12,
    elevation: 2,
  },
  submitButtonContent: {
    paddingVertical: 8,
    height: 56,
  },
});