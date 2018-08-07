

cc.Class({
    extends: cc.Component,

    properties: {

    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start () {

    },
    onAddNumClick() {
        cc.find("Canvas").emit("gameContinue");
        this.node.destroy();
    },
    onCancel() {
        cc.find("Canvas").emit("cancelAddNum");
        this.node.destroy();
    },

    // update (dt) {},
});
