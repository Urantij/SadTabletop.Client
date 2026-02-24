import type SoundCategory from "../../SoundCategory";

export default interface PlaySoundMessage {
  assetName: string;
  multiplier: number | null | undefined;
  playId: number | null | undefined;
  category: SoundCategory | null | undefined;
  loop: boolean | null | undefined;
}
