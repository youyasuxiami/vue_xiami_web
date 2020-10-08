<template>
  <div class="zhuanti" v-if="thirdData.length > 0">
    <h2 class="hometitle">特别推荐</h2>
    <ul>
      <li  v-for="item in thirdData" :key="item.id"> <i><img v-if="item.firstPicture" :src="item.firstPicture"></i>
        <p>{{item.title}} <span><a href="javascript:void(0);" @click="goToInfo(item.id)">阅读</a></span> </p>
      </li>
    </ul>
  </div>
</template>

<script>
import { getBlogByLevel } from "../../api/index";
export default {
  name: 'ThirdRecommend',
    data() {
    	return {
        slideList: [],
	      thirdData: [], //；一级推荐数据
    	}
    },
    created() {
      var thirdParams = new URLSearchParams();
      thirdParams.append("level", 3);
      getBlogByLevel(thirdParams).then(response => {
        if (response.code == "20000") {
          this.thirdData = response.data;
        }
      });
    },
    methods: {
      //跳转到文章详情
	    goToInfo(uid) {

        let routeData = this.$router.resolve({ path: "/info", query: { blogUid: uid } });
        window.open(routeData.href, '_blank');

	    }
    },

}
</script>

<style>
</style>
