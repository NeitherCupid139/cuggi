/**
 * @description 设备类型检测器
 * @version 0.0.1
 * @since 2023-01-14
 * @author Creed Chung
 * @example
 * import { deviceDetector } from "@/utils/deviceDetector";
 * const deviceType = deviceDetector();
 * console.log(deviceType.value); // desktop | mobile | unknown
 * @returns {string} 设备类型
 */

import { ref } from "vue";

// 设备类型
type DeviceType = "desktop" | "mobile" | "unknown";
export function deviceDetector(): string {
  // 创建一个可响应的引用存储设备类型
  const deviceType = ref<DeviceType>("unknown");
  // 通过navigator.userAgent判断设备类型
  const userAgent = navigator.userAgent.toLowerCase();
  if (
    userAgent.includes("iphone") ||
    userAgent.includes("android") ||
    userAgent.includes("ipad")
  ) {
    deviceType.value = "mobile";
  } else if (userAgent.includes("windows") || userAgent.includes("macintosh")) {
    deviceType.value = "desktop";
  } else {
    deviceType.value = "unknown";
  }
  // 返回设备类型
  return deviceType.value;
}
