<template>
  <div class="administration">
    <div class="app-container total" style="padding:0px">
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span>合伙人黑名单</span>
        </div>

        <el-form
          :inline="true"
          :model="formInline"
          ref="formInline"
          class="demo-form-inline"
          style="margin-left: 50px;"
        >
          <el-form-item label="ID" prop="idnum">
            <el-input
              v-model="formInline.idnum"
              placeholder="请输入ID"
            ></el-input>
          </el-form-item>
          <el-form-item label="登录邮箱" prop="email">
            <el-input
              v-model="formInline.email"
              placeholder="请输入登录邮箱"
            ></el-input>
          </el-form-item>
          <el-form-item label="归属级别" prop="level">
            <el-select
              v-model="formInline.level"
              placeholder="--请选择--"
              style="width:115px;"
            >
              <el-option label="一级代理商" value="one"></el-option>
              <el-option label="二级代理商" value="two"></el-option>
              <el-option label="三级代理商" value="three"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="合伙人状态" prop="state">
            <el-select
              v-model="formInline.state"
              placeholder="--请选择--"
              style="width:115px;"
            >
              <el-option label="试用期" value="probation"></el-option>
              <el-option label="正式代理商" value="official"></el-option>
            </el-select>
          </el-form-item>
          <br />
          <el-form-item label="注册时间" prop="date">
            <el-col :span="8">
              <el-date-picker
                type="date"
                placeholder="起始时间"
                v-model="formInline.star"
                style="width: 100%;"
              ></el-date-picker>
            </el-col>
            <el-col class="line" :span="1" style="margin-left:10px"> - </el-col>
            <el-col :span="8">
              <el-date-picker
                type="date"
                placeholder="截止时间"
                v-model="formInline.end"
                style="width: 100%;"
              ></el-date-picker>
            </el-col>
          </el-form-item>

          <el-form-item>
            <el-button
              type="primary"
              @click="onSubmit"
              style="margin-left: -105px;background-color: rgba(242, 143, 35, 1);border:none"
              >查询</el-button
            >
            <el-button
              @click="resetForm('formInline')"
              style="background-color: rgba(242, 242, 242, 1);border-color: rgba(215, 215, 215, 1);"
              >重置</el-button
            >
            <el-button
              type="primary"
              @click="onexcel"
              style="background-color: rgba(242, 242, 242, 1);border-color: rgba(215, 215, 215, 1);color:grey;margin-left:800px"
              >导出Excel</el-button
            >
          </el-form-item>
        </el-form>

        <el-table
          ref="multipleTable"
          :data="tableData"
          tooltip-effect="dark"
          style="width: 100%;margin-left: 50px;"
          @selection-change="handleSelectionChange"
        >
          <el-table-column type="selection" width="55"> </el-table-column>
          <el-table-column label="id">
            <template slot-scope="scope">{{ scope.row.idnum }}</template>
          </el-table-column>
          <el-table-column prop="email" label="登录邮箱"> </el-table-column>
          <el-table-column prop="level" label="所属级别" show-overflow-tooltip>
          </el-table-column>
          <el-table-column
            prop="state"
            label="合伙人状态"
            show-overflow-tooltip
          >
          </el-table-column>
          <el-table-column
            prop="residue"
            label="权限剩余天数"
            show-overflow-tooltip
          >
          </el-table-column>
          <el-table-column prop="date" label="注册时间" show-overflow-tooltip>
          </el-table-column>
          <el-table-column prop="check" label="审核状态" show-overflow-tooltip>
          </el-table-column>

          <el-table-column label="归属合伙人">
            <template slot-scope="scope">
              <span>{{ scope.row.partner }}</span>
              <el-button
                @click="handleClick = true"
                type="text"
                size="small"
                style="color: #66C59D;"
                >查看</el-button
              >
              <el-dialog
                title="【3456@gm.com】的推荐列表"
                :visible.sync="handleClick"
                customClass="customWidth"
              >
                <el-form
                  :inline="true"
                  :model="formInline"
                  ref="formInline"
                  class="demo-form-inline"
                  style=""
                >
                  <el-form-item label="搜索" prop="agentemail">
                    <el-input
                      v-model="formInline.agentemail"
                      placeholder="请输入代理商邮箱"
                    ></el-input>
                  </el-form-item>

                  <el-form-item label="归属级别" prop="level">
                    <el-select
                      v-model="formInline.level"
                      placeholder="--请选择--"
                      style="width:115px;"
                    >
                      <el-option label="一级代理商" value="one"></el-option>
                      <el-option label="二级代理商" value="two"></el-option>
                      <el-option label="三级代理商" value="three"></el-option>
                    </el-select>
                  </el-form-item>
                  <el-form-item label="合伙人状态" prop="state">
                    <el-select
                      v-model="formInline.state"
                      placeholder="--请选择--"
                      style="width:115px;"
                    >
                      <el-option label="试用期" value="probation"></el-option>
                      <el-option
                        label="正式代理商"
                        value="official"
                      ></el-option>
                    </el-select>
                  </el-form-item>

                  <el-form-item label="注册时间" prop="date">
                    <el-col :span="8">
                      <el-date-picker
                        type="date"
                        placeholder="起始时间"
                        v-model="formInline.star"
                        style="width: 100%;"
                      ></el-date-picker>
                    </el-col>
                    <el-col class="line" :span="1" style="margin-left:10px">
                      -
                    </el-col>
                    <el-col :span="8">
                      <el-date-picker
                        type="date"
                        placeholder="截止时间"
                        v-model="formInline.end"
                        style="width: 100%;"
                      ></el-date-picker>
                    </el-col>
                  </el-form-item>

                  <el-form-item>
                    <el-button
                      type="primary"
                      @click="onSubmit"
                      style="background-color: rgba(129, 211, 248, 1);border:none"
                      >查询</el-button
                    >
                    <el-button
                      @click="resetForm('formInline')"
                      style="background-color: rgba(242, 242, 242, 1);border-color: rgba(215, 215, 215, 1);"
                      >重置</el-button
                    >
                    <el-button
                      type="primary"
                      @click="onexcel"
                      style="background-color: rgba(242, 242, 242, 1);border-color: rgba(215, 215, 215, 1);color:grey"
                      >导出Excel</el-button
                    >
                  </el-form-item>
                </el-form>
                <el-divider class="xian"></el-divider>

                <el-table :data="windows" style="margin:0 auto;width: 90%;">
    <el-table-column property="email" label="我的合伙人" ></el-table-column>
    <el-table-column property="level" label="所属级别" ></el-table-column>
    <el-table-column property="state" label="合伙人状态"></el-table-column>
    <el-table-column property="date" label="注册时间" ></el-table-column>
    <el-table-column fixed="right" label="操作" width="100">
      <template slot-scope="scope">
        <el-button @click="handClick(scope.row)" type="text" size="small">查看</el-button>
      </template>
    </el-table-column>
  </el-table>
  <span style="font-size: 14px;color: #555555;margin-left: 30%;margin-top: 30px;display: block;">Found 300 records</span>
  <span style="margin-left: 51%;display: block;margin-top: -23px;">Page</span>
  <el-pagination style="margin-left: 53%;display: block;margin-top: -26px;"
  background
  layout="prev, pager, next"
  :total="10">
