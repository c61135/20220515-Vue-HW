<template>
  <!-- Modal -->
  <div class="modal fade" id="exampleModal" tabindex="-1"
  aria-labelledby="exampleModalLabel" aria-hidden="true"
    ref="productModal">
    <div class="modal-dialog modal-xl" role="document">
      <div class="modal-content border-0">
        <div class="modal-header bg-dark">
          <h5 class="modal-title text-white" id="exampleModalLabel" v-if="isNew">
            新增產品
          </h5>
          <h5 class="modal-title text-white" id="exampleModalLabel" v-else>
            編輯產品
          </h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal"
          aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <div class="row">
            <div class="col-sm-4">
              <div class="mb-3">
                <label for="customFile" class="form-label w-100">上傳圖片
                  <input type="file" id="customFile" class="form-control"
                  ref="fileInput" @change="uploadFile">
                </label>
              </div>
              <!-- 圖片顯示 -->
              <div class="d-flex justify-content-center">
                <img class="img-fluid w-75 m-2" :src="editProduct.imageUrl" alt="" />
              </div>
            </div>
            <div class="col-sm-8">
              <div class="mb-3">
                <label for="title" class="form-label w-100">
                  排名
                  <input type="number" min="1" class="form-control" id="number" placeholder="請輸入排名"
                    v-model="editProduct.number" />
                    </label>
              </div>
              <div class="mb-3">
                <label for="title" class="form-label w-100">
                  標題
                  <input type="text" class="form-control" id="title"
                  placeholder="請輸入標題" v-model="editProduct.title" />
                </label>
              </div>
              <div class="row gx-2">
                <div class="mb-3 col-md-6">
                  <label for="category" class="form-label w-100">
                    作者
                    <input type="text" class="form-control" id="category" placeholder="請輸入作者"
                      v-model="editProduct.author" /></label>
                </div>
                <div class="mb-3 col-md-6">
                  <label for="price" class="form-label w-100">
                    譯者
                    <input type="text" class="form-control" id="unit" placeholder="請輸入翻譯者"
                      v-model="editProduct.translator" /></label>
                </div>
              </div>
              <div class="row gx-2">
                <div class="mb-3 col-md-6">
                  <label for="category" class="form-label w-100">
                    出版社
                    <input type="text" class="form-control" id="category" placeholder="請輸入出版社"
                      v-model="editProduct.publisher" /></label>
                </div>
                <div class="mb-3 col-md-6">
                  <label for="price" class="form-label w-100">
                    出版日期
                    <input type="text" class="form-control" id="unit" placeholder="請輸入出版日期"
                      v-model="editProduct.date" /></label>
                </div>
              </div>
              <div class="row gx-2">
                <div class="mb-3 col-md-6">
                  <label for="category" class="form-label w-100">
                    分類
                    <input type="text" class="form-control" id="category" placeholder="請輸入分類"
                      v-model="editProduct.category" /></label>
                </div>
                <div class="mb-3 col-md-6">
                  <label for="price" class="form-label w-100">
                    單位
                    <input type="text" class="form-control" id="unit" placeholder="請輸入單位"
                      v-model="editProduct.unit" /></label>
                </div>
              </div>
              <div class="row gx-2">
                <div class="mb-3 col-md-4">
                  <label for="origin_price" class="form-label w-100">
                    原價
                    <input type="number" class="form-control" id="origin_price" placeholder="請輸入原價"
                      v-model="editProduct.origin_price" />
                  </label>
                </div>
                <div class="mb-3 col-md-4">
                  <label for="price" class="form-label w-100">
                    售價
                    <input type="number" class="form-control" id="price" placeholder="請輸入售價"
                      v-model="editProduct.price" /></label>
                </div>
                <div class="mb-3 col-md-4">
                  <label for="price" class="form-label w-100">
                    庫存
                    <input type="number" class="form-control" id="price" placeholder="請輸入庫存數量"
                      v-model="editProduct.stock" /></label>
                </div>
              </div>
              <hr>
              <div class="mb-3">
                <label for="description" class="form-label w-100">封面簡介
                  <textarea type="text" class="form-control" id="description"
                    placeholder="請輸入要顯示的書籍封面簡介" v-model="editProduct.description">
                  </textarea>
                </label>
              </div>
              <div class="mb-3">
                <label for="content" class="form-label w-100">內容簡介
                  <textarea type="text" class="form-control" id="content"
                    placeholder="請輸入書籍內容簡介" style="height: 150px"
                    v-model="editProduct.content">
                  </textarea>
                </label>
              </div>
              <div class="mb-3">
                <label for="content" class="form-label w-100">作者簡介
                  <textarea type="text" class="form-control" id="content"
                    placeholder="請輸入書籍作者簡介" style="height: 150px"
                    v-model="editProduct.authorDes">
                  </textarea>
                </label>
              </div>
              <div class="mb-3">
                <div class="form-check">
                  <label class="form-check-label" for="is_enabled">
                    <input class="form-check-input" type="checkbox"
                    :true-value="1" :false-value="0" id="is_enabled"
                      v-model="editProduct.is_enabled">
                    是否啟用
                  </label>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-outline-secondary" data-bs-dismiss="modal">取消
          </button>
          <button type="button" class="btn btn-primary"
          data-bs-dismiss="modal" @click="sendData()">確認</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Modal from 'bootstrap/js/dist/modal';

export default {
  props: ['isNew', 'tempProduct'],
  data() {
    return {
      editProduct: {},
    };
  },
  watch: {
    tempProduct() {
      this.editProduct = this.tempProduct;
    },
  },
  methods: {
    // 開啟Modal
    openModal() {
      this.productModal.show();
    },
    closeModal() {
      this.productModal.hide();
    },
    // 上傳圖片
    uploadFile() {
      const uploadedFile = this.$refs.fileInput.files[0];
      const formData = new FormData();

      formData.append('file-to-upload', uploadedFile);
      const url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/admin/upload`;
      this.$http.post(url, formData)
        .then((res) => {
          if (res.data.success) {
            this.editProduct.imageUrl = res.data.imageUrl;
          }
        });
    },
    sendData() {
      // 上傳完圖片後要把value清空，不然下個Modal會再出現，所以要先指定id，下面會清除
      const select = this.$refs.fileInput.id;
      // 清除value
      document.getElementById(select).value = '';
      this.$emit('editProduct', this.editProduct);
    },
  },
  mounted() {
    // 把Modal實體化
    this.productModal = new Modal(this.$refs.productModal);
    // 把傳入的tempProduct先指定到editProduct，再v-modal，因為單向數據流
    this.editProduct = this.tempProduct;
  },
};
</script>

<style>
</style>
