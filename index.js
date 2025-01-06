let input = $("input");
let timerStarted = false;
let wordsCount = document.querySelectorAll(".words");

function randomSentence(count) {
  let str = "";
  let alphabets = "abcdefghijklmnopqrstuvwxyz";
  for (let i = 0; i < count; i++) {
    let randomLength = Math.floor(Math.random() * 10) + 1;

    for (let j = 0; j < randomLength; j++) {
      let randomId = Math.floor(Math.random() * 26);
      str += alphabets[randomId];
    }
    str += " ";
  }
  ChallangeSentence(str, count);
}

function noWords() {
  wordsCount.forEach((e) => {
    e.addEventListener("click", () => {
      let count = parseInt(e.classList[0], 10);
      randomSentence(count);
    });
  });
}

function timer(str, count) {
  let timer = 0;
  let timing = setInterval(() => {
    timer++;
    // console.log(timer);
    $(".timing").text(timer);
  }, 1000);
  input.on("input", () => {
    if (input.val().trim() == str.trim()) {
      clearInterval(timing);
      score($(".timing").text(), count);
    }
  });
}

function score(time, count) {
  let score = 0;
  score = Math.floor((100 * count) / time);
  $(".score").text(score);
}

function ChallangeSentence(str, count) {
  $(document).ready(() => {
    $(".challenge").text(str);
    input.attr("placeholder", str);
    input.on("input", () => {
      if (input.val() != "" && !timerStarted) {
        timerStarted = true;
        timer(str, count);
      }
      let inputVal = input.val().split("");
      let strArr = str.split("");
      for (let i = 0; i < inputVal.length; i++) {
        if (inputVal[i] != strArr[i]) {
          input.css("color", "red");
        } else {
          input.css("color", "black");
        }
      }
    });
  });
}
noWords();
