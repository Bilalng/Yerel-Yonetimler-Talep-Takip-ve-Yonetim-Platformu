import { MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";
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
  View,
} from "react-native";
import { Card, useTheme } from "react-native-paper";
import { Colors } from "../../constants/Colors";
import { useAuth } from "../../hooks/useAuth";

// API base URL
const API_BASE_URL = "http://192.168.91.122:8000";

interface Post {
  id: number;
  user_id: number;
  service_id: number;
  status_id: number;
  title: string;
  description: string;
  photo: string;
  created_at: string;
  service?: {
    title: string;
  };
  status?: {
    title: string;
    id?: number;
  };
  verify?: Array<{
    id: number;
    complaint_id: number;
    reason_for_refuse: string | null;
    reason_for_verify: string | null;
    created_at: string;
    updated_at: string;
  }>;
}

export default function RejectionComplaint() {
  const router = useRouter();
  const theme = useTheme();
  const { isAuthenticated, loading, token } = useAuth();
  const [data, setData] = useState<Post[]>([]);
  const [error, setError] = useState(null);
  const [refreshing, setRefreshing] = useState(false);
  
  const colors = Colors[theme.dark ? 'dark' : 'light'];

  const fetchData = async () => {
    try {
      const response = await axios.get(
        `${API_BASE_URL}/api/getRejectedComplaint`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      
      let complaints = [];
      
      if (response.data && Array.isArray(response.data["Reddedilen Talepler"])) {
        complaints = response.data["Reddedilen Talepler"];
      } else if (response.data && Array.isArray(response.data.RejectedComplaints)) {
        complaints = response.data.RejectedComplaints;
      } else if (response.data && Array.isArray(response.data["Reddedilen Şikayetler"])) {
        complaints = response.data["Reddedilen Şikayetler"];
      } else {
        complaints = [];
      }
      
      // Status bilgisini işle
      const processedComplaints = complaints.map((complaint: Post) => {
        // API'den gelen verilerde status bir ID referansı olabilir, gerçek bir nesne olmayabilir
        if (complaint.status_id && !complaint.status) {
          // Status objesi yoksa ama status_id varsa, bir status objesi oluştur
          complaint.status = { title: "Reddedildi", id: complaint.status_id };
        }
        
        return complaint;
      });
      
      setData(processedComplaints);
      return true;
    } catch (err) {
      console.error("API Error:", err);
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

  const handleCardPress = (item: Post) => {
    router.push({
      pathname: "/Talep/talepDetails",
      params: {
        title: item.title,
        description: item.description,
        photo: item.photo,
        service: item.service?.title || "—",
        status: item.status?.title || "—",
        created_at: item.created_at,
        // Verify dizisinin en son elemanını al, çünkü birden fazla verify kaydı olabilir
        reason_for_refuse: item.verify && item.verify.length > 0 
          ? item.verify[item.verify.length - 1].reason_for_refuse 
          : null
      },
    });
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
        Reddedilen Talepler
      </Text>
      <View style={{ width: 40 }} />
    </View>
  );

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
          {(error as Error).message}
        </Text>
        <TouchableOpacity
          style={[styles.retryButton, { backgroundColor: colors.primary }]}
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
    <SafeAreaView style={[styles.safeArea, { backgroundColor: colors.background }]}>
      {renderHeader()}

      <FlatList
        data={data}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.listContent}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <MaterialIcons name="error" size={64} color={colors.outlineVariant} />
            <Text style={[styles.emptyText, { color: colors.outlineVariant }]}>
              Reddedilmiş talep bulunmamaktadır
            </Text>
          </View>
        }
        renderItem={({ item }) => (
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => handleCardPress(item)}
            style={styles.cardWrapper}
          >
            <Card
              style={[
                styles.card,
                {
                  backgroundColor: colors.surface,
                  borderLeftColor: "#F44336",
                },
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
                    backgroundColor: "rgba(244, 67, 54, 0.12)",
                    alignItems: "center",
                    justifyContent: "center",
                    minWidth: 90,
                    borderWidth: 1,
                    borderColor: "rgba(244, 67, 54, 0.4)",
                  }}
                >
                  <Text
                    style={{
                      fontSize: 12,
                      fontWeight: "600",
                      color: "#F44336",
                      textAlign: "center",
                    }}
                  >
                    Reddedildi
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
                
                {/* En son verify kaydındaki reddedilme sebebini göster */}
                {item.verify && item.verify.length > 0 && (() => {
                  // En son verify kaydını al
                  const lastVerify = item.verify[item.verify.length - 1];
                  
                  if (lastVerify.reason_for_refuse) {
                    return (
                      <View style={[styles.rejectInfoContainer, { borderColor: "rgba(244, 67, 54, 0.4)" }]}>
                        <Text style={[styles.rejectInfoTitle, { color: "#F44336" }]}>
                          Reddedilme Sebebi:
                        </Text>
                        <Text
                          style={[styles.rejectInfoText, { color: colors.onSurfaceVariant }]}
                          numberOfLines={2}
                        >
                          {lastVerify.reason_for_refuse}
                        </Text>
                      </View>
                    );
                  }
                  return null;
                })()}
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
                    style={[
                      styles.footerText,
                      { color: colors.onSurfaceVariant },
                    ]}
                  >
                    {new Date(item.created_at).toLocaleDateString()}
                  </Text>
                </View>
              </View>
            </Card>
          </TouchableOpacity>
        )}
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
  cardWrapper: {
    marginBottom: 16,
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
  cardBody: {
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
  descriptionText: {
    fontSize: 14,
    lineHeight: 22,
    marginBottom: 12,
  },
  rejectInfoContainer: {
    marginTop: 8,
    padding: 12,
    borderWidth: 1,
    borderRadius: 8,
    backgroundColor: 'rgba(244, 67, 54, 0.12)',
  },
  rejectInfoTitle: {
    fontSize: 14,
    fontWeight: "600",
    marginBottom: 6,
  },
  rejectInfoText: {
    fontSize: 13,
    lineHeight: 20,
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
});