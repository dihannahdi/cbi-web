#!/bin/bash
# Create minimal Dashboard to test admin build
cat > /opt/cbi-strapi/src/plugins/gsc-monitor/admin/src/pages/Dashboard.tsx << 'EOF'
import React from 'react';
import { Box, Typography } from '@strapi/design-system';

const Dashboard = () => {
  return (
    <Box padding={8} background="neutral100">
      <Typography variant="alpha">GSC Monitor Dashboard</Typography>
      <Typography variant="omega">Dashboard is loading...</Typography>
    </Box>
  );
};

export { Dashboard };
export default Dashboard;
EOF

echo "Minimal Dashboard created ($(wc -l < /opt/cbi-strapi/src/plugins/gsc-monitor/admin/src/pages/Dashboard.tsx) lines)"

cd /opt/cbi-strapi
echo "Starting build..."
NODE_OPTIONS='--max-old-space-size=4096' npm run build > /tmp/strapi-build6.log 2>&1
EXIT=$?
echo "Build exit code: $EXIT"
echo "Build log:"
cat /tmp/strapi-build6.log
