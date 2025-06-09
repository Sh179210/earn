let balance = 0;

document.getElementById('watchBtn').addEventListener('click', () => {
  alert('📺 You watched an ad and earned 1 coin!');
  balance += 1;
  document.getElementById('balance').textContent = balance;

  // Optional: send data to Telegram bot
  if (window.Telegram.WebApp) {
    Telegram.WebApp.sendData(JSON.stringify({ watched: true, balance }));
  }
});

