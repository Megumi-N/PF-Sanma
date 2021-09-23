let stop;
let progress;
let addition = 0;
const record = document.querySelector("p.counter");
// カウンター
function timer() {
  const start = new Date().getTime();
  let a = setInterval(function () {
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
      alert((record.textContent = "焦げました..."));
      clearInterval(a);
    }
  }, 10);
}
timer();
