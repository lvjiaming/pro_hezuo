
cc.Class({
    extends: cc.Component,

    properties: {

        // },
    },



    onLoad () {
        this.node.type = cc.gameCfg.ItemType.LVDAI;
        this.node.runAction(cc.repeatForever(cc.moveBy(0.5, cc.p(cc.gameControl.getMoveV_x(),0))));
        if (cc.gameControl.getGameType() == cc.gameCfg.GameType.CRAZY) {
            this.scheduleOnce(this.updateMoveV, 0.5);
        }
    },

    start () {

    },

    updateMoveV() {
        this.node.stopAllActions();
        cc.gameControl.setMoveV_x(cc.gameControl.getMoveV_x() + 2);
        this.node.runAction(cc.repeatForever(cc.moveBy(0.5, cc.p(cc.gameControl.getMoveV_x(),0))));
    },


    // update (dt) {
    //
    //     cc.log(`${dt}`);
    // },
});
