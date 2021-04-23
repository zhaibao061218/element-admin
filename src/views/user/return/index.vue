<template>
  <div class="app-container">
    <div
      style="
        background: #4ba3d3;
        color: #fff;
        hight: 50px;
        line-height: 50px;
        font-size: 20px;
        text-indent: 10px;
      "
    >
      退货管理
    </div>
    <div
      style="
        background: #f7f7f7;
        color: #666;
        hight: 45px;
        line-height: 45px;
        font-size: 14px;
        text-indent: 10px;
        margin: 10px 0 30px 0;
      "
    >
      退货处理流程：
    </div>

    <el-form :inline="true" :model="formInline" class="demo-form-inline">
      <el-form-item label="订单状态">
        <el-select v-model="formInline.region" placeholder="全部">
          <el-option label="全部" value="quanbu" />
          <el-option label="订单编号审核通过" value="tongguo" />
          <el-option label="试用报告待审核" value="shenhe" />
          <el-option label="试用报告审核失败" value="shibai" />
          <el-option label="订单完成" value="wancheng" />
        </el-select>
      </el-form-item>
      <el-form-item label="退货状态">
        <el-select v-model="formInline.region2" placeholder="全部">
          <el-option label="全部" value="quanbus" />
          <el-option label="待确认" value="dai" />
          <el-option label="客服介入" value="keifu" />
          <el-option label="有效" value="youxiao" />
          <el-option label="无效" value="wuxiao" />
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-select
          v-model="formInline.regions"
          placeholder="亚马逊订单号"
          style="width: 150px"
        >
          <el-option label="亚马逊订单号" value="shanghai" />
          <el-option label="ASIN" value="shanghai" />
          <el-option label="退货编号" value="beijing" />
        </el-select>
        <el-input v-model="formInline.name" style="width: 200px" />
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="onSubmit">查询</el-button>
      </el-form-item>
      <el-form-item>
        <el-button
          type="primary"
          clearable="boolean"
          @click="resetForm('formInline')"
        >重置</el-button>
      </el-form-item>
    </el-form>

    <el-table :data="tableData" style="width: 100%; margin-bottom: 30px">
      <el-table-column type="expand">
        <template slot-scope="props">
          <el-form label-position="left" inline class="demo-table-expand">
            <el-form-item label="退货编号">
              <span>{{ props.row.name }}</span>
            </el-form-item>
            <el-form-item label="发起时间">
              <span>{{ props.row.shop }}</span>
            </el-form-item>
            <el-form-item label="退货状态">
              <span>{{ props.row.shopId }}</span>
            </el-form-item>

            <el-button
              type="text"
              @click="dialogTableVisible = true"
            >查看详情</el-button>

            <el-pagination
              style="margin: 50px 0 20px 0"
              :current-page="currentPage4"
              :page-sizes="[100, 200, 300, 400]"
              :page-size="100"
              layout="total, sizes, prev, pager, next, jumper"
              :total="400"
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
            />
          </el-form>
        </template>
      </el-table-column>
      <el-table-column label="站点" prop="id" />
      <el-table-column label="产品ASIN" prop="name" />
      <el-table-column label="AMZ订单号" prop="desc" />
      <el-table-column label="订单状态" prop="status" />
    </el-table>
    <el-dialog title="退款退货" :visible.sync="dialogTableVisible" height="250" width="70%">
      <div class="tui">
        <p>
          注：
          1、请务必核实该笔订单买家已经退款退货，而不是换货等其他情况，再发起该申请，否则导致买家的恶劣行为，平台概不负责；
        </p>
        <p>2、买家拒绝该退款后，平台客服将会介入处理，判决最终退款结果；</p>
        <p>
          3、买家主动同意，系统自动处理该笔订单为退款退货，买家15天内未处理该退款，系统默认买家自动同意该退款。
        </p>
      </div>

    </el-dialog>
    <el-pagination
      :current-page="currentPage4"
      :page-sizes="[100, 200, 300, 400]"
      :page-size="100"
      layout="total, sizes, prev, pager, next, jumper"
      :total="400"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    />
  </div>
</template>

<script>
export default {
  name: 'Return',
  data() {
    return {
      input3: '',
      select: '',
      gridData: [
        {
          date: '111-885oo67-9435875',
          name: 'R1886021046463982-1',
          address: '2021-01-26 10:47:53',
          names: 'ssssf'
        },
        {
          date: '111-885oo67-9435875',
          name: 'R1886021046463982-1',
          address: '2021-01-26 10:47:53',
          names: 'ssssf'
        },
        {
          date: '111-885oo67-9435875',
          name: 'R1886021046463982-1',
          address: '2021-01-26 10:47:53',
          names: 'ssssf'
        },
        {
          date: '111-885oo67-9435875',
          name: 'R1886021046463982-1',
          address: '2021-01-26 10:47:53',
          names: 'ssssf'
        }
      ],
      title: '1212',
      dialogTableVisible: false,
      dialogFormVisible: false,

      form: {

      },
      formLabelWidth: '120px',

      currentPage1: 5,
      currentPage2: 5,
      currentPage3: 5,
      currentPage4: 4,
      tableData: [
        {
          id: 'US',
          name: 'R189633094951820-1',
          category: '江浙小吃、小吃零食',
          desc: '100-0200050-0000019',
          status: '退货退款中',
          address: '上海市普陀区真北路',
          shop: '2021-01-28 16:22:24',
          shopId: '退货待确认'
        },
        {
          id: 'US',
          name: 'R189633094951820-1',
          category: '江浙小吃、小吃零食',
          desc: '100-0200050-0000019',
          status: '退货退款中',
          address: '上海市普陀区真北路',
          shop: '2021-01-28 16:22:24',
          shopId: '退货待确认'
        },
        {
          id: 'US',
          name: 'R189633094951820-1',
          category: '江浙小吃、小吃零食',
          desc: '100-0200050-0000019',
          status: '退货退款中',
          address: '上海市普陀区真北路',
          shop: '2021-01-28 16:22:24',
          shopId: '退货待确认'
        },
        {
          id: 'US',
          name: 'R189633094951820-1',
          category: '江浙小吃、小吃零食',
          desc: '100-0200050-0000019',
          status: '退货退款中',
          address: '上海市普陀区真北路',
          shop: '2021-01-28 16:22:24',
          shopId: '退货待确认'
        }
      ],

      formInline: {
        region: '',
        regions: ''
      }
    }
  },
  methods: {
    resetForm(formName) {
      this.$refs[formName].resetFields()
    },
    handleSizeChange(val) {},
    handleCurrentChange(val) {},
    onSubmit() {
      console.log('submit!')
    }
  }
}
</script>

<style lang="scss" scoped>
.tui > p {
  color: red;
}
.demo-table-expand {
  font-size: 0;
}
.demo-table-expand label {
  width: 90px;
  color: #99a9bf;
}
.demo-table-expand .el-form-item {
  margin-right: 0;
  margin-bottom: 0;
  width: 50%;
}
</style>
