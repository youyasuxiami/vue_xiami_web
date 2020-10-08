<template>
    <div>
        <div v-for="item in comments" :key="item.id">
            <div class="commentList">
        <span class="left p1">
          <img v-if="item"
               :src="item.userAvatar ? item.userAvatar:'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif'"
               onerror="onerror=null;src='https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif'"/>
          <img v-else src="https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif"/>
        </span>

                <span class="right p1">
          <div class="rightTop" v-if="item">
            <el-link class="userName" :underline="false">{{item.userName}}</el-link>

                          <span class="to" v-if="item.toUserName"> @</span>
              <!--                          <span v-if="item.toUserAvatar"><img :src="item.toUserAvatar"/> </span>-->
                          <span class="to" v-if="item.toUserName">{{(item.toUserName)}}</span>

              <!--            <el-tag style="height: 30px; margin-left:5px;" v-for="userTag in userTagDictList" :key="userTag.uid" v-if="item.user.userTag == userTag.dictValue && item.user.userTag != 0" :type="userTag.listClass">{{userTag.dictLabel}}</el-tag>-->
              <!--            <el-tag style="height: 30px; margin-left:5px;"-->
              <!--                    v-for="userTag in userTagDictList" :key="userTag.uid" -->
              <!--                    v-if="item.user.userTag == userTag.dictValue && item.user.userTag != 0" :type="userTag.listClass">{{userTag.dictLabel}}</el-tag>-->
              <span class="timeAgo" v-if="item.createTime">{{(item.createTime)}}</span>
            <span class="timeAgo" v-else>刚刚</span>
          </div>

          <div class="rightCenter" v-html="$xss(item.content, options)"/>

          <div class="rightBottom">
            <el-link class="b1" :underline="false" @click="replyTo(item)">回复</el-link>
            <el-link class="b1" :underline="false" @click="report(item)">举报</el-link>
            <el-link class="b1" :underline="false" @click="delComment(item)">删除</el-link>
          </div>

          <div class="rightCommentList">
            <CommentBox class="comment" :userInfo="userInfo" :toInfo="toInfo" :id="item.id" :commentInfo="commentInfo"
                        @submit-box="submitBox" @cancel-box="cancelBox"></CommentBox>
            <CommentList class="commentStyle" :id="'commentStyle:' + item.blogId" :comments="item.replyList"
                         :commentInfo="commentInfo"></CommentList>
          </div>
        </span>
            </div>
        </div>
    </div>
</template>

