
cc.Class({
    extends: cc.Component,

    properties: {

        // },
    },



    onLoad () {
        this.node.type = cc.gameCfg.ItemType.LVDAI;
        this.node.runAction(cc.repeatForever(cc.moveBy(0.5, cc.p(cc.gameControl.getMoveV_x(),0))));
        this.curTimer = 0;
        if (cc.gameControl.getGameType() == cc.gameCfg.GameType.CRAZY) {
            this.schedule(this.updateMoveV, 1);
        }
    },

    start () {

    },

    updateMoveV() {
        // cc.log(`${(cc.gameControl.gameTime) - this.curTimer}`);
        if ((cc.gameControl.gameTime) - this.curTimer >= 10) {
            cc.log(`开始加速`);
            this.curTimer = cc.gameControl.gameTime;
            this.node.stopAllActions();
            this.node.runAction(cc.repeatForever(cc.moveBy(0.5, cc.p(cc.gameControl.getMoveV_x(),0))));
        }
    },


    // update (dt) {
    //
    //     cc.log(`${dt}`);
    // },
});
