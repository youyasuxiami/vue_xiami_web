<template>
  <article>
    <!--banner begin-->
    <div class="picsbox">
      <FirstRecommend></FirstRecommend>
      <!--banner end-->

      <!-- 二级推荐 -->
      <div class="toppic">
        <li v-for="item in 2" :key="item" @click="goToInfo(item.uid)">
          <a href="javascript:void(0);">
            <i>
              <img src="https://unsplash.it/800/450?image=1005">
            </i>
            <h2>{{item}}</h2>
            <span>{{item}}</span>
          </a>
        </li>
      </div>
    </div>

    <div class="blank"></div>

    <div class="blogsbox">
      <div
        v-for="item in newBlogData"
        :key="item.id"
        class="blogs"
        data-scroll-reveal="enter bottom over 1s"
      >
        <h3 class="blogtitle">
          <a href="javascript:void(0);" @click="goToInfo(item.id)">{{item.title}}</a>
        </h3>

        <span class="blogpic">
          <a href="javascript:void(0);" @click="goToInfo(item.id)" title>
            <img  :src="item.firstPicture" alt>
          </a>
        </span>

        <p class="blogtext">{{item.description}}</p>
        <div class="bloginfo">
          <ul>

            <li class="author">
              <span class="iconfont">&#xe60f;</span>
              <a href="javascript:void(0);" @click="goToAuthor(item.userId)">{{item.userId}}</a>
            </li>
<!--            <li class="lmname" v-if="item.blogSort">-->
            <li class="lmname">
              <span class="iconfont">&#xe603;</span>
              <a
                href="javascript:void(0);"
                @click="goToList(item.id)"
              >{{item.description}}</a>
            </li>
            <li class="view">
              <span class="iconfont">&#xe8c7;</span>
              <span>{{item.views}}</span>
            </li>
            <li class="like">
              <span class="iconfont">&#xe663;</span>
              {{item.collectCount}}
            </li>
            <li class="createTime">
              <span class="iconfont">&#xe606;</span>
              {{item.createTime}}
            </li>
          </ul>
        </div>
      </div>

      <div class="isEnd">
        <!-- <span v-if="!isEnd">正在加载中~</span> -->

        <div class="loadContent" @click="loadContent" v-if="!isEnd&&!loading">点击加载更多</div>

        <div class="lds-css ng-scope" v-if="!isEnd&&loading">
          <div style="width:100%;height:100%" class="lds-facebook">
            <div></div>
            <div></div>
            <div></div>
          </div>
        </div>

        <span v-if="isEnd">我也是有底线的~</span>
      </div>
    </div>
  </article>
</template>

<script>
  import FirstRecommend from "../components/FirstRecommend";
  import {getNewBlog} from "../api/index";
  import { Loading } from "element-ui";


  export default {
    components: {
      //注册组件
      FirstRecommend
    },
    data() {
      return {
        newBlogData: [], //最新文章
        loading: false, //是否正在加载
        currentPage: 1,
        pageSize: 15,
        total: 0, //总数量
        isEnd: false, //是否到底底部了
        loadingInstance: null, // loading对象
      }
    },
    mounted() {
      // 注册scroll事件并监听
      var that = this;
      that.loading = false;
    },
    created() {
      this.newBlogList();
    },
    methods: {
      //跳转到文章详情
      goToInfo(uid) {

        let routeData = this.$router.resolve({
          path: "/info",
          query: {blogUid: uid}
        });
        window.open(routeData.href, '_blank');
      },
      newBlogList() {
        this.loadingInstance = Loading.service({
          lock: true,
          text: '正在努力加载中……',
          background: 'rgba(0, 0, 0, 0.7)'
        })
        const params = new URLSearchParams();
        params.append("currentPage", this.currentPage);
        params.append("pageSize", this.pageSize);
        getNewBlog(params).then(response => {
          if (response.code == "20000") {
            this.newBlogData = response.data.data;
            this.total = response.data.total;
            // this.pageSize = response.data.size;
            // this.currentPage = response.data.current;
          }
          this.loadingInstance.close();
        });
      },
      loadContent: function () {
        var that = this;
        that.loading = false;
        that.currentPage = that.currentPage + 1;
        var params = new URLSearchParams();
        params.append("currentPage", that.currentPage);
        params.append("pageSize", that.pageSize);
        getNewBlog(params).then(response => {
          if (response.code == "20000" && response.data.data.length > 0) {
            that.isEnd = false;
            var newData = that.newBlogData.concat(response.data.data);
            that.newBlogData = newData;
            that.total = response.data.total;
            that.pageSize = response.data.size;
            that.currentPage = response.data.current;

            //全部加载完毕
            if (newData.length < that.pageSize) {
              that.isEnd = true;
            }
          } else {
            that.isEnd = true;
          }
          that.loading = false;
        });
      }

    }
  }
