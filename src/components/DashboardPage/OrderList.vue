<template>
  <LoadingStatus :active="isLoading"></LoadingStatus>
  <!-- 產品列表 -->
  <table class="table mt-5 py-5 text-center">
    <thead>
      <tr>
        <th width="200">訂購人</th>
        <th width="300">訂單編號</th>
        <th width="200">已付款</th>
        <th width="250">連絡電話</th>
        <th>備註</th>
        <th width="100">刪除</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(order, index) in orders" :key="index">
        <td>{{ order.user.name }}</td>
        <td>{{ order.id }}</td>
        <td>{{ order.is_paid ? '已付款' : '尚未付款' }}</td>
        <td>{{ order.user.tel }}</td>
        <td>{{order.message}}</td>
        <td>
          <button class="btn btn-outline-danger btn-sm"
            @click="openDelModal(order, index)">刪除</button>
            <DeleteModal ref="delModal" :delTitle="order.id" :delId="order.id"
            :index="index" @deleteProduct="deleteOrder">
            </DeleteModal>
        </td>
      </tr>
    </tbody>
  </table>
  <!-- 分頁表 -->
  <PaginationList :type="'coupons'" @prePage="showcoupons"
    @changePage="showcoupons" @nextPage="showcoupons">
    </PaginationList>
  <!-- ToastCard -->
  <div class="toast-container d-flex flex-column position-absolute top-0 end-0 toastMargin">
    <ToastCard v-for="(msg, key) in toastList" :key="key" :msg="msg"></ToastCard>
  </div>
</template>

<script>
import DeleteModal from '@/components/public/DeleteModal.vue';
import PaginationList from '@/components/public/PaginationList.vue';
import ToastCard from '@/components/public/ToastCard.vue';

export default {
  name: 'dashBoard',
  components: {
    DeleteModal,
    PaginationList,
    ToastCard,
  },
  data() {
    return {
      orders: {}, // 所有的訂單
      isLoading: false, // true的時候，載入畫面會有過場動畫
      toastList: [],
      toastCard: [],
    };
  },
  methods: {
    // 更新產品清單
    showOrders(page) {
      const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/admin/orders?page=${page}`;
      this.isLoading = true;
      this.$http.get(api)
        .then((res) => {
          this.orders = res.data.orders;
          console.log('orders', this.orders);
          this.isLoading = false;
        });
    },
    // 開啟刪除產品的Modal (OK)
    openDelModal(item, index) {
      this.$refs.delModal[index].openModal();
    },
    // 刪除產品 (OK)
    deleteOrder(id) {
      this.isLoading = true;
      const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/admin/order/${id}`;
      // 把刪除完的data放回this.coupons內
      this.$http.delete(api, { data: this.coupons })
        .then((res) => {
          // 刷新產品列表
          this.showOrders();
          const toastMsg = { title: '刪除產品', ...res.data };
          this.toastList.push(toastMsg);
          this.isLoading = false;
        });
    },
  },
  created() {
    const loginToken = document.cookie.replace(/(?:(?:^|.*;\s*)hexToken\s*=\s*([^;]*).*$)|^.*$/, '$1');
    this.$http.defaults.headers.common.Authorization = loginToken;
    const api = `${process.env.VUE_APP_API}api/user/check`;
    this.isLoading = true;
    this.$http.post(api)
      .then((res) => {
        console.log('登入中', res);
      });
    this.showOrders();
    this.isLoading = false;
  },
  mounted() {
  },
};
</script>

<style>
  .toastMargin {
  margin-top: 60px;
}
</style>
