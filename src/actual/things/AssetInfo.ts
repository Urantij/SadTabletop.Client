import type AssetVariant from "./AssetVariant";
import type Entity from "./Entity";

export default interface AssetInfo extends Entity {
  name: string;
  url: string;
  variant: AssetVariant;
}
