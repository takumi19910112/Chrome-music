// 対象となるテキストエリアのセレクタ
const TEXTAREA_SELECTOR = '.MuiInputBase-root.MuiOutlinedInput-root textarea';
// 再生する特定の単語のリスト
const TRIGGER_PHRASES = ['お金', 'プライベートジェット', '君以外'];

// 音楽を再生したかどうかのフラグ
let hasPlayedMusic = false;

// 音楽を再生する関数
function playMusic() {
  if (!hasPlayedMusic) {
    const audio = new Audio(chrome.runtime.getURL('suneo.mp3'));
    audio.play().catch(error => console.error('音楽を再生できません:', error));
    // 再生したことをフラグで記録
    hasPlayedMusic = true;
  }
}

// 特定の単語が含まれているかどうかを確認する関数
function containsAnyTriggerPhrase(text) {
  return TRIGGER_PHRASES.some(phrase => text.includes(phrase));
}

// テキストエリアを監視し、入力が特定の単語を含む場合に音楽を再生する
document.addEventListener('input', event => {
  if (event.target.matches(TEXTAREA_SELECTOR)) {
    const textValue = event.target.value;
    if (containsAnyTriggerPhrase(textValue)) {
      playMusic();
    }
  }
});
