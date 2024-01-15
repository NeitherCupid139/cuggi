<template>
  <PopModal v-if="useCounterStore().firstShow"></PopModal>
  <TipsBar :type="correct"></TipsBar>
  <div
    @touchmove.prevent
    class="w-full h-screen flex justify-center items-center"
  >
    <div class="w-2/3 flex flex-col border-opacity-50">
      <label class="swap swap-flip text-3xl">
        <input @click="tips = !tips" type="checkbox" />

        <div class="swap-on">😈</div>
        <div class="swap-off">😇</div>
      </label>
      <span @click="speech.play()">
        <svg
          class="swap-on fill-current"
          xmlns="http://www.w3.org/2000/svg"
          width="48"
          height="48"
          viewBox="0 0 24 24"
        >
          <path
            d="M14,3.23V5.29C16.89,6.15 19,8.83 19,12C19,15.17 16.89,17.84 14,18.7V20.77C18,19.86 21,16.28 21,12C21,7.72 18,4.14 14,3.23M16.5,12C16.5,10.23 15.5,8.71 14,7.97V16C15.5,15.29 16.5,13.76 16.5,12M3,9V15H7L12,20V4L7,9H3Z"
          />
        </svg>
      </span>

      <div
        v-if="words.length > 0"
        class="grid h-20 card bg-base-300 rounded-box place-items-center"
      >
        {{ tips ? words[index].word : words[index].des }}
      </div>

      <div class="divider">{{ index + 1 }}</div>
      <div class="grid h-20 card bg-base-300 rounded-box place-items-center">
        <input
          v-model="inputVal"
          type="text"
          placeholder="Type here"
          class="input input-bordered w-full max-w-xs"
        />
      </div>
      <div class="my-4 flex justify-between">
        <button
          @mousedown="activeSound.play"
          @mouseup="soundOn.play"
          @click="back"
          class="btn"
        >
          上一个
        </button>
        <button
          @mousedown="activeSound.play"
          @mouseup="soundOn.play"
          @click="next"
          class="btn"
        >
          下一个
        </button>
        <button
          @mousedown="activeSound.play"
          @mouseup="soundOn.play"
          @click="check"
          class="btn"
        >
          检查
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import PopModal from "@/components/PopModal.vue";
import TipsBar from "@/components/TipsBar.vue";
import { useCounterStore } from "@/stores/count";
import { speechVoice } from "@/utils/speechVoice";
import { showNotification } from "@/utils/notification";
import { wordsRequest } from "@/utils/request";
import { dayProcess } from "@/utils/processDay";
import { useSound } from "@vueuse/sound";
import popDown from "/pop-down.mp3";
import popUpOn from "/pop-up-on.mp3";
import JSConfetti from "js-confetti";

const confetti = new JSConfetti();

function showConfetti() {
  confetti.addConfetti();
}

const activeSound = useSound(popDown);
const soundOn = useSound(popUpOn);

const inputVal = ref("");
const correct = ref<"success" | "error" | "">("");
const tips = ref<boolean>(false);
const index = ref(0);
const speech = new speechVoice();
const words = ref<{ word: string; pron: string; des: string }[]>([
  { word: "", pron: " ", des: "" },
]);
onMounted(async () => {
  words.value = (await wordsRequest()).value;
  speech.initSpeech();
  speech.setText(words.value[index.value].word);
  dayProcess();
});

function next() {
  if (index.value < useCounterStore().count - 1) {
    index.value++;
  } else {
    if (useCounterStore().notified != true) {
      showNotification("今日单词已背完");
      showConfetti();
      useCounterStore().notified = true;
      dayProcess();
    }
  }
  inputVal.value = "";
  speech.setText(words.value[index.value].word);
}
function back() {
  if (index.value > 0) {
    index.value--;
  }
  inputVal.value = "";
  speech.setText(words.value[index.value].word);
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
