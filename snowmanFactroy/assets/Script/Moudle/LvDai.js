const Config = {
    BianJie: 349 + 74,
    MoveBy_x: 74 / 2,
    InitPosX: -687,
};
cc.Class({
    extends: cc.Component,

    properties: {

        // },
    },



    onLoad () {
        this.node.type = cc.gameCfg.ItemType.LVDAI;
        this.node.runAction(cc.repeatForever(cc.moveBy(0.5, cc.p(Config.MoveBy_x,0))));
    },

    start () {

    },


    // update (dt) {},
});
