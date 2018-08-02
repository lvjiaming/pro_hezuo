

cc.Class({
    extends: cc.Component,

    properties: {
        scoreLabel: {
            default: null,
            type: cc.Label,
            tooltip: "分数节点",
        },
    },


    onLoad () {
        this.showScore();
    },

    start () {

    },

    showScore() {
        if (this.scoreLabel) {
            this.scoreLabel.string = cc.gameControl.getGameScore();
            cc.updateWxData({socre: cc.gameControl.getGameScore()});
        }
    },

    onRankClick() {
        cc.resManager.loadPrefab("prefab/Rank", (prefab) => {
            const rank = cc.instantiate(prefab);
            rank.type = 1;
            this.node.addChild(rank);
        });
    },
    onShareNoteClick() {
        cc.wxShareCanvas();
    },
    onReturnClick() {
        cc.director.loadScene("StartScene.fire");
    },
    onShareCanvasClick() {
        cc.wxShareCanvas();
    },
    onGameAgainClick() {
        this.node.destroy();
        cc.director.loadScene("MainScene.fire");
    },


    // update (dt) {},
});
