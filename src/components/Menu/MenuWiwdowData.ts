import type Menu from "@/actual/things/concrete/Menu/Menu";
import type WiwdowBaseData from "../Wiwdow/WiwdowBaseData";

export default interface MenuWiwdowData extends WiwdowBaseData {
  menu: Menu;
}
