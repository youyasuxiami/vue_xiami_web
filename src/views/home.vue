<template>
    <html>
    <body>
    <header>
        <meta charset="utf-8">
        <title>蘑菇博客</title>
        <meta name="keywords" content="博客">
        <meta name="description" content="博客">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
    </header>
    <header
            :class="isVisible?'header-navigation slideDown':'header-navigation slideUp'"
            id="header"
    >
        <nav>

            <div class="logo">
                <router-link to="/">
                    <a href="javascript:void(0);" v-if="info.name">{{info.name}}</a>
                </router-link>
            </div>

            <h2 id="mnavh" @click="openHead" :class="showHead?'open':''">
                <span class="navicon"></span>
            </h2>

            <ul id="starlist" :style="showHead?'display: block':''">
                <li>
                    <router-link to="/">
                        <a href="javascript:void(0);" :class="[saveTitle == '/' ? 'title' : '']">首页</a>
                    </router-link>
                </li>

                <li>
                    <router-link to="/about">
                        <a href="javascript:void(0);" :class="[saveTitle == '/about' ? 'title' : '']">关于我</a>
                    </router-link>
                </li>

                <li>
                    <router-link to="/sort">
                        <a href="javascript:void(0);" :class="[saveTitle == '/sort' ? 'title' : '']">归档</a>
                    </router-link>
                </li>

                <li>
                    <router-link to="/classify">
                        <a href="javascript:void(0);" :class="[saveTitle == '/classify' ? 'title' : '']">分类</a>
                    </router-link>
                </li>

                <li>
                    <router-link to="/tag">
                        <a href="javascript:void(0);" :class="[saveTitle == '/tag' ? 'title' : '']">标签</a>
                    </router-link>
                </li>

                <li>
                    <router-link to="/messageBoard">
                        <a href="javascript:void(0);" :class="[saveTitle == '/messageBoard' ? 'title' : '']">留言板</a>
                    </router-link>
                </li>

                <div class="searchbox">
                    <div id="search_bar"
                         :class="(showSearch || keyword.length > 0)?'search_bar search_open':'search_bar'">
                        <input
                                ref="searchInput"
                                class="input"
                                placeholder="想搜点什么呢.."
                                type="text"
                                name="keyboard"
                                v-model="keyword"
                                v-on:keyup.enter="search"
                        >
                        <p class="search_ico" @click="clickSearchIco">
                            <span></span>
                        </p>
                    </div>
                </div>
            </ul>

            <el-dropdown @command="handleCommand" class="userInfoAvatar">
        <span class="el-dropdown-link">
          <img v-if="!isLogin" src="../../public/images/defaultAvatar.png">
          <img v-if="isLogin&&userInfo.avatar!=undefined" :src="userInfo.avatar"
               onerror="onerror=null;src='https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif'">
          <img v-if="isLogin&&userInfo.avatar==undefined"
               src="https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif">
        </span>

                <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item command="login" v-show="!isLogin">登录</el-dropdown-item>
                    <el-dropdown-item command="goUserInfo" v-show="isLogin">个人中心</el-dropdown-item>
                    <el-dropdown-item command="logout" v-show="isLogin">退出登录</el-dropdown-item>
                </el-dropdown-menu>

            </el-dropdown>
        </nav>
        xiami
    </header>
    <LoginBox v-if="showLogin" @closeLoginBox="closeLoginBox"></LoginBox>

    <div>
        <router-view/>
    </div>

    <footer>
        <p>
            <a href="http://localhost:9527/" target="_blank">&nbsp;&nbsp;</a>
            <a href="javasrcipt:void(0);" @click="goIndex()">Copyright 2019-2020&nbsp;{{info.name}}&nbsp;</a>
            <a href="http://www.beian.miit.gov.cn">{{info.recordNum}}</a>
        </p>
    </footer>

    <div>
        <a
                href="javascript:void(0);"
                @click="returnTop"
                :class="isCdTopVisible?'cd-top cd-is-visible':'cd-top'"
        >Top</a>
    </div>
    </body>
    </html>
</template>

