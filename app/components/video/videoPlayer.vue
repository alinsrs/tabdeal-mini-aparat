<script setup lang="ts">
import type { VideoDetails } from "~/composables/useVideoDetails";

defineProps<{
  video: VideoDetails;
}>();
</script>

<template>
  <div class="mx-auto w-full flex flex-col gap-6 max-w-360 p-4 rounded-lg shadow border border-surface-border">
    <div v-html="video.iframe" class="w-full aspect-video rounded-2xl overflow-hidden bg-black" />

    <div class="w-full">
      <h1 class="font-bold text-2xl text-text-primary leading-snug">
        {{ video.title }}
      </h1>
    </div>

    <div class="w-full flex gap-4 items-center justify-between">
      <div class="flex gap-4 items-center justify-start">
        <img
            :src="video.channelLogo"
            :alt="video.channelName"
            class="w-10 h-10 rounded-full object-cover border border-surface-border bg-surface-element"
        />
        <div class="w-full flex flex-col gap-1">
          <strong class="font-medium text-base text-text-muted">
            {{ video.channelName }}
          </strong>

          <strong class="font-medium text-sm text-text-muted">
            {{ video.channelSubscribersCount }} دنبال کننده
          </strong>
        </div>
      </div>

      <div class="flex items-center justify-end">
        <span class="bg-surface-element py-2 px-4 rounded-lg shadow flex items-center justify-center gap-1.5 text-text-primary font-medium text-sm">
          {{ video.likesCount.toLocaleString('fa-IR') }}
          <MdiIcon icon="mdiHeartOutline" class="text-text-primary" size="16" />
        </span>
      </div>
    </div>

    <div class="w-full flex flex-wrap gap-4 items-center justify-start text-text-muted text-sm">
      <div class="flex gap-2 items-center justify-start">
        <span>
          {{ video.visitCount.toLocaleString('fa-IR') }} بازدید
        </span>
        <span v-if="video.createDate">•</span>
        <span v-if="video.createDate">
          {{ video.createDate }}
        </span>
      </div>

      <span v-if="video.tags.length">•</span>

      <div v-if="video.tags.length" class="flex flex-wrap gap-2.5 items-center justify-start">
        <span
            v-for="tag in video.tags"
            :key="tag"
            class="text-blue-600 hover:text-blue-500 transition-colors"
        >
          #{{ tag }}
        </span>
      </div>
    </div>

    <div v-if="video.description" class="w-full">
      <p class="text-base text-text-secondary leading-relaxed whitespace-pre-line">
        {{ video.description }}
      </p>
    </div>
  </div>
</template>