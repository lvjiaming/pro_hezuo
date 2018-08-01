
const CONFIG = [
    null,
    "好友排行榜",
    "群排行榜"
];
cc.Class({
    extends: cc.Component,

    properties: {
        note: {
            default: null,
            type: cc.Sprite,
            tooltip: "内容",
        },
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
       // this.selfLoginInfo = JSON.parse(cc.sys.localStorage.getItem("wxData"));
        const isWx = !!window['wx'];
        this.fanType = this.node.type;
        if (isWx) {
            this.openDataContext = wx.getOpenDataContext();
            this.sharedCanvas = this.openDataContext.canvas;
            sharedCanvas.width  = 698;
            sharedCanvas.height = 720;
            this.sendToKaiFangYu(this.fanType, 3);
            this.drawCanvas();
        } else {
            cc.log(`不是微信平台`);
        }
    },

    start () {

    },
    /**
     *  发送到开放域的消息
     * @param type 1为好友，2为群
     * @param fanType 翻页的方式 1为左翻页，2为右翻页，3为首页
     */
    sendToKaiFangYu(type, fanType) {
        // if (this.sprList[parseInt(type)]) {
        //     return;
        // }
        const isWx = !!window['wx'];
        if (isWx) {
            this.openDataContext.postMessage({
                text: "showRank",
                type: parseInt(type),
                fanType: fanType,
                //selfSign: this.selfLoginInfo.userInfo.avatarUrl,
                shareTicket: this.node.shareTicket,
            });
        }
    },
    /**
     *  绘制离屏画布
     */
    drawCanvas() {
        const isWx = !!window['wx'];
        if (isWx) {
            this.scheduleOnce(() => {
                var texture = new cc.Texture2D();
                texture.initWithElement(this.sharedCanvas);
                texture.handleLoadedTexture();
                sp = new cc.SpriteFrame(texture);
                if (this.note) {
                    this.note.spriteFrame = sp;
                }
            }, 0.1);
        }
    },
    /**
     *  左翻页的按钮
     */
    onBtnLeftClick() {
        cc.log(`左翻页(当前翻页类型：${this.fanType})`);
        this.sendToKaiFangYu(this.fanType, 1);
        this.drawCanvas(this.fanType);
    },
    /**
     *  右翻页的效果
     */
    onBtnRightClick() {
        cc.log(`右翻页(当前翻页类型：${this.fanType})`);
        this.sendToKaiFangYu(this.fanType, 2);
        this.drawCanvas(this.fanType);
    },
    /**
     *  关闭
     */
    onCloseClick() {
        this.node.destroy();
    },

    // update (dt) {},
});
