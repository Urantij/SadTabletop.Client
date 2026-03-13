import type MenuActionBase from "./MenuActionBase";

export default interface MenuButton {
  text: string;
  color: string | null | undefined;
  action: MenuActionBase;
}
