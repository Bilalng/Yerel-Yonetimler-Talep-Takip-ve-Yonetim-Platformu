import { MaterialCommunityIcons } from '@expo/vector-icons';
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import * as ImagePicker from "expo-image-picker";
import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Platform,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
  View
} from "react-native";
import { ALERT_TYPE, Toast } from "react-native-alert-notification";
import { Avatar, IconButton, Text, useTheme } from "react-native-paper";
import { useAuth } from "../../../hooks/useAuth";

const API_BASE_URL = "http://192.168.91.122:8000";

const fixStoragePath = (url) => {
  if (!url) return null;
  
 
  if (url.startsWith('http')) {
    if (url.includes('/storage/') && !url.includes('/storage/profile_photos/')) {
      return url.replace('/storage/', '/storage/profile_photos/');
    }
    return url;
  }
  
  // Yalnızca yol verilmişse
  return `${API_BASE_URL}${url}`;
};

type RouteType = {
  route: string;
  title: string;
  icon: string;
  color: string;
};

export default function ProfileScreen() {
  const router = useRouter();
  const theme = useTheme();
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [user, setUser] = useState<{
    name: string;
    surname:string;
    profile_photo: string | null;
  } | null>(null);
  const { token, isAuthenticated, loading } = useAuth();
  const [imageLoading, setImageLoading] = useState(false);

  const defaultAvatar = require("../../../assets/images/Avatar.png");

  const uploadImage = async (uri: string): Promise<void> => {
    setImageLoading(true);
    const formData = new FormData();

    formData.append("profile_photo", {
      uri,
      name: "profile.jpg",
      type: "image/jpeg",
    } as unknown as Blob);

    try {
      const response = await axios.post(
        `${API_BASE_URL}/api/updateProfilePhoto`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const uploadedUrl = response.data.profile_photo_url;
     
      
  
      const fullImageUrl = fixStoragePath(uploadedUrl);
    
      setProfileImage(fullImageUrl);

      Toast.show({
        type: ALERT_TYPE.SUCCESS,
        title: "Başarılı",
        textBody: "Fotoğraf başarıyla yüklendi!",
      });
      
    
      fetchData();
    } catch (error: any) {
      console.error(
        "Fotoğraf yükleme hatası:",
        error.response?.data || error.message
      );
      Toast.show({
        type: ALERT_TYPE.DANGER,
        title: "Hata",
        textBody: "Fotoğraf yüklenirken bir hata oluştu.",
      });
    } finally {
      setImageLoading(false);
    }
  };

  const pickImage = async (): Promise<void> => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        allowsEditing: true,
        aspect: [4, 3],
        quality: 0.7, 
      });

      if (!result.canceled) {
        const uri = result.assets[0].uri;
   
        setProfileImage(uri);
        await uploadImage(uri);
      }
    } catch (error) {
      console.error("Fotoğraf seçme hatası:", error);
      Toast.show({
        type: ALERT_TYPE.DANGER,
        title: "Hata",
        textBody: "Fotoğraf seçilirken bir hata oluştu.",
      });
    }
  };

  const fetchData = async () => {
    try {
      const response = await axios.get(
        `${API_BASE_URL}/api/getUserDetails`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const userData = response.data[1][0];
      
      
      let photoUrl = userData.profile_photo_url;
      photoUrl = fixStoragePath(photoUrl);
    
      
      setUser({
        name: userData.name,
        surname: userData.surname,
        profile_photo: photoUrl,
      });

      setProfileImage(photoUrl);
    } catch (error: any) {
      console.error(
        "Kullanıcı verisi alınırken hata:",
        error.response?.data || error.message
      );
      Toast.show({
        type: ALERT_TYPE.DANGER,
        title: "Hata",
        textBody: "Kullanıcı verisi alınırken bir hata oluştu.",
      });
    }
  };

  useEffect(() => {
    if (!loading) {
      if (!isAuthenticated) {
        router.replace("/Login");
        return;
      }

      fetchData();
    }
  }, [isAuthenticated, loading]);

  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem("token");
      router.replace("/Login");
    } catch (error) {
      console.error("Çıkış yapılırken hata oluştu:", error);
    }
  };

  const handleImageError = (error: any) => {
    console.error("Resim yükleme hatası:", error);
   
    setProfileImage(null);
  };

  const menuItems = [
    {
      title: 'Onaylanan İstekler',
      icon: 'check-circle' as const,
      route: '/Talep/approvedComplaint',
      color: '#4CAF50'
    },
    {
      title: 'Reddedilen İstekler',
      icon: 'close-circle' as const,
      route: '/Talep/rejectionComplaint',
      color: '#F44336'
    },
    {
      title: 'İstek Değerlendirme',
      icon: 'clipboard-check' as const,
      route: '/Talep/evaluateComplaint',
      color: '#2196F3'
    }
  ];

  const navigateToScreen = (route: string) => {
    router.push(route as any);
  };

  if (!user) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={theme.colors.primary} />
      </View>
    );
  }

  return (
    <SafeAreaView
      style={[styles.safeArea, { backgroundColor: theme.colors.background }]}
    >
      <View style={styles.container}>
        <View style={[styles.profileHeader, {backgroundColor: theme.colors.surfaceVariant}]}>
          <TouchableOpacity 
            onPress={pickImage} 
            disabled={imageLoading}
            style={styles.avatarContainer}
          >
            {imageLoading ? (
              <View style={styles.loadingAvatarContainer}>
                <ActivityIndicator size="large" color={theme.colors.primary} />
              </View>
            ) : (
              <View style={styles.avatarWrapper}>
                <Avatar.Image
                  size={120}
                  source={
                    profileImage
                      ? { uri: profileImage }
                      : defaultAvatar
                  }
                  style={styles.avatar}
                />
                <View style={styles.editIconContainer}>
                  <IconButton
                    icon="camera"
                    size={24}
                    iconColor={theme.colors.primary}
                    style={styles.editIcon}
                  />
                </View>
              </View>
            )}
          </TouchableOpacity>
          
          <View style={styles.userInfoContainer}>
            <Text style={[styles.userName, {color: theme.colors.onBackground}]}>{user.name}</Text>
            <Text style={[styles.userRole, {color: theme.colors.onBackground}]}>{user.surname}</Text>
          </View>
        </View>
        
        <View style={[styles.menuContainer, {backgroundColor: theme.colors.surfaceVariant}]}>
          {menuItems.map((item, index) => (
            <TouchableOpacity
              key={index}
              style={[
                styles.menuItem,
                index === menuItems.length - 1 && styles.lastMenuItem
              ]}
              onPress={() => navigateToScreen(item.route)}
            >
              <View style={[styles.menuIconContainer, { backgroundColor: `${item.color}15` }]}>
                <MaterialCommunityIcons name={item.icon} size={24} color={item.color} />
              </View>
              <View style={styles.menuTextContainer}>
                <Text style={[styles.menuItemText, { color: theme.colors.onBackground }]}>
                  {item.title}
                </Text>
              </View>
              <MaterialCommunityIcons 
                name="chevron-right" 
                size={24} 
                color={theme.colors.onSurfaceVariant} 
              />
            </TouchableOpacity>
          ))}
        </View>

        <TouchableOpacity
          style={[styles.logoutButton, { backgroundColor: theme.colors.error }]}
          onPress={handleLogout}
        >
          <MaterialCommunityIcons name="logout" size={24} color="white" />
          <Text style={styles.logoutButtonText}>Çıkış Yap</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
  container: {
    flex: 1,
    padding: 16,
  },
  profileHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 24,
    paddingVertical: 20,
    paddingHorizontal: 16,
    borderRadius: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  avatarContainer: {
    marginRight: 20,
  },
  avatarWrapper: {
    position: "relative",
  },
  avatar: {
    backgroundColor: "transparent",
  },
  editIconContainer: {
    position: "absolute",
    bottom: -6,
    right: -6,
    backgroundColor: 'white',
    borderRadius: 20,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  editIcon: {
    margin: 0,
  },
  userInfoContainer: {
    flex: 1,
  },
  userName: {
    fontSize: 24,
    fontWeight: "700",
    marginBottom: 4,
  },
  userRole: {
    fontSize: 16,
    opacity: 0.7,
  },
  menuContainer: {
    borderRadius: 16,
    overflow: 'hidden',
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 16,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(0,0,0,0.05)",
  },
  lastMenuItem: {
    borderBottomWidth: 0,
  },
  menuIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 16,
  },
  menuTextContainer: {
    flex: 1,
  },
  menuItemText: {
    fontSize: 16,
    fontWeight: "500",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  loadingAvatarContainer: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: "#F2F2F7",
    justifyContent: "center",
    alignItems: "center",
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    borderRadius: 16,
    marginTop: 24,
  },
  logoutButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
  },
});