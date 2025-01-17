import React from '@vitejs/plugin-react';
import { ConfigEnv, defineConfig, loadEnv } from 'vite';
import Svgr from 'vite-plugin-svgr';
import ConfigPaths from 'vite-tsconfig-paths';

const config = ({ mode }: ConfigEnv): ReturnType<typeof defineConfig> => {
  const { VITE_APP_DEVELOPMENT_PORT } = loadEnv(mode, process.cwd());

  return defineConfig({
    plugins: [React(), Svgr(), ConfigPaths()],
    server: {
      port: Number(VITE_APP_DEVELOPMENT_PORT),
    },
    build: {
      sourcemap: true,
    },
  });
};

export default config;
