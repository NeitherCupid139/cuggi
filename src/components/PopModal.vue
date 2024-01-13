<template>
  <!-- Open the modal using ID.showModal() method -->
  <dialog
    ref="firstModal"
    id="firstModal"
    class="modal modal-bottom sm:modal-middle"
  >
    <div class="modal-box">
      <div v-if="display[0]">
        <h3 class="font-bold text-lg">欢迎新朋友</h3>
        <p class="py-4">这是一款背单词的小玩具，由Creed Chung用❤️制作</p>
      </div>
      <div v-if="display[1]">
        <h3 class="font-bold text-lg">选一个吧</h3>
        <p class="py-4">
          你想每天背多少单词呢?😎
          <span class="countdown">
            <span :style="{ '--value': count }"></span>
          </span>
        </p>
        <input
          type="range"
          min="1"
          max="80"
          v-model.lazy="count"
          class="range"
        />
      </div>
      <div v-if="display[2]">
        <h3 class="font-bold text-lg">开始吧</h3>
        <p class="py-4 hidden sm:block">
          对于PC用户，点击下方的按钮<kbd class="kbd mx-2">安装PWA应用</kbd
          >就可以把这个小玩具安装到你的电脑上了
        </p>
        <p class="py-4 sm:hidden">
          对于IOS/IPadOS用户，使用Safari浏览器，点击<kbd class="kbd mx-2"
            >分享</kbd
          >按钮，选择<kbd class="kbd mx-2">添加到主屏幕</kbd>
          就可以把这个小玩具安装到你的设备上了
        </p>
      </div>

      <div class="modal-action">
        <!-- change to next modal -->
        <button v-if="!display[2]" @click="toDisplay" class="btn mr-2">
          下一个
        </button>
        <!-- install PWA app -->
        <button v-if="a2hsBtn" class="btn" @click="promptToAddToHomeScreen">
          安装PWA应用
        </button>
        <!-- close modal -->
        <form method="dialog">
          <!-- if there is a button in form, it will close the modal -->
          <button class="btn" @click="store.notInitial">关闭</button>
        </form>
      </div>
    </div>
  </dialog>
</template>
<script setup lang="ts">
import { onMounted, ref } from "vue";
import { useCounterStore } from "../stores/count";
import { storeToRefs } from "pinia";
const firstModal = ref(null || HTMLElement);
const display = ref([true, false, false]);
const index = ref(0);
const store = useCounterStore();
const counts = storeToRefs(store);
const count = counts.count;
const firstShow = counts.firstShow.value;

const a2hsBtn = ref(true);
let deferredPrompt: any | null = null;

// init
onMounted(() => {
  if (!firstShow) {
    (firstModal.value as any).close();
  } else {
    (firstModal.value as any).showModal();
  }
  window.addEventListener("beforeinstallprompt", (e: any) => {
    e.preventDefault();
    deferredPrompt = e;
  });
  if (checkPWAInstalled() || checkDeviceType() == "mobile") {
    a2hsBtn.value = false;
  }
});
// add to home screen
function promptToAddToHomeScreen() {
  if (deferredPrompt) {
    deferredPrompt.prompt();
  }
}

// display
function toDisplay() {
  index.value++;
  if (index.value == 3) {
    index.value = 0;
  }
  for (let i = 0; i < display.value.length; i++) {
    display.value[i] = false;
  }
  display.value[index.value] = true;
}
// chcek if PWA installed
function checkPWAInstalled() {
  return window.matchMedia("(display-mode: standalone)").matches;
}
// check device type(web or mobile)
function checkDeviceType() {
  return window.matchMedia("(display-mode: standalone)").matches
    ? "mobile"
    : "web";
}
</script>
