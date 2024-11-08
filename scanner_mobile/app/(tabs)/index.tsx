import { View, Text, StyleSheet, SafeAreaView, Pressable, Alert } from 'react-native';
import { Link, Stack } from 'expo-router';
import { useCameraPermissions } from 'expo-camera';

export default function Home() {
  const [permission, requestPermission] = useCameraPermissions();

  const isPermissionGranted = Boolean(permission?.granted);
  const canAskAgain = Boolean(permission?.canAskAgain);

  const handleRequestPermission = async () => {
    if (canAskAgain) {
      const { status } = await requestPermission();
      if (status !== 'granted') {
        Alert.alert(
          'Permission Denied',
          'Camera permission was denied. Please enable it in settings.',
          [{ text: 'OK' }]
        );
      }
    } else {
      Alert.alert(
        'Permission Denied',
        'Camera permission was denied. Please enable it in settings.',
        [{ text: 'OK' }]
      );
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Stack.Screen options={{ title: 'Home', headerShown: false }} />
      <Text style={styles.title}>QR Code Scanner</Text>
      <View style={{ gap: 20 }}>
        <Pressable onPress={handleRequestPermission}>
          <Text style={styles.buttonStyle}>
            Request Permissions {isPermissionGranted ? '✅' : '❌'}
          </Text>
        </Pressable>
        <Link href={'/scanner'} asChild>
          <Pressable disabled={!isPermissionGranted}>
            <Text style={[styles.buttonStyle, { opacity: !isPermissionGranted ? 0.5 : 1 }]}>
              Scan Code
            </Text>
          </Pressable>
        </Link>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-around',
    paddingVertical: 80,
  },
  title: {
    fontSize: 40,
  },
  buttonStyle: {
    color: '#0E7AFE',
    fontSize: 20,
    textAlign: 'center',
  },
});
