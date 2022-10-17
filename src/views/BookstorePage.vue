<!-- eslint-disable vuejs-accessibility/click-events-have-key-events -->
<template>
  <LoadingStatus :active="isLoading"></LoadingStatus>
  <div class="container-fluid position-relative">
    <h2 class="fw-bold p-4 m-0 text-center">好書商城</h2>
    <hr class="mt-1 mb-4">
    <div class="row">
      <div class="col-3 col-md-2 text-center">
        <div class="sticky">
          <button class="booksClassBtn mt-2 mb-1 w-75"
          :class="{booksBtnActive:classActive=='全部'}"
            @click="changeCategory('全部')">
            全部
          </button>
          <button class="booksClassBtn mt-2 mb-1 w-75"
          :class="{booksBtnActive:classActive=='理財'}"
            @click="changeCategory('理財')">
            理財
          </button>
          <button class="booksClassBtn mt-2 mb-1 w-75"
          :class="{booksBtnActive:classActive=='勵志'}"
            @click="changeCategory('勵志')">
            勵志
          </button>
          <button class="booksClassBtn mt-2 mb-1 w-75"
          :class="{booksBtnActive:classActive=='文學'}"
            @click="changeCategory('文學')">
            文學
          </button>
          <button class="booksClassBtn mt-2 mb-1 w-75"
          :class="{booksBtnActive:classActive=='管理'}"
            @click="changeCategory('管理')">
            管理
          </button>
          <button class="booksClassBtn mt-2 mb-1 w-75"
          :class="{booksBtnActive:classActive=='漫畫'}"
            @click="changeCategory('漫畫')">
            漫畫
          </button>
        </div>
      </div>
      <div class="col-9 col-md-10 d-flex flex-column align-items-center">
        <div class="row g-3 mb-2">
          <div class="col-12 col-md-6 col-xl-4 d-flex align-items-center"
          v-for="book, in products" :key="book.id">
            <div class="card h-100 w-100 shadow-sm booksCard" @click="getProduct(book.id)">
              <div class="row g-0 h-100">
                <div class="col-4 d-flex align-items-center">
                  <img :src="book.imageUrl" class="img-fluid rounded-start m-0 p-2" alt="...">
                </div>
                <div class="col-8">
                  <div class="card-body d-flex flex-column justify-content-between h-100 p-2">
                    <h5 class="bookTitle text-start">{{ book.title }}</h5>
                    <p class="bookDescription text-start">{{ book.description }}</p>
                    <div class="d-flex justify-content-between align-items-center">
                      <p class="bookPrice text-start mb-1">特價 {{ book.price }}</p>
                      <button class="btn btn-outline-secondary" @click.stop="addCart(book.id)">
                        <i class="fs-6 fas fa-cart-plus"></i>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <ul class="booksPagination d-flex justify-content-center">
      <li>
        <a class="page-link" href="#" aria-label="Previous" @click.prevent="prePage()">
          <span aria-hidden="true">&laquo;</span>
        </a>
      </li>
      <li v-for="page in pageList.total" :key="page">
        <a class="page-link" href="#" :class="{pageActive: page == pageList.current }"
          @click.prevent="changePage(page)">{{ page }}</a>
      </li>
      <li>
        <a class="page-link" href="#" aria-label="Next" @click.prevent="nextPage()">
          <span aria-hidden="true">&raquo;</span>
        </a>
      </li>
    </ul>
  </div>
  <!-- ToastCard -->
  <div class="toast-container d-flex flex-column position-absolute top-0 end-0 toastMargin">
    <ToastCard v-for="(msg, key) in toastList" :key="key" :msg="msg"></ToastCard>
  </div>
</template>

<script>
import ToastCard from '@/components/public/ToastCard.vue';
import emitter from '@/methods/emitter';

