function Flock () {
    this.boids = [];
    
    this.add_boid = function (b) {
        this.boids.push(b);
    };
    
    this.run = function () {
        var i, len = this.boids.length;
        
        for (i = 0; i < len; i++) {
            var b = this.boids[i];
            b.run(this.boids); 
        }
    };
}