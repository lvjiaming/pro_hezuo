
const Config = {
    MoveBy_x: 74 / 2,
    Jump_y: -130,
};
cc.Class({
    extends: cc.Component,

    properties: {

    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this.node.type = cc.gameCfg.ItemType.ICE_ITEM2;
        this.node.runAction(cc.repeatForever(cc.moveBy(0.5, cc.p(0, Config.Jump_y))));
    },

    start () {

    },
    iceFail() {
        cc.resManager.loadTex("ice_fail", (sp) => {
            this.node.getComponent(cc.Sprite).spriteFrame = sp;
        });
        this.runAct();
    },
    runAct() {
        this.node.runAction(cc.repeatForever(cc.moveBy(0.5, cc.p(Config.MoveBy_x,0))));
    },
    onCollisionEnter(other, self) {
        switch (other.node.type) {
            case cc.gameCfg.ItemType.ICE_ITEM: {
                this.node.stopAllActions();
                this.runAct();
                break;
            }
        }
    },

    // update (dt) {},
});
