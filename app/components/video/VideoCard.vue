<script setup lang="ts">

defineProps<{
  video: NormalizedVideo;
}>();

const formatDuration = (seconds: number | string) => {
  const sec = Number(seconds) || 0;
  const h = Math.floor(sec / 3600);
  const m = Math.floor((sec % 3600) / 60);
  const s = sec % 60;
  if (h > 0) {
    return `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  }
  return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
};
</script>

<template>
  <NuxtLink
      :to="`/video/${video.uid}`"
      dir="rtl"
      class="w-full bg-surface-bg-light p-4 rounded-lg flex flex-col gap-4 border border-surface-border">

    <div class="w-full overflow-hidden relative">
      <img :src="video.thumbnail" class="w-full aspect-video rounded-lg border border-surface-border object-cover overflow-hidden"
           loading="lazy"
           referrerpolicy="no-referrer"
           :alt="video.title"/>

      <span class="absolute bottom-3 left-3 z-10 rounded-full shadow text-sm p-2 text-text-primary bg-surface-bg-light">
        {{ formatDuration(video.duration) }}
      </span>
    </div>

    <h2 class="text-xl font-bold text-text-primary">
      {{ video.title }}
    </h2>
    <div class="w-full flex gap-2 items-center justify-start">
      <img :src="video.channelLogo" class="w-10 aspect-square rounded-full object-cover overflow-hidden"
           :alt="video.channelName"/>
      <strong class="font-medium text-base text-text-primary">
        {{ video.channelName }}
      </strong>
    </div>

    <div class="w-full flex gap-2 text-text-muted">
      <span class="text-text-muted text-base">
        {{ (Number(video.visitCount) || 0).toLocaleString('fa-IR') }} بازدید
      </span>
      -
      <span class="text-text-muted text-base">
        {{ video.createDate || 'اخیراً' }}
      </span>
    </div>
  </NuxtLink>
</template>

<style scoped>

</style>