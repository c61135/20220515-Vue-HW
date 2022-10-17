<template>
  <div class="container-fluid mb-5 yx-5">
    <h2 class="fw-bold p-4 m-0 text-center">結帳</h2>
    <hr class="mt-1 mb-4">
    <div class="row justify-content-center">
      <div class="col-lg-8 px-3">
        <div v-if="cartProducts.carts.length == 0" class="h-100 bg-light d-flex flex-column
        justify-content-center align-items-center">
          <h4 class="emptyCart text-center">找不到喜歡的書嗎，試試命定推薦吧！</h4>
          <button class="btn_shape mt-5" @click="changePage">
            <div class="btn_icon me-3">
              <i class="fas fa-dice fs-4"></i>
            </div>
            <h5 class="m-0">
              命定推薦
            </h5>
          </button>
        </div>
        <!-- 購物車產品列表 -->
        <table class="table py-5" v-if="cartProducts.carts.length != 0">
          <thead>
            <tr class="text-center">
              <th width="100">圖片</th>
              <th>品項</th>
              <th>價格</th>
              <th>數量</th>
              <th>小計</th>
              <th>刪除</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(product, index) in cartProducts.carts" :key="index"
            class="text-center align-middle">
              <td width="100"><img :src="product.product.imageUrl" alt="" class="cartImg m-0"></td>
              <td>{{ product.product.title }}</td>
              <td>{{ product.product.price }}</td>
              <td width="120" class="text-center align-middle">
                <div class="numCloumn input-group d-flex justify-content-center">
                  <button type="button" class="btn btn-sm btn-secondary numBtn"
                  @click="minusQty(product)">
                    -
                  </button>
                  <label for="qty" class="numInput">
                    <input type="text" id="qty" v-model.number="product.qty" class="numInput h-100"
                      @change="updateCart(product)">
                  </label>
                  <button type="button" class="btn btn-sm btn-secondary numBtn"
                  @click="addQty(product)">
                    +
                  </button>
                </div>
              </td>
              <td>{{ product.total }}</td>
              <td>
                <!-- <button class="btn btn-outline-danger" @click="deleteProduct(product.id)">
                  <i class="fas fa-trash-alt"></i>
                </button> -->
                <button class="btn btn-outline-danger" @click="openDelModal(product, index)">
                  <i class="fas fa-trash-alt"></i>
                </button>
              </td>
              <DeleteModal ref="delModal" :delTitle="product.product.title"
              :delId="product.id" :index="index"
                @deleteProduct="deleteProduct" class="text-start">
              </DeleteModal>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="col-lg-4 px-3">
        <div class="bg-light p-2">
          <div class="input-group mb-3">
            <input type="text" class="form-control" placeholder="請輸入折價券" v-model="couponCode"
              aria-label="Recipient's username" aria-describedby="button-addon2">
            <button class="btn btn-outline-secondary" type="button"
            id="button-addon2" @click="addCoupon()">
              使用折價券
            </button>
          </div>
          <table class="w-100 table table-bordered">
            <tbody>
              <tr>
                <td width="30%" class="align-middle">運送方式</td>
                <td width="70%">
                  <div class="form-check">
                    <label class="form-check-label" for="homeDelivery">
                      <input class="form-check-input" type="radio" value="130"
                      v-model="charge" name="homeDelivery" id="homeDelivery" checked>
                      宅配：NT$130
                    </label>
                  </div>
                  <div class="form-check">
                    <label class="form-check-label" for="registeredDelivery">
                      <input class="form-check-input" type="radio" value="70"
                      v-model="charge" name="registeredDelivery" id="registeredDelivery">
                      郵寄掛號：NT$70
                    </label>
                  </div>
                  <div class="form-check">
                    <label class="form-check-label" for="storeDelivery">
                      <input class="form-check-input" type="radio" value="75"
                      v-model="charge" name="storeDelivery" id="storeDelivery">
                      超商取貨：NT$75
                    </label>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
          <hr>
          <table class="w-100 table">
            <thead>
              <tr>
                <td>合計</td>
                <td class="text-end">{{cartProducts.total}}</td>
              </tr>
              <tr>
                <td>折扣</td>
                <td class="text-end">{{Math.round(cartProducts.total - cartProducts.final_total)}}
                </td>
              </tr>
              <tr>
                <td>運費</td>
                <td class="text-end">{{charge}}</td>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td class="h3">總計</td>
                <td class="h3 text-end">{{Math.round(parseInt(charge) + cartProducts.final_total)}}
                </td>
              </tr>
            </tbody>
          </table>
          <div v-if="cartProducts.carts.length != 0">
            <a class="btn checkBtn w-100" href="#/order">前往結帳</a>
          </div>
        </div>
      </div>
    </div>
  </div>
  <!-- ToastCard -->
  <div class="toast-container d-flex flex-column position-absolute top-0 end-0 toastMargin">
    <ToastCard v-for="(msg, key) in toastList" :key="key" :msg="msg"></ToastCard>
  </div>
