<template>
    <article>
        <el-dialog :visible.sync="dialogPictureVisible" fullscreen>
            <img :src="dialogImageUrl" alt="dialogImageUrl" style="margin: 0 auto;"/>
        </el-dialog>
        <h1 class="t_nav">
            <a href="/" class="n1">网站首页</a>
            <a
                    href="javascript:void(0);"
                    v-if="blogData.ttagList[0]"
                    @click="goToSortList(blogData.ttagList[0].id)"
                    class="n2"
            >{{blogData.ttagList[0]?blogData.ttagList[0].name:""}}</a>
        </h1>
        <div class="infosbox">
            <div class="newsview">
                <h3 class="news_title" v-if="blogData.title">{{blogData.title}}</h3>
                <div class="bloginfo" v-if="blogData.ttagList">
                    <ul>
                        <li class="author">
                            <span class="iconfont">&#xe60f;</span>
                            <a href="javascript:void(0);"
                               @click="goToAuthor(blogData.userName)">{{blogData.userName}}</a>
                        </li>
                        <li class="lmname">
                            <span class="iconfont">&#xe603;</span>
                            <a
                                    href="javascript:void(0);"
                                    @click="goToSortList(blogData.ttagList[0].id)"
                            >{{blogData.ttagList[0] ? blogData.ttagList[0].name:""}}</a>
                        </li>
                        <li class="view">
                            <span class="iconfont">&#xe8c7;</span>
                            {{blogData.views}}
                        </li>
                        <li class="like">
                            <span class="iconfont">&#xe663;</span>
                            {{blogData.collectCount}}
                        </li>
                        <li class="createTime">
                            <span class="iconfont">&#xe606;</span>
                            {{blogData.createTime}}
                        </li>
                    </ul>
                </div>





                <!--        标签-->
                <div class="tags">
                    <a
                            v-if="blogData.ttagList"
                            v-for="item in blogData.ttagList"
                            :key="item.id"
                            href="javascript:void(0);"
                            @click="goToList(item.id)"
                            target="_blank"
                    >{{item.name}}</a>
                </div>
                <div
                        class="news_con ck-content"
                        v-html="blogData.content"
                        v-highlight
                        @click="imageChange"
                >{{blogData.content}}
                </div>
            </div>

            <!--付款码和点赞-->
            <PayCode :blogId="blogId"></PayCode>

            <div class="otherlink" v-if="sameBlogData.length > 0">
                <h2>相关文章</h2>
                <ul>
                    <li v-for="item in sameBlogData" :key="item.id">
                        <a
                                href="javascript:void(0);"
                                @click="goToInfo(item.id)"
                                title="item.title"
                        >{{subText(item.title, 18)}}</a>
                    </li>
                </ul>
            </div>
            <div class="news_pl">
                <h2>文章评论</h2>
                <ul>
                    <CommentBox
                            :userInfo="userInfo"
                            :commentInfo="commentInfo"
                            @submit-box="submitBox"
                            :showCancel="showCancel"
                    ></CommentBox>
                    <div class="message_infos">
                        <CommentList :comments="comments" :commentInfo="commentInfo"></CommentList>
                        <div class="noComment" v-if="comments.length ==0">还没有评论，快来抢沙发吧！</div>
                    </div>
                </ul>
            </div>
        </div>
<!--        右侧边栏-->
        <div class="sidebar2">
            <side-catalog
                    ref="catalog"
                    class="side-catalog"
                    v-bind="catalogProps"
                    :catalogSum = "catalogSum"
                    v-if="showSideCatalog"
            >
                <span v-if="catalogSum > 0" style="font-size: 16px;font-weight: bold;">目录</span>
            </side-catalog>

            <sticky :sticky-top="stickyTop" v-if="!showSideCatalog">
                <side-catalog
                        ref="catalog"
                        class="side-catalog"
                        v-bind="catalogProps"
                        :catalogSum = "catalogSum"
                >
                    <span v-if="catalogSum > 0" style="font-size: 16px;font-weight: bold;">目录</span>
                </side-catalog>
            </sticky>
        </div>
    </article>
