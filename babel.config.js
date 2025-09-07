module.exports = function(api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      // Enable reanimated plugin
      'react-native-reanimated/plugin',
      // Support module resolution with @ alias
      [
        'module-resolver',
        {
          root: ['./'],
          alias: {
            '@': './',
            '@components': './components',
            '@services': './services',
            '@config': './config',
            '@hooks': './hooks',
            '@constants': './constants',
          },
        },
      ],
    ],
  };
};