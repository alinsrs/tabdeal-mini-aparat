<script setup lang="ts">
import {useVideoDetails} from "~/composables/useVideoDetails";

const route = useRoute();
const router = useRouter();
const uid = computed(() => route.params.uid as string);

const handleBack = () => {
  router.back()
}

const {video, isLoading, error} = useVideoDetails(uid);

useSeoMeta({
  title: () => video.value ? `${video.value.title} | صرافی تبدیل` : 'در حال بارگذاری ویدیو...',
  ogTitle: () => video.value?.title,
  description: () => video.value?.description || '',
  ogDescription: () => video.value?.description || '',
  ogImage: () => video.value?.thumbnail,
});
</script>

<template>
  <main class="mx-auto w-full max-w-360 px-4 py-6" dir="rtl">
    <div class="w-full flex items-center justify-end p-4">
      <button type="button" class="w-50 text-text-primary cursor-pointer" @click="handleBack">
        بازگشت به صفحه قبلی >>
      </button>
    </div>
    <div v-if="isLoading" class="w-full flex flex-col gap-6 p-4 rounded-lg border border-surface-border animate-pulse">
      <div class="w-full aspect-video rounded-2xl bg-surface-card"/>
      <div class="h-8 w-3/4 rounded bg-surface-card"/>
      <div class="h-14 w-full rounded bg-surface-card"/>
    </div>

    <VideoPlayer v-else-if="video" :video="video"/>

    <div v-if="error && !video" class="text-center py-20 text-primary mx-auto">
      در دریافت اطلاعات این ویدیو مشکلی به‌وجود آمده است.
      <p class="text-xs text-text-muted mt-2">{{ error }}</p>
    </div>
  </main>
</template>