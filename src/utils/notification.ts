/**
 * @description 通知工具
 * @version 0.0.1
 * @since 2023-01-14
 * @author Creed Chung
 * @example
 * import { showNotification } from "@/utils/notification";
 * showNotification("test");
 * @returns {void} 无返回值
 */

import { useWebNotification } from "@vueuse/core";
import type { UseWebNotificationOptions } from "@vueuse/core";
import { useCounterStore } from "@/stores/count";

const options: UseWebNotificationOptions = {
  title: "test",
  dir: "auto",
  lang: "zh",
  renotify: true,
  tag: "test",
};
const { show } = useWebNotification(options);
export function showNotification(msg: string): void {
  let notified = useCounterStore().notified;
  if (!notified) {
    options.title = msg;
    show();
  }
}
