import SoundCategory from "@/actual/things/concrete/Sounds/SoundCategory";
import { getNumericEnums } from "@/utilities/MyCollections";
import { defineStore } from "pinia";
import { ref } from "vue";

const volumesName = "volumes";
const defaultVolumeValue = 0.5;

export interface VolumeData {
  category: SoundCategory | null;
  value: number;
}

export const useUserStore = defineStore('user', () => {
  const name = ref(window.localStorage.getItem("name") ?? "urod");
  const key = ref(window.localStorage.getItem("key"));

  const volumes = ref<VolumeData[]>([]);

  const volumesStr = window.localStorage.getItem(volumesName);

  if (volumesStr === null) {
    volumes.value.push({
      category: null,
      value: defaultVolumeValue
    });

    for (const category of getNumericEnums(SoundCategory)) {
      volumes.value.push({
        category: category as SoundCategory,
        value: defaultVolumeValue
      });
    }
  }
  else {
    const volumesData = JSON.parse(volumesStr) as VolumeData[];

    const masta = volumesData.find(vdata => vdata.category === null);
    const mastaValue = masta?.value ?? defaultVolumeValue;
    volumes.value.push({
      category: null,
      value: mastaValue
    });

    for (const category of getNumericEnums(SoundCategory)) {

      const existing = volumesData.find(vdata => vdata.category === category);

      const value = existing?.value ?? defaultVolumeValue;

      volumes.value.push({
        category: category as SoundCategory,
        value: value
      });
    }
  }

  function setName(newName: string) {
    name.value = newName;
    window.localStorage.setItem("name", newName);
  }

  function setKey(newKey: string) {
    key.value = newKey;
    window.localStorage.setItem("key", newKey);
  }

  function saveVolumes() {
    const data = JSON.stringify(volumes.value);

    window.localStorage.setItem(volumesName, data);
  }

  return { name, key, setName, setKey, volumes, saveVolumes };
});
