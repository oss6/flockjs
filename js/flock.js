var Flock = (function (undefined) {
    
    var canvas,
        ctx,
        FPS = 30,
        
        boids = [],
        INITIAL_BOIDS = 100;
    
    var set_size = function (width, height) {
        ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
        canvas.width = width;
        canvas.height = height;
    };
    
    var resize_handler = function () {
        set_size(window.innerWidth, window.innerHeight);
    };
    
    var init_boids = function () {
        for (var i = 0; i < INITIAL_BOIDS; i++) {
            var start = new Vector().randomize(new Vector(0, 0), new Vector(canvas.width, canvas.height)),
                boid = new Boid(start);
            
            boids.push(boid);
        }
    };
    
    var loop = function () {
        var len = boids.length, i;
        
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        for (i = 0; i < len; i++) {
            var boid = boids[i],
                x = boid.position.x,
                y = boid.position.y;
            
            if (x <= 0 || x >= canvas.width) {
                boid.position.invertX();
            }
            
            if (y <= 0 || y >= canvas.height) {
                boid.position.invertY();
            }
            
            // Perform step and render
            boid.step(boids);
            boid.render(ctx);
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
            setInterval(loop, 1000 / FPS);
        }
        else {
               
        }
    };
    
    return {
        'init': init
    }
})();