<script>
    import AvatarCropper from '@/components/AvatarCropper'
    // import {getWebConfig} from "../api/index";
    import {delCookie, getCookie, setCookie} from "@/utils/cookieUtils";
    import {
        authVerify,
        editUser,
        updateUserPwd,
        replyBlogLink,
        deleteUserAccessToken,
        getFeedbackList,
        addFeedback,
        getInfo,
      logout

    } from "../api/user";
    import {getCommentListByUser, getPraiseListByUser} from "../api/comment";
    import LoginBox from "../components/LoginBox";
    // import {getListByDictTypeList} from "@/api/sysDictData"
    // vuex中有mapState方法，相当于我们能够使用它的getset方法
    import {mapMutations} from 'vuex';
    // import {timeAgo} from "../utils/webUtils";

    export default {
        data() {
            return {
                isVisible: true, //控制web端导航的隐藏和显示
                info: {
                    name: '虾米博客'
                },
                showHead: false, //控制导航栏的弹出
                saveTitle: "",
                showSearch: false, // 控制搜索框的弹出
                keyword: "",
                isLogin: false,
                userInfo: {
                    photoUrl: ""
                },
                showLogin: false, //显示登录框
                drawer: false,
                isCdTopVisible: false,
            }
        },
        components: {
            LoginBox,
            AvatarCropper
        },
        watch: {
            $route(to, from) {
                this.getCurrentPageTitle()
            }
        },
        created() {
            // 字典查询
            this.getCurrentPageTitle()
            //获得token信息
            this.getToken()

        },
        methods: {
            ...mapMutations(['setUserInfo', 'setLoginState']),

            openHead: function () {
                this.showHead = !this.showHead;
            },
            search: function () {
                if (this.keyword == "" || this.keyword.trim() == "") {
                    this.$notify.error({
                        title: '错误',
                        message: "关键字不能为空",
                        type: 'success',
                        offset: 100
                    });
                    return;
                }
                this.$router.push({path: "/list", query: {keyword: this.keyword}});
            },
            clickSearchIco: function () {
                if (this.keyword != "") {
                    this.search();
                }
                this.showSearch = !this.showSearch;
                //获取焦点
                this.$refs.searchInput.focus();
            },
            handleCommand(command) {
                switch (command) {
                    case "logout" : {
                        this.userLogout();
                    }
                        break;
                    case "login" : {
                        this.userLogin();
                    }
                        break;
                    case "goUserInfo" : {
                        // 打开抽屉
                        this.drawer = true;
                        // 获取评论列表
                        // this.getCommentList();
                        //
                        // // 获取点赞列表
                        // this.getPraiseList()
                        //
                        // // 获取反馈列表
                        // this.getFeedback()
                    }
                        break;
                }
            },
            //关闭登录弹出框
            closeLoginBox: function () {
                this.showLogin = false;
            },
            userLogout: function () {
                logout();
                  window.location.reload()

              // deleteUserAccessToken(getCookie("token"));
                // delCookie("token");
                // let url = window.parent.location.href;
                // let haveToken = url.indexOf("?token")
                // if (haveToken != -1) {
                //     let list = url.split("?token");
                //     this.isLogin = false;
                //     window.location.href = list[0]
                //     let userInfo = {};
                //     this.setUserInfo(userInfo)
                // } else {
                //     window.location.reload()
                // }
            },
            userLogin: function () {
                this.showLogin = true;
            },
            // 获取评论列表
            getCommentList: function () {
                let params = {}
                params.pageSize = 10;
                params.currentPage = 1;
                getCommentListByUser(params).then(response => {
                    if (response.code == "success") {
                        this.commentList = response.data.commentList
                        this.replyList = response.data.replyList
                    }
                })
            },

            // 获取评论列表
            getFeedback: function () {
                let params = {}
                getFeedbackList(params).then(response => {
                    if (response.code == "success") {
                        this.feedbackList = response.data.records;
                    }
                })
            },

            // 获取点赞列表
            getPraiseList: function () {
                let params = {}
                params.pageSize = 10;
                params.currentPage = 1;
                getPraiseListByUser(params).then(response => {
                    if (response.code == "success") {
                        this.praiseList = response.data.records;
                    }
                })
            },
            // 回到顶部
            returnTop: function () {
                window.scrollTo(0, 0);
            },
            /**
             * 获取当前所在页面的标题
             * @returns {{}}
             */
            getCurrentPageTitle: function () {
                var test = window.location.href;
                var start = 0;
                var end = test.length;
                for (var i = 0; i < test.length; i++) {
                    if (test[i] == "#") {
                        start = i;
                    }
                    if (test[i] == "?" && i > start) {
                        end = i;
                    }
                }
                var result = test.substring(start + 1, end);
                this.saveTitle = result;
            },
            /**
             * 截取URL中的参数
             * @returns {{}}
             */
            // getUrlVars: function () {
            //   var vars = {};
            //   var parts = window.location.href.replace(
            //           /[?&]+([^=&]+)=([^&#]*)/gi,
            //           function (m, key, value) {
            //             vars[key] = value;
            //           }
            //   );
            //   return vars;
            // },

            getToken: function () {
                // let token = this.getUrlVars()["token"];
                // // 判断url中是否含有token
                // if (token != undefined) {
                //   // 设置token七天过期
                //   setCookie("token", token, 7)
                // }
                // 从cookie中获取token
                // token = getCookie("token")
                // if (token != undefined) {
                getInfo().then(response => {
                    if (response.code == "20000") {
                        this.isLogin = true;
                        this.userInfo = response.data;
                        this.setUserInfo(this.userInfo)
                    } else {
                        this.isLogin = false;
                        delCookie("token");
                    }
                    this.setLoginState(this.isLogin);
                });
                // } else {
                //   this.isLogin = false;
                //   this.setLoginState(this.isLogin);
                // }
            }
        }
    }