</template>

<script>
// import { isTemplateElement } from '@babel/types';
import DeleteModal from '@/components/public/DeleteModal.vue';
import ToastCard from '@/components/public/ToastCard.vue';

export default {
  components: {
    DeleteModal,
    ToastCard,
  },
  data() {
    return {
      cartProducts: {},
      charge: 130,
      couponCode: '',
      toastList: [],
      toastCard: [],
    };
  },
  methods: {
    changePage() {
      this.$router.push('/drawlots');
    },
    getCart() {
      const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/cart`;
      this.$http.get(api)
        .then((res) => {
          this.cartProducts = res.data.data;
          console.log(this.cartProducts);
        });
    },
    addQty(product) {
      // eslint-disable-next-line no-param-reassign
      product.qty += 1;
      this.updateCart(product);
    },
    minusQty(product) {
      if (product.qty > 1) {
        // eslint-disable-next-line no-param-reassign
        product.qty -= 1;
        this.updateCart(product);
      }
    },
    // 開啟刪除產品的Modal (OK)
    openDelModal(item, index) {
      console.log(item, index);
      this.$refs.delModal[index].openModal();
    },
    deleteProduct(id) {
      const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/cart/${id}`;
      this.$http.delete(api)
        .then((res) => {
          console.log(res);
          this.getCart();
          const toastMsg = { title: '刪除產品', ...res.data };
          this.toastList.push(toastMsg);
          this.isLoading = false;
        });
    },
    updateCart(product) {
      console.log('update', product.product_id);
      const cart = {
        product_id: product.product_id,
        qty: product.qty,
      };
      const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/cart/${product.id}`;
      this.$http.put(api, { data: cart })
        .then((res) => {
          console.log(res);
          this.getCart();
        });
    },
    addCoupon() {
      const coupon = {
        code: this.couponCode,
      };
      const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/coupon`;
      this.$http.post(api, { data: coupon })
        .then((res) => {
          console.log(res);
          this.getCart();
        });
    },
  },
  created() {
    this.getCart();
  },
};
</script>

<style>
  .btn_icon {
  width: 50px;
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  background-color: #E8F1E8;
}

.btn_shape{
  height: 60px;
  width: 180px;
  border-radius: 120px;
  background-color: #D2E3D1;
  border: none;
  display: flex;
  align-items: center;
  box-shadow: 2px 2px gray;
}
.emptyCart {
  color: #853C0C;
  font-weight: bold;
}

.cartImg {
  height: 100px;
}

.numCloumn {
  height: 36px;
}

.numInput {
  width: 40px;
  text-align: center;
}

.numBtn {
  width: 25px;
}

.checkBtn {
  background: #4C514D;
  border: 1px solid #4C514D;
  color: white;
  border-radius: 5px;
  font-size: 16px;
  font-weight: bold;
  padding: 5px;
  transition-duration: 0.25s;
}

.checkBtn:hover {
  background: #888b88;
  color: white;
}

.toastMargin {
  margin-top: 60px;
}
</style>
