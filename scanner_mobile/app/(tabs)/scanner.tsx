import { BarcodeScanningResult, CameraView } from 'expo-camera';
import { Stack } from 'expo-router';
import { useEffect, useRef, useState } from 'react';
import {
  Alert,
  AppState,
  Linking,
  Platform,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { Overlay } from '~/components/Overlay';
import io from 'socket.io-client';
// const socket = io('http://localhost:3001');
const socket = io('http://192.168.2.165:3001'); // Replace with your actual local IP

export default function Home() {
  const qrLock = useRef(false);
  const [barcodeValue, setBarcodeValue] = useState<string>('');
  const appState = useRef(AppState.currentState);

  useEffect(() => {
    const subscription = AppState.addEventListener('change', (nextAppState) => {
      if (appState.current.match(/inactive|background/) && nextAppState === 'active') {
        qrLock.current = false;
      }
      appState.current = nextAppState;
    });

    return () => {
      subscription.remove();
    };
  }, []);

  // Utility function to check if a string is a valid URL
  const isValidURL = (url: string) => {
    const pattern = /^(https?:\/\/[^\s$.?#].[^\s]*)$/i;
    return pattern.test(url);
  };

  const handleBarcodeScanned = async ({ data }: BarcodeScanningResult) => {
    if (data && !qrLock.current) {
      qrLock.current = true;
      if (isValidURL(data)) {
        try {
          await Linking.openURL(data);
        } catch (error) {
          Alert.alert('Error', 'Failed to open the URL.');
        }
      } else {
        console.log(data);
        socket.emit('scan', data);
        setBarcodeValue(data);
      }
      setTimeout(() => {
        qrLock.current = false; // Reset lock after a short delay
      }, 500);
    }
  };

  return (
    <SafeAreaView style={StyleSheet.absoluteFillObject}>
      <Stack.Screen
        options={{
          title: 'Scanner',
          headerShown: false,
        }}
      />
      {Platform.OS === 'android' ? <StatusBar hidden /> : null}
      <CameraView
        style={StyleSheet.absoluteFillObject}
        facing="back"
        onBarcodeScanned={handleBarcodeScanned}
      />
      <Overlay />
      <View>
        <Text>{barcodeValue}</Text>
      </View>
    </SafeAreaView>
  );
}
