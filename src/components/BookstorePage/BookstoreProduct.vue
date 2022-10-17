<template>
  <LoadingStatus :active="isLoading"></LoadingStatus>
  <div class="row justify-content-center bookstoreProduct">
    <div class="col-6 col-sm-5 col-md-4 col-lg-3">
      <img :src=product.imageUrl alt="" class="img-fluid w-75 m-2 my-3" />
    </div>

    <div class="col-6 col-md-4">
      <h2 class="my-3 brown">{{product.title}}</h2>
      <p>作者：{{product.author}}</p>
      <p>譯者：{{product.translator}}</p>
      <p>出版社：{{product.publisher}}</p>
      <p>出版日期：{{product.date}}</p>
      <p>原價：<s>{{product.origin_price}}</s>元</p>
      <p>折扣價：
        <span style="color: red">{{Math.floor(product.price/product.origin_price*100)}}</span>折
        <span style="color: red">{{product.price}}</span>元
      </p>
      <hr>
      <div class="d-flex justify-content-between">
        <p>庫存：<span style="color: #00B050">{{product.stock}}</span></p>
        <button class="btn btn-outline-secondary" @click.capture="addCart(product.id)">
          <i class="fas fa-shopping-cart pe-2"></i>
          <span>加入購物車</span>
        </button>
      </div>
    </div>
  </div>
  <div class="row justify-content-center">
    <div class="col-12 col-sm-11 col-md-9">
      <hr>
      <h3 class="contentTitle">內容簡介</h3>
      <p>
        {{product.content}}
      </p>
      <h3 class="contentTitle mt-5">作者簡介</h3>
      <p style="font-weight: bold">{{product.author}}</p>
      <p>
        {{product.authorDes}}
      </p>
    </div>
  </div>
  <!-- ToastCard -->
  <div class="toast-container d-flex flex-column position-absolute top-0 end-0 toastMargin">
    <ToastCard v-for="(msg, key) in toastList" :key="key" :msg="msg"></ToastCard>
  </div>
</template>

<script>
import ToastCard from '@/components/public/ToastCard.vue';

export default {
  components: {
    ToastCard,
  },
  data() {
    return {
      productId: '',
      product: {},
      // 更新通知
      toastList: [],
      toastCard: [],
      // true的時候，載入畫面會有過場動畫
      isLoading: false,
    };
  },
  methods: {
    getProduct() {
      const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/product/${this.productId}`;
      this.$http.get(api)
        .then((res) => {
          this.product = res.data.product;
          console.log(this.product);
        });
    },
    addCart(id) {
      this.isLoading = true;
      const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/cart`;
      const cart = {
        product_id: id,
        qty: 1,
      };
      this.$http.post(api, { data: cart })
        .then((res) => {
          console.log(res);
          const toastMsg = { title: '加入購物車', ...res.data };
          this.toastList.push(toastMsg);
          this.isLoading = false;
        });
    },
  },
  created() {
    this.productId = this.$route.params.productId;
    this.getProduct();
  },
};
</script>

<style>
.bookstoreProduct {
  margin-top: 60px;
}

.contentTitle {
  color: #843C0C;
  font-size: 25px;
  font-weight: bold;
}

.toastMargin {
  margin-top: 60px;
}
</style>
