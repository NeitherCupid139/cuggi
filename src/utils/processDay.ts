/**
 * @description 处理每日单词
 * @version 0.0.1
 * @since 2023-01-15
 * @author Creed Chung
 * @example
 * import { dayProcess } from "@/utils/processDay";
 * dayProcess();
 * @returns void
 */
import { differenceInDays } from "date-fns";

import { useCounterStore } from "@/stores/count";

export function dayProcess(): void {
  const store = useCounterStore();
  const today = new Date();
  const lastTime = store.lastTime;

  if (lastTime) {
    const lastDay = differenceInDays(today, lastTime);
    if (lastDay > 0) {
      store.changeIndex(lastDay);
      store.notified = false;
      store.lastTime = today;
    }
  } else {
    store.lastTime = today;
  }
}
