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
        :key="item.uid"
        class="blogs"
        data-scroll-reveal="enter bottom over 1s"
      >
        <h3 class="blogtitle">
          <a href="javascript:void(0);" @click="goToInfo(item.uid)">{{item.title}}</a>
        </h3>

        <span class="blogpic">
          <a href="javascript:void(0);" @click="goToInfo(item.uid)" title>
            <img v-if="item.photoList" :src="PICTURE_HOST + item.photoList[0]" alt>
          </a>
        </span>

        <p class="blogtext">{{item.summary}}</p>
        <div class="bloginfo">
          <ul>

            <li class="author">
              <span class="iconfont">&#xe60f;</span>
              <a href="javascript:void(0);" @click="goToAuthor(item.author)">{{item.author}}</a>
            </li>
            <li class="lmname" v-if="item.blogSort">
              <span class="iconfont">&#xe603;</span>
              <a
                href="javascript:void(0);"
                @click="goToList(item.blogSort.uid)"
              >{{item.blogSort.sortName}}</a>
            </li>
            <li class="view">
              <span class="iconfont">&#xe8c7;</span>
              <span>{{item.clickCount}}</span>
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
      }
    },
    mounted() {
      // 注册scroll事件并监听
      var that = this;
      that.loading = false;
    },
    // created() {
    //   this.newBlogList();
    //
    // },
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
          if (response.code == "success") {
            this.newBlogData = response.data.records;
            this.total = response.data.total;
            this.pageSize = response.data.size;
            this.currentPage = response.data.current;
          }
          this.loadingInstance.close();
        },function(err){
          this.loadingInstance.close();
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
