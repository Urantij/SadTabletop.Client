import EntitiesSystem from "../../EntitiesSystem";
import type MenuList from "./MenuList";

export default class MenuListsSystem extends EntitiesSystem<MenuList> {
  isIncludedEntityByType(type: string): boolean {
    return type === "MenuList";
  }
}
