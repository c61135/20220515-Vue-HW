<template>
  <!-- Modal -->
  <div class="modal fade" id="exampleModal" tabindex="-1"
  aria-labelledby="exampleModalLabel" aria-hidden="true"
    ref="couponModal">
    <div class="modal-dialog modal-xl" role="document">
      <div class="modal-content border-0">
        <div class="modal-header bg-dark">
          <h5 class="modal-title text-white" id="exampleModalLabel" v-if="isNew">
            新增折價券
          </h5>
          <h5 class="modal-title text-white" id="exampleModalLabel" v-else>
            編輯折價券
          </h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal"
          aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <div class="mb-3">
            <label for="title" class="form-label w-100">
              折價券名稱
              <input type="text" class="form-control" id="title"
              placeholder="請輸入折價券名稱" v-model="editCoupon.title" />
            </label>
          </div>
          <div class="mb-3">
            <label for="code" class="form-label w-100">
              折扣碼
              <input type="text" class="form-control" id="code"
              placeholder="請輸入折扣碼" v-model="editCoupon.code" />
            </label>
          </div>
          <div class="mb-3">
            <label for="percent" class="form-label w-100">
              折扣百分比
              <input type="number" class="form-control" id="percent" placeholder="請輸入折扣"
                v-model="editCoupon.percent" />
            </label>
          </div>
          <div class="mb-3">
            <label for="due_date" class="form-label w-100">
              到期日
              <input type="date" class="form-control" id="due_date"
              placeholder="請輸入到期日" v-model="editCoupon.due_date" />
            </label>
          </div>
          <div class="mb-3">
            <div class="form-check">
              <label class="form-check-label" for="is_enabled">
                <input class="form-check-input" type="checkbox" :true-value="1"
                :false-value="0" id="is_enabled"
                  v-model="editCoupon.is_enabled">
                是否啟用
              </label>
            </div>
          </div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-outline-secondary" data-bs-dismiss="modal">取消
          </button>
          <button type="button" class="btn btn-primary" data-bs-dismiss="modal"
          @click="sendData()">確認</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Modal from 'bootstrap/js/dist/modal';

export default {
  props: ['isNew', 'tempCoupon'],
  data() {
    return {
      editCoupon: {},
    };
  },
  watch: {
    tempCoupon() {
      this.editCoupon = this.tempCoupon;
    },
  },
  methods: {
    // 開啟Modal
    openModal() {
      this.couponModal.show();
    },
    closeModal() {
      this.couponModal.hide();
    },
    sendData() {
      this.editCoupon.due_date = Date.parse(this.editCoupon.due_date);
      this.$emit('editCoupon', this.editCoupon);
    },
  },
  mounted() {
    // 把Modal實體化
    this.couponModal = new Modal(this.$refs.couponModal);
    // 把傳入的tempCoupon先指定到editCoupon，再v-modal，因為單向數據流
    this.editCoupon = this.tempCoupon;
  },
};
</script>

<style>
</style>
