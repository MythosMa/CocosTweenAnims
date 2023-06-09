import { _decorator, Component, instantiate, Node, Prefab } from "cc";
import { EventTargetType, ItemButtonEventTarget } from "../Utils/EventUtils";
const { ccclass, property } = _decorator;

@ccclass("GameController")
export class GameController extends Component {
  @property([Prefab])
  prefabs = [];

  @property(Node)
  spritePositionNode = null;

  buttonEvent = ItemButtonEventTarget;

  start() {
    this.buttonEvent.on(
      EventTargetType.ITEM_BUTTON_EVENT,
      this.itemButtonEvent,
      this
    );
  }

  update(deltaTime: number) {}

  itemButtonEvent(event) {
    this.spritePositionNode.removeAllChildren();
    let prefab = this.prefabs[event];
    let node = instantiate(prefab);
    node.parent = this.spritePositionNode;
  }
}
