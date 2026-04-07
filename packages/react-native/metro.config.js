const { getDefaultConfig } = require('expo/metro-config');
const path = require('path');

const projectRoot = __dirname;
const monorepoRoot = path.resolve(projectRoot, '../..');

const config = getDefaultConfig(projectRoot);

// Watch all packages in the monorepo
config.watchFolders = [monorepoRoot];

// Force react/react-native to always resolve from this package by pretending
// the import originates from within projectRoot. This prevents bun's .bun
// cache symlinks from pulling in a different React copy.
const PINNED = new Set(['react', 'react-dom', 'react-native']);
config.resolver.resolveRequest = (context, moduleName, platform) => {
  if (PINNED.has(moduleName)) {
    return context.resolveRequest(
      { ...context, originModulePath: path.join(projectRoot, 'package.json') },
      moduleName,
      platform,
    );
  }
  return context.resolveRequest(context, moduleName, platform);
};

module.exports = config;
