<template>
  <div class="container-fluid change">
    <div class="container">
      <h3 class="changeTitle">如何換書</h3>
      <div class="row g-2">
        <div class="col-6 col-md-3">
          <div class="p-1 p-lg-2 step">
            <div class="stepImg">
              <img src="./../../assets/step_1.png" alt="" />
            </div>
            <div class="stepBody">
              <h5 class="stepTitle">
                加入會員
              </h5>
              <p class="stepText">
                註冊會員並開通換書權限
              </p>
            </div>
          </div>
        </div>
        <div class="col-6 col-md-3">
          <div class="p-1 p-lg-2 step">
            <div class="stepImg">
              <img src="./../../assets/step_2.png" alt="" />
            </div>
            <div class="stepBody">
              <h5 class="stepTitle">
                上架書本
              </h5>
              <p class="stepText">
                輸入ISBN與書評，
                <br>
                並繳交10%手續費。
              </p>
            </div>
          </div>
        </div>
        <div class="col-6 col-md-3">
          <div class="p-1 p-lg-2 step">
            <div class="stepImg">
              <img src="./../../assets/step_3.png" alt="" />
            </div>
            <div class="stepBody">
              <h5 class="stepTitle">
                裝箱寄出
              </h5>
              <p class="stepText">
                將書寄給書屋，
                <br>
                書屋確認無誤後發放兌書點數。
              </p>
            </div>
          </div>
        </div>
        <div class="col-6 col-md-3">
          <div class="p-1 p-lg-2 step">
            <div class="stepImg">
              <img src="./../../assets/step_4.png" alt="" />
            </div>
            <div class="stepBody">
              <h5 class="stepTitle">
                交換新書
              </h5>
              <p class="stepText">
                在商城選購喜歡的新書，
                <br>
                並宅配到府。
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HomeChange',
};
</script>

<style>
.change {
  background: #F6FAF6;
  padding-bottom: 20px;
}

.changeTitle {
  font-weight: bold;
  color: #843C0C;
  padding: 20px;
  text-align: center;
}

.step {
  background: #D2E3D1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 5px;
  color: #843C0C;
  text-align: center;
}

.stepImg {
  border: 2px solid #D2E3D1;
  border-radius: 50%;
  background: #fff;
  padding: 10px;
  width: 120px;
  height: 120px;
  display: flex;
  justify-content: center;
  align-items: center;
  transform: translate(0, 50%);
}

.stepImg img {
  height: 80px;
  margin: 0;
}

.stepBody {
  height: 350px;
  width: 90%;
  background: #fff;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 5%;
}

.stepTitle {
  font-weight: bold;
  color: #843C0C;
  margin: 35px 0;
}

.stepText {
  height: 100px;
}

@media screen and (max-width: 992px) {
  .stepBody {
    height: 300px;
  }

  .stepImg {
    height: 100px;
    width: 100px;
  }

  .stepImg img {
    height: 65px;
    margin: 0;
  }

  .stepText {
    font-size: 15px;
    height: 80px;
  }
}

@media screen and (max-width: 768px) {
  .stepBody {
    height: 250px;
  }

  .stepText {
    height: 70px;
    font-size: 13px;
  }
}
</style>
