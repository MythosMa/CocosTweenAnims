import { CCInteger, CCString } from "cc";
import { NodeEventType } from "cc";
import { _decorator, Component, Node } from "cc";
import { EventTargetType, ItemButtonEventTarget } from "../Utils/EventUtils";
const { ccclass, property } = _decorator;

@ccclass("ItemButtonController")
export class ItemButtonController extends Component {
  @property(CCInteger)
  buttonIndex = 0;

  buttonEvent = ItemButtonEventTarget;

  start() {
    this.node.on(NodeEventType.TOUCH_END, () => {
      this.buttonEvent.emit(
        EventTargetType.ITEM_BUTTON_EVENT,
        this.buttonIndex
      );
    });
  }

  update(deltaTime: number) {}
}
