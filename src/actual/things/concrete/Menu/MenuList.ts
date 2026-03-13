import type Entity from "../../Entity";
import type MenuButton from "./MenuButton";

export default interface MenuList extends Entity {
  buttons: MenuButton[];
}
