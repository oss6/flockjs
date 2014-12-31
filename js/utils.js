function random (min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

function radians (deg) {
    return deg * (Math.PI / 180);
}

function deg (rad) {
    return rad * (180 / Math.PI);
}