<template>
  <PopModal></PopModal>
  <TipsBar :type="correct"></TipsBar>
  <div class="w-full h-screen flex justify-center items-center">
    <div class="flex flex-col w-1/2 border-opacity-50">
      <div class="grid h-20 card bg-base-300 rounded-box place-items-center">
        {{ words[index].word }}
      </div>
      <div class="divider">{{ index }}</div>
      <div class="grid h-20 card bg-base-300 rounded-box place-items-center">
        <input
          v-model="inputVal"
          type="text"
          placeholder="Type here"
          class="input input-bordered w-full max-w-xs"
        />
      </div>
      <div>
        <button @click="next" class="btn">下一个</button>
        <button @click="check" class="btn">检查</button>
      </div>
    </div>
  </div>
  <div class="btm-nav">
    <button>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="h-5 w-5"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
        />
      </svg>
    </button>
    <button class="active">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="h-5 w-5"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
    </button>
    <button>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="h-5 w-5"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
        />
      </svg>
    </button>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import PopModal from "../components/PopModal.vue";
import axios from "axios";
import TipsBar from "../components/TipsBar.vue";
import { useCounterStore } from "../stores/index";
const inputVal = ref("");
const correct = ref<"success" | "error" | "">("");

// const globalIndex = ref(0);
const index = ref(1);
const words = ref<
  {
    word: string;
    pron: string;
    des: string;
  }[]
>([
  {
    word: "hello",
    pron: "həˈloʊ",
    des: "你好",
  },
  {
    word: "hello",
    pron: "həˈloʊ",
    des: "你好",
  },
]);
onMounted(() => {
  // get data from local json file
  axios.get("/words.json").then((res) => {
    words.value = JSON.parse(JSON.stringify(res.data));
  });
});
function next() {
  if (index.value > useCounterStore().count) {
    index.value = 0;
  }
  index.value++;
}
function check() {
  if (inputVal.value === words.value[index.value].word) {
    correct.value = "success";
  } else {
    correct.value = "error";
  }
  setTimeout(() => {
    correct.value = "";
  }, 4000);
}
</script>

<style scoped></style>
