<template>
  <div class="container-fluid">
    <div class="row parallaxBg d-none d-sm-flex">
      <div class="col-7 col-md-6 parallax_1">
      </div>
      <div class="col-5 col-md-6 textPostition">
        <h5 class="scrollText">
          一棵生長了二十年的樹
          <br>
          只能製作二十本的書
        </h5>
      </div>
    </div>
    <div class="row parallaxBg d-flex d-sm-none parallax_1 ">
      <div class="col cover d-flex align-items-center justify-content-center">
        <h6 class="smText m-0">
          一棵生長了二十年的樹
          <br>
          只能製作二十本的書
        </h6>
      </div>
    </div>
    <div class="row d-none d-sm-flex">
      <div class="col-5 col-md-6 p-0 textPostition">
        <h5 class="scrollText">
          據統計
          <br>
          43%的書籍購入後就放在書架上再也沒動過
          <br>
          86%的書籍不會再被翻閱第二次
        </h5>
      </div>
      <div class="col-7 col-md-6 parallax_2">
      </div>
    </div>
    <div class="row d-flex d-sm-none parallax_2">
      <div class="col cover d-flex align-items-center justify-content-center">
        <h6 class="smText m-0">
          據統計
          <br>
          43%的書籍購入後就放在書架上再也沒動過
          <br>
          86%的書籍不會再被翻閱第二次
        </h6>
      </div>
    </div>
    <div class="row parallaxBg d-none d-sm-flex">
      <div class="col-7 col-md-6 parallax_3">
      </div>
      <div class="col-5 col-md-6 p-0 textPostition">
        <h5 class="scrollText">
          因此
          <br>
          我們希望透過交易平台
          <br>
          讓每本˹書˼都能找到愛它的˹屋˼
        </h5>
      </div>
    </div>
    <div class="row parallaxBg d-flex d-sm-none parallax_3">
      <div class="col cover d-flex align-items-center justify-content-center">
        <h6 class="smText m-0">
          因此
          <br>
          我們希望透過交易平台
          <br>
          讓每本˹書˼都能找到愛它的˹屋˼
        </h6>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HomeScroll',
};
</script>

<style>
.parallaxBg {
  background-color: #FCFAF8;
}

.parallax_1 {
  background: url("./../../assets/SrollPic_1.jpg") center center no-repeat;
  min-height: 600px;
  background-attachment: fixed;
  background-size: cover;
  border: 50px solid #FCFAF8;
}

.parallax_2 {
  background: url("./../../assets/SrollPic_2.jpg") center center no-repeat;
  min-height: 600px;
  background-attachment: fixed;
  background-size: cover;
  border: 50px solid white;
}

.parallax_3 {
  background: url("./../../assets/SrollPic_3.jpg") left center no-repeat;
  min-height: 600px;
  background-attachment: fixed;
  background-size: cover;
  border: 50px solid #FCFAF8;
}

.cover {
  background: rgba(255, 255, 255, 0.75);
}

.smText {
  color: #843C0C;
  font-weight: bold;
  letter-spacing: 8px;
  line-height: 2;
}

.textPostition {
  position: relative;
}

.scrollText {
  letter-spacing: 5px;
  line-height: 2;
  border-left: #00B050 5px solid;
  padding: 10px 20px;
  margin: 0 20px 0 40px;
  color: #843C0C;
  position: absolute;
  top: 50%;
  left: 0;
  transform: translateY(-50%);
  text-align: left;
}

.step {
  background: #F6FAF6;
}

@media screen and (max-width: 992px) {
  .parallax_1 {
    min-height: 400px;
  }

  .parallax_2 {
    min-height: 400px;
  }

  .parallax_3 {
    min-height: 400px;
  }

  .scrollText {
    font-size: 15px;
  }
}

@media screen and (max-width: 768px) {
  .parallax_1 {
    border-width: 20px;
    min-height: 300px;
  }

  .parallax_2 {
    border-width: 20px;
    min-height: 300px;
  }

  .parallax_3 {
    border-width: 20px;
    min-height: 300px;
  }

  .scrollText {
    padding: 5px 10px;
    margin-left: 20px;
  }
}
</style>
