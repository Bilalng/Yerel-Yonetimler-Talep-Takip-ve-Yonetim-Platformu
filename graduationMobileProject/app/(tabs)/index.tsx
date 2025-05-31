import { MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";
import axios from "axios";
import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  Alert,
  FlatList,
  Platform,
  RefreshControl,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from "react-native";
import { ALERT_TYPE, Toast } from "react-native-alert-notification";
import { Avatar, Card, FAB, useTheme } from "react-native-paper";
import { Colors } from "../../constants/Colors";
import { useAuth } from "../../hooks/useAuth";

// API base URL'i
const API_BASE_URL = "http://192.168.91.122:8000";


const fixProfilePhotoUrl = (url: string): string => {
  if (!url) return '';
  // Tam URL ise doğrudan kullan
  if (url.startsWith('http')) {
    // Storage yolunu kontrol et ve düzelt
    if (url.includes('/storage/') && !url.includes('/storage/profile_photos/')) {
      const correctedUrl = url.replace('/storage/', '/storage/profile_photos/');
      return correctedUrl;
    }
    return url;
  }
  
  // Yalnızca yol verilmişse API_BASE_URL ile tamamla
  const fullUrl = `${API_BASE_URL}/storage/profile_photos/${url}`;
  return fullUrl;
};

// Define a typed user interface with required properties
interface User {
  name?: string;
  surname?: string;
  profile_photo?: string;
  [key: string]: any; // Allow for other properties
}

interface Post {
  id: number;
  user_id: number;
  service_id: number;
  status_id: number;
  title: string;
  description: string;
  photo: string;
  created_at: string;
  service: {
    title: string;
  };
  status: {
    title: string;
  };
}

export default function HomeScreen() {
  const router = useRouter();
  const theme = useTheme();
  const { isAuthenticated, loading, token } = useAuth();
  const [user, setUser] = useState<User | null>(null);
  const [data, setData] = useState<Post[]>([]);
  const [error, setError] = useState(null);
  const [refreshing, setRefreshing] = useState(false);
  const [selectedIds, setSelectedIds] = useState<number[]>([]);
  const [selectionMode, setSelectionMode] = useState(false);
  
  // Get colors based on the current theme
  const colors = Colors[theme.dark ? 'dark' : 'light'];

  const fetchData = async () => {
    try {
      const response = await axios.get(
        `${API_BASE_URL}/api/getComplaint`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setData(response.data.Şikayetler);
      
     
      if (!user) {
        try {
          const userResponse = await axios.get(
            `${API_BASE_URL}/api/getUserDetails`,
            {
              headers: { Authorization: `Bearer ${token}` },
            }
          );
          if (userResponse.data && userResponse.data[1] && userResponse.data[1][0]) {
            const userData = userResponse.data[1][0];
            
          
            if (userData.profile_photo_url) {
              userData.profile_photo = fixProfilePhotoUrl(userData.profile_photo_url);
            } else if (userData.profile_photo_path) {
              userData.profile_photo = fixProfilePhotoUrl(userData.profile_photo_path);
            } else if (userData.profile_photo) {
              userData.profile_photo = fixProfilePhotoUrl(userData.profile_photo);
            }
       
            setUser(userData);
          }
        } catch (userError) {
          console.error("Failed to fetch user details:", userError);
        }
      }
      
      return true;
    } catch (err) {
      setError(err as any);
      return false;
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

  const onRefresh = async () => {
    setRefreshing(true);
    await fetchData();
    setRefreshing(false);
  };

  const toggleSelection = (id: number) => {
    if (selectedIds.includes(id)) {
      setSelectedIds(selectedIds.filter((itemId) => itemId !== id));
      if (selectedIds.length === 1) {
        setSelectionMode(false);
      }
    } else {
      setSelectedIds([...selectedIds, id]);
    }
  };

  const startSelectionMode = (id: number) => {
    setSelectionMode(true);
    setSelectedIds([id]);
  };

  const exitSelectionMode = () => {
    setSelectionMode(false);
    setSelectedIds([]);
  };

  const handleDeleteSelected = async () => {
    try {
      // Silme işlemi öncesi onay iste
      Alert.alert(
        "Silme Onayı",
        `Seçilen ${selectedIds.length} talebi silmek istediğinize emin misiniz?`,
        [
          {
            text: "İptal",
            style: "cancel"
          },
          {
            text: "Sil",
            style: "destructive",
            onPress: async () => {
              try {
       
                // API isteği gönderin
                const response = await axios.post(
                  `${API_BASE_URL}/api/deleteComplaints`,
                  { ids: selectedIds },
                  {
                    headers: {
                      Authorization: `Bearer ${token}`,
                      "Content-Type": "application/json",
                    },
                  }
                );
               
                // Başarılı ise verileri güncelle
                setData((prev) => prev.filter((item) => !selectedIds.includes(item.id)));
                setSelectedIds([]);
                setSelectionMode(false);
                
                // Başarı bildirimi
                Toast.show({
                  type: ALERT_TYPE.SUCCESS,
                  title: "Başarılı",
                  textBody: "Seçilen talepler başarıyla silindi",
                });
              } catch (error: any) {
                console.error("Silme hatası:", error);
                
                // Hatanın niteliğini analiz et
                let errorMessage = "Silme işlemi sırasında bir hata oluştu";
                
                if (error.response) {
                  console.error("Hata durumu:", error.response.status);
                  console.error("Hata verisi:", error.response.data);
                  
                  // Spesifik hata mesajları
                  if (error.response.status === 500) {
                    errorMessage = "Sunucu hatası: Talepler silinemedi. Daha sonra tekrar deneyin.";
                  } else if (error.response.status === 403) {
                    errorMessage = "Bu talepleri silmek için yetkiniz bulunmuyor.";
                  } else if (error.response.status === 404) {
                    errorMessage = "Silmek istediğiniz bazı talepler bulunamadı.";
                  } else if (error.response.data && error.response.data.message) {
                    errorMessage = error.response.data.message;
                  }
                }
                
                // Hata bildirimi
                Toast.show({
                  type: ALERT_TYPE.DANGER,
                  title: "Silme Hatası",
                  textBody: errorMessage,
                });
              }
            }
          }
        ]
      );
    } catch (error) {
      console.error("İstek oluşturma hatası:", error);
      Toast.show({
        type: ALERT_TYPE.DANGER,
        title: "Hata",
        textBody: "İşlem sırasında beklenmeyen bir hata oluştu.",
      });
    }
  };

  const handleCardPress = (item: Post) => {
    if (selectionMode) {
      toggleSelection(item.id);
    } else {
      router.push({
        pathname: "/Talep/talepDetails",
        params: {
          title: item.title,
          description: item.description,
          photo: item.photo,
          service: item.service?.title || "—",
          status: item.status?.title || "—",
          created_at: item.created_at,
        },
      });
    }
  };

  const renderHeader = () => (
    <View
      style={[
        styles.header,
        {
          backgroundColor: colors.background,
          shadowColor: colors.shadow,
        },
      ]}
    >
      <Text style={[styles.headerTitle, {color: colors.onBackground}]}>Taleplerim</Text>
      <TouchableOpacity
        style={styles.profileButton}
        onPress={() => router.push("/Profile")}
      >
        {user?.profile_photo ? (
          <Avatar.Image
            size={40}
            source={{ 
              uri: user.profile_photo,
              // Hata durumunda varsayılan avatar için fallback ekle
              cache: 'reload' 
            }}
            style={{ backgroundColor: colors.surfaceVariant }}
            onError={(e) => {
              // Hata durumunda kullanıcının baş harflerini göster
              setUser(prev => ({
                ...(prev || {}),
                profile_photo: undefined // Profil fotoğrafını temizle ki Text avatarı gösterilsin
              }));
            }}
          />
        ) : (
          <Avatar.Text
            size={40}
            label={
              (user?.name?.charAt(0) || "") + (user?.surname?.charAt(0) || "")
            }
            color={colors.white}
            style={{ backgroundColor: colors.primary }}
          />
        )}
      </TouchableOpacity>
    </View>
  );

  if (loading) {
    return (
      <View
        style={[
          styles.loadingContainer,
          { backgroundColor: colors.background },
        ]}
      >
        <Text
          style={[styles.loadingText, { color: colors.onSurfaceVariant }]}
        >
          Yükleniyor...
        </Text>
      </View>
    );
  }

  if (error) {
    return (
      <View
        style={[styles.errorContainer, { backgroundColor: colors.background }]}
      >
        <MaterialIcons name="error-outline" size={48} color={colors.error} />
        <Text
          style={[styles.errorText, { color: colors.onSurfaceVariant }]}
        >
          {(error as Error).message}
        </Text>
        <TouchableOpacity
          style={[
            styles.retryButton,
            { backgroundColor: colors.primary },
          ]}
          onPress={fetchData}
        >
          <Text style={[styles.retryText, { color: colors.onPrimary }]}>
            Tekrar Dene
          </Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <SafeAreaView
      style={[styles.safeArea, { backgroundColor: colors.background }]}
    >
      {renderHeader()}

      {selectionMode && (
        <View
          style={[styles.selectionBar, { backgroundColor: colors.surface }]}
        >
          <TouchableOpacity
            style={[
              styles.selectionButton,
              { backgroundColor: colors.primary },
            ]}
            onPress={exitSelectionMode}
          >
            <Text style={[styles.buttonText, { color: colors.onPrimary }]}>
              İptal
            </Text>
          </TouchableOpacity>

          <Text style={[styles.selectionText, {color: colors.onSurface}]}>
            {selectedIds.length} öğe seçildi
          </Text>

          <TouchableOpacity
            style={[
              styles.selectionButton,
              {
                opacity: selectedIds.length === 0 ? 0.5 : 1,
                backgroundColor: colors.error,
              },
            ]}
            onPress={handleDeleteSelected}
            disabled={selectedIds.length === 0}
          >
            <Text style={[styles.buttonText, { color: colors.onError }]}>
              Sil
            </Text>
          </TouchableOpacity>
        </View>
      )}

      <FlatList
        data={data}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.listContent}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        ListHeaderComponent={
          <View style={{ height: selectionMode ? 60 : 0 }} />
        }
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <MaterialIcons 
              name="inbox" 
              size={64} 
              color={colors.outlineVariant} 
            />
            <Text
              style={[styles.emptyText, { color: colors.outlineVariant }]}
            >
              Henüz talep bulunmamaktadır
            </Text>
            <TouchableOpacity
              style={[
                styles.emptyButton,
                { backgroundColor: colors.primary },
              ]}
              onPress={() => router.push("/Talep/talepAdd")}
            >
              <Text
                style={[styles.emptyButtonText, { color: colors.onPrimary }]}
              >
                Talep Oluştur
              </Text>
            </TouchableOpacity>
          </View>
        }
        renderItem={({ item }) => {
            // Duruma göre kart stilini belirle
            const statusLower = (item.status?.title || "").toLowerCase();
            const isApproved = statusLower.includes("onay") || statusLower.includes("gerçekleş") || statusLower.includes("approv") || statusLower.includes("complete");
            const isRejected = statusLower.includes("red") || statusLower.includes("reject");
            
            return (
              <TouchableOpacity
                activeOpacity={0.7}
                onLongPress={() => {
                  if (!selectionMode) {
                    startSelectionMode(item.id);
                  } else {
                    toggleSelection(item.id);
                  }
                }}
                onPress={() => handleCardPress(item)}
                style={styles.cardWrapper}
              >
                <Card
                  style={[
                    styles.card, 
                    { 
                      backgroundColor: colors.surface,
                      borderLeftColor: getStatusColor(item.status?.title || "", colors),
                      // Onaylanan talepler için ek stil
                      ...(isApproved && { 
                        shadowColor: colors.success,
                        shadowOpacity: 0.3,
                        shadowRadius: 5,
                      })
                    }
                  ]}
                >
                  <View style={styles.cardHeader}>
                    <Text
                      style={[styles.cardTitle, { color: colors.onSurface }]}
                      numberOfLines={1}
                    >
                      {item.title}
                    </Text>

                    <View 
                      style={{
                        paddingHorizontal: 10,
                        paddingVertical: 6,
                        borderRadius: 8,
                        backgroundColor: getStatusColorWithOpacity(item.status?.title || "", colors, 0.1),
                        alignItems: 'center',
                        justifyContent: 'center',
                        minWidth: 90,
                        // Onaylanan talepler için ek vurgu
                        ...(isApproved && {
                          borderWidth: 1,
                          borderColor: `${colors.success}30`
                        })
                      }}
                    >
                      <Text 
                        style={{
                          fontSize: 12,
                          fontWeight: '600',
                          color: getStatusColor(item.status?.title || "", colors),
                          textAlign: 'center'
                        }}
                      >
                        {item.status?.title}
                      </Text>
                    </View>
                  </View>

                  <View style={styles.cardBody}>
                    <Text
                      style={[
                        styles.descriptionText,
                        { color: colors.onSurfaceVariant },
                      ]}
                      numberOfLines={2}
                    >
                      {item.description}
                    </Text>
                  </View>

                  <View
                    style={[
                      styles.cardFooter,
                      { borderTopColor: colors.outlineVariant },
                    ]}
                  >
                    <View style={styles.footerSection}>
                      <MaterialCommunityIcons 
                        name="tag-outline" 
                        size={16} 
                        color={colors.onSurfaceVariant}
                      />
                      <Text
                        style={[styles.footerText, { color: colors.onSurfaceVariant }]}
                      >
                        {item.service?.title || "—"}
                      </Text>
                    </View>
                    <View style={styles.footerSection}>
                      <MaterialIcons 
                        name="access-time" 
                        size={16} 
                        color={colors.onSurfaceVariant}
                      />
                      <Text
                        style={[styles.footerText, { color: colors.onSurfaceVariant }]}
                      >
                        {new Date(item.created_at).toLocaleDateString()}
                      </Text>
                    </View>
                  </View>
                </Card>
              </TouchableOpacity>
            );
          }}
      />

      {!selectionMode && (
        <FAB
          icon="plus"
          style={[styles.fab, { backgroundColor: colors.primary }]}
          onPress={() => router.push("/Talep/talepAdd")}
          color={colors.onPrimary}
        />
      )}
    </SafeAreaView>
  );
}

// Function to get status color based on status text
const getStatusColor = (status: string, colors: any) => {
  const statusLower = status.toLowerCase();
  
  if (statusLower.includes("bekle") || statusLower.includes("pend")) {
    return "#F9A825"; // Amber for pending
  } else if (statusLower.includes("onay") || statusLower.includes("approv") || 
             statusLower.includes("gerçekleş") || statusLower.includes("complete")) {
    return colors.success || "#4CAF50"; // Green for approved/completed
  } else if (statusLower.includes("red") || statusLower.includes("reject")) {
    return colors.danger || "#F44336"; // Red for rejected
  }
  
  return "#9E9E9E"; // Default gray
};

// Function to get status color with opacity
const getStatusColorWithOpacity = (status: string, colors: any, opacity: number = 0.1) => {
  const color = getStatusColor(status, colors);
  
  // Convert hex to rgba with opacity
  const r = parseInt(color.slice(1, 3), 16);
  const g = parseInt(color.slice(3, 5), 16);
  const b = parseInt(color.slice(5, 7), 16);
  return `rgba(${r}, ${g}, ${b}, ${opacity})`;
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingVertical: 16,
    elevation: 0,
    zIndex: 100,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: "700",
  },
  profileButton: {
    borderRadius: 20,
    elevation: 2,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  loadingText: {
    marginTop: 16,
    fontSize: 16,
  },
  errorContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  errorText: {
    marginTop: 16,
    fontSize: 16,
    textAlign: "center",
  },
  retryButton: {
    marginTop: 20,
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 12,
    elevation: 2,
  },
  retryText: {
    fontWeight: "600",
  },
  listContent: {
    padding: 16,
    paddingBottom: 80, // Extra space at bottom for FAB
  },
  cardWrapper: {
    marginBottom: 24,
    borderRadius: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  card: {
    borderRadius: 16,
    borderLeftWidth: 6,
    overflow: "hidden",
    elevation: 0,
  },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 8,
  },
  cardTitle: {
    fontSize: 17,
    fontWeight: "700",
    flex: 1,
    marginRight: 8,
  },
  statusContainer: {
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 6,
    alignItems: 'center',
    justifyContent: 'center',
  },
  statusText: {
    fontSize: 12,
    fontWeight: '600',
  },
  cardBody: {
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
  descriptionText: {
    fontSize: 14,
    lineHeight: 22,
  },
  cardFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderTopWidth: 1,
  },
  footerSection: {
    flexDirection: "row",
    alignItems: "center",
  },
  footerText: {
    fontSize: 12,
    marginLeft: 6,
  },
  fab: {
    position: "absolute",
    margin: 16,
    right: 0,
    bottom: 0,
    borderRadius: 28,
    elevation: 4,
  },
  selectionBar: {
    position: "absolute",
    top: Platform.OS === "android" ? (StatusBar.currentHeight || 0) + 56 : 56,
    left: 0,
    right: 0,
    zIndex: 99,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  selectionButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
    elevation: 1,
  },
  buttonText: {
    fontWeight: "600",
  },
  selectionText: {
    fontSize: 14,
    fontWeight: "500",
  },
  checkbox: {
    position: "absolute",
    top: 12,
    right: 12,
    zIndex: 10,
  },
  emptyContainer: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 60,
  },
  emptyText: {
    fontSize: 16,
    marginTop: 16,
    marginBottom: 24,
  },
  emptyButton: {
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 12,
    elevation: 2,
  },
  emptyButtonText: {
    fontWeight: "600",
  },
});