<script>

    import CommentBox from "../CommentBox";
    import {getCommentList, addComment, reportComment,deleteComment} from "../../api/blogContent";

    export default {
        name: "CommentList",
        props: ['comments', 'userInfos', 'commentInfo'],
        data() {
            return {
                // xss白名单配置
                options: {
                    whiteList: {
                        a: ['href', 'title', 'target'],
                        span: ['class']
                    }
                },
                PICTURE_HOST: process.env.PICTURE_HOST,
                taggleStatue: true,
                submitting: false,
                value: '',
                toInfo: {
                    uid: "",
                    commentId: ""
                },
                userInfo: {},
                userTagDictList: [], // 用户标签字典
            };
        },
        created() {
            // this.getDictList()
        },
        components: {
            CommentBox
        },
        mounted() {

        },
        compute: {},
        methods: {
            // ...mapMutations(['setCommentList', 'setUserTag']),
            /**
             * 字典查询
             */
            getDictList: function () {
                if (this.$store.state.app.userTagDictList.length > 0) {
                    this.userTagDictList = this.$store.state.app.userTagDictList
                    return;
                }
                var dictTypeList = ['sys_user_tag']
                getListByDictTypeList(dictTypeList).then(response => {
                    if (response.code == "20000") {
                        var dictMap = response.data;
                        this.userTagDictList = dictMap.sys_user_tag.list
                        this.setUserTag(dictMap.sys_user_tag.list)
                    }
                });
            },
            replyTo: function (item) {
                if (!this.validLogin()) {
                    this.$notify.error({
                        title: '错误',
                        message: "登录后才能回复评论哦~",
                        offset: 100
                    });
                    return
                }
                // 回复哪个人，回复哪条评论
                let userId = item.userId;
                let commentId = item.id;

                // if (userId == item.userId) {
                //     this.$notify.error({
                //         title: '错误',
                //         message: "不能回复自己的评论哦~",
                //         offset: 100
                //     });
                //     return;
                // }

                var lists = document.getElementsByClassName("comment");
                for (var i = 0; i < lists.length; i++) {
                    lists[i].style.display = 'none';
                }
                document.getElementById(commentId).style.display = 'block';
                // 回复哪个人，回复哪条评论
                this.toInfo.commentId = commentId
                this.toInfo.userId = userId
            },
            submitBox(e) {
                let params = {};
                params.userId = e.userId;
                params.content = e.content;
                params.blogId = e.blogId;
                params.toCommentId = e.toCommentId;
                params.toUserId = e.toUserId;
                params.userAvatar = e.avatar;
                // params.source = e.source
                addComment(params).then(response => {
                        if (response.code == "20000") {
                            let commentData = response.data
                            document.getElementById(commentData.parentCommentId).style.display = 'none'
                            let comments = this.$store.state.comment.commentList;
                            // commentData.user = this.userInfo;
                            // 设置回复为空
                            commentData.replyList = [];
                            // commentData.user = this.$store.state.user.userInfo
                            this.updateCommentList(comments, commentData.firstCommentId, commentData)
                            console.log('得到的评论', comments)
                            this.$store.commit("setCommentList", comments);

                            this.$notify({
                                title: '成功',
                                message: "评论成功",
                                type: 'success',
                                offset: 100
                            });
                        } else {
                            this.$notify.error({
                                title: '错误',
                                message: "评论失败",
                                type: 'success',
                                offset: 100
                            });
                        }
                    }
                )
                ;
            },
            getCommentList: function () {
                let params = {};
                params.currentPage = 0;
                params.pageSize = 10;
                getCommentList(params).then(response => {
                    if (response.code == "20000") {
                        this.comments = response.data;
                    }
                });
            },
            cancelBox(toCommentId) {
                document.getElementById(toCommentId).style.display = 'none'
            }
            ,
            // taggleAll: function (item) {
            //
            //   this.taggleStatue = !this.taggleStatue;
            //   var lists = document.getElementsByClassName("commentStyle");
            //   for (var i = 0; i < lists.length; i++) {
            //     lists[i].style.display = 'block';
            //   }
            //   if (this.taggleStatue) {
            //     document.getElementById('commentStyle:' + item.uid).style.display = 'block';
            //   } else {
            //     document.getElementById(item.uid).style.display = 'none';
            //   }
            // }
            // ,
            report: function (item) {
                if (!this.validLogin()) {
                    this.$notify.error({
                        title: '错误',
                        message: "登录后才能举报评论哦~",
                        offset: 100
                    });
                    return
                }
                let userId = this.$store.state.user.userInfo.userId

                if (userId == item.userId) {
                    this.$notify.error({
                        title: '错误',
                        message: "不能举报自己的评论哦~",
                        offset: 100
                    });
                    return;
                }
                let params = {};
                //
                params.commentId = item.id;
                // 当前登录账号的id
                params.userId = userId
                reportComment(params).then(response => {
                    if (response.code == "20000") {
                        this.$notify({
                            title: '成功',
                            message: response.message,
                            type: 'success',
                            offset: 100
                        });
                    } else {
                        this.$notify.error({
                            title: '错误',
                            message: response.message,
                            type: 'success',
                            offset: 100
                        });
                    }
                });
            },
            delComment: function (item) {
                if (!this.validLogin()) {
                    this.$notify.error({
                        title: '错误',
                        message: "登录后才能删除评论哦~",
                        offset: 100
                    });
                    return
                }
                var that = this;
                let params = {};
                params.commentId = item.id;
                // 当前登录账号的id
                params.userId = this.$store.state.user.userInfo.userId

                deleteComment(params).then(response => {
                    if (response.code == "20000") {
                        let comments = this.$store.state.comment.commentList;
                        let commentData=response.data;
                        console.log("+++++++++++++++++++++")
                        console.log(commentData)
                        this.deleteCommentList(comments, commentData.id,commentData.parentCommentId, null)
                        this.$store.commit("setCommentList", comments);
                        this.$emit("deleteComment", "")

                        this.$notify({
                            title: '成功',
                            message: "删除成功",
                            type: 'success',
                            offset: 100
                        });

                    } else {
                        this.$notify.error({
                            title: '错误',
                            message: "删除失败",
                            type: 'success',
                            offset: 100
                        });
                    }
                });
            },
            // 校验是否登录
            validLogin() {
                // let userInfo = this.$store.state.user.userInfo
                // if (userInfo.userName == undefined) {
                //     return false;
                // } else {
                //     return true;
                // }
                let isLogin = this.$store.state.user.isLogin
                if (isLogin) {
                    return true;
                } else {
                    return false;
                }
            },
            /**
             * dateTimeStamp是一个时间毫秒，注意时间戳是秒的形式，在这个毫秒的基础上除以1000，就是十位数的时间戳。13位数的都是时间毫秒。
             * @param dateTimeStamp
             * @returns {string}
             */
            // timeAgo(dateTimeStamp) {
            //   return timeAgo(dateTimeStamp)
            // },
            //第一个参数是全部的评论，第二个参数是根评论的id，第三个参数是回复的评论
            updateCommentList(commentList, firstCommentId, targetComment) {
                if (commentList == undefined || commentList.length <= 0) {
                    return;
                }
                for (let item of commentList) {
                    if (item.id === firstCommentId) {
                        var menu = item.replyList;
                        menu.push(targetComment);
                    }
                }
            },
            deleteCommentList(commentList, deleteCommentId, parentCommentId,parentList) {
                if (commentList == undefined || commentList.length <= 0) {
                    return;
                }
                if(parentCommentId!=null){//不是根评论
                    for (let item of commentList) {
                        for(let replyItem of item.replyList){
                            if (replyItem.id === deleteCommentId) {
                                item.replyList.splice(item.replyList.indexOf(replyItem), 1);
                            }
                        }
                    }
                }else{
                    for (let item of commentList) {
                        if (item.id === deleteCommentId) {
                            commentList.splice(commentList.indexOf(item), 1);
                        }
                    }
                }
            },
        },
    };
</script>

<style scoped>
    .commentStyle {
        display: block;
        margin-top: 10px;
        margin-left: 10px;
        border-left: 1px dashed SlateGray;
    }

    .comment {
        display: none;
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
        width: 5%;
        height: 100%;
    }

    .commentList .left img {
        margin: 0 auto;
        width: 100%;
        border-radius: 50%;
    }

    .commentList .right {
        display: inline-block;
        width: 93%;
        margin-left: 5px;
    }

    .commentList .rightTop {
        height: 30px;
        margin-top: 2px;
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
        height: 50px;
        margin-top: 15px;
    }

    .commentList .rightBottom {
        margin-left: 10px;
        height: 30px;
    }

    .commentList .rightBottom el-link {

    }

    .commentList .rightBottom .b1 {
        margin-left: 10px;
    }

    .to {
        color: #00B5AD;
        font-weight: bold;
    }
</style>
