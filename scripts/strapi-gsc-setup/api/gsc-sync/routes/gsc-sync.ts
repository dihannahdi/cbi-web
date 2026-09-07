/**
 * GSC Sync routes
 * Custom route for receiving analytics data from Python monitoring script
 */

export default {
  routes: [
    {
      method: 'POST',
      path: '/gsc-sync/push',
      handler: 'gsc-sync.push',
      config: {
        auth: false,
      },
    },
  ],
};
