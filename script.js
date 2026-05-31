// ==========================================
// 0. 起動時にゲーム・パズル・検索窓を確実に隠す初期化
// ==========================================
document.addEventListener("DOMContentLoaded", () => {
const overlayGame = document.getElementById('action-game-overlay');
const overlayPattern = document.getElementById('pattern-overlay');
const areaSearch = document.getElementById('hidden-search-area');
if (overlayGame) overlayGame.style.setProperty('display', 'none', 'important');
if (overlayPattern) overlayPattern.style.setProperty('display', 'none', 'important');
if (areaSearch) areaSearch.style.setProperty('display', 'none', 'important');
});
// ==========================================
// 1. スクロールを監視してTOPボタンをピョンッと出すプログラム
// ==========================================
window.addEventListener('scroll', () => {
const topButton = document.querySelector('.back-to-top');
if (!topButton) return;
if (window.scrollY > 400) {
topButton.classList.add('show');
} else {
topButton.classList.remove('show');
}
});
// ==========================================
// 2. 🕵️‍♂️ 【ゆうひ不動産風】5つのキーワード探索システム
// ==========================================
const trigger = document.getElementById('secret-trigger');
const triggerLeft = document.getElementById('secret-trigger-left');
const trigger2 = document.getElementById('secret-trigger-2');
const searchArea = document.getElementById('hidden-search-area');
const searchInput = document.getElementById('game-search-input');
const searchBtn = document.getElementById('game-search-btn');
const statusText = document.getElementById('search-status');
const patternOverlay = document.getElementById('pattern-overlay');
const patternCloseBtn = document.getElementById('pattern-close-btn');
const patternResetBtn = document.getElementById('pattern-reset-btn');
const circles = document.querySelectorAll('.circle-btn');
const correctPattern = [1, 2, 3, 5, 7, 8, 9]; // Zの形
let currentPattern = [];
if (trigger) {
trigger.addEventListener('click', () => {
if (searchArea) searchArea.style.setProperty('display', 'block', 'important');
statusText.innerText = ">> [SYSTEM] ハッキング開始。最初のキーワード「AO」を入力せよ…";
});
}
function checkKeyword() {
const code = searchInput.value.trim().toLowerCase();
if (!code) return;
searchInput.value = '';
if (code === 'ao') {
document.getElementById('main-title').classList.add('glitch-text');
document.getElementById('about-title').style.color = '#00d2ff';
document.getElementById('about-hint-text').innerHTML = "挑戦中：次のパスワードは私の動画の声。緑のあいつ。大文字で「ZUNDAMON」なのだ！";
statusText.innerText = ">> [STAGE 1 クリア] 自己紹介(ABOUT ME)エリアに異変が発生。確認せよ。";
statusText.style.color = "#39ff14";
}
else if (code === 'zundamon') {
document.querySelector('.video-frame').classList.add('red-alert');
document.getElementById('tag-2').innerText = "🔑 CHECK TOP SECTION";
document.getElementById('tag-2').classList.add('red-alert');
const quizCont = document.getElementById('quiz-container');
if (quizCont) {
quizCont.classList.remove('hidden');
quizCont.innerHTML = '🏃‍♂️ AMBITION ATTRACTIONタイトル下の「左側の四角（アトラクション）」が解放された！初見殺しの罠を突破し、最奥のゴールへ到達せよ！';
}
if (triggerLeft) {
triggerLeft.classList.remove('locked');
triggerLeft.classList.add('unlocked');
triggerLeft.setAttribute('title', '🔓 CLICK ME: ACTION GAME');
}
statusText.innerText = ">> [STAGE 2 クリア] タイトル下の「左側の四角」のロックが解除された！アスレチックに挑め！";
statusText.style.color = "#00d2ff";
}
else if (code === 'dream') {
const light = document.querySelector('.status-light');
if (light) {
light.classList.add('hardcore-flash');
}
document.getElementById('footer-version-text').innerText = "【なぞなぞ】「今年(2026年)」に「人工知能の略称(英2文字)」を合体させた、4つ目のパスワードを入力せよ…";
document.getElementById('footer-version-text').style.color = '#ff4757';
statusText.innerText = ">> [STAGE 3 クリア] ボードのランプが暴走！一番下のシステムメッセージが「なぞなぞ」に変化した。";
statusText.style.color = "#39ff14";
}
else if (code === '2026ai') {
if (trigger2) {
trigger2.classList.remove('locked');
trigger2.classList.add('unlocked');
trigger2.setAttribute('title', '🔓 CLICK ME!');
}
statusText.innerText = ">> [STAGE 4 クリア] タイトル下の「right square」のロックが解除された！クリックして最終セキュリティを突破せよ！";
statusText.style.color = "#39ff14";
}
else if (code === 'clear') {
document.body.style.backgroundColor = '#ffffff';
document.body.style.color = '#0c0f12';
document.querySelectorAll('h2').forEach(h2 => h2.style.color = '#0c0f12');
document.getElementById('main-title').style.color = '#0c0f12';
alert("🎉【最終裏コード解除：私の秘密の豆知識】\n\n実は！この自己紹介サイトを作っている裏側で、動画の『ずんだもん』のセリフの調声（イントネーション調整）に合計15時間以上かけてこだわり抜きました！\n\nこれにて全システム復旧。1ヶ月の独学の成果、これにて完全証明完了です！");
if (searchArea) searchArea.style.setProperty('display', 'none', 'important');
}
else {
statusText.innerText = ">> [ERROR] キーワードが一致しません。";
statusText.style.color = "#ff4757";
}
}
// ==========================================
// 3. 🏃‍♂️ 激難アスレチックゲーム（JS完全物理演算型）
// ==========================================
const gameOverlay = document.getElementById('action-game-overlay');
const gameStartBtn = document.getElementById('action-start-btn');
const gameCloseBtn = document.getElementById('action-close-btn');
const stage = document.getElementById('action-stage');
const player = document.getElementById('action-player');
let gameInterval = null;
let isPlaying = false;
let obstacles = [];
// 物理パラメータ
let playerY = 0;
let velocityY = 0;
let isGrounded = true;
const gravity = 0.5;
const jumpPower = 9.5;
let scrollX = 0;
const stageWidth = 2000;
const gameSpeed = 4;
// 💥 初見殺し罠の配置座標
const originalObstacleData = [
{ type: 1, x: 400, w: 20, h: 30 },
{ type: 2, x: 680, w: 25, h: 35, triggered: false },
{ type: 1, x: 950, w: 20, h: 30 },
{ type: 3, x: 1200, w: 40, h: 30, triggered: false },
{ type: 2, x: 1450, w: 25, h: 55, triggered: false },
{ type: 1, x: 1700, w: 20, h: 30 },
{ type: 4, x: 1850, w: 50, h: 80 }
];
if (triggerLeft) {
triggerLeft.addEventListener('click', () => {
if (triggerLeft.classList.contains('unlocked')) {
if (gameOverlay) gameOverlay.style.setProperty('display', 'flex', 'important');
initGame();
}
});
}
if (gameCloseBtn) {
gameCloseBtn.addEventListener('click', () => {
if (gameOverlay) gameOverlay.style.setProperty('display', 'none', 'important');
stopGameLoop();
});
}
window.addEventListener('keydown', (e) => {
if (e.code === 'Space' && isPlaying) {
e.preventDefault();
triggerJump();
}
});
if (stage) {
stage.addEventListener('mousedown', (e) => {
if (isPlaying) {
e.preventDefault();
triggerJump();
}
});
}
function triggerJump() {
if (isGrounded) {
velocityY = jumpPower;
isGrounded = false;
}
}
function initGame() {
isPlaying = false;
scrollX = 0;
playerY = 0;
velocityY = 0;
isGrounded = true;
if (player) player.style.bottom = '0px';
const scoreVal = document.getElementById('action-score-val');
if (scoreVal) scoreVal.textContent = '0';
document.querySelectorAll('.obs-element').forEach(el => el.remove());
obstacles = JSON.parse(JSON.stringify(originalObstacleData));
obstacles.forEach((data) => {
const el = document.createElement('div');
el.className = 'obs-element';
el.style.width = data.w + 'px';
el.style.height = data.h + 'px';
el.style.position = 'absolute';
if (data.type === 1) {
el.style.backgroundColor = '#ff4757';
el.style.bottom = '0px';
} else if (data.type === 2) {
el.style.backgroundColor = '#ff4757';
el.style.bottom = '-60px';
} else if (data.type === 3) {
el.style.backgroundColor = '#ffa500';
el.style.top = '0px';
} else if (data.type === 4) {
el.style.backgroundColor = '#39ff14';
el.style.bottom = '0px';
el.style.boxShadow = '0 0 15px #39ff14';
el.innerHTML = 'GOAL';
}
stage.appendChild(el);
data.element = el;
});
stopGameLoop();
}
if (gameStartBtn) {
gameStartBtn.addEventListener('click', () => {
if (isPlaying) return;
initGame();
isPlaying = true;
startGameLoop();
});
}
function stopGameLoop() {
clearInterval(gameInterval);
gameInterval = null;
}
function startGameLoop() {
gameInterval = setInterval(() => {
scrollX += gameSpeed;
const progress = Math.min(Math.floor((scrollX / (stageWidth - 450)) * 100), 100);
const scoreVal = document.getElementById('action-score-val');
if (scoreVal) scoreVal.textContent = progress;
if (!isGrounded) {
velocityY -= gravity;
playerY += velocityY;
if (playerY <= 0) {
playerY = 0;
velocityY = 0;
isGrounded = true;
}
}
if (player) player.style.bottom = playerY + 'px';
const pLeft = 40;
const pRight = 64;
const pBottom = playerY;
const pTop = playerY + 24;
for (let i = 0; i < obstacles.length; i++) {
let obs = obstacles[i];
let currentX = obs.x - scrollX;
if (obs.element) {
obs.element.style.left = currentX + 'px';
}
if (obs.type === 2 && currentX < 190 && !obs.triggered) {
obs.triggered = true;
obs.element.style.bottom = '0px';
}
if (obs.type === 3 && currentX < 160 && !obs.triggered) {
obs.triggered = true;
obs.element.style.transition = 'top 0.12s cubic-bezier(0.6, 0.04, 0.98, 0.335)';
obs.element.style.top = '66px';
}
if (currentX + obs.w < 0 || currentX > 450) continue;
let obsLeft = currentX;
let obsRight = currentX + obs.w;
let obsBottom = 0;
let obsTop = obs.h;
if (obs.type === 3) {
let currentTopOffset = obs.element.offsetTop;
obsBottom = 120 - obs.h - currentTopOffset;
obsTop = 120 - currentTopOffset;
}
if (pRight > obsLeft && pLeft < obsRight) {
if (pTop > obsBottom && pBottom < obsTop) {
if (obs.type === 4) {
isPlaying = false;
stopGameLoop();
alert("🎉 STAGE CLEAR!! 初見殺しの罠を全て乗り越えました！\n\n次のキーワードは【 dream 】なのだ！右下の検索窓に入力せよ！");
const quizCont = document.getElementById('quiz-container');
if (quizCont) {
quizCont.innerHTML = '🔓 DATA UNLOCKED判明したキーワード: dream';
}
if (statusText) {
statusText.innerText = ">> [STAGE 2 完全クリア] アスレチック突破！キーワード「dream」を入手した。";
statusText.style.color = "#39ff14";
}
if (gameOverlay) gameOverlay.style.setProperty('display', 'none', 'important');
return;
}
else {
isPlaying = false;
stopGameLoop();
alert("💥 🧠「そ、そんな初見殺しの罠があるなんて…！」\nGAME OVER：もう一度スタートして罠を覚え直そう！");
initGame();
return;
}
}
}
}
if (scrollX >= stageWidth - 100 && isPlaying) {
isPlaying = false;
stopGameLoop();
alert("🏳️ ゴールが見当たりません…再挑戦してください。");
initGame();
}
}, 1000 / 60);
}
// ==========================================
// 4. 🔮 3x3パターンパズルの処理
// ==========================================
if (trigger2) {
trigger2.addEventListener('click', () => {
if (trigger2.classList.contains('unlocked')) {
if (patternOverlay) patternOverlay.style.setProperty('display', 'flex', 'important');
}
});
}
circles.forEach(circle => {
circle.addEventListener('click', () => {
const index = parseInt(circle.getAttribute("data-index"));
if (!circle.classList.contains('active')) {
circle.classList.add('active');
currentPattern.push(index);
if (currentPattern.length === correctPattern.length) {
const isCorrect = currentPattern.every((val, i) => val === correctPattern[i]);
if (isCorrect) {
alert("🔓 PATTERN OK! 5つ目のパスワードは『clear』なのだ！右下の検索窓に打ち込め！");
if (patternOverlay) patternOverlay.style.setProperty('display', 'none', 'important');
} else {
alert("❌ PATTERN ERROR... パターンが違います。リセットします。");
resetPattern();
}
}
}
});
});
function resetPattern() {
currentPattern = [];
circles.forEach(c => c.classList.remove('active'));
}
if (patternResetBtn) patternResetBtn.addEventListener('click', resetPattern);
if (patternCloseBtn) patternCloseBtn.addEventListener('click', () => {
if (patternOverlay) patternOverlay.style.setProperty('display', 'none', 'important');
});
if (searchBtn) searchBtn.addEventListener('click', checkKeyword);
if (searchInput) searchInput.addEventListener('keydown', (e) => { if (e.key === 'Enter') checkKeyword(); });