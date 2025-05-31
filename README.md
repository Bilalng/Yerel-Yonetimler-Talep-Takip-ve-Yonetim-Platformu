# Mezuniyet Projesi – Laravel + React Native Uygulaması

Bu proje, Laravel tabanlı bir **back-end** ve React Native tabanlı bir **mobil uygulama** içermektedir. Amaç, belediye süreçlerini dijitalleştiren bir otomasyon sistemidir.

---

## Proje Yapısı

- graduationproject → Laravel Back-End
- graduationMobileProject → React Native Mobile Uygulama
- raduationproject.sql → SQL 

---

## Gereksinimler

### Laravel (Back-End)

- PHP >= 8.2
- Laravel >= 11
- Filament >= 3.2
- Composer
- Node.js & NPM
- MySQL 

### React Native (Mobil)

- Node.js & NPM
- Expo CLI
- Gerekli mobil bağımlılıklar

---

## Kurulum ve Çalıştırma

### 1. Laravel Back-End

Terminalde graduationProjectBackend dizinine girin:

```bash

git clone https://github.com/Bilalng/Yerel-Yonetimler-Talep-Takip-ve-Yonetim-Platformu.git

cd graduationProjectBackend

```

Gerekli bağımlılıkları yükleyin:

```bash

composer install
npm install

```

Projeyi çalıştırabilmek için `.env` dosyanızı kendi ortamınıza uygun şekilde yapılandırmanız gerekiyor.

```bash

cp .env.example .env
php artisan key:generate

```
.env dosyası yapılandırma.

```bash

---
APP_LOCALE=tr
APP_FALLBACK_LOCALE=tr_TR
APP_FAKER_LOCALE=tr_Tr
---
```
Linux İçin
```
ip addr show
```
Windows İçin
Başlat Menüsü → cmd yazıp Komut İstemi’ni açın.
```
ipconfig
IPv4 Address = .........
```
APP_URL alanını, uygulamanızı çalıştıracağınız makinenin IP adresi veya domain adı ile değiştirin. Örneğin:
```
---
APP_URL=http://<IP_ADRESİNİZ>:8000
---
```
Uygulamayı başlatın:

```bash

php artisan optimize

php artisan serve --host=0.0.0.0 --port=8000

```
Ayrı bir terminalde frontend (Filament, vs.) assetlerini derleyin:

```bash

npm run dev
# veya production için
npm run build

```

### 2. React Native Mobile Uygulama

Terminalde mobil dizine girin:

```bash

cd graduationMobileProject

```
Bağımlılıkları yükleyin:

```bash

npm install

```
Uygulamayı çalıştırın (Expo örneği):

```bash

npx expo start

```

### Notlar

node_modules ve vendor klasörleri versiyon kontrolüne dahil edilmemiştir. Projeyi klonladıktan sonra yukarıdaki adımlarla bağımlılıkları yüklemeniz gerekir.

.env dosyası paylaşılmadığı için local .env ayarlarını kendiniz yapmalısınız.

Laravel'de Jetstream yerine Fortify ve Filament admin paneli kullanılmaktadır.


## Ekran Görüntüleri

![Ekran Görüntüsü 1](graduationMobileProject/assets/images/KullanıcıWelcome.png)

![Ekran Görüntüsü 2](graduationMobileProject/assets/images/KullanıcıTalep.png)

![Ekran Görüntüsü 3](graduationMobileProject/assets/images/talepDeğerlendirmeAdmin.png)

![Ekran Görüntüsü 4](graduationMobileProject/assets/images/istatistik.png)

![Ekran Görüntüsü 5](graduationMobileProject/assets/images/AndroidTaleplerim.jpeg)

![Ekran Görüntüsü 6](graduationMobileProject/assets/images/androidOnaylananTaleple.jpeg)













