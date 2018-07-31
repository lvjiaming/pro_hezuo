

cc.Class({
    extends: cc.Component,

    properties: {

    },



    onLoad () {},

    start () {

    },
    onCollisionEnter(other, self) {
        switch (other.node.type) {
            case cc.gameCfg.ItemType.ICE_ITEM2: {
                other.node.stopAllActions();
                other.node.getComponent("Ice").iceFail();
                break;
            }
        }
    },

    // update (dt) {},
});
