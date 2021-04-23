<template>
  <div class="informations">
      <div class="app-container total" style="padding:0px">
           <el-card class="box-card">
          <div slot="header" class="clearfix">
          <span style="padding: 15px;font-size: 18px;color: #555555;">合伙人管理</span>
        </div>

        <el-tabs type="border-card">
  <el-tab-pane>
    <span slot="label" style="padding: 10px 30px 10px 30px;background-color: rgba(2, 167, 240, 1);color:white;border-top-left-radius: 5px;border-top-right-radius: 5px;">基本信息</span>
      基本信息
      <div class="center">
       <img src="" style="border:1px black solid;width:80px;height:80px;margin-left: 40px;margin-top: 20px;">
       <el-form ref="form" :model="form" style="margin-left: 150px;margin-top: -85px;">
         <el-form-item label="Rebates等级">
    <el-input v-model="form.grade" class="inputBox"></el-input>
  </el-form-item>
  <el-form-item label="合伙人昵称">
    <el-input v-model="form.name"></el-input>
  </el-form-item>
  <el-form-item label="登录邮箱">
    <el-input v-model="form.email"></el-input>
  </el-form-item>
  <el-form-item label="注册时间">
    <el-input v-model="form.date"></el-input>
  </el-form-item>
  <el-form-item label="审核状态">
    <el-input v-model="form.check"></el-input>
  </el-form-item>
  <el-form-item label="银行账户">
    <el-input v-model="form.account"></el-input>
  </el-form-item>

       </el-form>




    </div>
  </el-tab-pane>
  <el-tab-pane label="归属合伙人">归属合伙人</el-tab-pane>
  <el-tab-pane label="归属会员">归属会员</el-tab-pane>
  <el-tab-pane label="奖励记录">奖励记录</el-tab-pane>
  <el-tab-pane label="收支记录">收支记录</el-tab-pane>
</el-tabs>






           </el-card>
      </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      form: {
        grade:'',
        name:'',
        email:'',
        date:'',
        check:'',
        account:'',
      }
    };
  }
};
</script>

<style lang="scss">
.informations{
    // .el-tabs__content{
    //     border: none;
    // }
    // .el-tabs__item is-top is-active{
    //     border-radius: 10px;
    // background: #1890ff;
    // color: white;
    // }
    .el-tabs--border-card > .el-tabs__header{
            border: none;
    }
    .el-tabs--border-card{
        border: none;
    }
    .el-tabs--border-card > .el-tabs__header .el-tabs__item {
         border: none;
    }
    .el-input{
          width: 300px;
    }
    .inputBox{
      border:none;
    }
    
    
}
</style>
