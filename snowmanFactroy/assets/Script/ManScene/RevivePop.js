

cc.Class({
    extends: cc.Component,

    properties: {

    },



    // onLoad () {},

    start () {

    },
    onReviveClick() {
        cc.find("Canvas").emit("gameRestart");
        this.node.destroy();
    },
    onCancelClcik() {
        cc.director.loadScene("GameOverScene.fire");
    },

    // update (dt) {},
});
