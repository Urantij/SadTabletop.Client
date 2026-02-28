import type Entity from "../../Entity";

export default interface Popit extends Entity {
  title: string;
  options: string[];
  canSkip: boolean;
}
