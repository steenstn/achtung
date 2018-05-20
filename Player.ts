class Player {
  private static readonly turningSpeed = 0.06

  public gameon : boolean;
  public alive: boolean;
  private x: number;
  private y: number;
  private oldx: number;
  private oldy: number;
  private angle: number;
  private readonly color: string;
  private holeTimer : number;
  private hole: boolean;


  constructor(x: number, y: number, color: string) {
    this.x = x;
    this.y = y;
    this.color = color;
    this.gameon = true;
    this.angle = Math.random()*2*Math.PI;
    this.alive = true;
    this.holeTimer = Math.round(Math.random()*140+60);
    this.hole = false;
  }

  hasCollided(context) {
    if(this.hole) {
      return false;
    }
    var xToCheck = this.x + 2*Math.cos(this.angle);
    var yToCheck = this.y + 2*Math.sin(this.angle);

    var targetPixel = context.getImageData(Math.round(xToCheck), Math.round(yToCheck), 1, 1);

    var r = targetPixel.data[0];
    var g = targetPixel.data[1];
    var b = targetPixel.data[2];

    if(r > 0 || g > 0 || b > 0) {
      return true;
    }
    return false;

  }

  holeControl() {
    this.holeTimer--;
    if(this.holeTimer <= 0 && this.hole === false) {
      this.hole = true;
      this.holeTimer = Math.round(Math.random()*13+5);
    }

    if(this.holeTimer <= 0 && this.hole === true) {
      this.hole = false;
      this.holeTimer = Math.round(Math.random()*140+60);
    }
  }
  move() {
    this.oldx = this.x;
    this.oldy = this.y;
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

    if(this.hole) {
      context.fillStyle = "#000";
      context.beginPath();
      context.rect(Math.round(this.oldx), Math.round(this.oldy), 1,1);
      context.closePath();
      context.fill();
    }
  }
}
