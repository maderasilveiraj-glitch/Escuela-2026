import type { CapacitorConfig } from "@capacitor/cli";

const config: CapacitorConfig = {
  appId: "com.coreacademico.app",
  appName: "Core Académico",
  webDir: "www",
  bundledWebRuntime: false,
  server: {
    androidScheme: "https"
  }
};

export default config;
