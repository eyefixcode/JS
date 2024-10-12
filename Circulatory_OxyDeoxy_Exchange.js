let oxygenatedCells = [];
let deoxygenatedCells = [];
let numCells = 100;
let centerX, centerY;
let vesselWidth, vesselHeight;

function setup() {
  createCanvas(600, 400);
  centerX = width / 2;
  centerY = height / 2;
  vesselWidth = width * 0.3;
  vesselHeight = height * 0.15;

  // Create initial oxygenated and deoxygenated blood cells
  for (let i = 0; i < numCells; i++) {
    let angle = map(i, 0, numCells, 0, TWO_PI);
    let oxCell = new BloodCell(centerX + cos(angle) * vesselWidth, centerY + sin(angle) * vesselHeight, color(0, 0, 255));
    let deoxCell = new BloodCell(centerX + cos(angle + PI) * vesselWidth, centerY + sin(angle + PI) * vesselHeight, color(255, 0, 0));
    oxygenatedCells.push(oxCell);
    deoxygenatedCells.push(deoxCell);
  }
}

function draw() {
  background(220);

  // Display blood vessels
  noFill();
  stroke(150);
  ellipse(centerX, centerY, vesselWidth * 2, vesselHeight * 2);

  // Simulate and display each oxygenated blood cell
  for (let cell of oxygenatedCells) {
    cell.move();
    cell.display();
    cell.checkVessel();
  }

  // Simulate and display each deoxygenated blood cell
  for (let cell of deoxygenatedCells) {
    cell.move();
    cell.display();
    cell.checkVessel();
  }
}

class BloodCell {
  constructor(x, y, cellColor) {
    this.position = createVector(x, y);
    this.velocity = p5.Vector.random2D().mult(random(1, 2)); // Random initial velocity
    this.radius = 5;
    this.color = cellColor;
  }

  move() {
    // Move the blood cell
    this.position.add(this.velocity);

    // Wrap around the screen
    this.position.x = (this.position.x + width) % width;
    this.position.y = (this.position.y + height) % height;
  }

  display() {
    fill(this.color);
    noStroke();
    ellipse(this.position.x, this.position.y, this.radius * 2, this.radius * 2);
  }

  checkVessel() {
    // Check if the blood cell is inside the vessel
    let distanceToCenter = dist(this.position.x, this.position.y, centerX, centerY);
    let normalizedX = (this.position.x - centerX) / vesselWidth;
    let normalizedY = (this.position.y - centerY) / vesselHeight;
    let isInVessel = normalizedX ** 2 + normalizedY ** 2 < 1;

    if (!isInVessel) {
      // Reverse the direction when outside the vessel
      this.velocity.mult(-1);
    }
  }
}
