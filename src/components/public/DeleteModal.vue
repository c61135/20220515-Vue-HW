<template>
  <!-- Modal -->
  <div class="modal fade" ref="delModal" tabindex="-1"
  aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header bg-danger">
          <h5 class="modal-title text-white" id="exampleModalLabel">刪除提醒</h5>
          <button type="button" class="btn-close text-danger"
          data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          確定要刪除
          <span class="fw-bold text-danger">{{delTitle}}</span>
          ？
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary"
          data-bs-dismiss="modal">取消</button>
          <!-- @click後回傳要刪除的產品 -->
          <button type="button" class="btn btn-danger"
          @click="$emit('deleteProduct', delId)"
          data-bs-dismiss="modal">
            確定</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Modal from 'bootstrap/js/dist/modal';

export default {
  props: ['delTitle', 'delId', 'index'],
  data() {
    return {
      delModal: {}, // 要刪除的產品
    };
  },
  methods: {
    // 開啟Modal
    openModal() {
      console.log(this.delId);
      this.delModal.show();
    },
  },
  mounted() {
    // 把Modal實體化
    this.delModal = new Modal(this.$refs.delModal);
  },
};
</script>
