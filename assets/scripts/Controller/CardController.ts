import { _decorator, Button, CCFloat, Component, Node, tween, Vec3 } from "cc";
const { ccclass, property } = _decorator;

@ccclass("CardController")
export class CardController extends Component {
  @property(Node)
  cardFront = null;

  @property(Node)
  cardBack = null;

  @property(Node)
  cardContainer = null;

  @property(CCFloat)
  cardFlipTime = 0;

  @property(Button)
  cardFlipButton = null;

  isAnimRun = false;

  start() {
    this.cardBack.active = false;
    this.cardFront.active = true;
  }

  update(deltaTime: number) {}

  startCardFlip() {
    if (!this.isAnimRun) {
      this.isAnimRun = true;
      this.cardFlipButton.interactable = false;
      tween(this.cardContainer)
        .to(
          this.cardFlipTime,
          { scale: new Vec3(0, 1, 1) },
          { easing: "sineOut" }
        )
        .call(() => {
          this.cardBack.active = !this.cardBack.active;
          this.cardFront.active = !this.cardFront.active;
        })
        .to(
          this.cardFlipTime,
          { scale: new Vec3(1, 1, 1) },
          { easing: "sineIn" }
        )
        .call(() => {
          this.isAnimRun = false;
          this.cardFlipButton.interactable = true;
        })
        .start();
    }
  }
}
