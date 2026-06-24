const http = require('http');
const https = require('https');

function startKeepAlive() {
  let targetUrl = process.env.SERVER_URL || process.env.RENDER_EXTERNAL_URL;
  
  if (!targetUrl) {
    console.log('Keep-Alive: No SERVER_URL or RENDER_EXTERNAL_URL environment variables defined. Skipping periodic pings.');
    return;
  }

  targetUrl = targetUrl.trim();
  
  // Ensure the URL has a protocol
  if (!targetUrl.startsWith('http://') && !targetUrl.startsWith('https://')) {
    targetUrl = 'https://' + targetUrl;
  }

  // Construct the health endpoint URL
  let pingUrl = targetUrl;
  if (!pingUrl.includes('/api/health')) {
    pingUrl = pingUrl.endsWith('/') ? pingUrl + 'api/health' : pingUrl + '/api/health';
  }

  // Default interval: 10 minutes (600,000 ms), customizable
  const intervalMs = parseInt(process.env.KEEPALIVE_INTERVAL, 10) || 10 * 60 * 1000;

  console.log(`Keep-Alive: Started. Will ping ${pingUrl} every ${intervalMs / 1000}s`);

  // Perform initial ping after 30 seconds to allow server bootup, then repeat at interval
  setTimeout(() => {
    ping(pingUrl);
    setInterval(() => ping(pingUrl), intervalMs);
  }, 30000);
}

function ping(urlStr) {
  try {
    const client = urlStr.startsWith('https://') ? https : http;
    
    client.get(urlStr, (res) => {
      let data = '';
      res.on('data', (chunk) => {
        data += chunk;
      });
      res.on('end', () => {
        console.log(`Keep-Alive: Ping to ${urlStr} successful. Status Code: ${res.statusCode}`);
      });
    }).on('error', (err) => {
      console.error(`Keep-Alive: Ping to ${urlStr} failed. Error: ${err.message}`);
    });
  } catch (err) {
    console.error(`Keep-Alive: Unexpected error during ping setup for ${urlStr}. Error: ${err.message}`);
  }
}

// Start keep alive automatically if imported
startKeepAlive();
