

cc.Class({
    extends: cc.Component,

    properties: {

    },

    onLoad () {
        if (!cc.gameControl.getSelfLoginInfo()) {
            cc.wxLogin();
        }
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
        cc.resManager.loadPrefab("prefab/Rank", (prefab) => {
            const rank = cc.instantiate(prefab);
            rank.type = 1;
            this.node.addChild(rank);
        });
    },
    onMzNewGameClick() {

    },

    // update (dt) {},
});