</script>

<style>
    @import "../assets/css/emoji.css";

    .emoji-panel-btn:hover {
        cursor: pointer;
        opacity: 0.8;
    }

    .emoji-item-common {
        background: url("../assets/img/emoji_sprite.png");
        display: inline-block;
    }

    .emoji-item-common:hover {
        cursor: pointer;
    }

    .emoji-size-small {
        zoom: 0.3;
    }
</style>

<style scoped>
    .el-tag {
        height: 25px;
        line-height: 25px;
        margin-left: 6px;
    }

    #starlist li .title {
        color: #00a7eb;
    }

    .userInfoAvatar {
        width: 35px;
        height: 35px;
        position: absolute;
        right: -77px;
        top: 15px;
    }

    .userInfoAvatar img {
        width: 35px;
        height: 35px;
        border-radius: 50%;
    }

    @media only screen and (max-width: 780px) {
        .userInfoAvatar {
            width: 35px;
            height: 35px;
            position: absolute;
            right: 0px;
            top: 12px;
        }

        .searchbox {
            position: absolute;
            right: 40px;
            top: 0
        }
    }

    .avatar-uploader .el-upload {
        border: 1px dashed #d9d9d9;
        border-radius: 6px;
        margin: 0, 0, 0, 10px;
        cursor: pointer;
        position: relative;
        overflow: hidden;
    }

    .avatar-uploader .el-upload:hover {
        border-color: #409eff;
    }

    .avatar-uploader-icon {
        font-size: 28px;
        color: #8c939d;
        width: 100px;
        height: 100px;
        line-height: 100px;
        text-align: center;
    }

    .imgBody {
        width: 100px;
        height: 100px;
        border: solid 2px #ffffff;
        float: left;
        position: relative;
    }

    .imgBody img {
        width: 100px;
        height: 100px;
    }

    .uploadImgBody {
        margin-left: 5px;
        width: 100px;
        height: 100px;
        border: dashed 1px #c0c0c0;
        float: left;
        position: relative;
    }

    .uploadImgBody :hover {
        border: dashed 1px #00ccff;
    }

    .inputClass {
        position: absolute;
    }

    .commentList {
        width: 100%;
        margin: 0 auto;
    }

    .commentList .p1 {
        float: left;
    }

    .commentList .left {
        display: inline-block;
        width: 10%;
        height: 100%;
    }

    .commentList .left img {
        margin: 0 auto;
        width: 100%;
        border-radius: 50%;
    }

    .commentList .right {
        display: inline-block;
        width: 85%;
        margin-left: 5px;
    }

    .commentList .rightTop {
        height: 30px;
    }

    .commentList .rightTop .userName {
        color: #303133;
        margin-left: 10px;
        font-size: 16px;
        font-weight: bold;
    }

    .commentList .rightTop .timeAgo {
        color: #909399;
        margin-left: 10px;
        font-size: 15px;
    }

    .commentList .rightCenter {
        margin-left: 20px;
        line-height: 30px;
        height: 60px;
    }

    .commentList .rightBottom el-link {

    }

    .feedbackCard .item .title {
        display: inline-block;
        width: 70px;
        margin-bottom: 10px;
        font-size: 14px;
        font-weight: bold;
    }

    .feedbackCard .item .content {
        display: inline-block;
        width: 240px;
        margin-bottom: 5px;
    }

    .emoji-panel-btn img {
        height: 35px;
        width: 35px;
    }
</style>
