import type MenuActionBase from "../MenuActionBase";

export default interface MultiMenuAction extends MenuActionBase {
  subActions: MenuActionBase[];
}
