var FlockModel = (function (undefined) {
    
    var canvas,
        ctx,
        FPS = 60,
        flock,
        INITIAL_BOIDS = 50;
    
    var set_size = function (width, height) {
        ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
        canvas.width = width;
        canvas.height = height;
    };
    
    var resize_handler = function () {
        set_size(window.innerWidth, window.innerHeight);
    };
    
    var click_handler = function (e) {
        flock.add_boid(new Boid(new Vector(e.clientX, e.clientY), ctx));
    };
    
    var init_boids = function () {
        flock = new Flock();
        
        for (var i = 0; i < INITIAL_BOIDS; i++) {
            var start = new Vector(canvas.width / 2, canvas.height / 2),
                boid = new Boid(start, ctx);
            
            flock.add_boid(boid);
        }
    };
    
    var loop = function () {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        flock.run();
    };
    
    var init = function () {
        canvas = document.getElementById('world');
        
        if (canvas && canvas.getContext) {
            ctx = canvas.getContext('2d');
            
            // Event listeners
            window.addEventListener('resize', resize_handler, false);
            window.addEventListener('click', click_handler, false);
            
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