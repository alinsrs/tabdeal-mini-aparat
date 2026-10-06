<script setup lang="ts">
import logo from "../../public/logo.webp"
import SearchInput from "~/components/input/SearchInput.vue";

const route = useRoute()

</script>

<template>
  <header class="w-full bg-linear-270 from-surface-bg-dark to-surface-bg-light min-h-20 relative overflow-hidden">
    <div
        class="pointer-events-none absolute top-1/2 right-1/5 -translate-y-1/3 w-85 h-40
         rounded-full bg-radial-[ellipse_at_center] from-[#F5AC00]/45 via-[#F5AC00]/15 to-transparent blur-2xl"
    ></div>
    <div class="w-full max-w-360 mx-auto flex flex-col gap-4 p-4">
      <NuxtLink to="/">
        <img :src="logo" class="max-w-36 md:max-w-50" width="660" height="192" />
      </NuxtLink>

      <SearchInput v-if="route.path === '/' "/>
    </div>
  </header>
</template>

<style scoped>

</style>