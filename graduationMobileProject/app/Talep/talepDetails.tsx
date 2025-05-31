import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Image } from 'expo-image';
import { Stack, useLocalSearchParams, useRouter } from "expo-router";
import React, { useState } from "react";
import {
  Dimensions,
  Modal,
  Platform,
  ScrollView,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import { Card, Divider, IconButton, Text, useTheme } from "react-native-paper";

const API_BASE_URL = "http://192.168.91.122:8000";
const { width } = Dimensions.get('window');

export default function ComplaintDetail() {
  const router = useRouter();
  const theme = useTheme();
  const params = useLocalSearchParams();
  const { 
    title, 
    description, 
    photo, 
    service, 
    status, 
    status_id,
    created_at, 
    reason_for_verify, 
    reason_for_refuse,
    complated_photo,
    satisfaction
  } = params;
  
  const [imageModalVisible, setImageModalVisible] = useState(false);
  const [currentImage, setCurrentImage] = useState<string | null>(null);


  const getStatusColor = (statusText: string | string[], statusId?: string | string[]) => {
    // Önce status_id'ye göre kontrol edelim
    if (statusId) {
      const id = Array.isArray(statusId) ? parseInt(statusId[0]) : parseInt(String(statusId));
      
      if (id === 4) return '#F44336'; // Red - Reddedildi
      if (id === 3) return '#4CAF50'; // Green - Onaylandı/Gerçekleştirildi
      if (id === 2) return '#F9A825'; // Amber - Beklemede
      if (id === 1) return '#2196F3'; // Blue - Yeni
    }
    
    // Eğer status_id yoksa veya tanımlanamadıysa, metin içeriğine göre kontrol et
    const statusStr = Array.isArray(statusText) ? statusText[0] : String(statusText);
    const statusLower = statusStr.toLowerCase();
    
    if (statusLower.includes('red') || statusLower.includes('reject')) {
      return '#F44336'; // Red
    } else if (statusLower.includes('onay') || statusLower.includes('gerçek') || statusLower.includes('talebiniz gerçekle') || statusLower.includes('approved')) {
      return '#4CAF50'; // Green  
    } else if (statusLower.includes('bekle') || statusLower.includes('pending')) {
      return '#F9A825'; // Amber
    } else {
      return '#9E9E9E'; // Grey
    }
  };

  // Tarih formatını güvenli bir şekilde ayarla
  const formatDate = (dateString: string | string[]) => {
    try {
      const dateStr = Array.isArray(dateString) ? dateString[0] : String(dateString);
      const date = new Date(dateStr);
      
      if (isNaN(date.getTime())) {
        return 'Geçersiz tarih';
      }
      
      return date.toLocaleDateString('tr-TR', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      });
    } catch (e) {
      console.error('Tarih dönüştürme hatası:', e);
      return 'Bilinmeyen tarih';
    }
  };
  
  const handleShowImage = (imageUrl: string) => {
    setCurrentImage(imageUrl);
    setImageModalVisible(true);
  };
  
  // Talebin durumunu status_id'ye göre kontrol et
  const getStatusId = () => {
    if (status_id) {
      return Array.isArray(status_id) ? parseInt(status_id[0]) : parseInt(String(status_id));
    }
    return 0;
  };
  
  const currentStatusId = getStatusId();
  const isCompleted = currentStatusId === 3 || String(status).toLowerCase().includes('gerçekleştirildi') || String(status).toLowerCase().includes('tamamlandı');
  const isRejected = currentStatusId === 4 || String(status).toLowerCase().includes('red') || String(status).toLowerCase().includes('reject');

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <StatusBar backgroundColor={theme.colors.background} barStyle="dark-content" />
      
      <Stack.Screen 
        options={{
          headerShown: false
        }}
      />
      
      <View style={styles.header}>
        <IconButton
          icon="arrow-left"
          size={24}
          onPress={() => router.back()}
          iconColor={theme.colors.onBackground}
        />
        <Text style={[styles.headerTitle, { color: theme.colors.onBackground }]}>
          Talep Detayı
      </Text>
        <View style={{ width: 40 }} />
      </View>
      
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Resim Kartı */}
        {photo && photo !== "0" && (
          <Card style={styles.imageCard} elevation={2}>
            <TouchableOpacity onPress={() => handleShowImage(`${API_BASE_URL}/storage/${photo}`)}>
              <Card.Cover
                source={{ uri: `${API_BASE_URL}/storage/${photo}` }}
                style={styles.image}
        resizeMode="cover"
      />
            </TouchableOpacity>
          </Card>
        )}
        
        {/* Başlık ve Durum */}
        <View style={styles.titleContainer}>
          <Text style={[styles.title, { color: theme.colors.onBackground }]}>
            {title}
          </Text>
          <View style={[
            styles.statusBadge, 
            { backgroundColor: getStatusColor(status, status_id) }
          ]}>
            <Text style={styles.statusText}>
              {Array.isArray(status) ? status[0] : status}
            </Text>
          </View>
        </View>
        
        {/* Meta Bilgiler */}
        <View style={styles.metaContainer}>
          <View style={styles.metaItem}>
            <MaterialCommunityIcons name="calendar" size={18} color={theme.colors.primary} />
            <Text style={[styles.metaText, { color: theme.colors.onSurfaceVariant }]}>
              {formatDate(created_at)}
            </Text>
          </View>
          
          <View style={styles.metaItem}>
            <MaterialCommunityIcons name="tag" size={18} color={theme.colors.primary} />
            <Text style={[styles.metaText, { color: theme.colors.onSurfaceVariant }]}>
              {Array.isArray(service) ? service[0] : service}
            </Text>
          </View>
        </View>
        
        <Divider style={styles.divider} />
        
        {/* Açıklama Bölümü */}
        <Card style={[styles.contentCard, { backgroundColor: theme.colors.surfaceVariant }]}>
          <Card.Content>
            <Text style={[styles.sectionTitle, { color: theme.colors.onBackground }]}>
              Açıklama
            </Text>
            <Text style={[styles.sectionContent, { color: theme.colors.onSurfaceVariant }]}>
              {Array.isArray(description) ? description[0] : description}
            </Text>
          </Card.Content>
        </Card>
        
        {/* Reddedilme sebebi - Sadece reddedilen taleplerde göster */}
        {isRejected && reason_for_refuse && (
          <Card 
            style={[
              styles.contentCard, 
              { 
                backgroundColor: 'rgba(244, 67, 54, 0.08)',
                borderWidth: 1,
                borderColor: 'rgba(244, 67, 54, 0.3)',
              }
            ]}
          >
            <Card.Content>
              <View style={styles.completedHeaderContainer}>
                <MaterialCommunityIcons name="close-circle" size={22} color="#F44336" />
                <Text style={[styles.sectionTitle, { color: "#F44336", marginLeft: 8 }]}>
                  Reddedilme Sebebi
                </Text>
              </View>
              <Text style={[styles.sectionContent, { color: theme.colors.onSurfaceVariant }]}>
                {Array.isArray(reason_for_refuse) ? reason_for_refuse[0] : reason_for_refuse}
              </Text>
            </Card.Content>
          </Card>
        )}
        
        {/* Gerçekleştirilme Detayı - Sadece tamamlanan taleplerde göster */}
        {isCompleted && reason_for_verify && (
          <Card 
            style={[
              styles.contentCard, 
              { 
                backgroundColor: 'rgba(76, 175, 80, 0.08)',
                borderWidth: 1,
                borderColor: 'rgba(76, 175, 80, 0.3)',
              }
            ]}
          >
            <Card.Content>
              <View style={styles.completedHeaderContainer}>
                <MaterialCommunityIcons name="check-circle" size={22} color="#4CAF50" />
                <Text style={[styles.sectionTitle, { color: "#4CAF50", marginLeft: 8 }]}>
                  Gerçekleştirilme Detayı
                </Text>
              </View>
              <Text style={[styles.sectionContent, { color: theme.colors.onSurfaceVariant }]}>
                {Array.isArray(reason_for_verify) ? reason_for_verify[0] : reason_for_verify}
              </Text>
            </Card.Content>
          </Card>
        )}
        
        {/* Tamamlanan İş Fotoğrafı - Sadece tamamlanan taleplerde göster */}
        {isCompleted && complated_photo && (
          <Card style={styles.imageCard} elevation={2}>
            <Card.Content>
              <Text style={[styles.sectionTitle, { color: theme.colors.onBackground, marginBottom: 12 }]}>
                Tamamlanan İş Fotoğrafı
              </Text>
              <TouchableOpacity 
                onPress={() => handleShowImage(String(complated_photo))}
                style={{ alignItems: 'center' }}
              >
                <Image
                  source={{ uri: Array.isArray(complated_photo) ? complated_photo[0] : String(complated_photo) }}
                  style={styles.completedImage}
                  contentFit="cover"
                />
              </TouchableOpacity>
            </Card.Content>
          </Card>
        )}

        {/* Memnuniyet Oranı - Sadece tamamlanan ve oylanmış taleplerde göster */}
        {isCompleted && satisfaction && (
          <Card 
            style={[
              styles.contentCard, 
              { 
                backgroundColor: 'rgba(103, 58, 183, 0.08)',
                borderWidth: 1,
                borderColor: 'rgba(103, 58, 183, 0.3)',
              }
            ]}
          >
            <Card.Content>
              <View style={styles.completedHeaderContainer}>
                <MaterialCommunityIcons name="star-circle" size={22} color="#673AB7" />
                <Text style={[styles.sectionTitle, { color: "#673AB7", marginLeft: 8 }]}>
                  Memnuniyet Oranı
                </Text>
              </View>
              
              {/* Memnuniyet Yüzdesi ve Çubuk */}
              <View style={styles.satisfactionContainer}>
                {(() => {
                  const satisfactionValue = parseFloat(Array.isArray(satisfaction) ? satisfaction[0] : String(satisfaction));
                  const percentage = Math.round(satisfactionValue * 100);
                  
                  // Memnuniyet değerine göre renk belirle
                  const color = percentage >= 70 
                    ? '#4CAF50'  // Yeşil (yüksek memnuniyet)
                    : percentage >= 40 
                      ? '#FF9800'  // Turuncu (orta memnuniyet)
                      : '#F44336';  // Kırmızı (düşük memnuniyet)
                  
                  return (
                    <>
                      <View style={styles.satisfactionHeader}>
                        <Text style={{ fontSize: 16, fontWeight: '700', color }}>
                          %{percentage}
                        </Text>
                        <Text style={{ fontSize: 14, color: theme.colors.onSurfaceVariant }}>
                          {percentage >= 70 
                            ? "Çok İyi" 
                            : percentage >= 40 
                              ? "Orta" 
                              : "Düşük"}
                        </Text>
                      </View>
                      
                      <View style={styles.progressContainer}>
                        <View style={[styles.progressBackground, { backgroundColor: `${color}20` }]}>
                          <View 
                            style={[
                              styles.progressBar, 
                              { 
                                width: `${percentage}%`,
                                backgroundColor: color
                              }
                            ]} 
                          />
                        </View>
                      </View>
                      
                      <Text style={[styles.satisfactionNote, { color: theme.colors.onSurfaceVariant }]}>
                        Bu talebin gerçekleştirilmesi kullanıcılar tarafından değerlendirilmiştir.
                      </Text>
                    </>
                  );
                })()}
              </View>
            </Card.Content>
          </Card>
        )}
    </ScrollView>
      
      {/* Resim Görüntüleme Modalı */}
      <Modal
        animationType="fade"
        transparent={true}
        visible={imageModalVisible}
        onRequestClose={() => setImageModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <TouchableOpacity 
            style={styles.modalCloseButton}
            onPress={() => setImageModalVisible(false)}
          >
            <MaterialCommunityIcons name="close" size={28} color="#FFF" />
          </TouchableOpacity>
          {currentImage && (
            <Image
              source={{ uri: currentImage }}
              style={styles.modalImage}
              contentFit="contain"
            />
          )}
        </View>
      </Modal>
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
    paddingVertical: 12,
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
  imageCard: {
    marginBottom: 20,
    borderRadius: 16,
    overflow: 'hidden',
  },
  image: {
    height: 220,
    borderRadius: 16,
  },
  completedImage: {
    height: 220,
    borderRadius: 12,
    width: '100%',
  },
  titleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    flex: 1,
    marginRight: 16,
  },
  statusBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: 110,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
  },
  statusText: {
    color: 'white',
    fontWeight: '700',
    fontSize: 13,
    textAlign: 'center',
  },
  metaContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 20,
  },
  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 16,
    marginBottom: 8,
  },
  metaText: {
    fontSize: 14,
    marginLeft: 6,
  },
  divider: {
    marginBottom: 20,
  },
  contentCard: {
    borderRadius: 16,
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 8,
  },
  sectionContent: {
    fontSize: 16,
    lineHeight: 24,
  },
  completedHeaderContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.9)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalImage: {
    width: width,
    height: width,
  },
  modalCloseButton: {
    position: 'absolute',
    top: 40,
    right: 20,
    zIndex: 10,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    borderRadius: 20,
    padding: 5,
  },
  satisfactionContainer: {
    marginTop: 4,
  },
  satisfactionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  progressContainer: {
    marginBottom: 12,
  },
  progressBackground: {
    height: 12,
    borderRadius: 6,
    width: '100%',
    overflow: 'hidden',
  },
  progressBar: {
    height: '100%',
    borderRadius: 6,
  },
  satisfactionNote: {
    fontSize: 13,
    fontStyle: 'italic',
  },
});