<template>
  <div class="productDataBox">
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
            </el-row>
          </el-form>
        </el-card>
      </el-col>
    </el-row>
    <el-table
      :data="tableData"
      style="width: 100%; margin-top: 30px; margin-bottom: 30px"
    >
      <el-table-column type="index" label="序号" align="center" />
      <el-table-column prop="date" label="站点" align="center" />
      <el-table-column prop="name" label="产品ASIN" align="center" />
      <el-table-column prop="address" label="创建时间" align="center" />
      <el-table-column prop="address" label="当前状态" align="center" />
      <el-table-column prop="address" label="申请订单数" align="center" />
      <el-table-column prop="address" label="关闭订单数" align="center" />
      <el-table-column prop="address" label="完成订单数" align="center" />
      <el-table-column prop="address" label="留评订单数" align="center" />
      <el-table-column prop="address" label="留评率" align="center" />
      <el-table-column prop="address" label="消费本金" align="center" />
      <el-table-column prop="address" label="服务费" align="center" />
    </el-table>
    <el-pagination
      :page-size="pageSize"
      layout="prev, pager, next, jumper"
      :total="total"
      @current-change="handleCurrentChange"
    />
  </div>
</template>

<script>
export default {
  name: 'Product',
  data() {
    return {
      pageSize: 10,
      total: 0,
      pageIndex: 1,
      form: {
        region: 0,
        name: ''
      },
      tableData: [
        {
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        },
        {
          date: '2016-05-04',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1517 弄'
        },
        {
          date: '2016-05-01',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1519 弄'
        },
        {
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1516 弄'
        }
      ]
    }
  },
  methods: {
    onSubmit() {},
    handleCurrentChange(val) {
      this.pageIndex = val
    }
  }
}
</script>

<style lang="scss" scope>
.productDataBox{
  background-color: #ffffff;
  margin-top: 10px;
  width: 98%;
  margin-left: 1%;
  margin-right: 1%;
}
</style>
