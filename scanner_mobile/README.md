- npm i expo-camera socket.io-client
- add plugin in app.json

```base
"plugins": [
    "expo-camera",
    [
        "expo-camera",
        {
            "cameraPermission": "Allow $(PRODUCT_NAME) to access your camera",
            "microphonePermission": "Allow $(PRODUCT_NAME) to access your microphone",
            "recordAudioAndroid": true
        }
    ]
]
```

- npx expo prebuild
- npm i @shopify/react-native-skia
- src: https://www.youtube.com/watch?v=PZIEqcdFjpQ&ab_channel=Dan%27sReactNativeLab
