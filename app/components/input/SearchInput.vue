<script setup lang="ts">

const route = useRoute();
const router = useRouter();

const query = ref((route.query.q as string) || '');

watch(() => route.query.q, (newQ) => {
  query.value = (newQ as string) || '';
});

const handleSearch = () => {
  router.push({
    path: '/',
    query: {
      ...route.query,
      q: query.value.trim() || undefined,
      page: undefined,
    },
  });
};

</script>

<template>
  <form
      @submit.prevent="handleSearch"
      class="w-full p-4 rounded-lg bg-surface-card flex gap-4 shadow-2xl border border-surface-border"
  >
    <input
        v-model="query"
        type="search"
        placeholder="جستجو ویدیو..."
        class="w-full text-text-primary p-2 bg-surface-element rounded focus:outline-none focus:ring-1 focus:ring-primary"
        dir="rtl"
    />
    <button
        type="submit"
        class="w-24 flex items-center justify-center gap-1 p-2 font-semibold text-sm text-text-foreground bg-primary hover:bg-primary-hover transition-colors rounded cursor-pointer"
    >
      <MdiIcon icon="mdiMagnify" size="20" />
      جستجو
    </button>
  </form>
</template>

<style scoped>

</style>