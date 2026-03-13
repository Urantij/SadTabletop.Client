<script setup lang="ts">
import type MenuButton from '@/actual/things/concrete/Menu/MenuButton';
import DumbWindow from '../DumbWindow.vue';
import type MenuWiwdowData from './MenuWiwdowData';
import type MenuActionBase from '@/actual/things/concrete/Menu/MenuActionBase';
import { ref } from 'vue';
import type ChangeListMenuAction from '@/actual/things/concrete/Menu/Actions/ChangeListMenuAction';
import type LeGame from '@/actual/LeGame';
import type MultiMenuAction from '@/actual/things/concrete/Menu/Actions/MultiMenuAction';
import type SendServerMenuAction from '@/actual/things/concrete/Menu/Actions/SendServerMenuAction';

const props = defineProps<{
  game: LeGame,
  data: MenuWiwdowData,
}>();

const emits = defineEmits<{
  closeMe: [],
  hideMe: [],
}>();

const displayedButtons = ref(props.data.menu.buttons);

function butClicked(but: MenuButton) {
  executeMenuAction(but.action);
}

function executeMenuAction(action: MenuActionBase) {
  if (action.type === "ChangeListMenuAction") {
    const act = action as ChangeListMenuAction;

    const list = props.game.menuLists.get(act.menuTemplateId);

    displayedButtons.value = list.buttons;
  }
  else if (action.type === "CloseMenuAction") {
    close();
  }
  else if (action.type === "MultiMenuAction") {
    const act = action as MultiMenuAction;

    for (const subaction of act.subActions) {
      executeMenuAction(subaction);
    }
  }
  else if (action.type === "SendServerMenuAction") {
    const act = action as SendServerMenuAction;

    props.game.menu.sendAction(act.serverId);
  }
  else {
    console.error(`неизвестный тип екшена ${action.type}`);
  }
}

function close() {
  emits("closeMe");
}
function hide() {
  emits("hideMe");
}
</script>

<template>
  <DumbWindow :data="props.data" v-on:close-me="() => close()" v-on:hide-me="() => hide()">
    <template v-for="but in displayedButtons">
      <button v-on:click="() => butClicked(but)" :style="{
        backgroundColor: but.color ?? undefined
      }">{{ but.text }}</button>
    </template>
  </DumbWindow>
</template>

<style></style>
