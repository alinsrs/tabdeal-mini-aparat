<script setup lang="ts">
const props = defineProps<{
  currentPage: number;
  totalPages: number;
}>();

const emit = defineEmits<{
  (e: 'change', page: number): void;
}>();

const pages = computed(() => {
  const current = props.currentPage || 1;
  const total = Math.max(1, props.totalPages || 1);
  const delta = 2;
  const range: number[] = [];

  const start = Math.max(1, current - delta);
  const end = Math.max(start, Math.min(total, current + delta));

  for (let i = start; i <= end; i++) {
    range.push(i);
  }
  return range;
});
</script>

<template>
  <div v-if="totalPages > 1" class="flex items-center justify-center gap-2 py-8" dir="ltr">
    <button
        :disabled="currentPage <= 1"
        @click="emit('change', currentPage - 1)"
        class="p-2 rounded-lg text-text-muted hover:text-text-primary disabled:opacity-30 disabled:cursor-not-allowed transition-colors cursor-pointer"
        type="button"
    >
      <MdiIcon icon="mdiChevronLeft" size="20"/>
    </button>

    <button
        v-for="p in pages"
        :key="p"
        type="button"
        @click="emit('change', p)"
        class="cursor-pointer"
        :class="[
        'w-8 h-8 rounded-full text-sm font-semibold flex items-center justify-center transition-colors',
        p === currentPage
          ? 'bg-primary text-black font-bold'
          : 'text-text-muted hover:text-text-primary hover:bg-surface-element'
      ]"
    >
      {{ p.toLocaleString('fa-IR') }}
    </button>

    <button
        :disabled="currentPage >= totalPages"
        @click="emit('change', currentPage + 1)"
        class="p-2 rounded-lg text-text-muted hover:text-text-primary disabled:opacity-30 disabled:cursor-not-allowed transition-colors cursor-pointer"
        type="button"
    >
      <MdiIcon icon="mdiChevronRight" size="20"/>
    </button>
  </div>
</template>