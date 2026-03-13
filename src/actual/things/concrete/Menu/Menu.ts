import type Entity from "../../Entity";
import type MenuButton from "./MenuButton";

export default interface Menu extends Entity {
  title: string;
  buttons: MenuButton[];
}
