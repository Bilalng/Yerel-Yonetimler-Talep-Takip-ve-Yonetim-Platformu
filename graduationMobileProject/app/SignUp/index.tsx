import axios from "axios";
import { useRouter } from "expo-router";
import React, { useRef, useState } from "react";
import {
  Dimensions,
  Image,
  ScrollView,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
  View
} from "react-native";
import {
  ALERT_TYPE,
  AlertNotificationRoot,
  Toast
} from "react-native-alert-notification";
import { Text, TextInput, useTheme } from "react-native-paper";
import PhoneInput from "react-native-phone-number-input";
import { useAuth } from "../../hooks/useAuth";

export default function index() {
  const PhoneInputComponent = PhoneInput as any;
  const router = useRouter();
  const theme = useTheme();
  const [tc, setTc] = useState("");
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const [focusedInput, setFocusedInput] = useState<string | null>(null);
  const phoneInput = useRef<PhoneInput>(null);
  const [formattedValue, setFormattedValue] = useState("");

  const windowHeight = Dimensions.get("window").height;
  const statusBarHeight = StatusBar.currentHeight || 0;
  const modalTopPosition = windowHeight * 0.24;

  const handleSignUp = async () => {
    if (!tc || !name || !surname || !email || !phone || !password) {
      Toast.show({
        type: ALERT_TYPE.DANGER,
        title: "Hata",
        textBody: "Lütfen tüm alanları dooldurunuz",
      });

     return;
    }

    if (password !== confirmPassword) {
      Toast.show({
        type: ALERT_TYPE.WARNING,
        title: 'Uyarı',
        textBody: 'Parolalar eşleşmiyor.',
      });
      return;
    }

    if (tc.length !== 11) {
      Toast.show({
        type: ALERT_TYPE.WARNING,
        title: 'Geçersiz TC',
        textBody: 'T.C. Kimlik No 11 haneli olmalıdır.',
      });
      return;
    }

    setLoading(true);

    try {
      const response = await axios.post(
        "http://192.168.91.122:8000/api/auth/register",
        {
          tc: tc,
          name: name,
          surname: surname,
          email: email,
          phone: phone,
          password: password,
        }
      );

      const token = response.data.token;
      if (token) {
        await login(token);
        router.replace("/Login");
      } else {
        setTimeout(() => {
          Toast.show({
            type: ALERT_TYPE.SUCCESS,
            title: 'Kayıt Başarılı',
            textBody: 'Başarıyla giriş yaptınız.',
          });
        }, 200);
      }
    } catch (error: any) {
      console.error("Kayıt Hatası:", error);

      const errorMessage =
        error.response?.data?.message ||
        "Kayıt işlemi sırasında bir hata oluştu. Lütfen tekrar deneyin.";

        setTimeout(() => {
          Toast.show({
            type: ALERT_TYPE.DANGER,
            title: 'Kayıt Hatası',
            textBody: errorMessage,
          });
        }, 200);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AlertNotificationRoot>
      <ScrollView
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={[
          styles.scrollContainer,
          {
            backgroundColor: theme.colors.background,
          },
        ]}
      >
        <View style={styles.container}>
          <View style={styles.logoContainer}>
            <Image
              source={require("../../assets/images/test-logo.png")}
              style={styles.logo}
            />
          </View>

          <View
            style={[
              styles.inputContainer,
              styles.fullWidthInput,
              focusedInput === "tc" && styles.inputContainerFocused,
            ]}
          >
            <TextInput
              mode="outlined"
              style={[styles.input, { backgroundColor: theme.colors.surface }]}
              selectionColor={theme.colors.inverseOnSurface}
              cursorColor={theme.colors.inverseOnSurface}
              activeOutlineColor={theme.colors.inverseSurface}
              outlineColor={theme.colors.inverseOnSurface}
              textColor={theme.colors.onBackground}
              placeholder="T.C Kimlik No"
              keyboardType="numeric"
              maxLength={11}
              value={tc}
              onChangeText={setTc}
              onFocus={() => setFocusedInput("tc")}
              onBlur={() => setFocusedInput(null)}
            />
          </View>

          <View style={styles.rowContainer}>
            <View
              style={[
                styles.inputContainer,
                styles.halfWidthInput,
                focusedInput === "name" && styles.inputContainerFocused,
              ]}
            >
              <TextInput
                mode="outlined"
                style={[
                  styles.input,
                  { backgroundColor: theme.colors.surface },
                ]}
                selectionColor={theme.colors.inverseOnSurface}
                cursorColor={theme.colors.inverseOnSurface}
                activeOutlineColor={theme.colors.inverseSurface}
                outlineColor={theme.colors.inverseOnSurface}
                textColor={theme.colors.onBackground}
                placeholder="İsim"
                value={name}
                onChangeText={setName}
                onFocus={() => setFocusedInput("name")}
                onBlur={() => setFocusedInput(null)}
              />
            </View>

            <View
              style={[
                styles.inputContainer,
                styles.halfWidthInput,
                focusedInput === "surname" && styles.inputContainerFocused,
              ]}
            >
              <TextInput
                mode="outlined"
                style={[
                  styles.input,
                  { backgroundColor: theme.colors.surface },
                ]}
                selectionColor={theme.colors.inverseOnSurface}
                cursorColor={theme.colors.inverseOnSurface}
                activeOutlineColor={theme.colors.inverseSurface}
                outlineColor={theme.colors.inverseOnSurface}
                textColor={theme.colors.onBackground}
                placeholder="Soyisim"
                value={surname}
                onChangeText={setSurname}
                onFocus={() => setFocusedInput("surname")}
                onBlur={() => setFocusedInput(null)}
              />
            </View>
          </View>

          <View
            style={[
              styles.inputContainer,
              styles.fullWidthInput,
              focusedInput === "email" && styles.inputContainerFocused,
            ]}
          >
            <TextInput
              mode="outlined"
              style={[styles.input, { backgroundColor: theme.colors.surface }]}
              selectionColor={theme.colors.inverseOnSurface}
              cursorColor={theme.colors.inverseOnSurface}
              activeOutlineColor={theme.colors.inverseSurface}
              outlineColor={theme.colors.inverseOnSurface}
              textColor={theme.colors.onBackground}
              placeholder="E-Mail"
              keyboardType="email-address"
              value={email}
              onChangeText={setEmail}
              onFocus={() => setFocusedInput("email")}
              onBlur={() => setFocusedInput(null)}
            />
          </View>

          {/* Özel telefon girişi */}
          <View
            style={[
              styles.phoneContainer,
              styles.inputContainer,
              styles.fullWidthInput,
              focusedInput === "phone" && styles.inputContainerFocused,
            ]}
          >
            <PhoneInputComponent
              ref={phoneInput}
              defaultValue={phone}
              defaultCode="TR"
              layout="first"
              onChangeText={(phone) => {
                setPhone(phone);
              }}
              onChangeFormattedText={(phone) => {
                setFormattedValue(phone);
              }}
              textContainerStyle={{
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: theme.colors.background,
                color: theme.colors.onBackground,
              }}
              textInputStyle={{
                height: 56,
                fontSize: 16,
                color: theme.colors.onBackground,
              }}
              containerStyle={{
                backgroundColor: theme.colors.background,
                borderWidth: 1,
                borderColor: theme.colors.inverseOnSurface,
                borderRadius: 4,
                height: 56,
                width: "100%",
              }}
              textInputProps={{
                placeholderTextColor: theme.colors.onBackground,
              }}
              flagButtonStyle={{ color: theme.colors.onBackground }}
              codeTextStyle={{ color: theme.colors.onBackground }}
            />
          </View>

          <View
            style={[
              styles.inputContainer,
              styles.fullWidthInput,
              focusedInput === "password" && styles.inputContainerFocused,
            ]}
          >
            <TextInput
              mode="outlined"
              style={[styles.input, { backgroundColor: theme.colors.surface }]}
              selectionColor={theme.colors.inverseOnSurface}
              cursorColor={theme.colors.inverseOnSurface}
              activeOutlineColor={theme.colors.inverseSurface}
              outlineColor={theme.colors.inverseOnSurface}
              textColor={theme.colors.onBackground}
              placeholder="Parola"
              secureTextEntry
              value={password}
              onChangeText={setPassword}
              onFocus={() => setFocusedInput("password")}
              onBlur={() => setFocusedInput(null)}
            />
          </View>

          <View
            style={[
              styles.inputContainer,
              styles.fullWidthInput,
              focusedInput === "confirmPassword" &&
                styles.inputContainerFocused,
            ]}
          >
            <TextInput
              mode="outlined"
              style={[styles.input, { backgroundColor: theme.colors.surface }]}
              selectionColor={theme.colors.inverseOnSurface}
              cursorColor={theme.colors.inverseOnSurface}
              activeOutlineColor={theme.colors.inverseSurface}
              outlineColor={theme.colors.inverseOnSurface}
              textColor={theme.colors.onBackground}
              placeholder="Parola Tekrar"
              secureTextEntry
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              onFocus={() => setFocusedInput("confirmPassword")}
              onBlur={() => setFocusedInput(null)}
            />
          </View>

          <TouchableOpacity
            style={[
              styles.signUpButton,
              loading && styles.disabledButton,
              { backgroundColor: theme.colors.onBackground },
            ]}
            onPress={handleSignUp}
            disabled={loading}
          >
            <Text
              style={[
                styles.signUpButtonText,
                {
                  color: theme.colors.background,
                },
              ]}
            >
              {loading ? "Kaydediliyor..." : "Kayıt Ol"}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.loginLinkContainer}
            onPress={() => router.replace("/Login")}
          >
            <Text
              style={[
                styles.loginLinkText,
                {
                  color: theme.colors.onBackground,
                },
              ]}
            >
              Zaten hesabınız var mı?{" "}
              <Text style={styles.loginLink}>Giriş Yap</Text>
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </AlertNotificationRoot>
  );
}
const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
  },
  container: {
    flex: 1,
    padding: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  logoContainer: {
    alignItems: "center",
    marginBottom: 20,
  },
  logo: {
    width: 150,
    height: 150,
    resizeMode: "contain",
  },
  rowContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
  inputContainer: {
    borderRadius: 5,
    marginVertical: 8,
    overflow: "hidden",
  },
  inputContainerFocused: {},
  fullWidthInput: {
    width: "100%",
  },
  halfWidthInput: {
    width: "48%",
  },
  input: {
    height: 50,
    paddingHorizontal: 15,
    fontSize: 16,
  },
  phoneContainer: {},
  phoneInputField: {
    flex: 1,
    height: 50,
    paddingHorizontal: 15,
    fontSize: 16,
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
  signUpButtonText: {
    fontSize: 18,
    fontWeight: "bold",
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
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  phoneInput: {
    padding: 10,
    borderRadius: 8,
    borderWidth: 1,
  },
  validationText: {
    marginTop: 10,
    fontWeight: "500",
  },
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
});
