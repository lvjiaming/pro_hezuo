

cc.Class({
    extends: cc.Component,

    properties: {

    },



    // onLoad () {},

    start () {

    },
    onCollisionEnter(other, self) {
        if (cc.gameControl.getGameType() == cc.gameCfg.GameType.CRAZY) {
            if (other.node.name == "dai" && self.node.parent.name == "Ice_Tong") {
                // const ice_TongCype = cc.instantiate(self.node.parent);
                // other.node.addChild(ice_TongCype);
                // self.node.parent.destroy();
                const selfNode =  self.node.parent.parent;
                self.node.parent.parent = other.node;
                other.node.zIndex = 20;
                // selfNode.setPositionX(-15);
            }
            // if (other.node.name == "dai" && self.node.parent.name == "Ice") {
            //     const selfNode =  self.node.parent.parent;
            //     self.node.parent.parent = other.node;
            //     other.node.zIndex = 20;
            // }
        }
    },

    // update (dt) {},
});
