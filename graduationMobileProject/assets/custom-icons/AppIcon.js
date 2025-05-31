import React from 'react';
import { Image, StyleSheet, View } from 'react-native';
import Svg, { Circle, G, Path } from 'react-native-svg';

// İki farklı icon tipi: SVG veya resim dosyası
const ICON_TYPE = {
  SVG: 'svg',
  IMAGE: 'image'
};

// Hangi tip iconu kullanmak istediğinizi burada belirtin
const CURRENT_ICON = ICON_TYPE.SVG;

// Icon resmi kullanmak istiyorsanız resmin yolunu burada belirtin
const ICON_IMAGE_PATH = require('../images/icon.png');

export default function AppIcon({ size = 1024, color = "#6750A4" }) {
  if (CURRENT_ICON === ICON_TYPE.IMAGE) {
    // Resim dosyası kullanarak icon
    return (
      <View style={[styles.container, { width: size, height: size }]}>
        <Image 
          source={ICON_IMAGE_PATH} 
          style={{ width: size, height: size, borderRadius: size / 2 }}
          resizeMode="cover"
        />
      </View>
    );
  } else {
    // SVG kullanarak icon (varsayılan)
    return (
      <View style={[styles.container, { width: size, height: size }]}>
        <Svg width={size} height={size} viewBox="0 0 1024 1024">
          {/* Daire arkaplan */}
          <Circle cx="512" cy="512" r="512" fill={color} />
          
          {/* Kendi SVG içeriğinizi buraya ekleyin */}
          <G fill="#FFFFFF" transform="translate(200, 200) scale(0.6)">
            {/* Örnek icon - bunu kendi SVG kodunuzla değiştirebilirsiniz */}
            <Path d="M512 200c-42.5 0-82.3 11.9-116.2 32.6-33.8 20.6-60.3 50.2-76.4 85.4-16.1 35.3-20.5 74.5-12.3 112.2 8.1 37.7 27.8 72.2 56.6 99.2 28.8 26.9 65.3 44.5 104.5 50.2 39.2 5.8 79.5-1.2 115.4-19.9 35.9-18.7 65.3-48.1 84.2-84 18.9-35.9 24.7-76.6 16.6-116-10.9-53.2-44.2-100.1-91.2-128.4-27.1-16.3-58.5-25.2-90.6-25.2-24.5 0-48.6 5-71.2 14.8" />
            <Path d="M384 675v-225c0-11 9-20 20-20h216c11 0 20 9 20 20v225c0 11-9 20-20 20h-216c-11 0-20-9-20-20z M455 520h125v-50h-125v50z M455 600h125v-50h-125v50z" />
          </G>
        </Svg>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    aspectRatio: 1,
  },
}); 