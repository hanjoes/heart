// Stealing the idea from the conky battery
// indicator.

var ph;

var cw = 200;
var ch = 200;

function setup() {
  createCanvas(cw, ch);
  // 9 seems the best number.
  ph = new PondingHeart(9, cw, ch);
}

function draw() {
  ph.startPonding();
}

var HeartPiece = function(cx, cy, ox, oy) {
  this.cx = cx;
  this.cy = cy;
  // offset from center, used to calculate translation
  this.ox = ox;
  this.oy = oy;
  this.width = 10;
  this.height = 10;
  this.fillColor = 'red';
};

HeartPiece.prototype.show = function() {
  rectMode(CENTER);
  fill(this.fillColor);
  print("ox: " + this.ox + " oy: " + this.oy);
  rect(this.cx, this.cy, this.width, this.height);
};

var PondingHeart = function(w, cw, ch) {
  this.width = w;
  this.relaxDist = 1;
  this.tenseDist = 5;
  this.pieces = [];
  this.centerX = cw / 2;
  this.centerY = ch / 2;
  this.r = 5;
  // initialize the bottom half include the middle lane
  // include zero since the bottom lane contains only
  // the center piece
  for (var level = 0; level < (w - 1) / 2 + 1; ++level) {
    this.initLane(level, true);
  }
  // initialize the top half
  var upLevel = -1;
  for (; upLevel >= -((w - 5) / 2 - 1); --upLevel) {
    this.initLane(upLevel, true);
  } 
  // top level which is the special case
  this.initLane(upLevel, false);
};

PondingHeart.prototype.initLane = function(level, hasMiddlePiece) {
  this.initHalf(-1, level);
  this.initHalf(1, level);
  if (hasMiddlePiece) {
    this.pieces.push(new HeartPiece(
      this.centerX,
      this.centerY + level * (this.relaxDist + 2 * this.r),
      0,
      level));
  }
};

PondingHeart.prototype.initHalf = function(step, level) {
  for (var i = 1; i <= (this.width - 2 * Math.abs(level)) / 2; ++i) {
    this.pieces.push(new HeartPiece(
      this.centerX + i * step * (this.relaxDist + 2 * this.r), 
      this.centerY + level * (this.relaxDist + 2 * this.r),
      i * step,
      level));
  }
};

PondingHeart.prototype.startPonding = function() {
  this.pieces.forEach(function(h) {
    h.show();
  });
}