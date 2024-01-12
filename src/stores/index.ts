import { defineStore } from 'pinia'
import { ref } from 'vue'


// data persistence

export const useCounterStore = defineStore('counter', () => {
    const firstShow = ref(true);
    const count = ref(20);
    const head=ref(0);
    const tail=ref(head.value+count.value);
    const lastTime=ref(0);

    function notInitial() {
        firstShow.value = false;
    }
    return { firstShow,count,notInitial}
    
  },
  // {
  //   persist: {
  //     enabled: true, //Store中数据持久化生效
  //   },
  // }
  )



