import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.futbolligas.app',
  appName: 'Clasificacion Ligas',
  webDir: 'www',
  android: {
    adjustMarginsForEdgeToEdge: 'force',
  },
  plugins: {
    CapacitorHttp: {
      enabled: true,
    },
  },
};

export default config;
