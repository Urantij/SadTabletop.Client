export default interface ItemClickyMessage {
  item: number;
  component: number;
  isClicky: boolean;
  singleUse: boolean | null | undefined;
  sendClickPosition: boolean | null | undefined;
}
