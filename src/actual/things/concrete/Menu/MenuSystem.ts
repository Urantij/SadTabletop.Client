import type LeGame from "@/actual/LeGame";
import EntitiesSystem from "../../EntitiesSystem";
import type Menu from "./Menu";
import type SendServerMenuMessage from "./Messages/Client/SendServerMenuMessage";

export default class MenuSystem extends EntitiesSystem<Menu> {

  readonly leGame: LeGame;

  constructor(leGame: LeGame) {
    super();

    this.leGame = leGame;
  }

  isIncludedEntityByType(type: string): boolean {
    return type === "Menu";
  }

  sendAction(serverId: number) {
    const msg: SendServerMenuMessage = {
      serverId: serverId
    };

    this.leGame.connection.sendMessage("SendServerMenuMessage", msg);
  }
}
