<script setup lang="ts">

import image from "~/public/logo.webp";
</script>

<template>
  <div class="w-full flex flex-col gap-6 max-w-360 p-4 rounded-lg shadow border border-surface-border">
    <iframe class="w-full aspect-video rounded-2xl"></iframe>

    <div class="w-full">
      <h2 class="font-bold text-2xl text-text-primary">
        عنوان ویدیو
      </h2>
    </div>

    <div class="w-full flex gap-2 items-center justify-start">
      <img :src="image" class="w-10 aspect-square rounded-full object-cover" alt="jsj"/>
      <div class="w-full flex flex-col gap-1">
        <strong class="font-medium text-base text-text-muted">
          نام کانال
        </strong>

        <strong class="font-medium text-base text-text-muted">
          ۱۰۰۰ دنبال کننده
        </strong>
      </div>
    </div>

    <div class="w-full flex gap-4 items-center justify-start">
      <div class="flex gap-2 items-center justify-start">
        <span class="text-text-muted text-base">
          ۰ بازدید
        </span>
          -
        <span class="text-text-muted text-base">
          ۳ روز پیش
        </span>
      </div>

      <div class="flex gap-3 items-center justify-start">
        <span class="text-text-muted text-base"></span>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>