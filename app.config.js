import 'dotenv/config'

export default {
  expo: {
    name: 'go-dutch-2025',
    slug: 'go-dutch-2025',
    version: '1.0.0',
    orientation: 'portrait',
    icon: './assets/splash-icon.png',
    userInterfaceStyle: 'light',
    newArchEnabled: true,
    splash: {
      image: './assets/splash-screen.png', // or your splash image
      resizeMode: 'contain', // or "cover"
      backgroundColor: '#000000', // make this match your splash screen bg
    },
    ios: {
      supportsTablet: true,
      bundleIdentifier: 'com.theobreaux.godutch2025',
      icon: './assets/splash-icon.png',
    },
    android: {
      adaptiveIcon: {
        foregroundImage: './assets/adaptive-icon.png',
        backgroundColor: '#000000',
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
      VERYFI_CLIENT_ID: process.env.VERYFI_CLIENT_ID,
      VERYFI_ID: process.env.VERYFI_ID,
    },
    owner: 'theobreaux',
    plugins: [
      [
        'expo-image-picker',
        {
          photosPermission: 'The app accesses your photos to let you share them with your friends.',
        },
      ],
      [
        'expo-camera',
        {
          cameraPermission: 'Allow $(PRODUCT_NAME) to access your camera',
          microphonePermission: 'Allow $(PRODUCT_NAME) to access your microphone',
          recordAudioAndroid: true,
        },
      ],
      [
        'expo-splash-screen',
        {
          preventAutoHide: true,
        },
      ],
    ],
  },
}
