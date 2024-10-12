let cells = [];

function setup() {
  createCanvas(600, 400);
  // Create initial cancer and healthy cells
  for (let i = 0; i < 100; i++) {
    let healthyCell = new HealthyCell(random(width), random(height));
    cells.push(healthyCell);
  }

  // Add a few cancer cells
  for (let i = 0; i < 5; i++) {
    let cancerCell = new CancerCell(random(width), random(height));
    cells.push(cancerCell);
  }
}

function draw() {
  background(220);

  // Simulate and display each cell
  for (let cell of cells) {
    cell.move();
    cell.grow();
    cell.display();
    cell.checkInteraction();
  }
}

class Cell {
  constructor(x, y, color) {
    this.position = createVector(x, y);
    this.velocity = createVector(random(-1, 1), random(-1, 1));
    this.radius = 10;
    this.growthRate = random(0.01, 0.05);
    this.color = color;
  }

  move() {
    // Simulate random movement
    this.position.add(this.velocity);
    
    // Bounce off the walls
    if (this.position.x < 0 || this.position.x > width) {
      this.velocity.x *= -1;
    }
    if (this.position.y < 0 || this.position.y > height) {
      this.velocity.y *= -1;
    }
  }

  grow() {
    this.radius += this.growthRate;
  }

  display() {
    fill(this.color);
    noStroke();
    ellipse(this.position.x, this.position.y, this.radius * 2, this.radius * 2);
  }
}

class CancerCell extends Cell {
  constructor(x, y) {
    super(x, y, color(255, 0, 0, 150));
  }

  checkInteraction() {
    // Simulate metastasis (randomly create new cells)
    if (random() < 0.01) {
      let newCell = new CancerCell(this.position.x, this.position.y);
      cells.push(newCell);
    }
  }
}

class HealthyCell extends Cell {
  constructor(x, y) {
    super(x, y, color(0, 255, 0, 150));
  }

  checkInteraction() {
    // Simulate interaction with cancer cells
    for (let cell of cells) {
      if (cell instanceof CancerCell && dist(this.position.x, this.position.y, cell.position.x, cell.position.y) < this.radius + cell.radius) {
        // Healthy cell reacts to the presence of cancer cells (you can define specific behavior here)
        // For simplicity, let's make healthy cells turn red when close to cancer cells
        this.color = color(255, 0, 0, 150);
      }
    }
  }
}