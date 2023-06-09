import { _decorator, CCFloat, Component, Label, Node, Sprite } from "cc";
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

  start() {
    this.currentRadialTime = this.radialTime;
  }

  update(deltaTime: number) {
    if (this.isStartRadial) {
      this.currentRadialTime -= deltaTime;
      if (this.currentRadialTime < 0) {
        this.currentRadialTime = this.radialTime;
      }
      this.progressBar.getComponent(Sprite).fillRange =
        this.currentRadialTime / this.radialTime;
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
