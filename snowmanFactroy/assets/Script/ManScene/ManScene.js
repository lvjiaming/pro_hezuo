

cc.Class({
    extends: cc.Component,

    properties: {
        iceTongCreateNode: {
            default: null,
            type: cc.Node,
            tooltip: "生成冰淇凌桶的节点",
        },
        snowManUp: {
            default: null,
            type: cc.Node,
            tooltip: "雪人站起来",
        },
        snowManBottom: {
            default: null,
            type: cc.Node,
            tooltip: "雪人蹲下",
        },
    },



    onLoad () {
        const manager = cc.director.getCollisionManager();
        manager.enabled = true;
        this.setSnowState()
        cc.resManager.loadDirRes("DirRes", () => {
            cc.log(`加载完！！！`);
        });
    },

    start () {

    },
    onStartGame() {
        if (cc.gameControl.getGameState()) {
            cc.log(`游戏已经开始`);
            return;
        }
        cc.gameControl.setGameState(true);
        if (this.iceTongCreateNode) {
            cc.gameControl.createIceTong(this.iceTongCreateNode);
        } else {
            cc.log(`节点为空`);
        }
        this.setSnowState();
    },
    setSnowState() {
        if (cc.gameControl.getGameState()) {
            if (this.snowManUp) {
                this.snowManUp.active = false;
            }
            if (this.snowManBottom) {
                this.snowManBottom.active = true;
            }
        } else {
            if (this.snowManUp) {
                this.snowManUp.active = true;
            }
            if (this.snowManBottom) {
                this.snowManBottom.active = false;
            }
        }
    },
    onStartIce() {
        if (!cc.gameControl.getGameState()) {
            cc.log(`游戏未开始`);
            return;
        }
        cc.gameControl.createIce(this.snowManBottom);
    },

    // update (dt) {},
});
