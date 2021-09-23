let stop;
let progress;
let addition = 0;
const record = document.querySelector("p.counter");
const dialog = document.getElementById("exampleModal");
const modalTitle = document.getElementById("exampleModalLabel");
const stopButton = document.querySelector("button.stop");
const modalBody = document.getElementById("modalBody");

// モーダルの表示に関する関数
const modal = function () {
  dialog.tabIndex = "-1";
  dialog.ariaModal = "true";
  dialog.role = "dialog";
  dialog.style = "display: block;";
  dialog.classList.add("show");
};

// タイマー
function timer() {
  const start = new Date().getTime();
  stop = setInterval(function () {
    progress = new Date().getTime() - start + addition;
    const noms = progress / 1000;
    const millisecond = progress
      ? ("0" + String(noms).split(".")[1]).slice(-2)
      : "00";
    const nos = Math.trunc(noms);
    const second = nos ? ("0" + (((nos % 86400) % 3600) % 60)).slice(-2) : "00";
    if (progress < 10000) {
      record.textContent = second + "." + millisecond;
    } else if (progress == 10000) {
      clearInterval(stop);
      record.innerText = "10.00";
      modal();
      modalTitle.innerText = "焦げた...";
      modalBody.innerHTML =
        "焼き過ぎってレベルじゃない<br>センスないどころじゃない！";
    }
  }, 10);
}

timer();

stopButton.addEventListener("click", function () {
  clearInterval(stop);
  modal();
  if (progress <= 4500) {
    modalTitle.innerText = "生焼けやないかい!";
    modalBody.innerHTML = "生だよ！お腹壊すよ！<br>センスないよ！";
  } else if (progress < 5500) {
    modalTitle.innerText = "完璧！！";
    modalBody.innerHTML = "もしかして...職人？？？";
  } else {
    modalTitle.innerText = "焦げ臭い...";
    modalBody.innerHTML = "焼き過ぎじゃない？<br>センスないよ！";
  }
});
