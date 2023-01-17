class Laser {
  constructor(spos, angle) {
    this.pos = createVector(spos.x, spos.y);
    this.vel = p5.Vector.fromAngle(angle);
    this.vel.mult(10);

    this.update = function () {
      this.pos.add(this.vel);
    };

    this.render = function () {
      push();
      stroke(255);
      strokeWeight(4);
      point(this.pos.x, this.pos.y);
      pop();
    };
    this.hits = function(asteroid){
        let d = dist(this.pos.x, this.pos.y, asteroid.pos.x, asteroid.pos.y)
        //if distance is less than asteroid radius, it is colliding
        if(d < asteroid.r){
            console.log('hit')
        }
    }
  }
}