export default {
  components: {
    ToastCard,
  },
  data() {
    return {
      // 要顯示的該種類當頁產品陣列
      products: [],
      // 所有種類的陣列
      category: {
        current: [],
        all: [],
        investment: [],
        inspirational: [],
        literature: [],
        management: [],
        comics: [],
      },
      classActive: '全部',
      // 頁面
      pageList: {
        current: 1,
        total: 0,
      },
      // 更新通知
      toastList: [],
      toastCard: [],
      // true的時候，載入畫面會有過場動畫
      isLoading: false,
    };
  },
  methods: {
    getProducts() {
      const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/products/all`;
      this.$http.get(api)
        .then((res) => {
          // 所有Books先分類
          for (let i = 0; i < res.data.products.length; i += 1) {
            this.category.all.push(res.data.products[i]);
            switch (res.data.products[i].category) {
              case '理財':
                this.category.investment.push(res.data.products[i]); break;
              case '勵志':
                this.category.inspirational.push(res.data.products[i]);
                break;
              case '文學':
                this.category.literature.push(res.data.products[i]);
                break;
              case '管理':
                this.category.management.push(res.data.products[i]);
                break;
              default:
                this.category.comics.push(res.data.products[i]);
                break;
            }
          }
          this.category.current = this.category.all;
          this.showBooks();
        });
    },
    getProduct(bookId) {
      this.$router.push(`/bookstore/${bookId}`);
    },
    showBooks() {
      // 顯示的書籍
      this.pageList.total = Math.ceil((this.category.current.length + 1) / 12);
      this.products = [];
      for (let i = (this.pageList.current - 1) * 12; i < this.pageList.current * 12; i += 1) {
        if (i < this.category.current.length) {
          this.products.push(this.category.current[i]);
        }
      }
      console.log(this.products);
    },
    changeCategory(category) {
      this.pageList.current = 1;
      switch (category) {
        case '全部':
          this.category.current = this.category.all;
          this.classActive = '全部';
          break;
        case '理財':
          this.category.current = this.category.investment;
          this.classActive = '理財';
          break;
        case '勵志':
          this.category.current = this.category.inspirational;
          this.classActive = '勵志';
          break;
        case '文學':
          this.category.current = this.category.literature;
          this.classActive = '文學';
          break;
        case '管理':
          this.category.current = this.category.management;
          this.classActive = '管理';
          break;
        default:
          this.category.current = this.category.comics;
          this.classActive = '漫畫';
          break;
      }
      this.showBooks();
    },
    prePage() {
      if (this.pageList.current > 1) {
        this.pageList.current -= 1;
      }
      this.showBooks();
    },
    changePage(page) {
      console.log(page);
      if (page <= this.pageList.total || page >= 1) {
        this.pageList.current = page;
      }
      this.showBooks();
    },
    nextPage() {
      if (this.pageList.current < this.pageList.total) {
        this.pageList.current += 1;
      }
      this.showBooks();
    },
    addCart(id) {
      this.isLoading = true;
      const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/cart`;
      const cart = {
        product_id: id,
        qty: 1,
      };
      this.$http.post(api, { data: cart })
        .then((res) => {
          const toastMsg = { title: '加入購物車', ...res.data };
          this.toastList.push(toastMsg);
          this.isLoading = false;
        });
    },
    alertIn() {
      console.log('In');
    },
    alertOut() {
      console.log('Out');
    },
  },
  provide() {
    return {
      emitter,
    };
  },
  created() {
    this.getProducts();
    console.log(this.classActive);
  },
};
</script>

<style>
.booksCard:hover {
  border-width: 1.5px;
  border-color: #00B050 #00B050 #9A5A2D #9A5A2D;
  box-shadow: none;
  cursor: pointer;
}

.booksClassBtn {
  color: #4C514D;
  border: 1px solid #4C514D;
  background: white;
  border-radius: 5px;
  font-size: 16px;
  font-weight: bold;
  padding: 5px;
  transition-duration: 0.25s;
}

.booksClassBtn:hover {
  background: #4C514D;
  color: white;
}

.booksBtnActive {
  background: #4C514D;
  border: #A5A8A6 5px solid;
  color: white;
}

.page-link {
  color: #4C514D;
}

.pageActive {
  background: #4C514D;
  border: #A5A8A6 1px solid;
  color: white;
}

.pageActive:focus {
  background: #4C514D;
  box-shadow: none;
  color: white;
}

.bookTitle {
  font-size: 18px;
}

.bookDescription {
  font-size: 12px;
}

.bookPrice {
  font-size: 12px;
  color: red;
}

.booksPagination {
  display: flex;
}

.booksPagination li {
  list-style-type: none;
}

.sticky {
  position: sticky;
  top: 70px;
}

.toastMargin{
  margin-top: 60px;
}
</style>
