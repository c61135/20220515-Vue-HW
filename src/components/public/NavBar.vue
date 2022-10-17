<template>
  <nav class="container-fluid navbar navbar-expand-md navbar-light fixed-top">
    <div class="container-fluid d-flex justify-content-between align-items-center">
      <!-- 這個Button是RWD時用 -->
      <button class="navbar-toggler" type="button"
      data-bs-toggle="collapse" data-bs-target="#navbarNav"
        aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <!-- router-link to="" 裡面放 / 時，會導回首頁 -->
      <router-link to="/" class="navbar-brand" @click="changeNavBtn()">
        <img class="h-100" src="../../assets/logo.png" alt="這是一張商標的圖片">
      </router-link>
      <div class="d-flex d-md-none">
        <i class="btn-circle navBar_i fas fa-user me-2"></i>
        <i class="btn-circle navBar_i fas fa-shopping-cart">
          <span class="bg-success text-white rounded-pill px-2 py-1 cartNum">
              {{cartNum}}
            </span>
        </i>
      </div>
      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav d-flex justify-content-center w-100">
          <li>
            <router-link to="/bookstore" @click="changeNavBtn('好書商城')"
            :class="{navBtnActive:changePage=='好書商城', navBtnHover:!(changePage=='好書商城')}"
            data-hover="好書商城">好書商城</router-link>
          </li>
          <li>
            <router-link to="/drawlots" @click="changeNavBtn('命定推薦')"
            :class="{navBtnActive:changePage=='命定推薦', navBtnHover:!(changePage=='命定推薦')}"
            data-hover="命定推薦">命定推薦</router-link>
          </li>
          <li>
            <router-link to="/qa" @click="changeNavBtn('客服中心')"
            :class="{navBtnActive:changePage=='客服中心', navBtnHover:!(changePage=='客服中心')}"
            data-hover="客服中心">客服中心</router-link>
          </li>
        </ul>
      </div>
      <div class="d-none d-md-flex">
        <router-link to="/login" class="p-0 m-0 fs-6" data-hover="後台" @click="changeNavBtn('後台')">
          <i class="btn-circle navBar_i fas fa-user me-2"
          :class="{btnCircleActive:changePage=='後台'}"></i>
        </router-link>
        <router-link to="/cart" class="p-0 m-0 fs-6" data-hover="購物車" @click="changeNavBtn('購物車')">
          <i class="btn-circle navBar_i fas fa-shopping-cart"
            :class="{btnCircleActive:changePage=='購物車'}">
            <span class="bg-success text-white rounded-pill px-2 py-1 cartNum">
              {{cartNum}}
            </span>
          </i>
        </router-link>
      </div>
    </div>
    <!-- <cartNum></cartNum> -->
  </nav>
  <!-- 下面這行是為了讓其他Module都可以與NavBar有保持距離 -->
  <div class="navMargin"></div>
</template>

<script>
import emitter from '@/methods/emitter';
// import cartNum from '@/components/public/cartNum.vue';

export default {
  components: {
    // cartNum,
  },
  data() {
    return {
      changePage: '',
      cartNum: '',
    };
  },
  methods: {
    changeNavBtn(page) {
      this.changePage = page;
    },
    getCart() {
      const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/cart`;
      this.$http.get(api)
        .then((res) => {
          console.log('cart', res.data.data);
          const cartLength = res.data.data.carts.length;
          let num = 0;
          for (let i = 0; i < cartLength; i += 1) {
            num += res.data.data.carts[i].qty;
          }
          this.cartNum = num;
        });
    },
  },
  provide() {
    return {
      emitter,
    };
  },
  created() {
    emitter.on('unactive', (data) => {
      this.changePage = data;
      console.log(data);
    });
    this.getCart();
  },
};
</script>

<style>
.navbar {
  background: #f5eedc;
  top: 0;
  left: 0;
  padding: 0;
}

.navbar-brand {
  height: 60px;
}

.navBar_i {
  color: #773E18;
}

.navMargin{
  padding-bottom: 60px;
}

/* BTN 的樣式 */
.navBtnHover {
  display: inline-block;
  text-decoration: none;
  font-size: 18px;
  font-weight: bold;
  margin: 10px;
  color: transparent;
  position: relative;
  border-bottom: 2px solid transparent;
}

.navBtnHover:hover {
  color: transparent;
}

.navBtnHover::before,
.navBtnHover::after {
  content: attr(data-hover);
  width: 100%;
  position: absolute;
  top: 0;
  left: 0;
  opacity: 0;
  transition: 0.3s;
}

.navBtnHover::before {
  opacity: 1;
  color: #773E18;
}

.navBtnHover::after {
  color: #00B050;
  margin-top: 1em;
  border-bottom: #00B050 2px solid;
}

.navBtnHover:hover::before {
  opacity: 0;
  margin-top: -1em;
}

.navBtnHover:hover::after {
  opacity: 1;
  margin-top: 0;
}

.navBtnActive {
  color: #00B050;
  border-bottom: #00B050 2px solid;
  display: inline-block;
  text-decoration: none;
  font-size: 18px;
  font-weight: bold;
  margin: 10px;
  position: relative;
}

.btn-circle {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  border: solid 1px #773E18;
  transition: 0.3s;
  cursor: pointer;
}

.btn-circle:hover {
  background: #773E18;
  color: #fff;
}

.btnCircleActive {
  border: solid 1px #773E18;
  background: #773E18;
  color: white;
}

img {
  height: 60px;
  margin-bottom: 30px;
}

.cartNum {
  font-size: 13px;
  font-weight: 100;
  position: absolute;
  top: 3px;
  right: 3px;
}
</style>
