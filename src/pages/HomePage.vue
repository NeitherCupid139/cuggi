<template>
  <PopModal v-if="useCounterStore().firstShow"></PopModal>
  <TipsBar :type="correct"></TipsBar>
  <div
    @touchmove.prevent
    class="w-full h-screen flex justify-center items-center"
  >
    <div class="w-2/3 flex flex-col border-opacity-50">
      <label class="swap swap-flip text-3xl">
        <!-- this hidden checkbox controls the state -->
        <input @click="tips = !tips" type="checkbox" />

        <div class="swap-on">😈</div>
        <div class="swap-off">😇</div>
      </label>

      <div class="grid h-20 card bg-base-300 rounded-box place-items-center">
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
      <div class="my-4">
        <button @click="next" class="btn">下一个</button>
        <button @click="check" class="btn">检查</button>
        <button @click="play" class="btn">》</button>
        <button @click="stop" class="btn">X</button>
        <div v-if="isSupported">
          <button @click="show()" class="btn">msg</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref, watchEffect } from "vue";
import PopModal from "../components/PopModal.vue";
import axios from "axios";
import TipsBar from "../components/TipsBar.vue";
import { useCounterStore } from "../stores/count";
import { useSpeechSynthesis } from "@vueuse/core";
import { useWebNotification } from "@vueuse/core";
import type { UseWebNotificationOptions } from "@vueuse/core";

const options: UseWebNotificationOptions = {
  title: "今天的单词已经学完了，继续保持哦！👍",
  dir: "auto",
  lang: "zh",
  renotify: true,
  tag: "test",
};
const { isSupported, show } = useWebNotification(options);
const inputVal = ref("");
const correct = ref<"success" | "error" | "">("");
const tips = ref<boolean>(false);
const index = ref(0);
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
    des: "",
  },
  {
    word: "hello",
    pron: "həˈloʊ",
    des: "",
  },
]);

const voice = ref<SpeechSynthesisVoice>(
  undefined as unknown as SpeechSynthesisVoice
);
let text = ref("");
watchEffect(() => {
  text.value = words.value[index.value].word;
});
const pitch = ref(1);
const rate = ref(1);

const speech = useSpeechSynthesis(text, {
  voice,
  pitch,
  rate,
});

let synth: SpeechSynthesis;

const voices = ref<SpeechSynthesisVoice[]>([]);

function play() {
  if (speech.status.value === "pause") {
    console.log("resume");
    window.speechSynthesis.resume();
  } else {
    speech.speak();
  }
}

function stop() {
  speech.stop();
}

onMounted(() => {
  let beginIndex = useCounterStore().beginIndex;
  let count = useCounterStore().count;
  // get data from local json file
  async function getData() {
    const res = await axios.get("/words.json");
    words.value = JSON.parse(JSON.stringify(res.data)).slice(
      beginIndex,
      beginIndex + count
    );
  }
  getData();
  if (useCounterStore().lastTime === 0) {
    useCounterStore().lastTime = new Date().getTime();
  }

  let diffDay: number = daysBetweenTimestamps(
    new Date().getTime(),
    useCounterStore().lastTime
  );
  if (diffDay >= 1) {
    useCounterStore().changeIndex(diffDay);
    useCounterStore().lastTime = new Date().getTime();
  }

  if (speech.isSupported.value) {
    // load at last
    setTimeout(() => {
      synth = window.speechSynthesis;
      voices.value = synth.getVoices();
      voice.value = voices.value[0];
    });
  }
});

function daysBetweenTimestamps(startTime: number, endTime: number) {
  var differenceInMilliseconds = Math.abs(endTime - startTime);
  var differenceInDays = Math.floor(
    differenceInMilliseconds / (1000 * 60 * 60 * 24)
  );

  return differenceInDays;
}

function next() {
  if (index.value >= useCounterStore().count) {
    show();
    useCounterStore().lastTime = new Date().getTime();
  } else {
    index.value++;
  }
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
