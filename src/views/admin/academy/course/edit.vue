<template>
  <div class="m-20">
    <!-- is-edit true=>编辑，false=>新增 -->
    <article-detail1 v-if="type == 1" :is-edit="true"/>
    <article-detail2 v-if="type == 2" :is-edit="false"/>
  </div>
</template>

<script>
import ArticleDetail1 from "./components/ArticleDetail_1";
import ArticleDetail2 from "./components/ArticleDetail_2";

export default {
  name: "EditForm",
  components: { ArticleDetail1, ArticleDetail2 },
  data() {
    return {
      type: 0,
    };
  },
  created() {
    //1=>编辑新手课程,//2=>编辑中、高级课程
    this.type = this.$route.query.type;
  },
};
</script>
