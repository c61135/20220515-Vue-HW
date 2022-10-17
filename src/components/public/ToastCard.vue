<template>
  <div class="toast bg-white" role="alert" aria-live="assertive" aria-atomic="true" ref="toast">
    <div class="toast-header" :class="this.style ? 'bg-success': 'bg-danger'">
      <strong class="me-auto text-white">{{title}}</strong>
      <button type="button" class="btn-close btn-close-white"
      data-bs-dismiss="toast" aria-label="Close"></button>
    </div>
    <div class="toast-body">
      <span>
        {{ content }}
      </span>
      <br>
    </div>
  </div>
</template>

<script>
import Toast from 'bootstrap/js/dist/toast';

export default {
  name: 'ToastCard',
  props: [
    'msg',
  ],
  data() {
    return {
      style: this.msg.success,
      title: this.msg.title,
      content: this.msg.message,
    };
  },
  mounted() {
    const toastEl = this.$refs.toast;
    const toast = new Toast(toastEl, {
      delay: 2000,
    });
    toast.show();
  },
};
</script>
