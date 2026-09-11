const BROWN = "#582b11";
const flowerColors = ["#FF91E2", "#FFFF91", "#A8E67E", "#BFF1FF"];
function Tree(context, x, y, trunkHeight, numBranches) {
  this.context = context;
  this.posX = x || 100;
  this.posY = y || 100;
  this.trunkHeight = trunkHeight || 400;
  this.numBranches = numBranches || 8;
  this.time = Math.random();
  this.windSpeed = 0.01;
  // 10 degrees
  this.maxSwayAngle = 10;

  // Generate Branches, initial angles, and Colors once
  this.branches = [];
  for (var i = 0; i < this.numBranches; i++) {
    this.branches.push({
      length: Math.random() * 251 + 200,
      angle: (Math.random() * 180 - 90) * (Math.PI / 180),
      color: flowerColors[Math.floor(Math.random() * 4)],
    });
  }
}

Tree.prototype.drawBranch = function (length, angle, color) {
  this.context.save();
  /* // For debugging. Moving Point of Branch
    this.context.beginPath();
    this.context.fillStyle = "red";
    this.context.arc(0, 0, 10, 0, 2 * Math.PI);
    this.context.fill(); 
    */

  // Angle the branch. Maybe make it random angles
  this.context.fillStyle = BROWN;
  this.context.rotate(angle);
  const swayAngle = Math.sin(this.time) * this.maxSwayAngle * (Math.PI / 180);
  this.context.rotate(swayAngle);
  this.context.fillRect(-12.5, -length, 25, length);
  // Translate to tip of branch
  this.context.translate(0, -length);
  this.context.beginPath();
  this.drawFlower(color);
  this.context.restore();
};
Tree.prototype.drawTrunk = function () {
  this.context.save();
  this.context.fillStyle = BROWN;
  // Makes it so when we move the tree, we move it from the bottom of the trunk
  this.context.fillRect(-25, -1 * this.trunkHeight, 50, this.trunkHeight);
  /* //For debugging. Moving Point of trunk
    this.context.beginPath();
    this.context.fillStyle = "green";
    this.context.arc(0, 0, 10, 0, 2 * Math.PI);
    this.context.fill(); 
    */
  // Rounds the top of the trunk so it looks less choppy
  this.context.fillStyle = BROWN;
  this.context.translate(0, -1 * this.trunkHeight);
  this.context.beginPath();
  this.context.arc(0, 0, 25, 0, 2 * Math.PI);
  this.context.fill();
  this.context.restore();
};

Tree.prototype.drawFlower = function (color) {
  this.context.save();
  this.context.fillStyle = color;
  this.context.arc(0, 0, 20, 0, 2 * Math.PI);
  this.context.fill();
  this.context.restore();
};

Tree.prototype.draw = function () {
  this.context.save();
  this.context.translate(50, 50);
  // Moves the bottom of the trunk
  this.context.translate(this.posX, this.posY);
  // Sway the tree
  const swayAngle = Math.sin(this.time) * this.maxSwayAngle * (Math.PI / 180);
  this.context.rotate(swayAngle);
  this.drawTrunk();
  // Draw branches at the top of the trunk
  this.context.translate(0, -1 * this.trunkHeight);
  // Draw all branches with a given length and angle. Established during instantiation
  for (var i = 0; i < this.numBranches; ++i) {
    this.drawBranch(
      this.branches[i].length,
      this.branches[i].angle,
      this.branches[i].color,
    );
  }
  this.context.restore();
};

Tree.prototype.update = function () {
  this.time += this.windSpeed;
  console.log(`wind angle: ${this.windAngle}`);
};
