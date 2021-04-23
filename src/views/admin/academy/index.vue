<template>
  <div class="m-20">
    <div class="pageTitle"><h2>学院页设置</h2></div>
    <div class="bg-white p-20">
      <el-tabs :value="tabName" tab-position="top" type="card" @tab-click="changeTab">
        <el-tab-pane label="首页管理" name="first">
          <el-table :data="indexPageIconItems" style="width: 100%">
            <el-table-column label="层级" prop="PositionLevel" width="180">
              <template slot-scope="scope">
                <span> 第{{ scope.row.PositionLevel }}层</span>
              </template>
            </el-table-column>

            <el-table-column label="名称" prop="CatalogName"> </el-table-column>

            <el-table-column label="位置" prop="SortNumber" width="180">
            </el-table-column>

            <el-table-column label="操作" width="180">
              <template slot-scope="scope">
                <el-button size="mini" @click="handleEdit(scope.row.Id, 1)"
                  >编辑</el-button
                >
              </template>
            </el-table-column>
          </el-table>
        </el-tab-pane>
        <el-tab-pane label="内容编辑" name="second">
          <el-table :data="contentEditing" style="width: 100%">
            <el-table-column label="序号" type="index" width="180"> </el-table-column>

            <el-table-column label="版块标题" prop="CatalogName"> </el-table-column>

            <el-table-column label="位置" prop="SortNumber" width="180">
              <!-- <template slot-scope="scope">
               <span> 第{{scope.row.sortNumber}}层</span>
            </template> -->
            </el-table-column>

            <el-table-column label="操作" width="180">
              <template slot-scope="scope">
                <el-button size="mini" @click="handleEdit(scope.$index, 2)"
                  >编辑</el-button
                >
              </template>
            </el-table-column>
          </el-table>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>
<script>
import { getCatalogList, getContentList } from "@/api/management";
export default {
  data() {
    return {
      indexPageIconItems: [],
      contentEditing: [],
      tabName: "first",
    };
  },
  created() {
    //console.log(this.$route.params);
    if (this.$route.params.showType === 2) {
      this.tabName = "second";
    } else {
      this.tabName = "first";
    }
    
  },
  mounted() {
    this.getListData();
    this.getContentData();
  },
  methods: {
    handleEdit(id, type) {
      //type =>1 首页管理, =>2 内容编辑
      let routerPath = "/404";
      if (type == 1) {
        routerPath = "/academy/icon/edit";
      } else {
        if (id == 0) {
          //banner 编辑
          routerPath = "/academy/banner/edit";
        } else if (id <= 2) {
          //Getting Started,Q&A内容编辑
          routerPath = "/academy/content/edit";
        } else if (id == 3) {
          //Rebatest brand story（视频）编辑
          routerPath = "/academy/brandstory/edit";
        } else if (id == 4) {
          //Share & Earn（海报图片）编辑
          routerPath = "/academy/shareearn/edit";
        }
      }
      this.$router.push({
        path: routerPath,
        query: {
          id: id,
        },
      });
    },
    getListData() {
      getCatalogList()
        .then((res) => {
         //console.log(res);
          this.indexPageIconItems = res.ResponseData;
        })
        .catch((err) => {
          //console.log(err);
        });
    },
    getContentData() {
      getContentList()
        .then((res) => {
         //console.log(res);
          this.contentEditing = res.ResponseData;
        })
        .catch((err) => {
          //console.log(err);
        });
    },
    changeTab() {
      //console.log(this.indexPageIconItems);
    },
  },
};
</script>
