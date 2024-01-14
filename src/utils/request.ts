import axios from "axios";
import { ref } from "vue";

const words = ref<
  {
    word: string;
    pron: string;
    des: string;
  }[]
>([
  {
    word: "",
    pron: "",
    des: "",
  },
]);
export function getWordList() {

    
}
