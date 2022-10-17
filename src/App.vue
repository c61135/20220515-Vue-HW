<template>
  <NavBar></NavBar>
  <router-view></router-view>
  <FooterBar></FooterBar>
</template>

<script>

import NavBar from '@/components/public/NavBar.vue';
import FooterBar from '@/components/public/FooterBar.vue';

export default {
  components: {
    NavBar,
    FooterBar,
  },

};
</script>
