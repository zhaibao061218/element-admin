<template>
  <div class="app-container">
    <div v-if="ProductConfig.productViews == 1">
      <product-list @toProductView="toProductView" />
    </div>
    <div v-else-if="ProductConfig.productViews == 2">
      <product-view
        :product-config="this.ProductConfig"
        @toProductList="toProductList"
      />
    </div>
  </div>
</template>

<script>
import productList from "./component/productList";
import productData from "./component/productData.vue";
import ProductView from "./component/productView.vue";
export default {
  name: "Product",
  components: {
    productList,
    productData,
    ProductView,
  },
  data() {
    return {
      activeName: "first",
      ProductConfig: {
        productViews: 1,
        viewTitle: "",
        // typeView 1:添加  2:修改  3:查看
        typeView: 1,
      },
    };
  },
  watch: {
    activeName(val) {
      if (val == "first") {
      } else {
      }
    },
  },
  methods: {
    toProductView(obj) {
      this.ProductConfig.productViews = obj.productViews;
      this.ProductConfig.viewTitle = obj.ViewTitle;
      this.ProductConfig.typeView = obj.type;
    },
    toProductList() {
      this.ProductConfig.productViews=1;
    },
  },
};
</script>

<style lang="scss" scoped>
.app-container {
  background-color: #ffffff;
  margin-top: 10px;
  width: 98%;
  margin-left: 1%;
  margin-right: 1%;
}
</style>
