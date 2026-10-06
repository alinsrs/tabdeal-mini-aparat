<script setup lang="ts">
const props = defineProps<{
  currentPage: number;
  totalPages: number;
}>();

const emit = defineEmits<{
  (e: 'change', page: number): void;
}>();

// Compute visible page numbers (e.g. 1 2 3 4 5)
const pages = computed(() => {
  const current = props.currentPage;
  const total = props.totalPages;
  const delta = 2;
  const range: number[] = [];

  for (let i = Math.max(1, current - delta); i <= Math.min(total, current + delta); i++) {
    range.push(i);
  }
  return range;
});
</script>

<template>
  <div class="flex items-center justify-center gap-2 py-8" dir="ltr">
    <!-- Prev Button -->
    <button
        :disabled="currentPage <= 1"
        @click="emit('change', currentPage - 1)"
        class="p-2 rounded-lg text-text-muted hover:text-text-primary disabled:opacity-30 disabled:cursor-not-allowed"
    >
      <MdiIcon icon="mdiChevronLeft" size="20" />
    </button>

    <!-- Page Numbers -->
    <button
        v-for="p in pages"
        :key="p"
        @click="emit('change', p)"
        :class="[
        'w-8 h-8 rounded-full text-sm font-semibold flex items-center justify-center transition-colors',
        p === currentPage
          ? 'bg-primary text-black font-bold'
          : 'text-text-muted hover:text-text-primary hover:bg-surface-element'
      ]"
    >
      {{ p.toLocaleString('fa-IR') }}
    </button>

    <!-- Next Button -->
    <button
        :disabled="currentPage >= totalPages"
        @click="emit('change', currentPage + 1)"
        class="p-2 rounded-lg text-text-muted hover:text-text-primary disabled:opacity-30 disabled:cursor-not-allowed"
    >
      <MdiIcon icon="mdiChevronRight" size="20" />
    </button>
  </div>
</template>