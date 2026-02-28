import type HintData from "@/components/HintData";
import type PopitData from "@/components/PopitData";
import type PopitOption from "@/components/PopitOption";
import { removeFromCollection } from "@/utilities/MyCollections";
import { defineStore } from "pinia";
import { ref, type Ref } from "vue";

let hintId = 0;

export const usePopitStore = defineStore('popit', () => {

  const arr: Ref<PopitData[]> = ref([]);

  const hints: Ref<HintData[]> = ref([]);

  function addPopit(title: string, options: PopitOption[], canHide: boolean = true, canClose: boolean = true, closeCallback: ((data: PopitData) => void) | undefined = undefined) {

    // position: 'absolute', top: '300px', left: '500px', width: '500px', height: '500px'
    const data: PopitData = {
      title: title,
      options: options,
      canHide: canHide,
      canClose: canClose,
      finished: false,
      closeCallback: closeCallback
    };

    arr.value.push(data);

    return data;
  }

  function addHint(text: string) {

    const data: HintData = {
      id: hintId++,
      text: text
    };

    hints.value.push(data);

    return data;
  }

  function removeHint(data: HintData) {
    removeFromCollection(hints.value, h => h.id === data.id);
  }

  return { arr, addPopit, hints, addHint, removeHint };
});
