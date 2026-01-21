const { spawn } = require('child_process');
const { runHealthCheck } = require('./comprehensive-health-check');

console.log('🚀 Starting CBI Backend Server with validation...\n');

async function startServer() {
  // Run health check first
  console.log('Running pre-startup health check...\n');
  
  const healthResult = await runHealthCheck();
  
  if (healthResult.status === 'unhealthy') {
    console.error('\n❌ Critical errors detected. Please fix before starting server.');
    process.exit(1);
  }
  
  if (healthResult.errors.length === 0 && healthResult.warnings.length === 0) {
    console.log('\n✅ All checks passed! Starting server...\n');
  } else {
    console.log('\n⚠️  Server starting with warnings. Review above for details.\n');
  }
  
  // Start the server
  const server = spawn('node', ['server.js'], {
    stdio: 'inherit',
    shell: true
  });
  
  server.on('error', (error) => {
    console.error('Failed to start server:', error);
    process.exit(1);
  });
  
  server.on('exit', (code) => {
    if (code !== 0) {
      console.error(`Server exited with code ${code}`);
      process.exit(code);
    }
  });
}

startServer().catch((error) => {
  console.error('Startup failed:', error);
  process.exit(1);
});
