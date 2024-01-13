<template>
  <div
    v-if="type === 'success'"
    v-motion-pop
    role="alert"
    class="alert alert-success place-content-center absolute"
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      class="stroke-current shrink-0 h-6 w-6"
      fill="none"
      viewBox="0 0 24 24"
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="2"
        d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
      />
    </svg>
    <span>真不错，回答正确😁</span>
  </div>

  <div
    v-if="type == 'error'"
    v-motion-pop
    role="alert"
    class="alert alert-error absolute"
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      class="stroke-current shrink-0 h-6 w-6"
      fill="none"
      viewBox="0 0 24 24"
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="2"
        d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
      />
    </svg>
    <span>很遗憾，回答错误😫</span>
  </div>
</template>

<script setup lang="ts">
interface Props {
  type: "success" | "error" | "";
}

withDefaults(defineProps<Props>(), {
  type: "",
});
</script>

<style scoped></style>
