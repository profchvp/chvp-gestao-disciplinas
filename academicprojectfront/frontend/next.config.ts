import type { NextConfig } from "next";


import { Configuration } from 'webpack'; // Importa o tipo do Webpack

const nextConfig = {
    webpack(config: Configuration) {
        config.module?.rules?.push({
            test: /\.svg$/,
            use: ['@svgr/webpack'],
        });
        return config;
    },
};

export default nextConfig;
