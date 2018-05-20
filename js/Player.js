var Player = (function () {
    function Player(x, y, color) {
        this.x = x;
        this.y = y;
        this.color = color;
        this.gameon = true;
        this.angle = Math.random() * 2 * Math.PI;
        this.alive = true;
    }
    Player.prototype.hasCollided = function (context) {
        var xToCheck = this.x + 2 * Math.cos(this.angle);
        var yToCheck = this.y + 2 * Math.sin(this.angle);
        var targetPixel = context.getImageData(xToCheck, yToCheck, 1, 1);
        var r = targetPixel.data[0];
        var g = targetPixel.data[1];
        var b = targetPixel.data[2];
        if (r > 0 || g > 0 || b > 0) {
            return true;
        }
        return false;
    };
    Player.prototype.move = function () {
        this.x += Math.cos(this.angle);
        this.y += Math.sin(this.angle);
    };
    Player.prototype.turnRight = function () {
        this.angle += Player.turningSpeed;
    };
    Player.prototype.turnLeft = function () {
        this.angle -= Player.turningSpeed;
    };
    Player.prototype.render = function (context) {
        context.fillStyle = this.color;
        context.beginPath();
        context.rect(Math.round(this.x), Math.round(this.y), 1, 1);
        context.closePath();
        context.fill();
    };
    return Player;
}());
Player.turningSpeed = 0.06;