</template>
<script>

    import {getBlogById, getSameBlogByBlogId,addComment,getCommentList} from "../api/blogContent";
    import PayCode from "../components/PayCode";
    import CommentBox from "../components/CommentBox";
    import CommentList from "../components/CommentList";

    // // vuex中有mapState方法，相当于我们能够使用它的getset方法
    import { mapMutations } from "vuex";
    import {Loading} from "element-ui";
    //右侧边栏
    import SideCatalog from "../components/VueSideCatalog"
    import Sticky from "@/components/Sticky";


    export default {
        name: "info",
        data() {
            return {
                stickyTop: 10,
                showSideCatalog: true,
                loadingInstance: null, // loading对象
                showCancel: false,
                submitting: false,
                comments: [],
                commentInfo: {
                    // 评论来源： MESSAGE_BOARD，ABOUT，BLOG_INFO 等 代表来自某些页面的评论
                    source: "BLOG_INFO",
                    blogId: this.$route.query.blogId
                },
                currentPage: 1,
                pageSize: 10,
                total: 0, //总数量
                toInfo: {},
                userInfo: {},
                blogId: null, //传递过来的博客uid
                blogData: {
                    ttagList: {}
                },
                sameBlogData: [], //相关文章
                linkData: [], //友情链接
                dialogPictureVisible: false,
                dialogImageUrl: "",
                catalogProps: {
                    // 内容容器selector(必需)
                    containerElementSelector: '.ck-content',
                    openDomWatch: true,
                },
                // 目录列表数
                catalogSum: 0,
            };
        },
        components: {
            //注册组件
            // FourthRecommend,
            // ThirdRecommend,
            // TagCloud,
            // HotBlog,
            // FollowUs,
            PayCode,
            CommentList,
            CommentBox,
            SideCatalog,
            Sticky
        },
        mounted() {
            this.blogId = this.$route.query.blogId;

            var that = this;
            var params = new URLSearchParams();
            params.append("id", this.blogId);
            getBlogById(params).then(response => {
                if (response.code == "20000") {
                    this.blogData = response.data;
                }
                this.loadingInstance.close();
            });
            //
              var offset = 200;
              var after = 0;
              $(window).scroll(function () {
                var docHeight = $(document).height(); // 获取整个页面的高度(不只是窗口,还包括为显示的页面)
                var winHeight = $(window).height(); // 获取当前窗体的高度(显示的高度)
                var winScrollHeight = $(window).scrollTop(); // 获取滚动条滚动的距离(移动距离)

                if (winScrollHeight < offset) {
                  console.log("当前值", winScrollHeight)
                  that.showSideCatalog = true
                } else {
                  console.log("当前值", winScrollHeight)
                  that.showSideCatalog = false
                }
                if (winScrollHeight > after) {
                  // console.log("隐藏顶部栏", winScrollHeight)
                  that.stickyTop = 10
                } else {
                  // console.log("显示顶部栏", winScrollHeight)
                  that.stickyTop = 70
                }
                after = winScrollHeight;


                //还有30像素的时候,就查询
                if(docHeight == winHeight + winScrollHeight){
                  if(that.comments.length >= that.total) {
                    console.log('已经到底了')
                    return;
                  }
                  let params = {};
                  // params.source = that.commentInfo.source;
                  params.currentPage = that.currentPage + 1
                  params.pageSize = that.pageSize;
                  getCommentList(params).then(response => {
                    if (response.code == "20000") {
                      // that.comments = that.comments.concat(response.data.records);
                      that.comments = response.data;
                      that.setCommentList(this.comments);
                      // that.currentPage = response.data.current;
                      // that.pageSize = response.data.size;
                      that.total = response.data.total;
                    }
                  });
                }
              })
        },
        created() {
            this.loadingInstance = Loading.service({
                fullscreen: true,
                text: "正在努力加载中~"
            });
            // getLink().then(response => {
            //     this.linkData = response.data.records;
            // });
            this.blogId = this.$route.query.blogId;
            this.commentInfo.blogId = this.$route.query.blogId;
            var blogParams = new URLSearchParams();
            blogParams.append("blogId", this.blogId);
            getSameBlogByBlogId(blogParams).then(response => {
                if (response.code == "20000") {
                    this.sameBlogData = response.data;
                }
            });
            this.getCommentDataList();
        },
        methods: {
            // 拿到vuex中的写的两个方法
            ...mapMutations(["setCommentList"]),
            handleCurrentChange: function(val) {
                this.currentPage = val;
                this.getCommentDataList();
            },
            submitBox(e) {
                let params = {};
                params.userId = e.userId;
                params.content = e.content;
                params.blogId = e.blogId;
                params.userAvatar = e.avatar;
                // params.source = e.source;
                // params.userUid = e.userUid;
                // params.content = e.content;
                // params.blogId = e.blogId;
                addComment(params).then(response => {
                    if (response.code == "20000") {
                        this.$notify({
                            title: "成功",
                            message: "发表成功~",
                            type: "success",
                            offset: 100
                        });
                    } else {
                        this.$notify.error({
                            title: "错误",
                            message: response.data,
                            offset: 100
                        });
                    }
                    this.getCommentDataList();
                });
            },
            getCommentDataList: function () {
                let params = {};
                // params.source = this.commentInfo.source;
                params.blogId = this.commentInfo.blogId;
                params.currentPage = this.currentPage;
                params.pageSize = this.pageSize;
                getCommentList(params).then(response => {
                    if (response.code == "20000") {
                        this.comments = response.data.data;
                        this.setCommentList(this.comments);
                        // this.currentPage = response.data.current;
                        // this.pageSize = response.data.size;
                        this.total = response.data.total
                    }
                });
            },
            //跳转到文章详情
            goToInfo(uid) {
                let routeData = this.$router.resolve({
                    path: "/info",
                    query: {blogId: uid}
                });
                window.open(routeData.href, "_blank");
            },
            //跳转到搜索详情页
            goToList(uid) {
                let routeData = this.$router.resolve({
                    path: "/list",
                    query: {tagUid: uid}
                });
                window.open(routeData.href, "_blank");
            },
            //跳转到搜索详情页
            goToSortList(uid) {
                let routeData = this.$router.resolve({
                    path: "/list",
                    query: {sortUid: uid}
                });
                window.open(routeData.href, "_blank");
            },
            //跳转到搜索详情页
            goToAuthor(author) {
                let routeData = this.$router.resolve({
                    path: "/list",
                    query: {author: author}
                });
                window.open(routeData.href, "_blank");
            },

            imageChange: function (e) {
                //首先需要判断点击的是否是图片
                var type = e.target.localName;
                if (type == "img") {
                    // window.open(e.target.currentSrc);
                    this.dialogPictureVisible = true;
                    this.dialogImageUrl = e.target.currentSrc;
                }
            },
            //切割字符串
            subText: function (str, index) {
                if (str.length < index) {
                    return str;
                }
                return str.substring(0, index) + "...";
            }
        }
    };
</script>
<style>
    .emoji-panel-wrap {
        box-sizing: border-box;
        border: 1px solid #cccccc;
        border-radius: 5px;
        background-color: #ffffff;
        width: 470px;
        height: 190px;
        position: absolute;
        z-index: 999;
        left: 35px;
        top: 10px;
    }

    .emoji-size-small {
        zoom: 0.3;
        margin: 5px;
    }

    .emoji-size-large {
        zoom: 0.5;
        margin: 5px;
    }

    .iconfont {
        font-size: 14px;
        margin-right: 3px;
    }

    .message_infos {
        width: 96%;
        /*min-height: 500px;*/
        margin-left: 10px;
    }

    .noComment {
        width: 100%;
        text-align: center;
    }
</style>
