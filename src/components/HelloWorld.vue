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
            <span :style="{ '--value': counts }"></span>
          </span>
        </p>
        <input
          type="range"
          min="1"
          max="80"
          v-model.lazy="counts"
          class="range"
        />
      </div>
      <div v-if="display[2]">
        <h3 class="font-bold text-lg">开始吧</h3>
        <p class="py-4 sm:hidden">
          对于手机用户，可以点击右下角的按钮添加到主屏幕，这样就可以像使用APP一样使用了
        </p>
      </div>

      <div class="modal-action">
        <button v-if="!display[2]" @click="toDisplay" class="btn mr-2">
          下一个
        </button>
        <button class="btn" @click="promptToAddToHomeScreen">
          添加到主屏幕
        </button>

        <form method="dialog">
          <!-- if there is a button in form, it will close the modal -->
          <button class="btn">关闭</button>
        </form>
      </div>
    </div>
  </dialog>
</template>
<script setup lang="ts">
import { onMounted, ref } from "vue";
const firstModal = ref(null || HTMLElement);
const display = ref([true, false, false]);
const index = ref(0);
const counts = ref(15);
const question = ref([
  {
    que: "什么是构件",
    ans: "构件是指语义完整、语法正确、有可重用价值的单位软件，是软件重用过程中可以明确辨识的系统。",
  },
  {},
]);

onMounted(() => {
  (firstModal.value as any).showModal();
});
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
let deferredPrompt;

window.addEventListener("beforeinstallprompt", (e) => {
  // 阻止默认提示行为，保存事件供稍后使用
  e.preventDefault();
  deferredPrompt = e;
});

const promptToAddToHomeScreen = () => {
  if (deferredPrompt) {
    deferredPrompt.prompt();
    deferredPrompt.userChoice.then((choiceResult) => {
      if (choiceResult.outcome === "accepted") {
        console.log("用户添加了PWA到主屏幕");
      } else {
        console.log("用户拒绝将PWA添加到主屏幕");
      }
      deferredPrompt = null;
    });
  } else {
    console.log("没有可用的添加到主屏幕的提示");
  }
};
</script>
