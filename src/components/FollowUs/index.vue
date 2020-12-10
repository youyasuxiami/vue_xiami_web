<template>
    <div class="guanzhu" id="follow-us" ref="follow">
        <h2 class="hometitle">关注我们 么么哒！</h2>
        <ul>
            <li class="qqGroup">
                <a href="//shang.qq.com/wpa/qunwpa?idkey=b4a0591c5352d49dc77d4bfb1bb1aba2c9b13432c2b7690454f5739b0a450115"
                   target="_blank">
                    <span>QQ群</span>729892717
                </a>
            </li>

            <li class="qq">
                <a href="tencent://AddContact/?fromId=50&fromSubId=1&subcmd=all&uin=891627097" target="_blank">
                    <span>QQ号</span>891627097
                </a>
            </li>

            <li class="email"><a :href="mailto" target="_blank"><span>邮箱帐号</span>891627097@qq.com</a></li>
            <li class="wxgzh"><a href="/" target="_blank"><span>微信号</span>imys2150</a></li>
            <!--            <li class="github"><a :href="contact.github"-->
            <!--                                  target="_blank"><span>Github</span>https://github.com/moxi624</a></li>-->
            <!--            <li class="gitee"><a :href="contact.gitee"-->
            <!--                                 target="_blank"><span>Gitee</span>https://gitee.com/moxi159753</a></li>-->
        </ul>
    </div>
</template>

<script>
    // import {getWebConfig} from "@/api/index";
    // vuex中有mapState方法，相当于我们能够使用它的getset方法
    // import {mapMutations} from 'vuex';
    export default {
        name: "FollowUs",
        data() {
            return {
                contact: {},
                mailto: "mailto:891627097@qq.com"
            };
        },
        // created() {
        //
        //   this.getContactData()
        //
        // },
        // methods: {
        //   //拿到vuex中的写的方法
        //   ...mapMutations(['setWebConfigData']),
        //
        //   getContactData: function() {
        //     let webConfigData = this.$store.state.app.webConfigData;
        //     if(webConfigData.createTime) {
        //       this.contact = webConfigData;
        //       this.mailto = "mailto:" + this.contact.email;
        //     } else {
        //       getWebConfig().then(response => {
        //         if (response.code == "success") {
        //           this.contact = response.data;
        //           this.mailto = "mailto:" + this.contact.email;
        //           this.setWebConfigData(response.data)
        //         }
        //       });
        //     }
        //   },
        // }
    };
</script>

<style>
</style>
