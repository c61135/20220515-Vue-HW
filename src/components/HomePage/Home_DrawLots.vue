<template>
  <div class="drawLots">
    <div class="text h100">
      <h4 class="mb-5">
        不知道該選哪本書嗎？
      </h4>
      <h4>
        來抽一本屬於你的命定書吧！
      </h4>
      <button class="btn_shape mt-5" @click="changePage">
        <div class="btn_icon me-3">
          <i class="fas fa-dice fs-4"></i>
        </div>
        <h5 class="m-0">
          命定推薦
        </h5>
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HomeDrawLots',
  methods: {
    changePage() {
      this.$router.push('/drawlots');
    },
  },
};
</script>

<style>
.drawLots {
  background-image: url(./../../assets/drawLots.jpg);
  background-size: cover;
  background-position: top left;
  height: 500px;
}

.text {
  backdrop-filter: blur(5px);
  background-color: rgba(255, 255, 255, 0.2);
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

h4 {
  color: #843C0C;
  text-align: center;
  font-weight: bold !important;
}

.btn_icon {
  width: 50px;
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  background-color: #E8F1E8;
}

.btn_shape{
  height: 60px;
  width: 180px;
  border-radius: 120px;
  background-color: #D2E3D1;
  border: none;
  display: flex;
  align-items: center;
  box-shadow: 2px 2px gray;
}

h5{
  color: #843C0C;
  font-weight: bold !important;
}

.btn_shape:hover{
  box-shadow: none;
}
</style>
