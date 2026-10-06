<script setup lang="ts">
import AppPagination from "~/components/common/AppPagination.vue";

const {videos, pagination, isLoading, page, setPage} = useVideos();
</script>

<template>
  <main class="mx-auto w-full max-w-360 flex flex-col gap-6 px-4">
    <div v-if="isLoading" class="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
      <div
          v-for="i in 12"
          :key="i"
          class="w-full h-72 rounded-lg bg-surface-card animate-pulse border border-surface-border"
      />
    </div>

    <div v-else-if="!videos.length" class="text-center py-20 text-text-muted">
      ویدیویی یافت نشد.
    </div>

    <div v-else class="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
      <VideoCard
          v-for="video in videos"
          :key="video.uid"
          :video="video"
      />
    </div>

    <AppPagination
        v-if="pagination && (pagination.totalPages > 1 || page > 1)"
        :current-page="page"
        :total-pages="pagination.totalPages"
        @change="setPage"
    />
  </main>
</template>