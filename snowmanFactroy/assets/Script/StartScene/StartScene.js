

cc.Class({
    extends: cc.Component,

    properties: {

    },

    onLoad () {
        if (!cc.gameControl.getSelfLoginInfo()) {
            cc.wxLogin();
        }
        const self = this;
        cc.game.on(cc.game.EVENT_SHOW, function () {
            if (isWx) {
                wx.onShow((res) => {
                    cc.log("info");
                    cc.log(res);
                    if (res.shareTicket) {
                        cc.resManager.loadPrefab("prefabs/Rank", (err, prefab) => {
                            const rankPop = self.node.getChildByName("Rank");
                            if (rankPop) {
                                rankPop.destroy();
                            }
                            const pop = cc.instantiate(prefab);
                            pop.fanType = 2;
                            pop.shareTicket = res.shareTicket;
                            self.node.addChild(pop);
                        });
                    }
                });
            }
        })
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
