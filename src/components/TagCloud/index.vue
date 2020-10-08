<template>
  <div class="cloud" v-if="hotTagData.length > 0">
<!--  <div class="cloud">-->
    <h2 class="hometitle">标签云</h2>
    <ul>
      <a v-for="item in hotTagData" :key="item.id" href="javascript:void(0);" @click="goToList(item.id)">{{item.name}}</a>
    </ul>
  </div>
</template>

<script>
import { getHotTag } from "../../api/index";
export default {
  name: "TagCloud",
  data() {
    return {
      hotTagData: [] //标签列表
    };
  },
  created() {
    getHotTag().then(response => {
      console.log("--------")
      this.hotTagData = response.data;
      console.log(this.hotTagData)
    });
  },
  methods: {
    //跳转到搜索详情页
    goToList(uid) {
      let routeData = this.$router.resolve({ path: "/list", query: { tagUid: uid } });
      window.open(routeData.href, '_blank');
    },
  }
};
</script>

<style>
</style>
