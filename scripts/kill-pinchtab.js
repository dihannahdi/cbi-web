// Kill pinchtab and restart fresh, then test connection
const { execSync } = require('child_process');

try {
  console.log('Killing existing pinchtab...');
  try { execSync('taskkill /IM pinchtab-windows-amd64.exe /F', { stdio: 'pipe' }); } catch {}
  try { execSync('taskkill /IM pinchtab.exe /F', { stdio: 'pipe' }); } catch {}
  
  // Wait for processes to die
  execSync('timeout /t 3 /nobreak', { stdio: 'pipe' });
  
  console.log('Pinchtab stopped. Now restart with: pinchtab server --headed');
} catch (e) {
  console.error('Error:', e.message);
}
