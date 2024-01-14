import { defineStore } from "pinia";
import { ref } from "vue";

export const useCounterStore = defineStore(
  "counter",
  () => {
    const firstShow = ref(true);
    const count = ref(20);
    const lastTime = ref(0);
    const beginIndex = ref(0);
    const notified = ref(false);

    function notInitial() {
      firstShow.value = false;
    }
    function changeIndex(day: number) {
      beginIndex.value = beginIndex.value + count.value * day;
    }
    return {
      firstShow,
      count,
      notInitial,
      lastTime,
      beginIndex,
      changeIndex,
      notified,
    };
  },
  {
    persist: true,
  }
);
