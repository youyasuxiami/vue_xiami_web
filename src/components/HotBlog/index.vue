<template>
    <div class="tuijian" v-if="hotBlogData.length > 0">
      <h2 class="hometitle">点击排行</h2>
      <ul class="tjpic" v-if="hotBlogData[0]">
        <i><img style="cursor:pointer" v-if="hotBlogData[0].firstPicture" :src="hotBlogData[0].firstPicture" @click="goToInfo(hotBlogData[0].id)"></i>
        <p><a href="javascript:void(0);" @click="goToInfo(hotBlogData[0].id)">{{hotBlogData[0].title}}</a></p>
      </ul>
      <ul class="sidenews">
        <li v-for="(item, index) in hotBlogData" v-if="index != 0" :key="item.id">
          <i><img style="cursor:pointer"  v-if="item.firstPicture" :src="item.firstPicture" @click="goToInfo(item.id)"></i>
          <p><a href="javascript:void(0);" @click="goToInfo(item.id)">{{item.title}}</a></p>
          <span>{{item.createTime}}</span>
        </li>
      </ul>
    </div>
</template>

<script>
import { getHotBlog } from "../../api/index";
export default {
  name: "TagCloud",
  data() {
    return {
      PICTURE_HOST: process.env.PICTURE_HOST,
      hotBlogData: [] //热门博客列表
    };
  },
  created() {
    getHotBlog().then(response => {
      this.hotBlogData = response.data;
    });
  },
  methods: {
      //跳转到文章详情
	    goToInfo(uid) {
        let routeData = this.$router.resolve({ path: "/info", query: { blogUid: uid } });
        window.open(routeData.href, '_blank');
	    }
  }
};
</script>

<style>

</style>
