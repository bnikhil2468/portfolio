import readline from 'readline';
import { exec } from 'child_process';
import { promisify } from 'util';

const execAsync = promisify(exec);

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const question = (query) => new Promise((resolve) => rl.question(query, resolve));

async function getRefreshToken() {
  console.log('\n🎵 Spotify Refresh Token Generator\n');
  
  // Get credentials from user
  const clientId = await question('Enter your Spotify Client ID: ');
  const clientSecret = await question('Enter your Spotify Client Secret: ');
  
  if (!clientId || !clientSecret) {
    console.error('❌ Client ID and Client Secret are required!');
    rl.close();
    process.exit(1);
  }
  
  // Create authorization URL
  // Using production domain since Spotify rejects https://localhost
  const redirectUri = 'http://127.0.0.1:5173/callback';
  const scope = 'user-top-read';
  const authUrl = `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=code&redirect_uri=${encodeURIComponent(redirectUri)}&scope=${scope}`;
  
  console.log('\n📋 Follow these steps:');
  console.log('1. Make sure you have https://localhost:5174/callback in your Spotify app redirect URIs');
  console.log('2. Open this URL in your browser:');
  console.log(`\n   ${authUrl}\n`);
  console.log('3. Authorize the app');
  console.log('4. You will be redirected to https://nimaibhat.com/callback?code=YOUR_CODE_HERE');
  console.log('5. Copy the ENTIRE URL from your browser address bar (including the code parameter)\n');
  
  const redirectUrl = await question('Paste the full redirect URL here: ');
  
  // Extract code from URL
  const url = new URL(redirectUrl);
  const code = url.searchParams.get('code');
  
  if (!code) {
    console.error('❌ Could not find code in the URL. Make sure you pasted the full URL.');
    rl.close();
    process.exit(1);
  }
  
  console.log('\n🔄 Exchanging code for tokens...\n');
  
  // Exchange code for tokens
  const credentials = Buffer.from(`${clientId}:${clientSecret}`).toString('base64');
  
  try {
    const response = await fetch('https://accounts.spotify.com/api/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': `Basic ${credentials}`,
      },
      body: new URLSearchParams({
        grant_type: 'authorization_code',
        code: code,
        redirect_uri: redirectUri,
      }),
    });
    
    if (!response.ok) {
      const error = await response.text();
      console.error('❌ Error:', error);
      rl.close();
      process.exit(1);
    }
    
    const data = await response.json();
    
    console.log('✅ Success! Here are your tokens:\n');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log('REFRESH TOKEN (add this to your .env file):');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log(data.refresh_token);
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');
    
    console.log('📝 Add this line to your .env file:');
    console.log(`SPOTIFY_REFRESH_TOKEN=${data.refresh_token}\n`);
    
  } catch (error) {
    console.error('❌ Error:', error.message);
  }
  
  rl.close();
}

getRefreshToken();

