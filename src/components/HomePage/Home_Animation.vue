<template>
  <div class="container-fluid banner">
    <div class="bannerText">
      <h4 class="animation_h4">愛書也愛地球</h4>
      <div class="d-flex align-items-end">
        <h4 class="m-0 animation_h4">來</h4>
        <img src="./../../assets/logo.png" alt="" class="logo animate__animated
        animate__jackInTheBox">
        <h4 class="animation_h4 m-0 ms-2">換書吧</h4>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HomeAnimation',
};
</script>

<style>
.logo {
  height: 50px;
  margin: 0;
}

.banner {
  height: 100vh;
  background-image: url('./../../assets/HomeBanner.jpg');
  background-position: left center;
  background-size: cover;
  background-repeat: no-repeat;
  position: relative;
}

.banner::before {
  content: "";
  position: absolute;
  right: 0;
  top: 0;
  border-bottom: 100vh solid #DED1C9;
  border-left: 200px solid transparent;
  border-right: 500px solid #DED1C9;
}

.bannerText {
  position: absolute;
  top: 50%;
  right: 15%;
  transform: translate(0, -50%);
  padding: 20px;
}

@media screen and (max-width: 992px) {
  .banner::before {
    border-left: 150px solid transparent;
    border-right: 350px solid #DED1C9;
  }

  .bannerText {
    right: 10%;
  }
}

@media screen and (max-width: 768px) {
  .banner {
    height: 80vh;
  }

  .banner::before {
    border-left: 125px solid transparent;
    border-right: 300px solid #DED1C9;
    border-bottom: 80vh solid #DED1C9;
  }

  .bannerText {
    right: 5%;
  }
}

@media screen and (max-width: 576px) {
  .logo {
    height: 35px;
  }

  .banner {
    height: 60vh;
  }

  .banner::before {
    border-left: 100px solid transparent;
    border-right: 200px solid #DED1C9;
    border-bottom: 60vh solid #DED1C9;
  }

  .bannerText {
    right: 8%;
    padding: 10px;
  }

  .animation_h4 {
    font-size: 15px;
    letter-spacing: 4px;
  }
}

@keyframes appear {
  from {
    color: transparent;
  }

  to {
    color: black;
  }
}

.bannerText::before {
  position: absolute;
  top: 0;
  left: 0;
  content: "";
  border-top: 2px solid #00B050;
  border-left: 2px solid #00B050;
  animation: change 2s;
  animation-fill-mode: forwards;
}

@keyframes change {
  from {
    width: 10%;
    height: 10%;
  }

  to {
    width: 110%;
    height: 110%;
  }
}

.bannerText::after {
  position: absolute;
  bottom: 0;
  right: 0;
  content: "";
  border-bottom: 2px solid #843C0C;
  border-right: 2px solid #843C0C;
  animation: change 2s;
  animation-fill-mode: forwards;
}

.animation_h4 {
  letter-spacing: 8px;
}
</style>
