import 'dotenv/config'

export default {
  expo: {
    name: 'go-dutch-2025',
    slug: 'go-dutch-2025',
    version: '1.0.0',
    orientation: 'portrait',
    icon: './assets/icon.png',
    userInterfaceStyle: 'light',
    newArchEnabled: true,
    splash: {
      image: './assets/splash-icon.png',
      resizeMode: 'contain',
      backgroundColor: '#ffffff',
    },
    ios: {
      supportsTablet: true,
    },
    android: {
      adaptiveIcon: {
        foregroundImage: './assets/adaptive-icon.png',
        backgroundColor: '#ffffff',
      },
      package: 'com.theobreaux.godutch2025',
    },
    web: {
      favicon: './assets/favicon.png',
    },
    extra: {
      eas: {
        projectId: '02aa5aa2-442b-4f50-a0b1-8ac82f008732',
      },
      API_KEY: process.env.API_KEY,
    },
    owner: 'theobreaux',
    plugins: [
      [
        'expo-image-picker',
        {
          photosPermission: 'The app accesses your photos to let you share them with your friends.',
        },
      ],
    ],
  },
}
