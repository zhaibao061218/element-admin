<template>
  <div class="view m-20">
    <div class="pageTitle"><h2>课程管理</h2></div>

    <div class="p-20 bg-white main">
      <el-tabs :value="showClass" tab-position="top" type="card" @tab-click="changeTab">
        <el-tab-pane label="新手课程" name="one">
          <formView
            class="formView"
            btnText="新增初级课程"
            classType="0"
            :CreateUserId="CreateUserId"
            ref="clearForm1"
            @lookData="getPrimaryClass"
          ></formView>
          <el-table :data="Newbie" style="width: 100%">
            <el-table-column label="标题" prop="CourseTitle"> </el-table-column>
            <el-table-column label="上传时间" prop="CreateTime" > </el-table-column>
            <el-table-column label="状态" prop="isOnline" >
              <template slot-scope="scope">
                <span v-if="scope.row.IsOnline === 1">上架</span>
                <span v-if="scope.row.IsOnline === 0">下架</span>
              </template>
            </el-table-column>
            <el-table-column label="操作" width="300" align="left">
              <template slot-scope="scope">
                <router-link
                  :to="{
                    path: '/academy/course/edit/' + 1,
                    query: { type: '1', classType: 1, courseId: scope.row.Id },
                  }"
                >
                  <el-button
                    type="primary"
                    size="small"
                    icon="el-icon-edit"
                    class="editBtn"
                  >
                    编辑
                  </el-button>
                </router-link>
                <el-button
                  type="danger"
                  size="small"
                  icon="el-icon-delete"
                  @click="deleteNewCourseData(scope.row)"
                >
                  删除
                </el-button>
                <el-button
                  type="primary"
                  size="small"
                  icon="el-icon-sort-down"
                  @click="setNewCourseIsOnline(scope.row)"
                >
                  <span v-if="scope.row.IsOnline === 1">下架</span>
                  <span v-if="scope.row.IsOnline === 0">上架</span>
                </el-button>
              </template>
            </el-table-column>
          </el-table>
          <paging
            v-if="page1total > 10"
            :total="page1total"
            :page="currentPage"
            :limit="limit"
            @pagination="changePage1"
          ></paging>
        </el-tab-pane>
        <el-tab-pane label="中级课程" name="two">
          <formView
            class="formView"
            btnText="新增中级课程"
            classType="1"
            ref="clearForm2"
            @lookData="getIntermediateClass"
          ></formView>
          <el-table :data="Intermediate" style="width: 100%">
            <el-table-column label="标题" prop="CourseTitle"> </el-table-column>
            <el-table-column label="创建时间" prop="CreateTime"></el-table-column>
            <el-table-column label="状态" prop="isOnline">
              <template slot-scope="scope">
                <span v-if="scope.row.IsOnline === 1">上架</span>
                <span v-if="scope.row.IsOnline === 0">下架</span>
              </template>
            </el-table-column>
            <el-table-column label="操作" width="380" align="center">
              <template slot-scope="scope">
                <router-link
                  :to="{
                    path: '/academy/course/edit/' + 1,
                    query: { type: '2', classType: 2, courseId: scope.row.Id },
                  }"
                >
                  <el-button
                    type="primary"
                    size="small"
                    icon="el-icon-edit"
                    class="editBtn"
                  >
                    编辑
                  </el-button>
                </router-link>
                <el-button
                  type="danger"
                  size="small"
                  icon="el-icon-delete"
                  @click="deleteData(scope.row)"
                >
                  删除
                </el-button>
                <el-button type="primary" size="small" @click="shelves(scope.row)">
                  <span class="el-icon-sort-down" v-if="scope.row.IsOnline === 1"
                    >下架</span
                  >
                  <span class="el-icon-sort-up" v-if="scope.row.IsOnline === 0"
                    >上架</span
                  >
                </el-button>
              </template>
            </el-table-column>
          </el-table>
          <paging
            v-if="page2total > 10"
            :total="page2total"
            :page="currentPage"
            :limit="limit"
            @pagination="changePage2"
          ></paging>
        </el-tab-pane>
        <el-tab-pane label="高级课程" name="three">
          <formView
            class="formView"
            btnText="新增高级课程"
            classType="2"
            ref="clearForm3"
            @lookData="getSeniorClass"
          ></formView>
          <el-table :data="Advanced" style="width: 100%">
            <el-table-column label="标题" prop="CourseTitle"> </el-table-column>

            <el-table-column label="创建时间" prop="CreateTime"> </el-table-column>

            <el-table-column label="状态" prop="IsTop">
              <template slot-scope="scope">
                <span v-if="scope.row.IsOnline === 1">上架</span>
                <span v-if="scope.row.IsOnline === 0">下架</span>
              </template>
            </el-table-column>

            <el-table-column label="操作" width="380" align="center">
              <template slot-scope="scope">
                <router-link
                  :to="{
                    path: '/academy/course/edit/' + 1,
                    query: { type: '2', classType: 3, courseId: scope.row.Id },
                  }"
                >
                  <el-button
                    type="primary"
                    size="small"
                    icon="el-icon-edit"
                    class="editBtn"
                  >
                    编辑
                  </el-button>
                </router-link>
                <el-button
                  type="danger"
                  size="small"
                  icon="el-icon-delete"
                  @click="deleteData(scope.row)"
                >
                  删除
                </el-button>
                <el-button type="primary" size="small" @click="shelves(scope.row)">
                  <span class="el-icon-sort-down" v-if="scope.row.IsOnline === 1"
                    >下架</span
                  >
                  <span class="el-icon-sort-up" v-if="scope.row.IsOnline === 0"
                    >上架</span
                  >
                </el-button>
              </template>
            </el-table-column>
          </el-table>
          <paging
            v-if="page3total > 10"
            :total="page3total"
            :page="currentPage"
            :limit="limit"
            @pagination="changePage3"
          ></paging>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script>
