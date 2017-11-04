var board;
var cvs;
var x, y, arc, speed, rate, zone, duration, direction;
var stop;

function init() {
  cvs = document.getElementById("myCanvas");
  cvs.width = board.clientWidth;
  cvs.height = board.clientHeight;
  x = Math.floor(Math.random() * cvs.width);
  y = Math.floor(Math.random() * cvs.height);
  arc = 0;
  speed = 2;
  rate = 60;
  zone = 300;
  duration = 0;
  stop = false;
};

function exit() {
  stop = true;
}

/*draw the plane*/
function draw() {
  var ctx = cvs.getContext("2d");
  ctx.save();
  ctx.clearRect(0, 0, cvs.width, cvs.height);
  x += -Math.sin(arc) * speed;
  y += Math.cos(arc) * speed;
  checkBorder();
  ctx.translate(x + 30 / 2, y + 50 / 2);
  duration++;
  if (duration == rate)
    direction = Math.floor(Math.random() * 3 - 1) * Math.PI / 1000;
  else if (duration > rate && duration <= rate + zone)
    arc += direction;
  else if (duration > rate + zone)
    duration = 0;
  ctx.rotate(arc);
  ctx.beginPath();
  ctx.globalAlpha=0.6;
  ctx.fillStyle = "#222";
  ctx.moveTo(-12+20, -20+30);
  ctx.lineTo(0+20, -14+30);
  ctx.lineTo(12+20, -20+30);
  ctx.lineTo(0+20, 20+30);
  ctx.closePath();
  ctx.fill();
  ctx.beginPath();
  ctx.lineWidth = 1;
  ctx.globalAlpha=1;
  ctx.strokeStyle = "#222";
  ctx.fillStyle = "#fff";
  ctx.moveTo(-15, -25);
  ctx.lineTo(0, -17);
  ctx.lineTo(15, -25);
  ctx.lineTo(0, 25);
  ctx.closePath();
  ctx.fill();
  ctx.stroke();
  ctx.beginPath();
  ctx.strokeStyle = "#222";
  ctx.moveTo(0, -17);
  ctx.lineTo(0, 25);
  ctx.stroke();
  ctx.restore();

  if (!stop)
    window.requestAnimationFrame(draw);
}

function checkBorder() {
  if (x - 10 < 0)
    x = cvs.width - 40;
  if (x + 40 > cvs.width)
    x = 10;
  if (y < 0)
    y = cvs.height - 50;
  if (y + 50 > cvs.height)
    y = 0;
}

function showBoard() {
  board = document.getElementById("board");
  if (board.style.display !== "block") {
    board.style.display = "block";
    init();
    draw();
  }
  else {
    exit();
    board.style.display = "none";
  }
}
