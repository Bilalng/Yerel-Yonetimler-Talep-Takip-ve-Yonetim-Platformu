import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useFocusEffect } from "@react-navigation/native";
import axios from "axios";
import { usePathname, useRouter } from "expo-router";
import React, { useState } from "react";
import {
  Dimensions,
  Image,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import {
  ALERT_TYPE,
  AlertNotificationRoot,
  Toast,
} from "react-native-alert-notification";
import { TextInput, useTheme } from "react-native-paper";
import { useAuth } from "../../hooks/useAuth";

const router = useRouter();

export default function index() {
  const pathname = usePathname();
  const theme = useTheme();
  const [visible, setVisible] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useAuth();
  const [showPassword, setShowPassword] = useState(false);

  const windowHeight = Dimensions.get("window").height;
  const statusBarHeight = StatusBar.currentHeight || 0;
  const modalTopPosition = windowHeight * 0.24;

  const handleLogin = async (email: string, password: string) => {
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    if (!email || !emailRegex.test(email)) {
      Toast.show({
        type: ALERT_TYPE.WARNING,
        title: "Uyarı",
        textBody: "Lütfen geçerli bir e-posta adresi girin.",
      });
      return;
    }

    if (!password || password.length < 6) {
      Toast.show({
        type: ALERT_TYPE.WARNING,
        title: "Uyarı",
        textBody: "Parolanız en az 6 karakter uzunluğunda olmalıdır.",
      });
      return;
    }

    try {
      const response = await axios.post(
        "http://192.168.91.122:8000/api/auth/login",
        {
          email: email,
          password: password,
        }
      );

      const token = response.data.token;
      if (token) {
        await login(token);
        router.replace("/(tabs)");
      } else {
        Toast.show({
          type: ALERT_TYPE.WARNING,
          title: "Uyarı",
          textBody: "E-posta veya parola hatalı.",
        });
      }
    } catch (error) {
      if (error.response && error.response.status === 401) {
        Toast.show({
          type: ALERT_TYPE.WARNING,
          title: "Uyarı",
          textBody: "E-posta veya parola hatalı.",
        });
      } else {
        Toast.show({
          type: ALERT_TYPE.WARNING,
          title: "Bir hata oluştu",
          textBody: "Lütfen tekrar deneyin.",
        });
      }
    }
  };

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  useFocusEffect(
    React.useCallback(() => {
      setVisible(true);
    }, [])
  );
  return (
    <AlertNotificationRoot>
      <ScrollView
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={[styles.scrollContainer]}
      >
        <View
          style={[
            styles.container,
            { backgroundColor: theme.colors.background },
          ]}
        >
          <View style={styles.gridContainer}>
            <View style={styles.logoContainer}>
              <Image
                source={require("../../assets/images/test-logo.png")}
                style={styles.imageLogo}
              />
            </View>
            <View style={styles.column}>
              <TextInput
                label="E-Mail"
                mode="outlined"
                selectionColor={theme.colors.inverseOnSurface}
                cursorColor={theme.colors.inverseOnSurface}
                activeOutlineColor={theme.colors.inverseSurface}
                outlineColor={theme.colors.inverseOnSurface}
                style={{ backgroundColor: theme.colors.surface }}
                textColor={theme.colors.onBackground}
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
              />
            </View>
            <View style={styles.column}>
              <TextInput
                label="Password"
                mode="outlined"
                selectionColor={theme.colors.inverseOnSurface}
                cursorColor={theme.colors.inverseOnSurface}
                outlineColor={theme.colors.inverseOnSurface}
                activeOutlineColor={theme.colors.inverseSurface}
                textColor={theme.colors.onBackground}
                style={{ backgroundColor: theme.colors.surface }}
                value={password}
                secureTextEntry={!showPassword}
                onChangeText={setPassword}
              />
            </View>
          </View>
          <MaterialCommunityIcons
            name={showPassword ? "eye-off" : "eye"}
            size={24}
            color="#aaa"
            style={styles.icon}
            onPress={toggleShowPassword}
          />

          <TouchableOpacity
            style={[
              styles.signUpButton,
              styles.disabledButton,
              { backgroundColor: theme.colors.onBackground },
            ]}
            onPress={() => handleLogin(email, password)}
           
          >
            <Text
              style={[
                styles.signUpButtonText,
                {
                  color: theme.colors.background,
                },
              ]}
            >
             Giriş Yap
            </Text>
          </TouchableOpacity>

          <View>
            <TouchableOpacity
              style={styles.loginLinkContainer}
              onPress={() => router.replace("/SignUp")}
            >
              <Text
                style={[
                  styles.loginLinkText,
                  {
                    color: theme.colors.onBackground,
                  },
                ]}
              >
                Hesabınız Yoksa ? <Text style={styles.loginLink}>Kayıt Ol</Text>
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </AlertNotificationRoot>
  );
}

const styles = StyleSheet.create({
  signUpButtonText: {
    fontSize: 18,
    fontWeight: "bold",
  },
  signUpButton: {
    borderRadius: 10,
    width: "60%",
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
  },
  disabledButton: {},
  buttonContainer: {
    flexDirection: "column",
    marginTop: 20,
    gap: 10,
  },
  button: {
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
  },
  buttonText: {
    fontWeight: "600",
  },
  scrollContainer: {
    flexGrow: 1,
  },
  container: {
    flex: 1,
    paddingHorizontal: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  logoContainer: {
    alignItems: "center",
    marginBottom: 20,
  },
  imageLogo: {
    width: 150,
    height: 150,
  },
  contentContainer: {
    flex: 1,
    justifyContent: "center",
    borderRadius: 30,
  },
  gridContainer: {
    width: "100%",
    maxWidth: 400,
    flexDirection: "column",
    alignItems: "center",
  },
  column: {
    width: "100%",
    maxWidth: 350,
    marginVertical: 10,
  },
  subtitle: {
    fontSize: 16,
    fontWeight: "400",
    marginBottom: 50,
    textAlign: "center",
  },
  icon: {
    alignSelf: "flex-start",
  },
  loginLinkContainer: {
    marginTop: 20,
    marginBottom: 30,
  },
  loginLinkText: {
    fontSize: 14,
  },
  loginLink: {
    fontWeight: "bold",
  },
});
