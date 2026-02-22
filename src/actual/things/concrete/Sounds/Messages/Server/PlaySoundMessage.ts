export default interface PlaySoundMessage {
  assetName: string;
  multiplier: number | null | undefined;
  playId: number | null | undefined;
}
