/**
 * @description 单词请求
 * @version 0.0.1
 * @since 2023-01-15
 * @author Creed Chung
 * @example
 * @returns
 */
import axios from "axios";
import { ref } from "vue";
import { useCounterStore } from "@/stores/count";
const words = ref<
  {
    word: string;
    pron: string;
    des: string;
  }[]
>([]);

export async function wordsRequest() {
  let beginIndex = useCounterStore().beginIndex;
  let count = useCounterStore().count;
  try {
    const res = await axios.get("/words.json");
    words.value = JSON.parse(JSON.stringify(res.data)).slice(
      beginIndex,
      beginIndex + count
    );
    return words;
  } catch (error) {
    console.error("Error fetching words:", error);
    throw error;
  }
}
