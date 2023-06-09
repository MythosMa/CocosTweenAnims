import {
  _decorator,
  CCFloat,
  Color,
  Component,
  Label,
  Node,
  Sprite,
  Vec3,
} from "cc";
const { ccclass, property } = _decorator;

@ccclass("AvatarController")
export class AvatarController extends Component {
  @property(Label)
  buttonLabel = null;

  @property(CCFloat)
  radialTime = 0;

  @property(Node)
  progressBar = null;

  currentRadialTime = 0;
  isStartRadial = false;

  colorChangeMap = [
    { startR: 148, startG: 255, startB: 242, endR: 255, endG: 199, endB: 56 },
    { startR: 255, startG: 199, startB: 56, endR: 255, endG: 107, endB: 74 },
  ];

  start() {
    this.currentRadialTime = this.radialTime;
  }

  update(deltaTime: number) {
    if (this.isStartRadial) {
      this.currentRadialTime -= deltaTime;
      if (this.currentRadialTime < 0) {
        this.currentRadialTime = this.radialTime;
      }
      let ratio = this.currentRadialTime / this.radialTime;
      this.progressBar.getComponent(Sprite).fillRange = -ratio;
      let percent = ((1 - ratio) * 10) / 5;
      let colorInfoIndex = Math.floor(percent);
      let colorInfo = this.colorChangeMap[colorInfoIndex];
      let { startR, startG, startB, endR, endG, endB } = colorInfo;
      let targetColor = new Color(
        startR - (startR - endR) * (percent - colorInfoIndex),
        startG - (startG - endG) * (percent - colorInfoIndex),
        startB - (startB - endB) * (percent - colorInfoIndex)
      );
      this.progressBar.getComponent(Sprite).color = targetColor;
      this.progressBar.angle = 360 * ratio;
    }
  }

  switchRadialStatus() {
    this.isStartRadial = !this.isStartRadial;
    if (this.isStartRadial) {
      this.buttonLabel.string = "停止雷达图倒计时";
    } else {
      this.buttonLabel.string = "开始雷达图倒计时";
    }
  }
}
