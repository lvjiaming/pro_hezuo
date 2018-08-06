function initMgr() {
    cc.new = {};
    // 语言包
    // var GameLanguage = require("GameLanguage");
    // cc.new.lan = new GameLanguage();
    //game.lan.initAllLan();    // 游戏语言配置

    cc.new.wxHelper = require("WXHelper");
    
    //cc.new.const = require("GameConst");
    // 资源配置
    //cc.new.res = require("GameResource");
    // 枚举
    //cc.new.enum = require("GameEnum");
    // 全局变量
    //cc.new.global = require("Global");

    // 事件分发
    var GameEvent = require("GameEvent");
    cc.new.events = new GameEvent();
    cc.new.events.init();

    // var DLocal = require("DLocal");
    // cc.new.localData = new DLocal();  
    //game.localData.init();

    // var DMyself = require("DMyself");
    // cc.new.myself = new DMyself();
    //game.myself.init();

    // var GameNetMgr = require("GameNetMgr");
    // cc.new.NetMgr = new GameNetMgr();
    //game.gameNetMgr.init();

    var AudioMgr = require("AudioMgr");
    cc.new.audioMgr = new AudioMgr();
    //game.audioMgr.init();

    var Utils = require("Utils");
    cc.new.utils = new Utils();
}
cc.Class({
    extends:cc.Component,
    properties:{
    },
    onLoad () {
        initMgr();
        cc.new.audioMgr.playBGM();
        this.initEventHandlers();
        cc.new.events.dispatchEvent(cc.new.events.EVENT_JUMP_OUT);
        this.login();
        const isWx = !!window['wx'];
        if (isWx) {
            wx.showShareMenu({
                withShareTicket: true,
                success: () => {
                    cc.log('分享设置成功');
                },
            });
        }
        const self = this;
        cc.game.on(cc.game.EVENT_SHOW, function () {
            if (isWx) {
                wx.onShow((res) => {
                    cc.log("info");
                    cc.log(res);
                    if (res.shareTicket) {  // 这里是被人点分享链接，后生成排行榜（群排行榜），看自己需要开启
                        cc.loader.loadRes("prefabs/Rank", (err, prefab) => {
                            if (err) {
                                cc.error(err);
                            } else {
                                const pop = cc.instantiate(prefab);
                                pop.fanType = 2;
                                pop.shareTicket = res.shareTicket;
                                self.node.addChild(pop);
                            }
                        });
                    }
                });
            }
        })
    },
    /**
     *  登录
     */
    login() {
        const isWx = !!window['wx'];
        if (isWx) {
            wx.login({
                success: () => {
                    cc.log('微信登录成功');
                    const sysemInfo = wx.getSystemInfoSync();
                    cc.log("系统信息");
                    cc.log(sysemInfo);
                    const userInfoButton =  wx.createUserInfoButton({
                        type: "text",
                        text: "获取用户信息",
                        // image: "localRes/xxqp_qd_small_zc.png",
                        style: {
                            left: sysemInfo.screenWidth ? (sysemInfo.screenWidth / 2 - 110 / 2 ): 280,//cc.director.getScene().getChildByName("Canvas").width/2 - (210/2),
                            top: sysemInfo.screenHeight ? (sysemInfo.screenHeight / 2) : 200,//cc.director.getScene().getChildByName("Canvas").height/2,
                            width: 110,
                            height: 45,
                            lineHeight: 40,
                            backgroundColor: '#ff0000',
                            color: '#ffffff',
                            textAlign: 'center',
                            fontSize: 16,
                            borderRadius: 4
                        }
                    });
                    userInfoButton.show();
                    userInfoButton.onTap((res) => {
                        cc.log(`用户信息: ${res}`);
                        cc.log(res);
                        cc.sys.localStorage.setItem("wxData", JSON.stringify(res));
                        userInfoButton.destroy();

                        // 托管数据
                        const data = {socre: 12};  // 伪造数据
                        let KVDataList = [];
                        KVDataList.push({key:'userdata',value:JSON.stringify(data.socre)});
                        wx.setUserCloudStorage({
                            KVDataList:KVDataList,
                            fail:res=>{
                                console.log('setUserCloudStorage 接口调用失败',res);
                            }
                        })
                    });
                },
                fail:function(){
                    cc.log('微信登录失败');
                },
            });
        }
    },

    initEventHandlers () {
        cc.new.events.addEventHandler(cc.new.events.EVENT_JUMP_OUT, function(data) {
            console.log("Hello World");
        }, this);
    },

    onStartBtnClicked () {
        cc.director.loadScene("game");
    },
    onStartBtnClicked1 () {
        cc.director.loadScene("multiplayers");
    },
    /**
     * 好友排行榜
     */
    onRankFriendClick() {
        // cc.log(`群排行榜`);
        // cc.loader.loadRes("prefabs/Rank", (err, prefab) => {
        //     if (err) {
        //         cc.error(err);
        //     } else {
        //         const pop = cc.instantiate(prefab);
        //         pop.fanType = 1;
        //         this.node.addChild(pop);
        //     }
        // });

        cc.log(`好友排行榜`);
        cc.loader.loadRes("prefabs/Rank", (err, prefab) => {
            if (err) {
                cc.error(err);
            } else {
                const pop = cc.instantiate(prefab);
                pop.fanType = 1;
                this.node.addChild(pop);
            }
        });
    },
    /**
     * 群排行榜
     */
    onRankGroupClick() {
        const isWx = !!window['wx'];
        const self = this;
        if(isWx){
            wx.shareAppMessage({
                title: '测试',
                query: "test = 111",
                success:function(res){
                    cc.log(res)
                    if (res.shareTickets && res.shareTickets[0]) {
                        cc.log("群好友排行");
                        cc.loader.loadRes("prefabs/Rank", (err, prefab) => {
                            if (err) {
                                cc.error(err);
                            } else {
                                const pop = cc.instantiate(prefab);
                                pop.fanType = 2;
                                pop.shareTicket = res.shareTickets[0];
                                self.node.addChild(pop);
                            }
                        });
                    }
                },
            });
        }
    },
    /**
     *  分享
     */
    onShareClick() {
        const isWx = !!window['wx'];
        if(isWx){
            wx.shareAppMessage({
                title: '分享的标题',
                imageUrl:canvas.toTempFilePathSync({  // 截屏分享，不截屏，则此参数的值为分享图片的路径
                    destWidth: 960,
                    destHeight: 720
                }),
                success:function(res){
                    cc.log(res)
                },
            });
        }
    },
});