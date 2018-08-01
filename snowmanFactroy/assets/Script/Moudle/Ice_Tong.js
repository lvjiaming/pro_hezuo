
cc.Class({
    extends: cc.Component,

    properties: {

    },


    onLoad () {
        this.node.type = cc.gameCfg.ItemType.ICE_ITEM;
        this.node.runAction(cc.repeatForever(cc.moveBy(0.5, cc.p(cc.gameControl.getMoveV_x(),0))));
    },

    start () {

    },


});
