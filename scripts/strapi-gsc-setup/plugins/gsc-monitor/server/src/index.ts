/**
 * GSC Monitor Plugin - Server Entry
 * Provides admin API routes for the dashboard
 */

export default {
  register() {},
  bootstrap() {},
  controllers: {
    analytics: ({ strapi }: { strapi: any }) => ({
      async getDashboardData(ctx: any) {
        try {
          const articles = await strapi.documents('api::article-analytic.article-analytic').findMany({
            sort: { clicks_28d: 'desc' },
            limit: 200,
          });

          const queries = await strapi.documents('api::gsc-top-query.gsc-top-query').findMany({
            sort: { clicks: 'desc' },
            limit: 100,
          });

          const logs = await strapi.documents('api::gsc-monitoring-log.gsc-monitoring-log').findMany({
            sort: { createdAt: 'desc' },
            limit: 20,
          });

          ctx.body = {
            articles: articles || [],
            queries: queries || [],
            logs: logs || [],
          };
        } catch (error: any) {
          ctx.status = 500;
          ctx.body = { error: error.message || 'Failed to fetch dashboard data' };
        }
      },
    }),
  },
  routes: {
    admin: {
      type: 'admin',
      routes: [
        {
          method: 'GET',
          path: '/dashboard-data',
          handler: 'analytics.getDashboardData',
          config: {
            policies: [],
          },
        },
      ],
    },
  },
};
