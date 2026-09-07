import { PLUGIN_ID } from './pluginId';
import { ChartBubble } from '@strapi/icons';

export default {
  register(app: any) {
    app.addMenuLink({
      to: `plugins/${PLUGIN_ID}`,
      icon: ChartBubble,
      intlLabel: {
        id: `${PLUGIN_ID}.plugin.name`,
        defaultMessage: 'GSC Monitor',
      },
      Component: async () => {
        const { Dashboard } = await import('./pages/Dashboard');
        return Dashboard;
      },
      permissions: [],
      position: 5,
    });
  },

  async registerTrads({ locales }: { locales: string[] }) {
    return locales.map((locale: string) => ({
      data: {},
      locale,
    }));
  },

  bootstrap() {},
};
