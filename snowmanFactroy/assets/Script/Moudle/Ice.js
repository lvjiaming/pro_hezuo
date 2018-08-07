
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
        this.node.runAction(cc.repeatForever(cc.moveBy(0.5, cc.p(0, cc.gameControl.getMoveV_y()))));
    },

    start () {

    },
    onDestroy(){
        this.node.isDes = true;
    },
    iceFail() {
        cc.resManager.loadTex("ice_fail", (sp) => {
            this.node.getComponent(cc.Sprite).spriteFrame = sp;
        });
        this.node.sucOrFail = false;
        this.runAct();
        this.canUpdata = true;
        if (cc.gameControl.getGameType() == cc.gameCfg.GameType.CRAZY) {
            cc.find("Canvas").emit("iceFail");
        }
    },
    runAct() {
        if (cc.gameControl.getGameType() == cc.gameCfg.GameType.SIMPLE) {
            this.node.runAction(cc.repeatForever(cc.moveBy(0.5, cc.p(cc.gameControl.getMoveV_x(),0))));
        }
    },
    onCollisionEnter(other, self) {
        switch (other.node.type) {
            case cc.gameCfg.ItemType.ICE_ITEM: {
                this.node.stopAllActions();
                if (cc.gameControl.getGameType() == cc.gameCfg.GameType.CRAZY) {
                    this.canUpdata = true;
                } else {
                    this.runAct();
                }
                this.node.sucOrFail = true;
                break;
            }
        }
    },

    update (dt) {
        if (cc.gameControl.getGameType() == cc.gameCfg.GameType.CRAZY && this.canUpdata) {
            this.node.setPositionX(this.node.getPositionX() + (1.5 * cc.gameControl.getCrzayA() + 1.5));
        }
    },
});
