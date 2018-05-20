class Player {
  private static readonly turningSpeed = 0.06

  public gameon : boolean;
  public alive: boolean;
  private x: number;
  private y: number;
  private angle: number;
  private readonly color: string;

  constructor(x: number, y: number, color: string) {
    this.x = x;
    this.y = y;
    this.color = color;
    this.gameon = true;
    this.angle = Math.random()*2*Math.PI;
    this.alive = true;
  }

  hasCollided(context) {
      var xToCheck = this.x + 2*Math.cos(this.angle);
      var yToCheck = this.y + 2*Math.sin(this.angle);

      var targetPixel = context.getImageData(xToCheck, yToCheck, 1, 1);
      //context.fillText(targetPixel.data, this.x, this.y);
      var r = targetPixel.data[0];
      var g = targetPixel.data[1];
      var b = targetPixel.data[2];

      if(r > 0 || g > 0 || b > 0) {
        return true;
      }
      return false;

  }

  move() {
    this.x += Math.cos(this.angle);
    this.y += Math.sin(this.angle);
  }

  turnRight() {
    this.angle+=Player.turningSpeed;
  }

  turnLeft() {
    this.angle-=Player.turningSpeed;
  }

  render(context: any) {
    context.fillStyle = this.color;
    context.beginPath();
    context.rect(Math.round(this.x), Math.round(this.y), 1,1);
    context.closePath();
    context.fill();
  }
}
