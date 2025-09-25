<template>
  <div class="pagination">
    <button class="prev" @click="prevPage" :disabled="current === 1">&laquo;</button>
    <span v-for="page in totalPages" :key="page" class="page" :class="{ active: page === current }" @click="changePage(page)">{{ page }}</span>
    <button class="next" @click="nextPage" :disabled="current === totalPages">&raquo;</button>
  </div>
</template>

<script>
export default {
  props: {
    total: {
      type: Number,
      required: true
    },
    current: {
      type: Number,
      required: true
    }
  },
  computed: {
    totalPages() {
      return Math.ceil(this.total / 8);
    }
  },
  methods: {
    changePage(page) {
      this.$emit('page-change', page);
    },
    prevPage() {
      if (this.current > 1) {
        this.changePage(this.current - 1);
      }
    },
    nextPage() {
      if (this.current < this.totalPages) {
        this.changePage(this.current + 1);
      }
    }
  }
}
</script>

<style scoped>
.pagination {
  margin-top: 20px;
  text-align: center;
}

.page {
  font-size: 15px;
  font-weight: bold;
  border: 1px solid rgb(182, 182, 182);
  border-radius: 4px;
  padding: 2px 10px;
  margin: 0 5px;
  cursor: pointer;
}

.page.active {
  border-color: #fab300;
  color: #fab300;
}

button {
  cursor: pointer;
}

/* Responsive Styles */
@media only screen and (max-width: 768px) {
  .pagination {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
  }

  .prev,
  .next,
  .page {
    margin: 5px;
    padding: 5px 10px;
    font-size: 12px;
  }
}

@media only screen and (max-width: 480px) {
  .prev,
  .next,
  .page {
    font-size: 10px;
    padding: 3px 6px;
  }
}
</style>
