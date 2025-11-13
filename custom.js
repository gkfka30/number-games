/*documentary 요소*/
let result = document.querySelector("#result"),
  chance = document.querySelector("#chance"),
  user = document.querySelector("#user"),
  play = document.querySelector("#play"),
  reset = document.querySelector("#reset"),
  imgBox = document.querySelector("img"),
  chanceNum = 5;
let computerNum;
let history = [];

/*함수*/
function randomNum() {
  computerNum = Math.floor(Math.random() * 100 + 1);
  console.log(computerNum);
}

function start() {
  userNum = parseInt(user.value);

  //입력한 숫자가 1미만이거나 100초과인 경우 (음수/101~) 다시 숫자를 입력할 수 있도록 return
  if (userNum < 1 || userNum > 100) {
    result.textContent = "1~100 사이의 숫자를 입력해주세요";
    imgBox.src =
      "https://www.freeiconspng.com/thumbs/error-icon/orange-error-icon-0.png";
    return;
  }

  //true: history에 내가 입력한 숫자가 있다는 의미
  if (history.includes(userNum)) {
    result.textContent = "이미 입력한 숫자입니다. 다른 숫자를 입력해주세요~";
    return;
  }

  //입력한 숫자를 history 배열에 넣음
  history.push(userNum);
  console.log(history);

  //같은 숫자를 입력한 경우 숫자를 다시 입력할 수 있도록 return
  if (userNum == computerNum) {
    result.textContent = "bingo!";
    imgBox.src =
      "https://img.freepik.com/free-vector/bingo-neon-lettering-explosion_1262-20711.jpg";
    imgBox.style.transform = "rotate(0deg)";

    // return true; //정답을 맞추면 바로 첫시작 화면으로 이동
  } else if (userNum < computerNum) {
    result.textContent = "up";
    imgBox.src =
      "https://img.freepik.com/premium-vector/neon-arrow-with-shining-effects-highlights-dark-background_166116-6316.jpg";
    imgBox.style.transform = "rotate(0deg)";
  } else if (userNum > computerNum) {
    result.textContent = "down";
    imgBox.src =
      "https://img.freepik.com/premium-vector/neon-arrow-with-shining-effects-highlights-dark-background_166116-6316.jpg";
    imgBox.style.transform = "rotate(180deg)";
  } else {
    result.textContent = "숫자를 입력해주세요";
    imgBox.src =
      "https://img.freepik.com/free-vector/error-alert-button-symbol_24877-83749.jpg?semt=ais_hybrid&w=740&q=80";
    imgBox.style.transform = "rotate(0deg)";
  }

  chanceNum--;
  chance.innerText = `남은기회: ${chanceNum}`;
  user.value = "";
  return false;
}

function fail() {
  if (chanceNum < 1) {
    chance.innerText = `GameOver`;
    result.textContent = "FAIL!";
    imgBox.src =
      "https://www.makeneonsign.com/cdn/shop/products/Gameoverneonsign2_220fbc31-34b4-4d50-928a-d2fbd023fdd9_1024x1024.jpg?v=1619432723";
    imgBox.style.transform = "rotate(0deg)";

    play.disabled = true;
    user.disabled = true;
  }
}

function restart() {
  randomNum();
  imgBox.src =
    "https://d14cvuwsb9oabg.cloudfront.net/c_fill,fl_lossy,w_960/g_south_east,l_havit_watermark2,w_180,x_5,y_5/v1504169972/im23ypxu9qjp1pwjflda.jpg";
  imgBox.style.transform = "rotate(0deg)";

  chanceNum = 5;
  result.innerText = "Guess the Number!";
  chance.innerText = "남은기회: 5";
  play.disabled = false;
  user.disabled = false;
  user.value = "";
}
function playGame() {
  if (start()) {
    restart();
  } else {
    fail();
  }
  user.value = "";
}
/*실행*/
randomNum();

user.addEventListener("focus", () => {
  user.value = "";
});

play.addEventListener("click", playGame);

reset.addEventListener("click", restart);

// 마우스 커서 만들기
let cursorImg = document.querySelector("#cursor-img");

// 마우스 움직임 이벤트를 감지
document.addEventListener("mousemove", (e) => {
  // 마우스의 X, Y 좌표를 가져와서 이미지의 위치를 설정

  // -25px, -25px는 이미지의 크기(50px)의 절반을 빼서 커서 중앙에 오도록 조정하는 값입니다.
  cursorImg.style.transform = `translate(${e.clientX - 25}px, ${
    e.clientY - 25
  }px)`;
});
