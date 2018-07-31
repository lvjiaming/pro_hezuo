
const Config = {
    MoveBy_x: 74 / 2,
};
cc.Class({
    extends: cc.Component,

    properties: {

    },


    onLoad () {
        this.node.type = cc.gameCfg.ItemType.ICE_ITEM;
        this.node.runAction(cc.repeatForever(cc.moveBy(0.5, cc.p(Config.MoveBy_x,0))));
    },

    start () {

    },


});
