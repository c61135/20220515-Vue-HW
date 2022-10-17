<template>
  <HomeAnimation></HomeAnimation>
  <HomeScroll></HomeScroll>
  <HomeChange></HomeChange>
  <HomeDrawLots></HomeDrawLots>
</template>

<script>
import HomeAnimation from '@/components/HomePage/Home_Animation.vue';
import HomeScroll from '@/components/HomePage/Home_Scroll.vue';
import HomeChange from '@/components/HomePage/Home_Change.vue';
import HomeDrawLots from '@/components/HomePage/Home_DrawLots.vue';

export default {
  name: 'HomePage',
  components: {
    HomeAnimation,
    HomeScroll,
    HomeChange,
    HomeDrawLots,
  },
};
</script>

<style>
</style>
