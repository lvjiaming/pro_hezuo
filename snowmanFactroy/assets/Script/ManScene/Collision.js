

cc.Class({
    extends: cc.Component,

    properties: {

    },



    onLoad () {
        this.sucNum = 0;
    },

    start () {

    },
    onCollisionEnter(other, self) {
        switch (other.node.type) {
            case cc.gameCfg.ItemType.LVDAI: {
                other.node.x = -687;
                break;
            }
            case cc.gameCfg.ItemType.ICE_ITEM: {
                other.node.destroy();
                cc.log(`销毁冰淇凌`);
                break;
            }
            case cc.gameCfg.ItemType.ICE_ITEM2: {
                other.node.destroy();
                cc.log(`销毁冰淇凌: ${other.node.sucOrFail}`);
                if (other.node.sucOrFail) {
                    cc.gameControl.setGameScore(cc.gameControl.getGameScore() + 1);
                    this.sucNum++;
                } else {
                    if (this.sucNum >= 3) {
                        cc.gameControl.setGameScore(cc.gameControl.getGameScore() + this.sucNum);
                    }
                    this.sucNum = 0;
                }
                cc.find("Canvas").emit("scoreChange");
                if (other.node.isLast) {
                    cc.find("Canvas").emit("gameOver");
                }
                break;
            }
        }
    },

    // update (dt) {},
});
