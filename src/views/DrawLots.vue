<template>
  <LoadingStatus :active="isLoading"></LoadingStatus>
  <div class="container-fluid draw">
    <form class="row justify-content-center">
      <div class="col-12 d-flex flex-column justify-content-center
      align-items-center text-center m-5" v-if="drawHide">
        <div class="imgBg mb-3">
          <img src="../assets/book.png" alt="" class="m-0 imgbook">
        </div>
        <div class="d-flex flex-column justify-content-center align-items-center">
          <h5 class=" drawContent">按下「命定推薦」按鈕後</h5>
          <h5 class=" drawContent">將隨機推薦一本書</h5>
          <h5 class=" drawContent">並同時贈送折價券</h5>
          <button class="btn_shape mt-3" @click="drawBook">
            <div class="btn_icon me-3">
              <i class="fas fa-dice fs-4"></i>
            </div>
            <h5 class="m-0">
              命定推薦
            </h5>
          </button>
        </div>
      </div>
      <div class="col-12 col-md-9 d-flex flex-column align-items-center bg-white p-3"
      v-if="recommendHide">
        <h3 class="mb-1 drawTitle w-100 text-center">命定推薦</h3>
        <hr class="w-100">
        <div class="d-flex justify-content-start w-100">
          <img :src="recommend.imageUrl" alt="" class="img-fluid rounded-start m-0 p-2 bookImg">
          <div class="py-1 px-3 ms-1 h-75 d-flex flex-column
          justify-content-between align-items-between h-100 w-100">
            <div>
              <h4 class="mb-2 fw-bold bookTitle">{{recommend.title}}</h4>
              <h5 class="mb-3 bookAuthor">{{recommend.author}}</h5>
              <p>{{recommend.description}}</p>
            </div>
            <div class="d-flex">
              <button class="drawBtn w-100 me-2 mb-1" @click="getProduct(recommend.id)">
                瞭解更多
              </button>
              <button class="drawBtn w-100 mb-1" @click.stop="addCart(recommend.id)">
                加入購物車
              </button>
            </div>
          </div>
        </div>
        <hr class="w-100">
        <div class="d-flex justify-content-between w-100 couponStyle">
          <div class="my-3 ms-3">
            <h6 class="couponTitle p-1">八折折價券</h6>
            <p class="couponCode p-1">20PercentOFF</p>
          </div>
          <div>
            <button class="h-100 px-5 coupntBtn" @click="copyCoupon">
                複製折扣碼
            </button>
          </div>
        </div>
      </div>
    </form>
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
      // true的時候，載入畫面會有過場動畫
      isLoading: false,
      // 更新通知
      toastList: [],
      toastCard: [],
      // 所有書籍
      books: {},
      // 推薦書
      recommend: {},
      drawHide: true,
      recommendHide: false,
    };
  },
  methods: {
    getProducts() {
      const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/products/all`;
      this.$http.get(api)
        .then((res) => {
          this.books = res.data.products;
          console.log('得到產品', this.books);
        });
    },
    drawBook() {
      const randomNum = Math.floor(Math.random() * 100) + 1;
      this.recommend = this.books[randomNum];
      console.log(this.recommend);
      this.drawHide = false;
      this.recommendHide = true;
    },
    getProduct(bookId) {
      this.$router.push(`/bookstore/${bookId}`);
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
          const toastMsg = { title: '加入購物車', ...res.data };
          this.toastList.push(toastMsg);
          this.isLoading = false;
        });
    },
    copyCoupon() {
      navigator.clipboard.writeText('20PercentOFF');
      const toastMsg = { title: '複製折價券', success: true, message: '已複製折價券代碼' };
      this.toastList.push(toastMsg);
    },
  },
  created() {
    this.getProducts();
  },
};
</script>

<style>
.imgBg {
  background: #fff;
  border-radius: 50%;
  width: 125px;
  height: 125px;
  padding: 25px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.imgbook {
  width: 130%;
  height: 130%;
}

.bookImg {
  width: 200px;
}

.bookTitle {
  color: black;
  text-align: left;
  font-size: 25px;
}

.bookAuthor {
  color: black;
  text-align: left;
  font-size: 15px;
}

.drawTitle {
  color: #843C0C;
  font-weight: bold;
}

.drawContent {
  color: black;
  font-weight: 100;
}

.draw {
  background: #f7dcb168;
  padding: 50px;
}

.drawBtn {
  background: #4C514D;
  border: 1px solid #4C514D;
  color: white;
  border-radius: 5px;
  font-size: 16px;
  font-weight: bold;
  padding: 5px;
  transition-duration: 0.25s;
}

.drawBtn:hover {
  background: #888b88;
}

.btn_shape {
  height: 60px;
  width: 180px;
  border-radius: 120px;
  background-color: #D2E3D1;
  border: none;
  display: flex;
  align-items: center;
  box-shadow: 2px 2px gray;
}

.btn_shape:hover {
  box-shadow: none;
}

.btn_icon {
  width: 50px;
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  background-color: #E8F1E8;
}

.couponStyle {
  background: rgb(243, 243, 243);
  border-radius: 5px;
}

.couponTitle {
  font-size: 20px;
  font-weight: bold;
  margin: 0;
  margin-bottom: 10px;
}

.couponCode {
  font-size: 15px;
  font-weight: bold;
  margin: 0;
}

.coupntBtn {
  background-color: #e6d082;
  border-width: 0;
  border-left: 3px gray dashed;
  color: black;
  border-radius: 0 5px 5px 0;
}

.toastMargin{
  margin-top: 60px;
}
</style>
