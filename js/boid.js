function Boid (position) {
    var NEIGHBOURS_RADIUS = 100,
        DESIRED_SEPARATION = 10,
        MAX_SPEED = 20;
    
    this.position = position;
    this.velocity = new Vector();

    this.steer_to = function (target) {
        var desired = Vector.substract(target, this.position),
            d = desired.magnitude(),
            steer;
        
        if (d > 0) {
            desired.normalize();
            
            if (d < 100.0)
                desired.multiplyScalar(MAX_SPEED * (d / 100.0));
            else
                desired.multiplyScalar(MAX_SPEED);
            
            steer = desired.substract(this.velocity);
        }
        else {
            steer = new Vector();
        }
        
        return steer;
        /*# A vector pointing from the location to the target
        desired = Vector.subtract(target, @location)
        # Distance from the target is the magnitude of the vector
        d = desired.magnitude()

        # If the distance is greater than 0, calc steering
        # (otherwise return zero vector)
        if d > 0
          desired.normalize()

          # Two options for desired vector magnitude
          # (1 -- based on distance, 2 -- maxspeed)
          if d < 100.0
            # This damping is arbitrary
            desired.multiply(MAX_SPEED*(d/100.0))
          else
            desired.multiply(MAX_SPEED)

          # Steering = Desired minus Velocity
          steer = desired.subtract(@velocity)
          # Limit to maximum steering force
          steer.limit(MAX_FORCE)
        else
          steer = new Vector(0,0)

        return steer*/
    };
    
    this.cohere = function (neighbours) {
        var sum = new Vector(),
            count = 0,
            len = neighbours.length,
            i;

        for (i = 0; i < len; i++) {
            var b = neighbours[i],
                d = this.position.distance(b.position);

            if (d > 0 && d < NEIGHBOURS_RADIUS) {
                sum.add(b.position);
                count++;
            }
        }

        if (count > 0)
            return this.steer_to(sum.divide(count)); // fix
        else
            return sum;
    };
    
    this.align = function (neighbours) {
        var mean = new Vector(),
            count = 0,
            len = neighbours.length,
            i;

        for (i = 0; i < len; i++) {
            var b = neighbours[i],
                d = this.position.distance(b.position);

            if (d > 0 && d < NEIGHBOURS_RADIUS) {
                mean.add(b.velocity);
                count++;
            }
        }

        if (count > 0)
            mean.divideScalar(count);

        return mean; // Vector.divideScalar(mean.substract(this.velocity), 8); // or just mean
    };

    this.separate = function (neighbours) {
        var mean = new Vector(),
            count = 0,
            len = neighbours.length,
            i;

        for (i = 0; i < len; i++) {
            var b = neighbours[i],
                d = this.position.distance(b.position);

            if (d > 0 && d < DESIRED_SEPARATION) {
                mean.add(Vector.substract(this.position, b.position).normalize().divideScalar(d));
                count++;
            }
        }

        if (count > 0)
            mean.divideScalar(count);
        
        return mean;
        /*mean = new Vector
        count = 0
        for boid in neighbours
          d = @location.distance(boid.location)
          if d > 0 and d < DESIRED_SEPARATION
            # Normalized, weighted by distance vector pointing away from the neighbour
            mean.add Vector.subtract(@location,boid.location).normalize().divide(d)
            count++

        mean.divide(count) if count > 0
        mean*/
    };

    this.flock = function (neighbours) {
        var v1 = this.cohere(neighbours),   // Rule 1
            v2 = this.separate(neighbours), // Rule 2
            v3 = this.align(neighbours);  // Rule 3
        
        return v1.add(v2).add(v3);
    };

    this.step = function (neighbours) {
        var acceleration = this.flock(neighbours);
        
        this.velocity.add(acceleration);
        this.position.add(this.velocity);
    };

    this.render = function (ctx) {
        ctx.beginPath();
        ctx.arc(this.position.x, this.position.y, 10, 0, 2 * Math.PI, false);
        ctx.fillStyle = 'white';
        ctx.fill();
    };
}