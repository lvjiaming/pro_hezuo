
cc.Class({
    extends: cc.Component,

    properties: {

        // },
    },



    onLoad () {
        this.node.type = cc.gameCfg.ItemType.LVDAI;
        switch (cc.gameControl.getGameType()) {
            case cc.gameCfg.GameType.SIMPLE: {
                this.node.runAction(cc.repeatForever(cc.moveBy(0.5, cc.p(cc.gameControl.getMoveV_x(),0))));
                break;
            }
            case cc.gameCfg.GameType.CRAZY: {
                break;
            }
        }
    },

    start () {

    },


    update (dt) {
        if (cc.gameControl.getGameType() == cc.gameCfg.GameType.CRAZY) {
            this.node.x = (this.node.x + (1.5 * cc.gameControl.getCrzayA() + 1.5));
        }
    },
});