import formView from "./components/Form";
import paging from "@/components/Pagination/index";
import {
  getCourseList,
  setOnLine,
  deleteCourse,
  getNewCourse,
  setNewCourse,
  deleteNewCourse,
} from "@/api/course";
export default {
  components: { formView, paging },
  data() {
    return {
      Newbie: [],
      Intermediate: [],
      Advanced: [],
      page1total: 10,
      page2total: 10,
      page3total: 10,
      currentCourse: 1,
      currentPage: 1,
      limit: 10,
      lookCondition: {},
      CreateUserId: 0,
      showClass: "one",
    };
  },
  created() {
    switch (this.$route.params.showType) {
      case 1:
        this.showClass = "one";
        this.currentCourse = 0;
        this.getNewCourseData();
        break;
      case 2:
        this.showClass = "two";
        this.currentCourse = 1;
        this.getCourseData();
        break;
      case 3:
        this.showClass = "three";
        this.currentCourse = 2;
        this.getCourseData();
        break;
      default:
        this.showClass = "one";
        this.currentCourse = 0;
        this.getNewCourseData();
    }
  },
  methods: {
    getPrimaryClass(obj) {
      //查询

      this.currentPage = 1;
      this.lookCondition = obj;
      this.getNewCourseData();
    },
    getIntermediateClass(obj) {
      this.currentPage = 1;
      this.currentCourse = parseInt(obj.classType);
      this.lookCondition = obj;
      this.getCourseData();

      //查询
    },
    getSeniorClass(obj) {
      this.currentPage = 1;
      this.lookCondition = obj;
      this.currentCourse = parseInt(obj.classType);
      this.getCourseData();
      //查询
    },
    deleteData(obj) {
      this.$confirm("此操作将永久删除此课程, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        var params = {
          Id: obj.Id,
          UpdateUserId: obj.LastUpdateUserId,
        };
        deleteCourse(params)
          .then((res) => {
            this.$message({
              type: "success",
              message: "删除成功!",
            });
            this.getCourseData();
          })
          .catch((err) => {
            this.$message.error("删除操作失败");
          });
      });
    },
    shelves(obj) {
      //console.log(obj);
      var message = "";
      var online = 0;

      if (obj.IsOnline === 1) {
        online = 0;
        message = "下架";
      } else {
        online = 1;
        message = "上架";
      }
      this.$confirm(`此操作将${message}该课程, 是否继续?`, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        var params = {
          Id: obj.Id,
          UpdateUserId: obj.LastUpdateUserId,
          IsOnline: online,
        };
        setOnLine(params)
          .then((res) => {
            this.$message({
              type: "success",
              message: message,
            });
            this.getCourseData();
          })
          .catch((err) => {
            this.$message.error("对不起操作失败");
          });
      });
    },
    getCourseData() {
      var params = {
        CourseType: this.currentCourse,
        PageIndex: this.currentPage,
        PageSize: this.limit,
      };
      if (this.lookCondition) {
        if (this.lookCondition.className) {
          params.CourseTitle = this.lookCondition.className;
        }
        if (this.lookCondition.starTime) {
          params.StartTime = this.lookCondition.starTime;
        }
        if (this.lookCondition.endTime) {
          params.EndTime = this.lookCondition.endTime;
        }
      }
      getCourseList(params)
        .then((res) => {
          if (this.currentCourse === 1) {
            this.page2total = res.ResponseData.Total;
            this.Intermediate = res.ResponseData.Data;
          }
          if (this.currentCourse === 2) {
            this.page1tota3 = res.ResponseData.Total;
            this.Advanced = res.ResponseData.Data;
          }
        })
        .catch((err) => {
          this.$message.error("查询失败");
        });
    },
    changeTab(value) {
      this.currentPage = 1;

      this.currentCourse = parseInt(value.index);
      this.lookCondition = {};

      if (this.currentCourse === 0) {
        this.getNewCourseData();
      } else {
        this.getCourseData();
      }

      this.$refs.clearForm1.clearForm();
      this.$refs.clearForm2.clearForm();
      this.$refs.clearForm3.clearForm();
    },
    changePage1(obj) {
      //初级课程分页
      this.currentPage = obj.page;
      this.limit = obj.limit;
      this.getNewCourseData(this.lookCondition);
    },
    changePage2(obj) {
      this.currentPage = obj.page;
      this.limit = obj.limit;
      this.getCourseData(this.lookCondition);
    },
    changePage3(obj) {
      this.currentPage = obj.page;
      this.limit = obj.limit;
      this.getCourseData(this.lookCondition);
    },
    getNewCourseData() {
      var params = {
        PageIndex: this.currentPage,
        PageSize: this.limit,
      };
      if (this.lookCondition) {
        if (this.lookCondition.className) {
          params.CourseTitle = this.lookCondition.className;
        }
        if (this.lookCondition.starTime) {
          params.StartTime = this.lookCondition.starTime;
        }
        if (this.lookCondition.endTime) {
          params.EndTime = this.lookCondition.endTime;
        }
      }
      getNewCourse(params)
        .then((res) => {
          this.page1total = res.ResponseData.Total;
          this.Newbie = res.ResponseData.Data;
          this.CreateUserId = res.ResponseData.Data[0].CreateUserId;
        })
        .catch((err) => {
          //console.log(err);
        });
    },
    setNewCourseIsOnline(obj) {
      var isOnline = obj.IsOnline === 1 ? "下架" : "上架";
      this.$confirm(`此操作将${isOnline}该课程, 是否继续?`, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        var online = 0;
        var message = "";
        if (obj.IsOnline === 1) {
          online = 0;
          message = "该课程已下架!";
        } else {
          online = 1;
          message = "该课程已上架!";
        }

        var params = {
          Id: obj.Id,
          UpdateUserId: obj.LastUpdateUserId,
          IsOnline: online,
        };
        setNewCourse(params)
          .then((res) => {
            this.$message({
              type: "success",
              message: message,
            });

            this.getNewCourseData();
          })
          .catch((err) => {
            this.$message.error("对不起操作失败");
          });
      });
    },
    deleteNewCourseData(obj) {
      this.$confirm("此操作将永久删除此课程, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        var params = {
          Id: obj.Id,
          UpdateUserId: obj.LastUpdateUserId,
        };
        deleteNewCourse(params)
          .then((res) => {
            this.$message({
              type: "success",
              message: "删除成功!",
            });
            this.getNewCourseData();
          })
          .catch((err) => {
            this.$message.error("删除操作失败");
          });
      });
    },
  },
};
</script>
<style scoped lang="scss">
.view {
  h3 {
    border-bottom: 1px solid #ccc;
    margin-bottom: 10px;
    line-height: 40px;
    color: #555555;
    font-size: 20px;
    font-weight: lighter;
    margin: 20px;
  }
}
.main {
  .formView {
    margin: 20px 0px;
  }
  .editBtn {
    margin-right: 10px;
  }
}
</style>
