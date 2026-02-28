<script setup lang="ts">
import { useUserStore } from '@/stores/UserStore';
import { onMounted, onUnmounted, ref, useTemplateRef, watch, type WatchHandle } from 'vue';
import DumbWindow from '../DumbWindow.vue';
import type SettingsWiwdowData from './SettingsWiwdowData';
import { getSoundCategoryName } from '@/actual/things/concrete/Sounds/SoundCategory';

const userStore = useUserStore();

const name = ref(userStore.name);

const nameInput = useTemplateRef("nameInput");

const props = defineProps<{
  data: SettingsWiwdowData
}>();

const emits = defineEmits<{
  "closeMe": []
}>();

function closeClicked() {
  emits("closeMe");
}

function changeNameClicked() {
  if (nameInput.value === null)
    return;

  userStore.setName(nameInput.value.value);
}

// изменение громкости через 100мса должно затригерить сохранение громкости.
const handles: WatchHandle[] = [];
let saveTimeoutHandle: undefined | number = undefined;
onMounted(() => {
  for (const data of userStore.volumes) {

    const handle = watch(() => data.value,
      () => {

        if (saveTimeoutHandle !== undefined) {
          clearTimeout(saveTimeoutHandle);
        }

        saveTimeoutHandle = setTimeout(() => {

          saveTimeoutHandle = undefined;

          console.log("сохраняемся в настроечках");

          userStore.saveVolumes();
        }, 100);
      });

    handles.push(handle);
  }
});

onUnmounted(() => {

  for (const handle of handles.splice(0)) {
    handle.stop();
  }
});

</script>

<template>
  <DumbWindow :style="[
    {
      backgroundColor: '#a9a9a9fc'
    }
  ]" :data="data" v-on:close-me="closeClicked()">
    <div>
      <span>Name:</span>
      <input ref="nameInput" :value="name" type="text"></input>
      <button v-on:click="() => changeNameClicked()">change</button>
    </div>
    <div>
      <span>лангуае</span>
      <input>рофлан ебало</input>
    </div>
    <div>
      <span>долбит нормально?</span>
      <template v-for="volume in userStore.volumes">
        <label :for="'v' + getSoundCategoryName(volume.category)">{{ getSoundCategoryName(volume.category)
          }}</label>
        <input v-model="volume.value" :name="'v' + getSoundCategoryName(volume.category)" type="range" min="0" max="1"
          step="0.01">
      </template>
    </div>
  </DumbWindow>
</template>
