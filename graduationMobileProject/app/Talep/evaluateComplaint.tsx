import { Ionicons, MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";
import axios from "axios";
import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
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
import {
  ALERT_TYPE,
  Toast
} from "react-native-alert-notification";
import { Card, useTheme } from "react-native-paper";
import { Colors } from "../../constants/Colors";
import { useAuth } from "../../hooks/useAuth";

// API base URL
const API_BASE_URL = "http://192.168.91.122:8000";

// Tamamlanan iş fotoğrafı için URL düzeltme fonksiyonu
const fixComplatedPhotoUrl = (photoName: string | null): string => {
  if (!photoName) return '';
  
  // Tam URL ise doğrudan kullan
  if (photoName.startsWith('http')) {
    return photoName;
  }
  
  // Yalnızca dosya adı varsa API_BASE_URL ile tamamla
  const photoUrl = `${API_BASE_URL}/storage/${photoName}`;
  return photoUrl;
};

interface VerifyData {
  id: number;
  complaint_id: number;
  reason_for_refuse: string | null;
  reason_for_verify: string | null;
  complated_photo: string | null;
  satisfaction: number | null;
  created_at: string;
  updated_at: string;
}

interface Complaint {
  id: number;
  title: string;
  description: string;
  status: {
    id: number;
    title: string;
  };
  service: {
    id: number;
    title: string;
  };
  user: {
    id: number;
    name: string;
  };
  created_at: string;
  updated_at: string;
  photo: string;
}

interface VerifiedComplaint {
  id: number;
  complaint_id: number;
  reason_for_verify: string | null;
  reason_for_refuse: string | null;
  complated_photo: string | null;
  satisfaction: number | null;
  created_at: string;
  updated_at: string;
  complaint: Complaint;
  hasVoted?: boolean; // Kullanıcının oy kullanıp kullanmadığını tutan özellik
}

export default function EvaluateComplaint() {
  const router = useRouter();
  const theme = useTheme();
  const { isAuthenticated, loading, token } = useAuth();
  const [data, setData] = useState<VerifiedComplaint[]>([]);
  const [error, setError] = useState<any>(null);
  const [refreshing, setRefreshing] = useState(false);
  const [votingItem, setVotingItem] = useState<number | null>(null);
  const [submittingFeedback, setSubmittingFeedback] = useState(false);
  
  // Oy kullanan kullanıcıları izlemek için local state
  const [votedItems, setVotedItems] = useState<Record<number, boolean>>({});
  
  // Sayfalama için state'ler
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4; // Her sayfada gösterilecek maksimum kart sayısı
  
  const colors = Colors[theme.dark ? 'dark' : 'light'];

  // Kullanıcının oy kullandığı talepleri getir
  const fetchUserVotedSurveys = async () => {
    try {
      const response = await axios.get(
        `${API_BASE_URL}/api/getUserSurveys`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      
      // API yanıtını daha detaylı loglayalım
      if (response.data) {

        
        // API response doğrudan dizi ise ya da data alanı içinde ise
        const surveyData = Array.isArray(response.data) ? response.data : 
                          (response.data.data && Array.isArray(response.data.data)) ? response.data.data : [];
        
        // Veri yapısını daha derin inceleyelim
        if (surveyData.length > 0) {
        }
        
        // API'den dönen talep ID'lerini votedItems state'ine ekle
        const votedItemsMap: Record<number, boolean> = {};
        
        surveyData.forEach((item: any) => {
          // API'den gelen yapıda hangi alanın complaint ID'sini tuttuğunu kontrol edelim
          // Olası alan isimleri: complaint_id, id, complaint_id, complaintId, requestId, vb.
          const complaintId = item.complaint_id || item.complaintId || item.request_id || item.requestId || item.id;
          
          if (complaintId) {
            // Değer string ise number'a çevirelim
            const idValue = typeof complaintId === 'string' ? parseInt(complaintId, 10) : complaintId;
            votedItemsMap[idValue] = true;

          }
        });

        setVotedItems(votedItemsMap);
      }
      
      return true;
    } catch (err) {
      console.error("User Surveys API Error:", err);
      return false;
    }
  };

  const fetchVerifiedComplaints = async () => {
    try {
      setError(null);
      const response = await axios.get(
        `${API_BASE_URL}/api/verified-complaints`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (response.data && response.data.data) {
        // Veri yapısını doğru şekilde ayarlayalım
        const processedData = response.data.data.map((item: any) => {
          // API'den gelen veri yapısı farklı olabilir, normalize edelim
          let complaintData = { ...item };
          
          // Complaint özelliği yoksa bu tüm veri zaten complaint olabilir
          if (!complaintData.complaint && complaintData.title) {
            complaintData = {
              ...complaintData,
              complaint: {
                id: complaintData.id,
                title: complaintData.title,
                description: complaintData.description,
                photo: complaintData.photo,
                created_at: complaintData.created_at,
                service: complaintData.service,
                status: {
                  id: 3,
                  title: "Gerçekleştirildi"
                },
                user: complaintData.user
              }
            };
          }
          
          // Complaint içinde status kontrolü
          if (complaintData.complaint && !complaintData.complaint.status) {
            complaintData.complaint.status = {
              id: 3, // Gerçekleştirildi statüsü
              title: "Gerçekleştirildi"
            };
          }
          
          // complaint_id özelliği yoksa ekleyelim
          if (!complaintData.complaint_id && complaintData.complaint) {
            complaintData.complaint_id = complaintData.complaint.id;
          }
          
          // Önce daha detaylı loglama yapalım

          // Local state'ten kullanıcının oy kullanıp kullanmadığını kontrol et
          const hasVotedLocally = votedItems[complaintData.complaint_id] === true;
          
          // API'den gelen bilgilerle ve local state ile hasVoted değerini belirle
          complaintData.hasVoted = hasVotedLocally;

          return complaintData;
        });
        
        setData(processedData);
      } else {
        setData([]);
      }
      
      return true;
    } catch (err) {
      console.error("API Error:", err);
      setError(err);
      return false;
    }
  };

  useEffect(() => {
    if (!loading) {
      if (!isAuthenticated) {
        router.replace("/Login");
        return;
      }

      // Önce kullanıcının oy kullandığı talepleri getir
      const loadData = async () => {
        // İlk olarak kullanıcının oy kullandığı anketleri getir
        await fetchUserVotedSurveys();
        // Ardından tüm talepleri getir
        await fetchVerifiedComplaints();
      };
      
      loadData();
    }
  }, [isAuthenticated, loading]); // votedItems değiştiğinde veri çekmeye gerek yok, zaten içeride güncelleniyor

  const onRefresh = async () => {
    setRefreshing(true);
    await fetchUserVotedSurveys(); // Oy kullanılan talepleri yeniden getir
    await fetchVerifiedComplaints();
    setRefreshing(false);
  };

  const submitFeedback = async (complaintId: number, answer: boolean) => {
    try {
      setSubmittingFeedback(true);
      setVotingItem(complaintId);
      
      // Önce local olarak votedItems'i güncelle - böylece UI anında güncellenir
      setVotedItems(prev => ({
        ...prev,
        [complaintId]: true
      }));
      
      const response = await axios.post(
        `${API_BASE_URL}/api/feedback`,
        {
          complaint_id: complaintId,
          answer: answer ? 1 : 0,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      // Veriyi hemen güncelle - burada tüm talepleri yeniden getirmek yerine sadece ilgili talebi güncelliyoruz
      setData(prevData => 
        prevData.map(item => {
          // Bu talep için memnuniyet bilgisini ve hasVoted'ı güncelle
          if (item.complaint_id === complaintId) {
            return {
              ...item,
              hasVoted: true,
              satisfaction: response.data.satisfaction || item.satisfaction
            };
          }
          return item;
        })
      );
      Toast.show({
        type: ALERT_TYPE.SUCCESS,
        title: "Başarılı",
        textBody: "Memnuniyetinizi Bildirdiğiniz İçin Teşekkürler.",
      });
     
      
      return true;
    } catch (err: any) {
      const errorMsg = err.response?.data?.message || "Oy kullanırken bir hata oluştu.";
      
      // Eğer zaten oy kullanılmışsa bu da votedItems'a ekle
      if (err.response?.status === 409) {
        // Varsayılan olarak hasVoted'ı true olarak ayarla
        setData(prevData => 
          prevData.map(item => {
            if (item.complaint_id === complaintId) {
              return {
                ...item,
                hasVoted: true
              };
            }
            return item;
          })
        );
      } else {
        // Hata durumunda votedItems'tan kaldır - kullanıcı tekrar oy vermeyi deneyebilir
        setVotedItems(prev => {
          const updated = { ...prev };
          delete updated[complaintId];
          return updated;
        });
      }
      Toast.show({
        type: ALERT_TYPE.DANGER,
        title: "HATA",
        textBody: errorMsg,
      });
     
      return false;
    } finally {
      setSubmittingFeedback(false);
      setVotingItem(null);
    }
  };

  const handleCardPress = (item: VerifiedComplaint) => {
    router.push({
      pathname: "/Talep/talepDetails",
      params: {
        title: item.complaint?.title || "",
        description: item.complaint?.description || "",
        photo: item.complaint?.photo || "",
        service: item.complaint?.service?.title || "—",
        status: item.complaint?.status?.title || "—",
        status_id: item.complaint?.status?.id || 0,
        created_at: item.complaint?.created_at || "",
        reason_for_verify: item.reason_for_verify || "",
        reason_for_refuse: item.reason_for_refuse || "",
        complated_photo: item.complated_photo ? fixComplatedPhotoUrl(item.complated_photo) : null,
        satisfaction: item.satisfaction || null
      },
    });
  };

  const renderSatisfactionScore = (satisfaction: number | null) => {
    if (satisfaction === null) return null;
    
    const percentage = Math.round(satisfaction * 100);
    const color = percentage >= 70 
      ? colors.success 
      : (percentage >= 40 ? colors.secondary : colors.error);
    
  return (
      <View style={styles.satisfactionContainer}>
        <Text style={[styles.satisfactionLabel, { color: colors.onSurfaceVariant }]}>
          Memnuniyet:
        </Text>
        <View style={styles.satisfactionScore}>
          <Text style={[styles.scoreText, { color }]}>
            %{percentage}
          </Text>
          <View style={[styles.scoreBar, { backgroundColor: `${color}30` }]}>
            <View 
              style={[
                styles.scoreProgress, 
                { 
                  width: `${percentage}%`,
                  backgroundColor: color
                }
              ]} 
            />
          </View>
        </View>
      </View>
    );
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
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => router.back()}
      >
        <MaterialIcons name="arrow-back" size={24} color={colors.onBackground} />
      </TouchableOpacity>
      <Text style={[styles.headerTitle, { color: colors.onBackground }]}>
        Değerlendirme Bekleyenler
      </Text>
      <View style={{ width: 40 }} />
    </View>
  );

  const renderItem = ({ item }: { item: VerifiedComplaint }) => {
    // hasVoted değerini daha güvenilir şekilde kontrol et

    // Bu talep için votedItems'da bir kayıt var mı kontrol et
    const hasVotedThisItem = Boolean(votedItems[item.complaint_id]);

    
    // item.hasVoted değerine öncelik ver (API'den geliyor olabilir)
    const hasVoted = Boolean(item.hasVoted) || hasVotedThisItem;

    
    return (
      <Card
        style={[
          styles.card,
          {
            backgroundColor: colors.surface,
            borderLeftColor: colors.tertiary,
          },
        ]}
      >
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => handleCardPress(item)}
          style={styles.cardContent}
        >
          <View style={styles.cardHeader}>
            <Text
              style={[styles.cardTitle, { color: colors.onSurface }]}
              numberOfLines={1}
            >
              {item.complaint?.title || "Başlık yok"}
            </Text>

            <View
              style={{
                paddingHorizontal: 10,
                paddingVertical: 6,
                borderRadius: 8,
                backgroundColor: colors.primary,
                alignItems: "center",
                justifyContent: "center",
                minWidth: 90,
                borderWidth: 1,
                borderColor: colors.primaryContainer,
              }}
            >
              <Text
                style={{
                  fontSize: 12,
                  fontWeight: "700",
                  color: colors.onPrimary,
                  textAlign: "center",
                }}
              >
                {item.complaint?.status?.title || "Durum Bilgisi Yok"}
              </Text>
            </View>
          </View>

          <View style={styles.cardBody}>
            <Text
              style={[
                styles.descriptionText,
                { color: colors.onSurfaceVariant },
              ]}
            >
              {item.complaint?.description || "Açıklama yok"}
            </Text>
            
            {item.reason_for_verify && (
              <View style={[styles.verifyInfoContainer, { borderColor: `${colors.tertiary}30` }]}>
                <Text style={[styles.verifyInfoTitle, { color: colors.tertiary }]}>
                  Gerçekleştirilme Detayı:
                </Text>
                <Text
                  style={[styles.verifyInfoText, { color: colors.onSurfaceVariant }]}
                >
                  {item.reason_for_verify}
                </Text>
                
                {item.complated_photo && (
                  <View style={styles.complatedPhotoContainer}>
                    <TouchableOpacity
                      onPress={() => handleCardPress(item)}
                      style={[styles.viewPhotoButton, { backgroundColor: colors.tertiary }]}
                    >
                      <Text style={{ color: colors.onPrimary, fontSize: 12, fontWeight: '600' }}>
                        Tamamlanan İş Fotoğrafını Gör
                      </Text>
                      <MaterialIcons name="arrow-forward" size={16} color={colors.onPrimary} />
                    </TouchableOpacity>
                  </View>
                )}
              </View>
            )}
            
            {/* Memnuniyet skorunu göster (eğer varsa) */}
            {renderSatisfactionScore(item.satisfaction)}

            {/* Oylama bölümü - oy kullanılmadıysa göster */}
            {!hasVoted ? (
              <View style={[styles.votingContainer, { 
                backgroundColor: colors.surfaceVariant, 
                borderColor: colors.outlineVariant 
              }]}>
                <Text style={[styles.votingTitle, { color: colors.onSurfaceVariant }]}>
                  Bu hizmetten memnun kaldınız mı?
                </Text>
                <View style={styles.votingButtons}>
                  <TouchableOpacity
                    style={[styles.voteButtonPositive, { 
                      backgroundColor: colors.primary, 
                      borderColor: colors.primaryContainer 
                    }]}
                    onPress={() => submitFeedback(item.complaint_id, true)}
                    disabled={submittingFeedback && votingItem === item.complaint_id}
                  >
                    {submittingFeedback && votingItem === item.complaint_id ? (
                      <ActivityIndicator size="small" color={colors.onPrimary} />
                    ) : (
                      <>
                        <Ionicons name="thumbs-up" size={22} color={colors.onPrimary} />
                        <Text style={[styles.voteButtonTextWhite, { color: colors.onPrimary }]}>
                          EVET
                        </Text>
                      </>
                    )}
                  </TouchableOpacity>
                  
                  <TouchableOpacity
                    style={[styles.voteButtonNegative, { 
                      backgroundColor: colors.error, 
                      borderColor: colors.errorContainer 
                    }]}
                    onPress={() => submitFeedback(item.complaint_id, false)}
                    disabled={submittingFeedback && votingItem === item.complaint_id}
                  >
                    {submittingFeedback && votingItem === item.complaint_id ? (
                      <ActivityIndicator size="small" color={colors.onError} />
                    ) : (
                      <>
                        <Ionicons name="thumbs-down" size={22} color={colors.onError} />
                        <Text style={[styles.voteButtonTextWhite, { color: colors.onError }]}>
                          HAYIR
                        </Text>
                      </>
                    )}
                  </TouchableOpacity>
                </View>
              </View>
            ) : (
              <View style={[styles.votedContainer, { 
                backgroundColor: colors.surfaceVariant, 
                borderColor: colors.outlineVariant 
              }]}>
                <Text style={[styles.votedText, { color: colors.onSurfaceVariant }]}>
                  Bu talep için daha önce oy kullandınız.
                </Text>
                {item.satisfaction !== null && (
                  <View style={[styles.satisfactionBadge, { 
                    backgroundColor: colors.primaryContainer 
                  }]}>
                    <Text style={[styles.satisfactionBadgeText, { 
                      color: colors.onPrimaryContainer 
                    }]}>
                      Memnuniyet Oranı: %{Math.round((item.satisfaction || 0) * 100)}
                    </Text>
                  </View>
                )}
              </View>
            )}
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
                style={[
                  styles.footerText,
                  { color: colors.onSurfaceVariant },
                ]}
              >
                {item.complaint?.service?.title || "—"}
              </Text>
            </View>
            <View style={styles.footerSection}>
              <MaterialIcons
                name="access-time"
                size={16}
                color={colors.onSurfaceVariant}
              />
              <Text
                style={[
                  styles.footerText,
                  { color: colors.onSurfaceVariant },
                ]}
              >
                {item.complaint?.created_at ? new Date(item.complaint.created_at).toLocaleDateString() : "—"}
              </Text>
            </View>
          </View>
        </TouchableOpacity>
      </Card>
    );
  };

  // Şu anki sayfadaki öğeleri hesapla
  const getCurrentPageItems = () => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return data.slice(startIndex, endIndex);
  };
  
  // Toplam sayfa sayısını hesapla
  const totalPages = Math.ceil(data.length / itemsPerPage);
  
  // Sayfa değiştirme fonksiyonu
  const changePage = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };
  
  // Sayfalama bileşeni
  const renderPagination = () => {
    if (totalPages <= 1) return null;
    
    const pages = [];
    for (let i = 1; i <= totalPages; i++) {
      pages.push(
        <TouchableOpacity 
          key={i}
          style={[
            styles.pageButton,
            currentPage === i && styles.activePageButton,
            {
              backgroundColor: currentPage === i ? colors.primary : colors.surfaceVariant,
            }
          ]}
          onPress={() => changePage(i)}
        >
          <Text 
            style={[
              styles.pageButtonText,
              { color: currentPage === i ? colors.onPrimary : colors.onSurfaceVariant }
            ]}
          >
            {i}
          </Text>
        </TouchableOpacity>
      );
    }
    
    return (
      <View style={styles.paginationContainer}>
        {totalPages > 5 && currentPage > 1 && (
          <TouchableOpacity 
            style={[styles.pageButton, { backgroundColor: colors.surfaceVariant }]}
            onPress={() => changePage(currentPage - 1)}
          >
            <MaterialIcons name="chevron-left" size={18} color={colors.onSurfaceVariant} />
          </TouchableOpacity>
        )}
        
        {pages}
        
        {totalPages > 5 && currentPage < totalPages && (
          <TouchableOpacity 
            style={[styles.pageButton, { backgroundColor: colors.surfaceVariant }]}
            onPress={() => changePage(currentPage + 1)}
          >
            <MaterialIcons name="chevron-right" size={18} color={colors.onSurfaceVariant} />
          </TouchableOpacity>
        )}
      </View>
    );
  };

  if (loading) {
    return (
      <View style={[styles.loadingContainer, { backgroundColor: colors.background }]}>
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    );
  }

  if (error) {
    return (
      <View style={[styles.errorContainer, { backgroundColor: colors.background }]}>
        <MaterialIcons name="error-outline" size={48} color={colors.error} />
        <Text style={[styles.errorText, { color: colors.onSurfaceVariant }]}>
          {error.message}
        </Text>
        <TouchableOpacity
          style={[styles.retryButton, { backgroundColor: colors.primary }]}
          onPress={fetchVerifiedComplaints}
        >
          <Text style={[styles.retryText, { color: colors.onPrimary }]}>
            Tekrar Dene
          </Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: colors.background }]}>
      {renderHeader()}

      <FlatList
        data={getCurrentPageItems()} // Sadece geçerli sayfadaki öğeleri göster
        keyExtractor={(item, index) => `${item.id || ''}-${index}`}
        contentContainerStyle={styles.listContent}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <MaterialIcons name="rate-review" size={64} color={colors.outlineVariant} />
            <Text style={[styles.emptyText, { color: colors.outlineVariant }]}>
              Değerlendirme bekleyen talep bulunmamaktadır
            </Text>
          </View>
        }
        renderItem={renderItem}
        ListFooterComponent={renderPagination}
      />
    </SafeAreaView>
  );
}

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
    fontSize: 20,
    fontWeight: "700",
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  listContent: {
    padding: 16,
    paddingBottom: 24,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
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
  card: {
    marginBottom: 16,
    borderRadius: 16,
    borderLeftWidth: 6,
    overflow: "hidden",
    elevation: 1,
  },
  cardContent: {
    flexDirection: "column",
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
  cardBody: {
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
  descriptionText: {
    fontSize: 14,
    lineHeight: 22,
    marginBottom: 12,
  },
  verifyInfoContainer: {
    marginTop: 8,
    padding: 12,
    borderWidth: 1,
    borderRadius: 8,
    backgroundColor: 'rgba(103, 80, 164, 0.05)',
  },
  verifyInfoTitle: {
    fontSize: 14,
    fontWeight: "600",
    marginBottom: 6,
  },
  verifyInfoText: {
    fontSize: 13,
    lineHeight: 20,
  },
  complatedPhotoContainer: {
    marginTop: 12,
    alignItems: "flex-start",
  },
  viewPhotoButton: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 6,
    gap: 6,
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
  emptyContainer: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 60,
  },
  emptyText: {
    fontSize: 16,
    marginTop: 16,
    textAlign: "center",
  },
  votingContainer: {
    marginTop: 16,
    padding: 16,
    borderRadius: 8,
    borderWidth: 1,
  },
  votingTitle: {
    fontSize: 16,
    fontWeight: "700",
    textAlign: "center",
    marginBottom: 16,
  },
  votingButtons: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
  voteButtonPositive: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    width: "45%",
    gap: 8,
    elevation: 2,
  },
  voteButtonNegative: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    width: "45%",
    gap: 8,
    elevation: 2,
  },
  voteButtonTextWhite: {
    fontWeight: "700",
    fontSize: 16,
  },
  votedContainer: {
    marginTop: 16,
    padding: 16,
    borderRadius: 8,
    borderWidth: 1,
    alignItems: "center",
  },
  votedText: {
    fontSize: 15,
    fontWeight: "600",
    marginBottom: 8,
  },
  satisfactionBadge: {
    marginTop: 8,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  satisfactionBadgeText: {
    fontSize: 14,
    fontWeight: "700",
  },
  satisfactionContainer: {
    marginTop: 12,
    marginBottom: 12,
  },
  satisfactionLabel: {
    fontSize: 13,
    fontWeight: "500",
    marginBottom: 6,
  },
  satisfactionScore: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  scoreText: {
    fontSize: 14,
    fontWeight: "600",
    width: 50,
  },
  scoreBar: {
    flex: 1,
    height: 8,
    borderRadius: 4,
  },
  scoreProgress: {
    height: "100%",
    borderRadius: 4,
  },
  paginationContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    paddingVertical: 20,
    alignItems: 'center',
    gap: 8,
  },
  pageButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 4,
  },
  activePageButton: {
    elevation: 2,
  },
  pageButtonText: {
    fontSize: 14,
    fontWeight: '600',
  },
});