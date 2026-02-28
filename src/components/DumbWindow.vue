<script setup lang="ts">
import { useUiStore } from '@/stores/UiStore';
import type WiwdowBaseData from './Wiwdow/WiwdowBaseData';

const uiStore = useUiStore();

const props = defineProps<{
  data: WiwdowBaseData
}>();

const emits = defineEmits<{
  closeMe: [],
  hideMe: [],
}>();

function hideClicked() {
  emits("hideMe");
}

function closeClicked() {
  emits("closeMe");
}
</script>

// ааа смешная хуйня. если фон не полупрозрачный, часть экрана " зависает". обновляется только вещами поверх него
<template>

  <div :style="[
    {
      position: 'absolute',
      left: `${props.data.x}px`,
      top: `${props.data.y}px`,
      width: `${props.data.width}px`,
      height: `${props.data.height}px`,
      pointerEvents: 'auto',

      backgroundColor: '#a9a9a9fc'
    }]">
    <div :style="[{
      height: `${uiStore.titlesHeight}px`
    }]">
      <span v-if="props.data.title !== undefined">{{ props.data.title }}</span>
      <button @click="hideClicked()" v-if="props.data.canHide">_</button>
      <button @click="closeClicked()" v-if="props.data.canClose">X</button>
    </div>
    <div>
      <slot></slot>
    </div>
  </div>
</template>
