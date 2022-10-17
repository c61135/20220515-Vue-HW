<!-- eslint-disable vuejs-accessibility/label-has-for -->
<template>
  <div class="container-fluid mb-5">
    <h2 class="fw-bold p-4 m-0 text-center">結帳</h2>
    <hr class="mt-1 mb-4">
    <div class="row">
      <div class="col-lg-6 px-3">
        <!-- 購物車產品列表 -->
        <table class="table py-5">
          <thead>
            <tr class="text-center">
              <th width="100">圖片</th>
              <th>品項</th>
              <th>數量</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(product, index) in cartProducts.carts" :key="index"
            class="text-center align-middle">
              <td width="100"><img :src="product.product.imageUrl" alt="" class="cartImg m-0"></td>
              <td>{{ product.product.title }}</td>
              <td width="120" class="text-center align-middle">
                {{product.qty}}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="col-lg-6">
        <div class="bg-light py-2 px-3">
          <Form v-slot="{ errors }" novalidate>
      <div class="mb-3">
        <div class="d-flex justify-content-between">
          <h4>訂購人資訊</h4>
          <p><span style="color: red">*</span>欄位為必填</p>
        </div>
        <hr>
        <label for="name" class="form-label w-100 fw-bold">姓名
          <span style="color: red">*</span>
          <Field type="tel" class="form-control mt-1" name="name" id="name"
          :rules="validateName" placeholder="請輸入姓名"
            v-model="form.user.name" />
        </label>
        <span class="warningMsg">{{ errors.name }}</span>
      </div>
      <div class="mb-3">
        <label for="cellphone" class="form-label w-100 fw-bold">手機
          <span style="color: red">*</span>
          <Field type="number" class="form-control mt-1" name="cellphone"
          v-model="form.user.tel" id="cellphone"
            :rules="validateCellphone" placeholder="請輸入手機" />
        </label>
        <span class="warningMsg">{{ errors.cellphone }}</span>
      </div>
      <div class="mb-3">
        <label for="address" class="form-label w-100 fw-bold">地址
          <span style="color: red">*</span>
          <Field type="tel" class="form-control mt-1" name="address"
          id="address" :rules="validateAddress"
            v-model="form.user.address" placeholder="請輸入地址" />
        </label>
        <span class="warningMsg">{{ errors.address }}</span>
      </div>
      <div class="mb-3">
        <label for="eMail" class="form-label w-100 fw-bold">E-mail
          <span style="color: red">*</span>
          <Field type="email" class="form-control mt-1" name="eMail"
          id="eMail" :rules="validateEmail"
            placeholder="請輸入E-mail" v-model="form.user.email" />
        </label>
        <span class="warningMsg">{{ errors.eMail }}</span>
      </div>
      <div class="mb-3">
        <!-- <label for="note" class="form-label w-100 fw-bold">留言
          <Field type="text" class="form-control mt-1" name="note" id="note"
          placeholder="請輸入留言" v-model="form.message" />
        </label> -->
        <label for="note" class="form-label w-100 fw-bold">留言
          <textarea type="text" class="form-control mt-1" name="note" id="note"
          placeholder="請輸入留言" v-model="form.message">
          </textarea>
        </label>
      </div>
      <button type="submit" class="sendOrderBtn w-100 mb-2" @click="sendOrder">
        送出訂單
      </button>
      </Form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Field, Form } from 'vee-validate';

export default {
  components: {
    Field,
    Form,
  },
  data() {
    return {
      cartProducts: {},
      charge: 130,
      couponCode: '',
      form: {
        user: {
          name: '',
          email: '',
          tel: '',
          address: '',
        },
        message: '',
      },
    };
  },
  methods: {
    getCart() {
      const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/cart`;
      this.$http.get(api)
        .then((res) => {
          console.log(res.data.data);
          this.cartProducts = res.data.data;
        });
    },
    validateName(value) {
      return value ? '' : '请輸入姓名';
    },
    validateCellphone(value) {
      if (!value) {
        return '請輸入手機號碼';
      }
      // if the field is not a valid email
      const regex = /^09[0-9]{8}$/;
      if (!regex.test(value)) {
        return '請輸入有效的手機';
      }
      // All is good
      return true;
    },
    validateAddress(value) {
      return value ? '' : '请輸入地址';
    },
    validateEmail(value) {
      // if the field is empty
      if (!value) {
        return '請輸入E-mail';
      }
      // if the field is not a valid email
      const regex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
      if (!regex.test(value)) {
        return '請輸入有效的E-mail';
      }
      // All is good
      return true;
    },
    sendOrder() {
      console.log('ha');
      const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/order`;
      this.$http.post(api, { data: this.form })
        .then((res) => {
          console.log(res);
          this.$router.push(`/checkout/${res.data.orderId}`);
        });
    },
  },
  created() {
    this.getCart();
  },
};

</script>

<style>
.warningMsg {
  font-size: 10px;
  color: red;
}

.sendOrderBtn {
  background: #4C514D;
  border: 1px solid #4C514D;
  color: white;
  border-radius: 5px;
  font-size: 16px;
  font-weight: bold;
  padding: 5px;
  transition-duration: 0.25s;
}

.sendOrderBtn:hover {
  background: #888b88;
}
</style>
