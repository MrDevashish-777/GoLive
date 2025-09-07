// Learn more https://docs.expo.io/guides/customizing-metro
const { getDefaultConfig } = require('expo/metro-config');

/** @type {import('expo/metro-config').MetroConfig} */
const config = getDefaultConfig(__dirname, {
  // Enable experimental features for SDK 53
  resolver: {
    sourceExts: ['js', 'jsx', 'json', 'ts', 'tsx', 'cjs', 'mjs'],
  },
});

// Add support for importing from outside the app directory
config.watchFolders = [__dirname];

// Add support for importing from outside the app directory
config.resolver.nodeModulesPaths = [__dirname + '/node_modules'];

module.exports = config;