<template>
  <div class="productListView">
    <el-row :gutter="12">
      <el-col :span="24" :xs="24">
        <el-card shadow="always">
          <el-form
            ref="form"
            :inline="true"
            :model="form"
            class="demo-form-inline"
          >
            <el-row>
              <el-col :span="5" :xs="12">
                <el-form-item label="状态：">
                  <el-select v-model="form.region" placeholder="全部">
                    <el-option label="全部" :value="0" />
                    <el-option label="未推广" :value="1" />
                    <el-option label="推广中" :value="2" />
                    <el-option label="停止推广" :value="3" />
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="5" :xs="12">
                <el-form-item label="亚马逊站点：">
                  <el-select v-model="form.region" placeholder="全部">
                    <el-option label="全部" :value="0" />
                    <el-option label="美国" :value="1" />
                    <el-option label="英国" :value="2" />
                    <el-option label="日本" :value="3" />
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="5" :xs="24">
                <el-form-item>
                  <el-input
                    v-model="form.name"
                    placeholder="产品名称或者ASIN码"
                  />
                </el-form-item>

                <el-form-item>
                  <el-button type="primary" @click="onSubmit">查询</el-button>
                </el-form-item>
              </el-col>
              <!-- <el-col :span="4">
                <el-form-item>
                  <el-button type="success" @click="onSubmit" slot="reference"
                    >微信授权</el-button
                  >
                </el-form-item>

                <el-form-item>
                  <el-button type="success" @click="onSubmit"
                    >进入移动端</el-button
                  >
                </el-form-item>
              </el-col> -->
              <el-col :span="5" class="toManagement" @click="toManagement" :xs="24">
                <el-form-item>
                  <span style="font-size: 20px">今日上新：2</span>
                </el-form-item>
                <el-form-item>
                  <span>冻结E币: 4982</span>
                </el-form-item>
                <el-form-item>
                  <span>可用E币: 4982</span>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
          <el-button type="warning" @click="dialogVisible = true"
            >添加产品<i class="el-icon-plus"
          /></el-button>
          <el-button type="warning" @click="addProduct(1)"
            >手动添加新产品<i class="el-icon-plus"
          /></el-button>
        </el-card>
      </el-col>
    </el-row>
    <el-row class="collapseBox">
      <el-col>
        <el-collapse>
          <el-collapse-item title="正在抓取ASIN：">
            <el-row v-if="collapseList.length == 0" class="noCollapse">
              <el-col>
                <span>暂无抓取中产品，您可选择</span>&nbsp;&nbsp;&nbsp;
                <el-button type="warning" @click="dialogVisible = true">
                  添加产品<i class="el-icon-plus" />
                </el-button>
              </el-col>
            </el-row>
            <el-row v-else>
              <el-col />
            </el-row>
          </el-collapse-item>
        </el-collapse>
      </el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col v-for="(item, index) in productList" :key="index" :span="8" :xs="24">
        <product
          :obj="productList"
          @anewGetProduc="anewGetProductList"
          @operationProduct="operationProduct"
        />
      </el-col>
    </el-row>
    <el-row>
      <el-col :offset="1" :span="20">
        <el-pagination
          :page-size="pageSize"
          layout="prev, pager, next, jumper"
          :total="total"
          @current-change="handleCurrentChange"
        />
      </el-col>
    </el-row>
    <el-dialog
      title="请输入要抓取的产品ASIN码，多个ASIN码以逗号分开。"
      :visible.sync="dialogVisible"
      width="30%"
      :before-close="handleClose"
      :close-on-click-modal="false"
      class="asinProductListDialog"
      :show-close="false"
    >
      <el-form :model="addForm" class="demo-form-inline">
        <el-form-item label="亚马逊站点：">
          <el-select v-model="addForm.region" placeholder="请选择站点">
            <el-option label="美国" :value="1" />
            <el-option label="英国" :value="2" />
            <el-option label="日本" :value="3" />
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-input v-model="addForm.desc" type="textarea" />
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">关闭</el-button>
        <el-button type="primary" @click="capture">抓取</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import product from "./product";
export default {
  name: "Product",
  components: {
    product,
  },
  data() {
    return {
      pageSize: 10,
      pageIndex: 1,
      dialogVisible: false,
      collapseList: [],
      total: 0,
      productList: [1, 2, 3, 4, 5, 6, 7, 8, 9],
      form: {
        region: 0,
        name: "",
      },
      addForm: {
        desc: "",
        region: "",
      },
    };
  },
  methods: {
    // type 1  添加  2  修改  3 查看
    addProduct(type) {
      this.$emit("toProductView", {
        productViews: 2,
        ViewTitle: "手动添加产品",
        type: type,
      });
    },
    onSubmit() {},
    capture() {
      this.dialogVisible = false;
    },
    // 获取推广产品列表
    getProductList() {},
    // 通过子组件触发的重新查询推广产品列表
    anewGetProductList(val) {},
    handleCurrentChange(val) {
      this.pageIndex = val;
    },
    // 添加抓取信息对话框的关闭前方法
    handleClose() {},
    toManagement() {},
    // 子组件触发切换查看商品 或 修改商品 页面   val 1：查看 2：修改    
    // productViews:1：商品列表 2：商品信息的查看 修改 新增
    // type 1  添加  2  修改  3 查看
    operationProduct(val) {
      if (val.type == 1) {
        this.$emit("toProductView", {
          productViews: 2,          
          ViewTitle: "产品信息",
          type: 3,
        });
      } else if (val.type == 2) {
        this.$emit("toProductView", {
          productViews: 2,
          ViewTitle: "产品编辑",
          type: 2,
        });
      }
    },
  },
};
</script>

<style lang="scss">
.productListView {
  .collapseBox {
    margin-top: 20px;
    margin-bottom: 20px;
  }
  .noCollapse {
    color: rgb(207, 69, 35);
    text-align: center;
  }
  .toManagement:hover {
    cursor: pointer;
  }
  .toManagement {
    color: #ffc833;
    font-weight: bold;
  }
  .asinProductListDialog {
    .el-dialog__header {
      background-color: #4ba3d3;
      .el-dialog__title {
        color: white !important;
      }
    }
  }
}
</style>
