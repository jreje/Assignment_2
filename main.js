"use strict";
let trees = [];
let context;

// Fixed Time Step so it's deterministic
var timestep = 1000 / 60;
// For "catch-up"
var accumulator = 0;
var frameCount = 0; //count total number of frames rendered
var updatesThisSecond = 0,
  updatesPerSecond = 0;

var totalUpdates = 0;

addEventListener("load", (event) => {
  // Setting Canvas Dimension
  var canvas = document.getElementById("myCanvas");
  context = canvas.getContext("2d");
  canvas.width = window.innerWidth * 0.75;
  canvas.height = window.innerHeight * 0.75;
  const cw = canvas.width;
  const ch = canvas.height;
  // Create Trees
  trees = [
    new Tree(context, cw / 2, ch, 300),
    new Tree(context, cw / 4, ch),
    new Tree(context, cw * 0.75, ch, 400, 9),
  ];
  // FPS Counter
  var fps = 0;
  var framesThisSecond = 0;
  setInterval(function () {
    fps = framesThisSecond;
    framesThisSecond = 0;
    updatesPerSecond = updatesThisSecond;
    updatesThisSecond = 0;
    console.log("Renders/sec:", fps, " Updates/sec:", updatesPerSecond);
  }, 1000);

  var lastFrameTimeMs = null; // Start off as 0
  requestAnimationFrame(mainLoop);
  function mainLoop(timestamp) {
    if (lastFrameTimeMs === null) {
      lastFrameTimeMs = timestamp;
    }
    // timestamp is the point in time when the frame started
    let delta = timestamp - lastFrameTimeMs; // Frame Time. A duration
    // Cap delta to prevent spiral of death if tab loses focus
    if (delta > 250) delta = 250;
    // Accumulator -- Real Time that has elapsed
    accumulator += delta;
    lastFrameTimeMs = timestamp; // Change lastFrameTime point so that the next frame can track the next duration

    // While the real time is greater than the time per frame
    while (accumulator >= timestep) {
      update(timestep);
      // Letting the updates catch up with the actual elapsed time
      accumulator -= timestep;
    }
    draw();
    requestAnimationFrame(mainLoop);
  }

  function update(timestep) {
    trees.forEach(function (tree) {
      tree.update(timestep);
    });
    updatesThisSecond++;
    totalUpdates++;
  }

  function draw() {
    // Background
    context.clearRect(0, 0, cw, ch);
    context.fillStyle = "#105366";
    context.fillRect(0, 0, cw, ch);
    // Draw the trees
    trees.forEach(function (tree) {
      tree.draw();
    });
    ++frameCount;
    if (frameCount < 100) {
      console.log("frame: ", frameCount);
    }
    // draw the fps counter
    context.fillStyle = "black";
    context.fillText("FPS: " + fps, 10, 10);
    ++framesThisSecond;
  }
});

// User Input (Controller)
document.addEventListener("keydown", (event) => {
  const key = event.key; // "ArrowRight", "ArrowLeft", "ArrowUp", or "ArrowDown"
  switch (key) {
    case "ArrowUp":
      trees.forEach((tree) => (tree.windSpeed += 0.005));
      break;
    default:
      trees.forEach(
        (tree) => (tree.windSpeed = Math.max(0.001, tree.windSpeed - 0.005)),
      );
  }
});
