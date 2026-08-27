import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.coreacademico.app',
  appName: 'Core Académico',
  webDir: '.',
  bundledWebRuntime: false,
  android: {
    backgroundColor: '#f4f5f8'
  }
};

export default config;
