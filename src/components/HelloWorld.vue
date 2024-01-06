<template>
  <!-- Open the modal using ID.showModal() method -->
  <button class="btn hidden">open modal</button>
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

      <div class="modal-action">
        <button v-if="!display[2]" @click="toDisplay" class="btn mr-2">
          下一个
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
</script>
