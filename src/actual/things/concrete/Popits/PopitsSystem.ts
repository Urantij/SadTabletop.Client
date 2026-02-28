import type TypedEmitter from "@/utilities/TypedEmiiter";
import EntitiesSystem, { type EntitiesEvents } from "../../EntitiesSystem";
import type Popit from "./Popit";
import type LeGame from "@/actual/LeGame";
import type ChoosePopitMessage from "./Messages/Client/ChoosePopitMessage";

type PopitEvents = EntitiesEvents<Popit> & {
  // ItemMoved: (item: TableItem, oldX: number, oldY: number) => void;
  // DescriptionChanged: (item: TableItem, old: string | null) => void;
}

export default class PopitsSystem extends EntitiesSystem<Popit> {

  declare events: TypedEmitter<PopitEvents>;

  readonly game: LeGame;

  constructor(game: LeGame) {
    super();
    this.game = game;
  }

  isIncludedEntityByType(type: string): boolean {
    return type === "Popit";
  }

  sendChoice(popit: Popit, index: number | null) {

    const message: ChoosePopitMessage = {
      popit: popit.id,
      choice: index
    };

    this.remove(popit.id);

    this.game.connection.sendMessage("ChoosePopitMessage", message);
  }
}
