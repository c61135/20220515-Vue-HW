<template>
  <LoadingStatus :active="isLoading"></LoadingStatus>
  <div class="d-flex justify-content-between mt-3">
    <!-- Button trigger1 modal -->
  <button type="button" class="btn btn-success m-1"
  data-bs-toggle="modal" data-bs-target="#exampleModal"
    @click="openCouponModal(true)">
    新增折價券
  </button>
    <!-- 分頁表 -->
    <PaginationList :type="'coupons'" @prePage="showcoupons" @changePage="showcoupons"
  @nextPage="showcoupons"></PaginationList>
  </div>
  <!-- 產品列表 -->
  <table class="table mt-5 py-5">
    <thead>
      <tr>
        <th width="200">名稱</th>
        <th width="200">折扣碼</th>
        <th width="300">折扣百分比</th>
        <th>到期日</th>
        <th width="100">是否啟用</th>
        <th width="200">編輯</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(coupon, index) in coupons" :key="index">
        <td width="200">{{ coupon.title }}</td>
        <td width="200">{{ coupon.code }}</td>
        <td width="300">{{ coupon.percent }}</td>
        <td>{{ coupon.due_date }}</td>
        <td>
          <span class="text-success" v-if="true">啟用</span>
          <span class="text-danger" v-else>停用</span>
        </td>
        <td>
          <div class="btn-group">
            <button class="btn btn-outline-primary btn-sm"
            @click="openCouponModal(false, coupon)">
              編輯</button>
            <button class="btn btn-outline-danger btn-sm"
            @click="openDelModal(coupon, index)">刪除</button>
            <DeleteModal ref="delModal" :delTitle="coupon.title" :delId="coupon.id"
            :index="index" @deleteProduct="deleteCoupon">
            </DeleteModal>
          </div>
        </td>
      </tr>
    </tbody>
  </table>
  <!-- CouponModal -->
  <CouponModal ref="couponModal" :isNew="isNew"
  :tempCoupon="tempCoupon" @editCoupon="addData"></CouponModal>
  <!-- ToastCard -->
  <div class="toast-container d-flex flex-column position-absolute top-0 end-0 toastMargin">
    <ToastCard v-for="(msg, key) in toastList" :key="key" :msg="msg"></ToastCard>
  </div>
</template>

<script>
import CouponModal from '@/components/DashboardPage/CouponModal.vue';
import DeleteModal from '@/components/public/DeleteModal.vue';
import PaginationList from '@/components/public/PaginationList.vue';
import ToastCard from '@/components/public/ToastCard.vue';

export default {
  name: 'dashBoard',
  components: {
    CouponModal,
    DeleteModal,
    PaginationList,
    ToastCard,
  },
  data() {
    return {
      tempCoupon: {}, // 目前要新增/編輯的折價券暫存處
      coupons: {}, // 所有的折價券
      isNew: true, // true:新增產品, false:編輯產品
      isLoading: false, // true的時候，載入畫面會有過場動畫
      toastList: [],
      toastCard: [],
    };
  },
  methods: {
    // 更新產品清單
    showcoupons(page) {
      const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/admin/coupons?page=${page}`;
      this.isLoading = true;
      this.$http.get(api)
        .then((res) => {
          this.coupons = res.data.coupons;
          // eslint-disable-next-line no-plusplus
          for (let i = 0; i < this.coupons.length; i++) {
            const date = new Date(this.coupons[i].due_date);
            this.coupons[i].due_date = `${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()}`;
          }
          this.isLoading = false;
        });
    },
    // 開啟產品的Modal (OK)
    openCouponModal(isNew, item = {}) {
      this.isNew = isNew;
      this.tempCoupon = item;
      this.$refs.couponModal.openModal();
    },
    // 新增產品(如果this.isNew是true那就新增產品，如果是false那就編輯產品) (OK)
    addData(editCoupon) {
      this.tempCoupon = editCoupon;
      if (this.isNew) {
        this.isLoading = true;
        const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/admin/coupon`;
        this.$http.post(api, { data: this.tempCoupon })
          .then((res) => {
            console.log('add', res);
            this.showcoupons();
            this.isLoading = false;
            const toastMsg = { title: '新增折價券', ...res.data };
            this.toastList.push(toastMsg);
          });
      } else {
        this.isLoading = true;
        const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/admin/coupon/${this.tempCoupon.id}`;
        this.$http.put(api, { data: this.tempCoupon })
          .then((res) => {
            this.showcoupons();
            console.log('edit', res);
            this.isLoading = false;
            const toastMsg = { title: '編輯折價券', ...res.data };
            this.toastList.push(toastMsg);
          });
      }
      this.tempCoupon = {};
    },
    // 開啟刪除產品的Modal (OK)
    openDelModal(item, index) {
      this.$refs.delModal[index].openModal();
    },
    // 刪除產品 (OK)
    deleteCoupon(id) {
      this.isLoading = true;
      const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/admin/coupon/${id}`;
      // 把刪除完的data放回this.coupons內
      this.$http.delete(api, { data: this.coupons })
        .then((res) => {
          // 刷新產品列表
          this.showcoupons();
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
    this.showcoupons();
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
