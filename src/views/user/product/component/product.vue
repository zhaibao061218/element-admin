<template>
  <div class="productBox">
    <div>
    <el-row>
      <el-col style="productTitle">liuping</el-col>
    </el-row>
    <el-row>
      <el-col :span="7" ><img src="" alt="商品图片"></el-col>
      <el-col :span="17">
        <el-row>
          <el-col>
            <p>ASIN: liuping</p>
            <p>站点: US</p>
            <p>剩余总数: 正常 996， 免评 0</p>
            <p>今日剩余: 正常 996， 免评 0</p>
          </el-col>
        </el-row>
      </el-col>
    </el-row>
    <el-row class="boxBottom">
      <el-col :span="5" :offset="1" :xs="7">
        <el-button type="danger" @click="closeProduct">停止推广</el-button>
      </el-col>
      <el-col :span="5" :offset="1" :xs="7">
        <el-button type="primary" @click="fnProduct(1)">查看商品</el-button>
      </el-col>
      <el-col :span="5" :offset="1" :xs="7">
        <el-button type="warning" @click="fnProduct(2)">编辑商品</el-button>
      </el-col>

       <el-col :span="5" :offset="1" :xs="7" v-if="false">
        <el-button type="primary" @click="fnProduct(1)">删除</el-button>
      </el-col>
      <el-col :span="5" :offset="1" :xs="7" v-if="false">
        <el-button type="warning" @click="fnProduct(2)">开始推广</el-button>
      </el-col>

    </el-row>
    
    </div>
    <div class="generalizeWin">
        推广中
    </div>
    <!-- <div class="generalizeError">
      停止推广
    </div> -->
  </div>
</template>

<script>
export default {
  props: ['obj'],
  methods: {
    // 停止推广商品
    closeProduct() {
      this.$confirm('确认停止推广吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          this.$message({
            type: 'success',
            message: '删除成功!'
          })
          this.$emit('anewGetProduc')
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
    },
    // 查看商品详情 和 修改商品  type 1：查看 2：修改
    fnProduct(val) {
      this.$emit('operationProduct', { type: val })
    }
  }
}
</script>

<style scoped  lang="scss">
.productBox {
  background-color: #fafafa;
  margin-bottom: 20px;
  padding-bottom: 20px;
  position: relative;
  overflow: hidden;
  .generalizeWin{
    background-color: rgb(160, 230, 55);
    color: white;
    padding: 5px 0;
    font-size: 15px;
    transform:rotate(50deg);
    position: absolute;
    top: 30px;
    right: -10px;
    width: 100px;
    text-align: center;
  }
  .generalizeError{
    background-color: rgb(209, 68, 25);
    color: white;
    padding: 5px 0;
    font-size: 15px;
    transform:rotate(50deg);
     position: absolute;
    top: 30px;
    right: -10px;
    width: 100px;
    text-align: center;
  }
}
.boxBottom {
  padding-bottom: 10px;
}
.productTitle{
    margin: 15px;
}
</style>

