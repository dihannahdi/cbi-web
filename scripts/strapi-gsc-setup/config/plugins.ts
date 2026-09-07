export default {
  upload: {
    config: {
      sizeLimit: 250 * 1024 * 1024, // 250mb
    },
  },
  i18n: {
    enabled: true,
    config: {
      defaultLocale: 'id',
      locales: ['id', 'en'],
    },
  },
  'gsc-monitor': {
    enabled: true,
    resolve: './src/plugins/gsc-monitor',
  },
};
