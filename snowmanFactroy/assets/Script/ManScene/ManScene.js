

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
        scoreNode: {
            default: null,
            type: cc.Label,
            tooltip: "分数节点",
        },
        timerTime: {
            default: null,
            type: cc.Label,
            tooltip: "倒计时",
        },
        iceNum: {
            default: null,
            type: cc.Label,
            tooltip: "可丢的数量",
        },
    },



    onLoad () {
        this.canCreIceNum = 60;

        const manager = cc.director.getCollisionManager();
        manager.enabled = true;
        this.setSnowState();
        this.onStartGame();
        this.node.on("scoreChange", () => {
            cc.log(`分数变化`);
            this.updateScore(cc.gameControl.getGameScore());
        });
        this.node.on("gameOver", () => {
            this.startOver();
        });
        this.scheduleOnce(() => {
            if (cc.gameControl.getGameType() == cc.gameCfg.GameType.SIMPLE) {
                if (this.timerTime) {
                    this.timerTime.node.active = true;
                }
                this.startTimer();
            }
            this.canCreIce = true;
        }, cc.gameControl.canCreIceTime);
    },

    start () {

    },
    onStartGame() {
        if (cc.gameControl.getGameState()) {
            cc.log(`游戏已经开始`);
            return;
        }
        cc.gameControl.timerTime = 60;
        cc.gameControl.setGameState(true);
        cc.gameControl.setGameScore(0);
        this.updateScore(0);
        if (this.iceTongCreateNode) {
            cc.gameControl.createIceTong(this.iceTongCreateNode);
        } else {
            cc.log(`节点为空`);
        }
        if (cc.gameControl.getGameType() == cc.gameCfg.GameType.CRAZY) {
            cc.gameControl.startTimer();
        }
        this.setSnowState();
    },

    startTimer() {
        this.scheduleOnce(() => {
            cc.gameControl.timerTime--;
            if (this.timerTime) {
                this.timerTime.string = cc.gameControl.timerTime;
            }
            if (cc.gameControl.timerTime > 0) {
                this.startTimer();
            } else {
                cc.gameControl.setGameState(false);
                if (cc.gameControl.getCurIce() && !cc.gameControl.getCurIce().isDes) {
                    cc.gameControl.getCurIce().isLast = true;
                } else {
                    this.startOver();
                }
            }
        }, 1);
    },

    startOver() {
        cc.gameControl.setGameState(false);
        cc.director.loadScene("GameOverScene.fire")
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
    updataIceNum(num) {
        if (this.iceNum) {
            this.iceNum.string = num;
        }
    },
    onStartIce() {
        if (!cc.gameControl.getGameState()) {
            cc.log(`游戏未开始`);
            return;
        }
        if (cc.gameControl.getGameType() == cc.gameCfg.GameType.SIMPLE) {

            if (this.canCreIce && this.canCreIceNum > 0) {
                cc.gameControl.createIce(this.snowManBottom);
                this.canCreIceNum--;
                this.updataIceNum(this.canCreIceNum);
            }
        } else {
            cc.gameControl.createIce(this.snowManBottom);
        }

    },

    updateScore(score) {
        if (this.scoreNode) {
            this.scoreNode.string = score;
        }
    },

    // update (dt) {},
});
