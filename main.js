"use strict";
addEventListener("load", (event) => {
  var canvas = document.getElementById("myCanvas");
  var context = canvas.getContext("2d");
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  const cw = canvas.width;
  const ch = canvas.height;
  var trees = [
    new Tree(context, cw / 2, ch, 300),
    new Tree(context, cw / 4, ch),
    new Tree(context, cw * 0.75, ch, 450, 9),
  ];

  requestAnimationFrame(mainLoop);
  function mainLoop() {
    update();
    draw();
    requestAnimationFrame(mainLoop);
  }

  function update() {
    trees.forEach(function (tree) {
      tree.update();
    });
  }

  function draw() {
    context.clearRect(0, 0, cw, ch);
    context.fillStyle = "#105366";
    context.fillRect(0, 0, cw, ch);
    trees.forEach(function (tree) {
      tree.draw();
    });
  }
});

document.addEventListener("keydown", (event) => {
  const key = event.key; // "ArrowRight", "ArrowLeft", "ArrowUp", or "ArrowDown"
  console.log(key);
});
