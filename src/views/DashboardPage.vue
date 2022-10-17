<template>
  <div class="row dashboard">
    <div class="col-2 pt-3 bg-light d-flex flex-column justify-content-between">
      <div class="d-flex flex-column align-items-center ">
        <router-link to="/dashboard" class="d-block navBtn w-75"
        data-hover="產品" @click="changeNavBtn('產品')" :class="{navBtnActive:changePage=='產品'}">
          產品列表
        </router-link>
        <router-link to="/coupons" class="d-block navBtn w-75"
        data-hover="折價券" @click="changeNavBtn('折價券')" :class="{navBtnActive:changePage=='折價券'}">
          折價券
        </router-link>
        <router-link to="/orders" class="d-block navBtn w-75"
        data-hover="訂單" @click="changeNavBtn('訂單')" :class="{navBtnActive:changePage=='訂單'}">
          訂單
        </router-link>
      </div>
      <div class="d-flex flex-column align-items-center ">
        <router-link to="/orders" class="d-block navBtn w-75"
        data-hover="登出" @click.prevent="logOut()">
          登出
        </router-link>
      </div>
    </div>
    <div class="col-10">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import emitter from '@/methods/emitter';

export default {
  data() {
    return {
      changePage: '產品',
    };
  },
  methods: {
    changeNavBtn(page) {
      this.changePage = page;
    },
    logOut() {
      const api = `${process.env.VUE_APP_API}logout`;
      this.$http.post(api)
        .then((res) => {
          console.log(res, this.user);
          this.$router.push('/login');
        });
    },
  },
  provide() {
    return {
      emitter,
    };
  },
};
</script>

<style>
.dashboard {
  height: 90vh;
}

.navBtn {
  text-decoration: none;
  background: #4C514D;
  border: 1px solid #4C514D;
  color: white;
  border-radius: 5px;
  font-size: 16px;
  font-weight: bold;
  padding: 5px;
  transition-duration: 0.25s;
  margin-bottom: 20px;
  text-align: center;

}

.navBtn:hover {
  background: #888b88;
  color: white;
}

.navBtnActive {
  border: #888b88 5px solid;
}
</style>
