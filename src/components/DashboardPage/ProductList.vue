<template>
  <div class="container-fluid ">
    <div class="d-flex justify-content-between mt-3">
      <!-- Button trigger1 modal -->
      <button type="button" class="btn btn-success m-1" data-bs-toggle="modal"
        data-bs-target="#exampleModal" @click="openProductModal(true)">
        新增產品
      </button>
      <!-- 分頁表 -->
      <PaginationList :type="'products'" @prePage="showProducts"
        @changePage="showProducts" @nextPage="showProducts">
      </PaginationList>
    </div>
    <LoadingStatus :active="isLoading"></LoadingStatus>
    <!-- 產品列表 -->
    <!-- <ProductItem :products="products"></ProductItem> -->
    <table class="table mt-3 py-2">
      <thead>
        <tr>
          <th width="60">排名</th>
          <th width="120">分類</th>
          <th>產品名稱</th>
          <th width="120">原價</th>
          <th width="120">售價</th>
          <th width="100">是否啟用</th>
          <th width="200">編輯</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(product, index) in products" :key="index">
          <td width="60">{{product.number}}</td>
          <td width="120">{{ product.category }}</td>
          <td>{{ product.title }}</td>
          <td class="text-right">{{ $filters.currency(product.origin_price) }}</td>
          <td class="text-right">{{ $filters.currency(product.price) }}</td>
          <td>
            <span class="text-success" v-if="product.is_enabled">啟用</span>
            <span class="text-danger" v-else>停用</span>
          </td>
          <td>
            <div class="btn-group">
              <button class="btn btn-outline-primary btn-sm"
                @click="openProductModal(false, product)">
                編輯
              </button>
              <button class="btn btn-outline-danger btn-sm"
                @click="openDelModal(product, index)">
                刪除
              </button>
            </div>
            <DeleteModal ref="delModal" :delTitle="product.title" :delId="product.id" :index="index"
              @deleteProduct="deleteProduct"></DeleteModal>
          </td>
        </tr>
      </tbody>
    </table>
    <!-- ProductModal -->
    <ProductModal ref="productModal" :isNew="isNew"
      :tempProduct="tempProduct" @editProduct="addData">
    </ProductModal>
    <!-- ToastCard -->
    <div class="toast-container d-flex flex-column position-absolute top-0 end-0 toastMargin">
      <ToastCard v-for="(msg, key) in toastList" :key="key" :msg="msg"></ToastCard>
    </div>
  </div>
</template>

<script>
// import ProductItem from '@/components/DashboardPage/ProductItem.vue';
import ProductModal from '@/components/DashboardPage/ProductModal.vue';
import DeleteModal from '@/components/public/DeleteModal.vue';
import PaginationList from '@/components/public/PaginationList.vue';
import ToastCard from '@/components/public/ToastCard.vue';

export default {
  name: 'dashBoard',
  components: {
    // ProductItem,
    ProductModal,
    DeleteModal,
    PaginationList,
    ToastCard,
  },
  data() {
    return {
      tempProduct: {}, // 目前要新增/編輯的產品暫存處
      products: {}, // 所有的產品
      isNew: true, // true:新增產品, false:編輯產品
      isLoading: false, // true的時候，載入畫面會有過場動畫
      toastList: [],
      toastCard: [],
      nowPage: 1,
    };
  },
  methods: {
    getProducts() {
      const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/products`;
      this.$http.get(api)
        .then((res) => {
          if (res.data.success) {
            // console.log(res.data);
            this.products = res.data.products;
          }
        });
    },
    // 更新產品清單
    showProducts(page = 1) {
      this.nowPage = page;
      const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/admin/products?page=${page}`;
      this.isLoading = true;
      this.$http.get(api)
        .then((res) => {
          this.products = res.data.products;
          this.isLoading = false;
          console.log(this.products);
        });
    },
    // 開啟產品的Modal (OK)
    openProductModal(isNew, item = {}) {
      this.isNew = isNew;
      this.tempProduct = item;
      this.$refs.productModal.openModal();
    },
    // 新增產品(如果this.isNew是true那就新增產品，如果是false那就編輯產品) (OK)
    addData(editProduct) {
      this.tempProduct = editProduct;
      if (this.isNew) {
        this.isLoading = true;
        const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/admin/product`;
        this.$http.post(api, { data: this.tempProduct })
          .then((res) => {
            console.log('add', res);
            this.showProducts();
            this.isLoading = false;
            const toastMsg = { title: '新增產品', ...res.data };
            this.toastList.push(toastMsg);
          });
      } else {
        console.log(this.tempProduct.id);
        this.isLoading = true;
        const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/admin/product/${this.tempProduct.id}`;
        this.$http.put(api, { data: this.tempProduct })
          .then((res) => {
            this.showProducts(this.nowPage);
            console.log('edit', res);
            this.isLoading = false;
            const toastMsg = { title: '編輯產品', ...res.data };
            this.toastList.push(toastMsg);
          });
      }
      this.tempProduct = {};
    },
    // 開啟刪除產品的Modal (OK)
    openDelModal(item, index) {
      this.$refs.delModal[index].openModal();
    },
    // 刪除產品 (OK)
    deleteProduct(id) {
      this.isLoading = true;
      const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/admin/product/${id}`;
      // 把刪除完的data放回this.products內
      this.$http.delete(api, { data: this.products })
        .then((res) => {
          // 刷新產品列表
          this.showProducts();
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
    this.showProducts();
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
