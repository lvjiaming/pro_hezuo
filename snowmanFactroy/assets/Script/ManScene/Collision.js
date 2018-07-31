

cc.Class({
    extends: cc.Component,

    properties: {

    },



    onLoad () {},

    start () {

    },
    onCollisionEnter(other, self) {
        switch (other.node.type) {
            case cc.gameCfg.ItemType.LVDAI: {
                other.node.setPositionX(-687);
                break;
            }
            case cc.gameCfg.ItemType.ICE_ITEM: {
                other.node.destroy();
                cc.log(`销毁冰淇凌`);
                break;
            }
            case cc.gameCfg.ItemType.ICE_ITEM2: {
                other.node.destroy();
                cc.log(`销毁冰淇凌`);
                break;
            }
        }
    },

    // update (dt) {},
});