</script>

<style>
  .el-loading-mask {
    z-index: 2002;
  }

  .isEnd {
    float: left;
    width: 100%;
    height: 80px;
    text-align: center;
  }

  .ng-scope {
    margin: 0 auto;
    width: 18%;
    height: 10%;
  }

  .loadContent {
    width: 120px;
    height: 30px;
    line-height: 30px;
    font-size: 16px;
    margin: 0 auto;
    color: aliceblue;
    cursor: pointer;
    background: rgba(0, 0, 0, 0.8);
  }

  @keyframes lds-facebook_1 {
    0% {
      top: 0px;
      height: 200px;
    }
    50% {
      top: 80px;
      height: 40px;
    }
    100% {
      top: 80px;
      height: 40px;
    }
  }

  @-webkit-keyframes lds-facebook_1 {
    0% {
      top: 0px;
      height: 200px;
    }
    50% {
      top: 80px;
      height: 40px;
    }
    100% {
      top: 80px;
      height: 40px;
    }
  }

  @keyframes lds-facebook_2 {
    0% {
      top: 20px;
      height: 160px;
    }
    50% {
      top: 80px;
      height: 40px;
    }
    100% {
      top: 80px;
      height: 40px;
    }
  }

  @-webkit-keyframes lds-facebook_2 {
    0% {
      top: 20px;
      height: 160px;
    }
    50% {
      top: 80px;
      height: 40px;
    }
    100% {
      top: 80px;
      height: 40px;
    }
  }

  @keyframes lds-facebook_3 {
    0% {
      top: 40px;
      height: 120px;
    }
    50% {
      top: 80px;
      height: 40px;
    }
    100% {
      top: 80px;
      height: 40px;
    }
  }

  @-webkit-keyframes lds-facebook_3 {
    0% {
      top: 40px;
      height: 120px;
    }
    50% {
      top: 80px;
      height: 40px;
    }
    100% {
      top: 80px;
      height: 40px;
    }
  }

  .lds-facebook {
    position: relative;
  }

  .lds-facebook div {
    position: absolute;
    width: 20px;
  }

  .lds-facebook div:nth-child(1) {
    left: 40px;
    background: #1d0e0b;
    -webkit-animation: lds-facebook_1 1s cubic-bezier(0, 0.5, 0.5, 1) infinite;
    animation: lds-facebook_1 1s cubic-bezier(0, 0.5, 0.5, 1) infinite;
    -webkit-animation-delay: -0.2s;
    animation-delay: -0.2s;
  }

  .lds-facebook div:nth-child(2) {
    left: 90px;
    background: #774023;
    -webkit-animation: lds-facebook_2 1s cubic-bezier(0, 0.5, 0.5, 1) infinite;
    animation: lds-facebook_2 1s cubic-bezier(0, 0.5, 0.5, 1) infinite;
    -webkit-animation-delay: -0.1s;
    animation-delay: -0.1s;
  }

  .lds-facebook div:nth-child(3) {
    left: 140px;
    background: #d88c51;
    -webkit-animation: lds-facebook_3 1s cubic-bezier(0, 0.5, 0.5, 1) infinite;
    animation: lds-facebook_3 1s cubic-bezier(0, 0.5, 0.5, 1) infinite;
  }

  .lds-facebook {
    width: 90px !important;
    height: 90px !important;
    -webkit-transform: translate(-45px, -45px) scale(0.45) translate(45px, 45px);
    transform: translate(-45px, -45px) scale(0.45) translate(45px, 45px);
  }

  .iconfont {
    font-size: 15px;
    margin-right: 2px;
  }

</style>