</el-pagination>
<span style="margin-left: 62%;display: block;margin-top: -28px;">of 30</span>

              </el-dialog>
            </template>
          </el-table-column>

          <el-table-column label="归属会员">
            <template slot-scope="scope">
              <span>{{ scope.row.member }}</span>
              <el-button
                @click="hendleClick = true"
                type="text"
                size="small"
                style="color: #66C59D;"
                >查看</el-button>
                <el-dialog
                title="【3456@gm.com】的推荐列表"
                :visible.sync="hendleClick"
                customClass="customWidth1"
              >
              <el-form
                  :inline="true"
                  :model="formInline"
                  ref="formInline"
                  class="demo-form-inline"
                  style=""
                >
                <el-form-item label="搜索" prop="agentemail">
                    <el-input
                      v-model="formInline.agentemail"
                      placeholder="请输入代理商邮箱"
                    ></el-input>
                  </el-form-item>
                  <el-form-item label="注册时间" prop="date">
                    <el-col :span="8">
                      <el-date-picker
                        type="date"
                        placeholder="起始时间"
                        v-model="formInline.star"
                        style="width: 100%;"
                      ></el-date-picker>
                    </el-col>
                    <el-col class="line" :span="1" style="margin-left:10px">
                      -
                    </el-col>
                    <el-col :span="8">
                      <el-date-picker
                        type="date"
                        placeholder="截止时间"
                        v-model="formInline.end"
                        style="width: 100%;"
                      ></el-date-picker>
                    </el-col>
                  </el-form-item>
                  <el-form-item>
                    <el-button
                      type="primary"
                      @click="onSubmit"
                      style="background-color: rgba(129, 211, 248, 1);border:none"
                      >查询</el-button
                    >
                    <el-button
                      @click="resetForm('formInline')"
                      style="background-color: rgba(242, 242, 242, 1);border-color: rgba(215, 215, 215, 1);"
                      >重置</el-button
                    >
                    <el-button
                      type="primary"
                      @click="onexcel"
                      style="background-color: rgba(242, 242, 242, 1);border-color: rgba(215, 215, 215, 1);color:grey"
                      >导出Excel</el-button
                    >
                  </el-form-item>
                </el-form>
                 <el-divider class="xian1"></el-divider>
                 <el-table :data="popup" style="margin:0 auto;width: 90%;">
    <el-table-column property="email" label="一级会员昵称" ></el-table-column>
    <el-table-column property="date" label="注册时间" ></el-table-column>
    <el-table-column fixed="right" label="操作" width="100">
      <template slot-scope="scope">
        <el-button @click="hendClick(scope.row)" type="text" size="small">查看</el-button>
      </template>
    </el-table-column>
  </el-table>

   <span style="font-size: 14px;color: #555555;margin-left: 30%;margin-top: 30px;display: block;">Found 300 records</span>
  <span style="margin-left: 50%;display: block;margin-top: -23px;">Page</span>
  <el-pagination style="margin-left: 53%;display: block;margin-top: -26px;"
  background
  layout="prev, pager, next"
  :total="10">
