/**
 * @description 语音合成器
 * @version 0.0.1
 * @since 2023-01-14
 * @author Creed Chung
 * @example
 * import { speechVoice } from "@/utils/speechVoice";
 * const speech = new speechVoice();
 * speech.setText("hello world");
 * speech.initSpeech();
 * speech.play();
 * speech.pause();
 * speech.stop();
 * @returns {void}
 */

import { ref } from "vue";
import { useSpeechSynthesis } from "@vueuse/core";
//需要发音的单词
const text = ref<string>("");
//  语音合成
const speech = useSpeechSynthesis(text, {
  lang: "en-US",
  pitch: 1,
  rate: 1,
  volume: 1,
});

export class speechVoice {
  // 设置语音合成器需要的文本
  public setText(newVal: string) {
    text.value = newVal;
  }
  // 初始化语音合成器
  public initSpeech() {
    if (speech.isSupported.value) {
      setTimeout(() => {
        window.speechSynthesis;
      });
    }
  }
  //  播放语音合成器
  public play() {
    if (speech.status.value === "pause") {
      console.log("resume");
      window.speechSynthesis.resume();
    } else {
      speech.speak();
    }
  }
  //   暂停语音合成器
  public pause() {
    window.speechSynthesis.pause();
  }
  //   停止语音合成器
  public stop() {
    speech.stop();
  }
}
