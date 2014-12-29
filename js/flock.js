var Flock = (function (undefined) {
    
    var canvas,
        ctx,
        FPS = 20,
        
        boids = [],
        INITIAL_BOIDS = 20,
        NEIGHBOURS_RADIUS = 30;
    
    var set_size = function (width, height) {
        ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
        canvas.width = width;
        canvas.height = height;
    };
    
    var resize_handler = function () {
        set_size(window.innerWidth, window.innerHeight);
    };
    
    var Boid = function (position) {
        this.position = position;
        this.velocity = new Vector();
    };
    
    var init_boids = function () {
        for (var i = 0; i < INITIAL_BOIDS; i++) {
            var boid = {
                pos: { x: 0, y: 0 },
                angle: 0
            };
            
            boids.push(boid);
        }
    };
        
    var neighbours = function () {
        
    };
        
    var cohesion = function (boid) {
        /*Vector pcJ

		FOR EACH BOID b
			IF b != bJ THEN
				pcJ = pcJ + b.position
			END IF
		END

		pcJ = pcJ / N-1

		RETURN (pcJ - bJ.position) / 100*/
    };
    
    var alignment = function (boid) {
        /*Vector pvJ

		FOR EACH BOID b
			IF b != bJ THEN
				pvJ = pvJ + b.velocity
			END IF
		END

		pvJ = pvJ / N-1

		RETURN (pvJ - bJ.velocity) / 8*/
    };
    
    var separation = function (boid) {
        /*Vector c = 0;

		FOR EACH BOID b
			IF b != bJ THEN
				IF |b.position - bJ.position| < 100 THEN
					c = c - (b.position - bJ.position)
				END IF
			END IF
		END

		RETURN c*/
    };
    
    var loop = function () {
        var len = boids.length, i;
        
        for (i = 0; i < len; i++) {
            var boid = boids[i];
            
            var v1 = cohesion(boid),   // Rule 1
                v2 = separation(boid), // Rule 2
                v3 = alignment(boid);  // Rule 3
            
            b.velocity = b.velocity.add(v1).add(v2).add(v3);
            b.position = b.position.add(b.velocity);
        }
    };
    
    var init = function () {
        canvas = document.getElementById('world');
        
        if (canvas && canvas.getContext) {
            ctx = canvas.getContext('2d');
            
            // Event listeners
            window.addEventListener('resize', resize_handler, false);
            
            // Set full size and start main loop
            set_size(window.innerWidth, window.innerHeight);
            init_boids();
            setInterval(loop, FPS);
        }
        else {
               
        }
    };
    
    return {
        'init': init
    }
})();