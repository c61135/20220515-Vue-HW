<template>
  <ul class="booksPagination d-flex justify-content-center">
    <li>
      <a class="page-link" href="#" aria-label="Previous" @click.prevent="prePage()">
        <span aria-hidden="true">&laquo;</span>
      </a>
    </li>
    <li v-for="page in pagination.total_pages" :key="page">
      <a class="page-link" href="#" :class="{pageActive: page == pagination.current_page }"
        @click.prevent="changePage(page)">{{ page }}</a>
    </li>
    <li>
      <a class="page-link" href="#" aria-label="Next" @click.prevent="nextPage()">
        <span aria-hidden="true">&raquo;</span>
      </a>
    </li>
  </ul>
</template>

<script>
export default {
  props: ['type'],
  data() {
    return {
      pagination: {},
      page: 1,
    };
  },
  methods: {
    getPages() {
      const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/admin/${this.type}?page=${this.page}`;
      this.$http.get(api)
        .then((res) => {
          this.pagination = res.data.pagination;
        });
    },
    prePage() {
      // 如果有前一頁的話，再進行後續動作
      if (this.pagination.has_pre) {
        this.page -= 1;
        // 執行完後，把目前頁面傳回做產品列表更新
        this.$emit('prePage', this.page);
        // 會先取得this.page，再透過刷新API，取得目前最新的頁面資訊
        this.getPages();
      }
    },
    changePage(page) {
      // 把template的page賦值到data內的page，再透過刷新API，取得目前最新的頁面資訊
      this.page = page;
      console.log('change', this.page);
      this.getPages();
      // 執行完後，把目前頁面傳回做產品列表更新
      console.log('change', this.page);
      this.$emit('changePage', this.page);
      console.log('change', this.page);
    },
    nextPage() {
      // 如果有前一頁的話，再進行後續動作
      if (this.pagination.has_next) {
        this.page += 1;
        // 執行完後，把目前頁面傳回做產品列表更新
        this.$emit('changePage', this.page);
        // 會先取得this.page，再透過刷新API，取得目前最新的頁面資訊
        this.getPages();
      }
    },
  },
  mounted() {
    this.getPages();
  },
};
</script>

<style>
.booksPagination {
  display: flex;
}

.booksPagination li {
  list-style-type: none;
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
</style>
