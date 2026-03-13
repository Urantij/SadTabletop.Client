import type MenuActionBase from "../MenuActionBase";

export default interface SendServerMenuAction extends MenuActionBase {
  serverId: number;
}
