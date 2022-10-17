<template>
  <div class="container-fluid mb-5">
    <h2 class="fw-bold p-4 m-0 text-center">結帳</h2>
    <hr class="mt-1 mb-4">
    <div class="row justify-content-center">
      <div class="col-lg-6">
        <div class="bg-light p-4">
          <h3 class="text-center fw-bold font-brown">訂單資訊</h3>
          <hr class=" font-brown mb-4">
          <div class="d-flex flex-coulumn justify-content-center">
            <table>
              <tbody>
                <tr>
                  <td class="tableTitle" width="150">訂單編號</td>
                  <td class="tableContent">{{ orderId }}</td>
                </tr>
                <tr>
                  <td class="tableTitle" width="150">成立時間</td>
                  <td class="tableContent">{{ order.create_at }}</td>
                </tr>
                <tr>
                  <td class="tableTitle" width="150">姓名</td>
                  <td class="tableContent">{{ user.name }}</td>
                </tr>
                <tr>
                  <td class="tableTitle" width="150">電話</td>
                  <td class="tableContent">{{ user.tel }}</td>
                </tr>
                <tr>
                  <td class="tableTitle" width="150">信箱</td>
                  <td class="tableContent">{{ user.email }}</td>
                </tr>
                <tr>
                  <td class="tableTitle" width="150">地址</td>
                  <td class="tableContent">{{ user.address }}</td>
                </tr>
                <tr>
                  <td class="tableTitle" width="150">備註</td>
                  <td class="tableContent">{{ order.message }}</td>
                </tr>
                <tr>
                  <td class="tableTitle" width="150">訂單總額</td>
                  <td class="tableContent">{{ order.total }}</td>
                </tr>
                <tr>
                  <td class="tableTitle" width="150">付款狀態</td>
                  <td :class="order.is_paid ? 'text-success' : 'text-danger'"
                  class="fw-bold tableContent">
                    {{ order.is_paid ? '付款成功' : '尚未付款' }}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <button @click="payOrder()" v-if="!order.is_paid"
          class="sendOrderBtn w-100 p-2 mt-4 mb-2">
            確定付款
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      orderId: '',
      order: {},
      user: {},
    };
  },
  methods: {
    getOrder() {
      const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/order/${this.orderId}`;
      this.$http.get(api)
        .then((res) => {
          console.log(res);
          this.order = res.data.order;
          this.user = res.data.order.user;
        });
    },
    payOrder() {
      const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/pay/${this.orderId}`;
      this.$http.post(api)
        .then((res) => {
          console.log(res);
          this.getOrder();
        });
    },
  },
  created() {
    this.orderId = this.$route.params.orderId;
    console.log(this.orderId);
    this.getOrder();
  },
};
</script>

<style>
   .font-brown {
    color: #894415;
   }

   .tableTitle {
    color: #894415;
    font-size: 20px;
    font-weight: bold;
    letter-spacing: 3px;
    line-height: 2;
   }

   .tableContent {
    font-size: 20px;
    color: #198754;
    letter-spacing: 3px;
    line-height: 2;
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
