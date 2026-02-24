import type TypedEmitter from "@/utilities/TypedEmiiter";
import type Connection from "@/communication/Connection";
import type PlaySoundMessage from "./Messages/Server/PlaySoundMessage";
import type StopSoundMessage from "./Messages/Server/StopSoundMessage";
import SoundCategory from "./SoundCategory";

type SoundEvents = {
  SoundNeedsToBePlayed: (name: string, multiplier: number, playId: number | null, category: SoundCategory) => void;
  SoundNeedsToBeStopped: (playId: number) => void;
}

export default class SoundsSystem {

  readonly events: TypedEmitter<SoundEvents> = new Phaser.Events.EventEmitter();

  constructor() {

  }

  subscribeToConnection(connection: Connection) {
    connection.registerForMessage<PlaySoundMessage>("PlaySoundMessage", msg => this.soundToBePlayed(msg));
    connection.registerForMessage<StopSoundMessage>("StopSoundMessage", msg => this.soundToBeStopped(msg));
  }

  private soundToBePlayed(msg: PlaySoundMessage): void {

    const multiplier = msg.multiplier ?? 1;
    const playId = msg.playId ?? null;
    const category = msg.category ?? SoundCategory.Effect;

    this.events.emit("SoundNeedsToBePlayed", msg.assetName, multiplier, playId, category);
  }

  private soundToBeStopped(msg: StopSoundMessage): void {
    this.events.emit("SoundNeedsToBeStopped", msg.id);
  }
}
