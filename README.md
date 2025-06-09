<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>XAdsEarn</title>
  <script src="https://telegram.org/js/telegram-web-app.js"></script>
  <style>
    body {
      margin: 0;
      font-family: Arial, sans-serif;
      background: #f2f2f2;
      color: #333;
    }

    .navbar {
      display: flex;
      justify-content: space-around;
      background: #fff;
      padding: 10px 0;
      border-top: 1px solid #ccc;
      position: fixed;
      bottom: 0;
      width: 100%;
    }

    .navbar button {
      background: none;
      border: none;
      font-size: 16px;
    }

    .page {
      display: none;
      padding: 20px;
      margin-bottom: 60px;
    }

    .page.active {
      display: block;
    }

    .ad-box {
      padding: 15px;
      border: 2px dashed #aaa;
      margin: 20px 0;
      text-align: center;
      border-radius: 8px;
      background: #fff8dc;
      cursor: pointer;
    }

    button.main-btn {
      width: 100%;
      padding: 12px;
      background: #30a9de;
      color: white;
      border: none;
      border-radius: 8px;
      font-size: 16px;
      margin-top: 20px;
    }
  </style>
</head>
<body>

  <div id="home" class="page active">
    <h2>Welcome to XAdsEarn</h2>
    <p>Watch ads, complete tasks, and earn rewards instantly!</p>
    <button class="main-btn" onclick="navigateTo('watch')">Start Watching Ads</button>
  </div>

  <div id="watch" class="page">
    <h2>Watch Ads</h2>
    <div class="ad-box" onclick="playAd()">▶️ Tap to watch ad</div>
    <p id="watch-status">No ad watched yet</p>
    <button class="main-btn" onclick="claimReward()">Claim 10 Coins</button>
  </div>

  <div id="rewards" class="page">
    <h2>My Rewards</h2>
    <p id="reward-count">You have 0 coins.</p>
  </div>

  <div id="profile" class="page">
    <h2>Profile</h2>
    <p><b>User ID:</b> <span id="user-id">Loading...</span></p>
    <p><b>Session Data:</b></p>
    <pre id="session-data"></pre>
  </div>

  <div class="navbar">
    <button onclick="navigateTo('home')">🏠 Home</button>
    <button onclick="navigateTo('watch')">🎬 Watch</button>
    <button onclick="navigateTo('rewards')">🎁 Rewards</button>
    <button onclick="navigateTo('profile')">👤 Profile</button>
  </div>

  <script>
    const tg = window.Telegram.WebApp;
    tg.expand();
    const pages = ['home', 'watch', 'rewards', 'profile'];
    let reward = 0;

    function navigateTo(page) {
      pages.forEach(p => {
        document.getElementById(p).classList.remove('active');
      });
      document.getElementById(page).classList.add('active');
    }

    function playAd() {
      document.getElementById('watch-status').innerText = "Ad is playing...";
      setTimeout(() => {
        document.getElementById('watch-status').innerText = "✅ Ad watched!";
      }, 5000);
    }

    function claimReward() {
      reward += 10;
      document.getElementById('reward-count').innerText = `You have ${reward} coins.`;
      tg.sendData(JSON.stringify({
        action: 'claim_reward',
        coins: 10
      }));
    }

    // Load profile data
    document.getElementById('user-id').innerText = tg.initDataUnsafe?.user?.id || 'Guest';
    document.getElementById('session-data').innerText = JSON.stringify(tg.initDataUnsafe, null, 2);
  </script>

</body>
</html>
