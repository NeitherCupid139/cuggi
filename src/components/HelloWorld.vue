<template>
  <RouterLink to="./about">❔</RouterLink>
  <h3>考研词汇</h3>
  <p>{{ index + "/" + msg.length }}</p>
  <h3 class="" v-show="bool">正确😊</h3>
  <div class="flex flex-col justify-center">
    <div>
      <h2>{{ msg[index].ch }}</h2>
      <span v-show="flag">{{ msg[index].eng }}</span>
    </div>
    <div class="rounded relative w-300px h-150px border-1px b-blue b-solid">
      <h2 class="absolute w-300px h-100px text-center top-20px">
        {{ youinput }}
      </h2>
      <input
        maxlength="20"
        class="op-0 w-full h-full b-none"
        type="text"
        v-model="youinput"
      />
    </div>
    <div class="mt-2">
      <button class="mt-8 w-150px h-100px" @click="next()">next</button>
      <br />
      <button class="mt-8 w-150px h-100px" @click="tip()">tip</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from "vue";
const youinput = ref<string>("");
let bool = ref<boolean>(false);
let flag = ref<boolean>(false);
let word = setTimeout(() => {
  flag.value = false;
}, 5000);
let msg: {
  eng: string;
  ch: string;
}[] = [
  {
    eng: "graduate",
    ch: "研究生",
  },
  {
    eng: "scholarship",
    ch: "奖学金",
  },
  {
    eng: "comprehensive",
    ch: "综合的",
  },
  {
    eng: "discipline",
    ch: "学科；纪律",
  },
  {
    eng: "academic",
    ch: "学术的",
  },
  {
    eng: "thesis",
    ch: "论文；论题",
  },
  {
    eng: "criterion",
    ch: "标准；准则",
  },
  {
    eng: "enrollment",
    ch: "录取；注册",
  },
  {
    eng: "faculty",
    ch: "全体教员；能力",
  },
  {
    eng: "semester",
    ch: "学期",
  },
  {
    eng: "syllabus",
    ch: "教学大纲",
  },
  {
    eng: "admission",
    ch: "入学；录取",
  },
  {
    eng: "examination",
    ch: "考试；检查",
  },
  {
    eng: "curriculum",
    ch: "课程；教学计划",
  },
  {
    eng: "semester",
    ch: "学期",
  },
  {
    eng: "professor",
    ch: "教授",
  },
  {
    eng: "tutor",
    ch: "导师；助教",
  },
  {
    eng: "dissertation",
    ch: "学位论文",
  },
  {
    eng: "reference",
    ch: "参考；引文",
  },
  {
    eng: "journal",
    ch: "期刊；日志",
  },
  {
    eng: "research",
    ch: "研究",
  },
  {
    eng: "methodology",
    ch: "方法论",
  },
  {
    eng: "literature",
    ch: "文献；文学",
  },
  {
    eng: "analysis",
    ch: "分析",
  },
  {
    eng: "conclusion",
    ch: "结论；结尾",
  },
  {
    eng: "critique",
    ch: "批评；评论",
  },
  {
    eng: "evidence",
    ch: "证据；证明",
  },
  {
    eng: "hypothesis",
    ch: "假设",
  },
  {
    eng: "qualify",
    ch: "使合格；限定",
  },
];
let index = ref<number>(0);

watch(youinput, (newVal) => {
  if (newVal.trim() === msg[index.value].eng) {
    bool.value = true;
  } else {
    bool.value = false;
  }
});

function next(): void {
  clearTimeout(word);
  flag.value = false;
  index.value++;
  if (index.value === msg.length) {
    index.value = 0;
  }
  youinput.value = "";
}
function tip(): void {
  flag.value = true;
  word;
}
</script>

<style scoped></style>
