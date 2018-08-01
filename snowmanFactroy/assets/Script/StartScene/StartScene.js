

cc.Class({
    extends: cc.Component,

    properties: {

    },

    onLoad () {

    },

    start () {

    },

    onStartGameClick(event,custom) {
        cc.gameControl.setGameType(cc.gameCfg.GameType[custom]);
        cc.resManager.loadDirRes("DirRes", () => {
            cc.director.loadScene("MainScene.fire");
        });
    },
    onShareClick() {
        cc.wxShareCanvas();
    },
    onRankClick() {

    },

    // update (dt) {},
});