</el-pagination>
<span style="margin-left: 65%;display: block;margin-top: -28px;">of 30</span>
              
              </el-dialog>
                
            </template>
          </el-table-column>

          <el-table-column prop="operator" label="操作人" show-overflow-tooltip>
          </el-table-column>

          <el-table-column fixed="right" label="操作">
            <template slot-scope="scope">
              <el-button
                @click="dialogFormVisible (scope.row)"
                type="text"
                size="small"
                style="color: #66C59D;"
                >查看</el-button
              >
              <el-button @click="blacklistClick = true" type="text" size="small" style="color: #A30014;"
                >白名单</el-button>
                <el-dialog
  title="设为白名单"
  :visible.sync="blacklistClick"
  :append-to-body="true" 
  width="30%"
  center>
  <i class="el-icon-warning-outline" style="font-size: 100px;color: orange;width: 36px;height: 36px;float: left;margin-left: 200px;"></i>
  <span style="margin-top: 100px;
    display: block;
    text-align: center;font-size:16px">确定要将该合伙人设为白名单吗？</span>
  <span slot="footer" class="dialog-footer">
    <el-button type="primary" @click="blacklistClick = false" style="width:195px;height: 51px;background-color: rgba(184, 116, 26, 1);border-color:rgba(184, 116, 26, 1)">确 定</el-button>
    <el-button @click="blacklistClick = false" style="width:195px;height: 51px;">取 消</el-button>
  </span>
</el-dialog>
                
            </template>
          </el-table-column>
        </el-table>
        


      </el-card>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      formInline: {
        idnum: "",
        email: "",
        level: "",
        state: "",
        star: "",
        end: "",

        agentemail: ""
      },
      tableData: [
        {
          idnum: "21431243232",
          email: "3456@gm.com",
          level: "一级合伙人",
          state: "正式合伙人",
          residue: "365",
          date: "12/04/202 17:41:17",
          check: "已通过",
          partner: "365",
          member: "365",
          operator: "admin"
        }
      ],
      windows: [
        {
          email: "3456@gm.com",
          level: "二级合伙人",
          state: "正式合伙人",
          date:"12/04/202 17:41:17",
        }
      ],
      popup:[
        {
           email: "3456@gm.com",
           date:"12/04/202 17:41:17",

        }
      ],
      handleClick: false,
      hendleClick:false,
      blacklistClick:false,
    };
  },
  methods: {
    onSubmit() {
      //console.log("submit!");
    },
    resetForm(formName) {
      this.$refs["formInline"].resetFields();
    },
    onexcel() {
      //console.log("submit!");
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    dialogTableVisible(row) {
      //console.log(row);
    },
    dialogFormVisible(row) {
      //console.log(row);
    },
     handClick(row) {
        //console.log(row);
      },
      hendClick(row) {
        //console.log(row);
      },  
  }
};
</script>
<style lang="scss">
.administration {
  .el-form--inline .el-form-item {
    margin-right: 32px;
  }
  .el-dialog__header {
    background-color: rgba(129, 211, 248, 1);
    text-align: center;
  }
  .el-dialog__title {
    color: white;
    font-size: 15px;
  }
  .customWidth {
    width: 75%;
  }
  .el-form--inline .el-form-item {
    margin-right: 4px;
  }
  .xian{
width: 1438px;
margin-left: -19px;
  }
  .customWidth1 {
    width: 55%;
  }
    .xian1{
width: 1055px;
margin-left: -19px;
  }
  .customWidth2{
    width: 483px;
  }



//   .el-table__row>td{
// 	border: none;
// }
// .el-table::before {//去掉最下面的那一条线
// 	height: 0px;
// }
  
  
}
</style>


<style>
  .el-dialog__header {
    background-color: rgba(247, 162, 0, 1);
    text-align: center;
  }
  .el-dialog__title {
    color: white;
    font-size: 15px;
  }
</style>