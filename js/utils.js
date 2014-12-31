var $u = {
    'random': function (min, max) {
        return Math.floor(Math.random() * (max - min + 1) + min);
    },
    
    'rad': function (deg) {
        return deg * (Math.PI / 180);
    },
    
    'deg': function (rad) {
        return rad * (180 / Math.PI);
    }
};