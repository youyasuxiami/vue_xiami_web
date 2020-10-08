<template>
    <div class="tuijian" v-if="fourthData.length > 0">
      <h2 class="hometitle">推荐文章12</h2>
      <ul class="tjpic" v-if="fourthData[0]">
        <i><img v-if="fourthData[0].firstPicture" style="cursor:pointer"  @click="goToInfo(fourthData[0].id)" :src="fourthData[0].firstPicture"></i>
        <p><a href="javascript:void(0);" @click="goToInfo(fourthData[0].id)">{{fourthData[0].title}}</a></p>
      </ul>

      <ul class="sidenews">
        <li v-for="(item, index) in fourthData" v-if="index != 0" :key="item.id">
          <i><img style="cursor:pointer" v-if="item.firstPicture" @click="goToInfo(fourthData[0].id)" :src="item.firstPicture"></i>
          <p><a href="javascript:void(0);" @click="goToInfo(item.id)">{{item.title}}</a></p>
          <span>{{item.createTime}}</span>
        </li>
      </ul>
    </div>
</template>

<script>
import { getBlogByLevel } from "../../api/index";
export default {
  name: 'FourthRecommend',
    data() {
    	return {
	      fourthData: [], //；四级推荐数据
    	}
    },
    created() {
      var fourthParams = new URLSearchParams();
      fourthParams.append("level", 4);
      getBlogByLevel(fourthParams).then(response => {
        this.fourthData = response.data;
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
