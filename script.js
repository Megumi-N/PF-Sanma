let stop;
let progress;
const namaMax = 4.125;
const syokuninMax = 4.455;

// タイマーの文字部分
const record = document.querySelector("p.counter");

// ストップボタン
const stopButton = document.querySelector("button.stop");

// 開始時のモーダル
const startDialog = document.getElementById("startModal");
const startButton = document.getElementById("start");

// 結果時のモーダル
const resultDialog = document.getElementById("resultModal");
const resultmodalTitle = document.getElementById("resultModalLabel");
const resultmodalBody = document.getElementById("resultmodalBody");

// 結果のテキスト
const resultText = document.getElementById("text");

// 生魚
const nama = document.getElementById("nama");
// 焼き魚
const yaki = document.getElementById("yaki");

// モーダルの表示に関する関数
const modal = function () {
  resultDialog.tabIndex = "-1";
  resultDialog.ariaModal = "true";
  resultDialog.role = "dialog";
  resultDialog.style = "display: block;";
  resultDialog.classList.add("show");
  resultDialog.setAttribute("aria-hidden", "true");
};

window.onload = () => {
  startDialog.tabIndex = "-1";
  startDialog.ariaModal = "true";
  startDialog.role = "dialog";
  startDialog.style = "display: block;";
  startDialog.classList.add("show");
};

const retryBtn = function () {
  document.getElementById("reload").innerText = "再挑戦する";
};

function timer() {
  const pre = performance.now();
  stop = setInterval(() => {
    const now = performance.now();
    progress = ((now - pre).toFixed(0) / 1000).toFixed(3); //toFix(0)でミリ秒以下を非表示
    const sec = "0" + Math.trunc(progress);
    const ms = String(progress).split(".")[1].slice(0, -1);
    if (sec < 10) {
      record.textContent = sec + "." + ms;
    } else if (sec == 10) {
      clearInterval(stop);
      modal();
      retryBtn();
      record.innerText = "10.00";
      resultmodalTitle.innerText = "焦げた...";
      resultmodalBody.innerHTML =
        "<p>焼き過ぎってレベルじゃない</p>\
        <p>センスないどころじゃない</p>\
        <p>火を扱わないで欲しいレベル</p>\
        <a href='http://twitter.com/share?url=[シェアするURL]&text=[ツイート内テキスト]&via=[ツイート内に含むユーザ名]&related=[ツイート後に表示されるユーザー]&hashtags=[ハッシュタグ]' target='_blank'>ツイート</a>";
    }
  }, 10);
}

stopButton.addEventListener("click", function () {
  clearInterval(stop);
  nama.style.animationPlayState = "paused";
  yaki.style.animationPlayState = "paused";

  // 結果の浮き出し文字制御
  if (syokuninMax <= progress) {
    text.innerText = "焦げ魚";
  } else if (namaMax < progress && progress < syokuninMax) {
    text.innerText = "職人芸";
  } else {
    text.innerText = "生焼け";
  }
  text.style.zIndex = "4";
  text.classList.add("blur");
  retryBtn();

  // 結果モーダル出力
  setTimeout(function () {
    modal();
    if (syokuninMax <= progress) {
      resultmodalTitle.innerText = "焦げ臭い...";
      resultmodalBody.innerHTML =
        "<p>焼き過ぎじゃない？??</p>\
      <p>さんまの気持ちになってもう一回やってみて!!</p>";
    } else if (namaMax < progress && progress < syokuninMax) {
      resultmodalTitle.innerText = "完璧！！";
      resultmodalBody.innerHTML =
        "<p>もしかして...職人？？？</p>\
      <p>並び立つものがいないくらいさんまを焼く技術に溢れてるかも...</p>\
      <p>さんま焼き職人に転職しよう！</p>";
    } else {
      resultmodalTitle.innerText = "生焼けやないかい!";
      resultmodalBody.innerHTML =
        "<p>生だよ！</p>\
      <p>お腹壊すよ！</p>\
      <p>せっかちがすぎるよ!！</p>\
      <p>さんまをよく見て、もう一度やってみよう。</p><p>ワンチャンあるかも。</p>";
    }
  }, 3000);
});

// スタートボタン
startButton.addEventListener("click", function () {
  startDialog.remove();
  nama.classList = "namasakana";
  yaki.classList = "yakisakana";
  document.getElementById("koge").classList = "kogesakana";
  document.getElementById("stopButton").disabled = "";
  progress = 0;
  timer();
});
