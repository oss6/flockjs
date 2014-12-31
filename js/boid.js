// boid.js
// Description: Boid
// Author: Ossama Edbali

function Boid (position, ctx) {
    var angle = $u.random(0, 2 * Math.PI);
    
    // Vectors
    this.position = position;
    this.velocity = new Vector(Math.cos(angle), Math.sin(angle));
    this.acceleration = new Vector();
    
    this.r = 2.0;
    this.maxforce = 0.03;   // Maximum steering force
    this.maxspeed = 2.0;    // Maximum speed
    
    this.ctx = ctx;
    this.width = ctx.canvas.width;
    this.height = ctx.canvas.height;
}

Boid.prototype.run = function (boids) {
    this.flock(boids);
    this.update();
    this.borders();
    this.render();
};

Boid.prototype.apply_force = function (force) {
    this.acceleration.add(force);
    return this;
};

Boid.prototype.flock = function (boids) {
    var sep = this.separate(boids), // Separation
        ali = this.align(boids),    // Alignment
        coh = this.cohere(boids);   // Cohesion
    
    // Arbitrarily weight these forces
    sep.multiplyScalar(1.5);
    ali.multiplyScalar(1.0);
    coh.multiplyScalar(1.0);
    
    // Add the force vectors to acceleration
    this.apply_force(sep).apply_force(ali).apply_force(coh);
};

// Method to update location
Boid.prototype.update = function () {
    // Update velocity
    this.velocity.add(this.acceleration);
    // Limit speed
    this.velocity.limit(this.maxspeed);
    this.position.add(this.velocity);
    // Reset accelertion to 0 each cycle
    this.acceleration.multiplyScalar(0);
};

Boid.prototype.borders = function () {
    if (this.position.x < -this.r) this.position.x = this.width + this.r;
    if (this.position.y < -this.r) this.position.y = this.height + this.r;
    if (this.position.x > this.width + this.r) this.position.x = -this.r;
    if (this.position.y > this.height + this.r) this.position.y = -this.r;
};

Boid.prototype.steer_to = function (target) {
    var desired = Vector.substract(target, this.position);
    desired.normalize();
    desired.multiplyScalar(this.maxspeed);
    
    var steer = Vector.substract(desired, this.velocity);
    steer.limit(this.maxforce);
    return steer;
};

Boid.prototype.separate = function (boids) {
    var desiredseparation = 25.0,
        steer = new Vector(),
        count = 0,
        len = boids.length,
        i;
    
    for (i = 0; i < len; i++) {
        var other = boids[i],
            d = this.position.distance(other.position);
        
        if (d > 0 && d < desiredseparation) {
            var diff = Vector.substract(this.position, other.position);
            diff.normalize();
            diff.divideScalar(d);
            steer.add(diff);
            count++;
        }
    }
    
    // Average
    if (count > 0) {
        steer.divideScalar(count);
    }

    // As long as the vector is greater than 0
    if (steer.magnitude() > 0) {
      // Implement Reynolds: Steering = Desired - Velocity
      steer.normalize();
      steer.multiplyScalar(this.maxspeed);
      steer.substract(this.velocity);
      steer.limit(this.maxforce);
    }
    return steer;
};

Boid.prototype.align = function (boids) {
    var neighbourdist = 50,
        sum = new Vector(),
        count = 0,
        len = boids.length,
        i;
    
    for (i = 0; i < len; i++) {
        var other = boids[i],
            d = this.position.distance(other.position);
        
        if (d > 0 && d < neighbourdist) {
            sum.add(other.velocity);
            count++;
        }
    }
    
    if (count > 0) {
      sum.divideScalar(count);
        
      // Implement Reynolds: Steering = Desired - Velocity
      sum.normalize();
      sum.multiplyScalar(this.maxspeed);
      var steer = Vector.substract(sum, this.velocity);
      steer.limit(this.maxforce);
      return steer;
    } 
    else {
        return new Vector();
    }
};

Boid.prototype.cohere = function (boids) {
    var neighbourdist = 50,
        sum = new Vector(),
        count = 0,
        len = boids.length,
        i;
    
    for (i = 0; i < len; i++) {
        var other = boids[i],
            d = this.position.distance(other.position);
        
        if (d > 0 && d < neighbourdist) {
            sum.add(other.position);
            count++;
        }
    }
    
    if (count > 0) {
        sum.divideScalar(count);
        return this.steer_to(sum); 
    } 
    else {
        return new Vector();
    }
};

Boid.prototype.render = function () {
    // Draw a triangle rotated in the direction of velocity
    var theta = this.velocity.horizontalAngle() + $u.rad(90),
        r = this.r;
    
    this.ctx.fillStyle = '#999';
    this.ctx.strokeStyle = '#fff';
    
    this.ctx.save();
    this.ctx.translate(this.position.x, this.position.y);
    this.ctx.rotate(theta);
    
    this.ctx.beginPath();
    this.ctx.moveTo(0, -r * 2);
    this.ctx.lineTo(-r, r * 2)
    this.ctx.lineTo(r, r * 2);
    this.ctx.fill();
    this.ctx.stroke();
    this.ctx.closePath();
    this.ctx.restore();
};