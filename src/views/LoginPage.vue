<template>
  <div class="container-fluid login">
    <form class="row justify-content-center" @submit.prevent="signIn()">
      <div class="col-12 col-md-6 col-lg-7 d-flex flex-column justify-content-center
      align-items-center text-center mb-5 mb-md-0">
        <div class="imgBg mb-5">
          <img src="../assets/tree.png" alt="" class="m-0 imgTree">
        </div>
        <div>
          <h3 class="mb-3 loginTitle">加入書屋會員</h3>
          <h5 class=" loginContent">上架書籍達十萬元</h5>
          <h5 class=" loginContent">就免費幫會員在亞馬遜河種一棵樹</h5>
          <h5 class=" loginContent">愛書同時也愛地球</h5>
        </div>
      </div>
      <div class="col-12 col-md-6 col-lg-5 d-flex flex-column align-items-center bg-white p-5">
        <h3 class="mb-3 loginTitle w-100 text-center">會員登入</h3>
        <hr class="w-100">
        <div class="mb-3 w-100">
          <label for="inputEmail" class="fw-bold w-100">
            信箱帳號
            <input type="email" id="inputEmail" class="mt-1 form-control w-100"
            placeholder="Email address" v-model="user.username" required />
          </label>
        </div>
        <div class="mb-3 w-100">
          <label for="inputPassword" class="fw-bold w-100">
            密碼
            <input type="password" id="inputPassword" class="mt-1 form-control w-100"
            placeholder="Password" v-model="user.password" required />
          </label>
        </div>
        <button class="loginBtn w-100 mb-2" type="submit">登入</button>
        <hr class="w-100">
        <div class="d-flex align-items-center mt-2">
          <span class="me-3 me-lg-5">其他登入方式</span>
          <i class="btn-circle navBar_i fab fa-facebook-f me-2 me-lg-3"></i>
          <i class="btn-circle navBar_i fab fa-google me-2 me-lg-3"></i>
          <i class="btn-circle navBar_i fab fa-twitter"></i>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  name: 'loginPage',
  data() {
    return {
      user: {
        username: '',
        password: '',
      },
    };
  },
  methods: {
    signIn() {
      // 登入
      let api = `${process.env.VUE_APP_API}admin/signin`;
      this.$http.post(api, this.user)
        .then((res) => {
          if (res.data.success) {
            const { token, expired } = res.data;// 物件解構
            document.cookie = `hexToken=${token}; expires=${new Date(expired)}`;
            this.$router.push('/dashboard');
          }
        });

      // 是否持續登入
      const loginToken = document.cookie.replace(/(?:(?:^|.*;\s*)hexToken\s*=\s*([^;]*).*$)|^.*$/, '$1');
      this.$http.defaults.headers.common.Authorization = loginToken;
      api = `${process.env.VUE_APP_API}api/user/check`;
      this.$http.post(api)
        .then((res) => {
          console.log('登入中', res);
        });
    },
  },
  created() {
    this.signIn();
  },
};
</script>

<style>
.imgBg {
  background: #fff;
  border-radius: 50%;
  width: 125px;
  height: 125px;
  padding: 25px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.imgTree {
  width: 100%;
  height: 100%;
}

.loginTitle {
  color: #843C0C;
  font-weight: bold;
}

.loginContent {
  color: black;
  font-weight: 100;
}

.login {
  background: #f7dcb168;
  padding: 50px;
}

.loginBtn {
  background: #4C514D;
  border: 1px solid #4C514D;
  color: white;
  border-radius: 5px;
  font-size: 16px;
  font-weight: bold;
  padding: 5px;
  transition-duration: 0.25s;
}

.loginBtn:hover {
  background: #888b88;
}
</style>
