<template>
  <span class="bg-success text-white rounded-pill px-2 py-1 cartNum">
    {{cartNum}}
  </span>
</template>

<script>
export default {
  data() {
    return {
      cartNum: '',
    };
  },
  methods: {
    getCart() {
      const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/cart`;
      this.$http.get(api)
        .then((res) => {
          console.log('cart', res.data.data);
          const cartLength = res.data.data.carts.length;
          let num = 0;
          for (let i = 0; i < cartLength; i += 1) {
            num += res.data.data.carts[i].qty;
          }
          this.cartNum = num;
        });
    },
  },
};
</script>

<style>
.cartNum {
  font-size: 13px;
  font-weight: 100;
  position: absolute;
  top: 3px;
  right: 3px;
}
</style>
