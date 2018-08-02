

cc.Class({
    extends: cc.Component,

    properties: {

    },


    onLoad () {

    },

    start () {

    },

    onRankClick() {

    },
    onShareNoteClick() {
        cc.wxShareCanvas();
    },
    onReturnClick() {
        cc.resManager.loadPrefab("prefab/Rank", (prefab) => {
            const rank = cc.instantiate(prefab);
            rank.type = 1;
            this.node.addChild(rank);
        });
    },
    onShareCanvasClick() {
        cc.wxShareCanvas();
    },
    onGameAgainClick() {
        this.node.destroy();
    },


    // update (dt) {},
});
