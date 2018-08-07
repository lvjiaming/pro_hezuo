

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
        iceMing: {
            default: null,
            type: cc.Label,
            tooltip: "命",
        },
    },



    onLoad () {
        this.canCreIceNum = 60;
        this.canRevive = true;
        this.canAddNum = true;

        const manager = cc.director.getCollisionManager();
        this.curIceFailNum = 0;
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
        this.node.on("gameRestart", () => {
            this.reStart();
        });
        this.node.on("gameContinue", () => {
            this.gameContinue();
        });
        this.node.on("cancelAddNum", () => {
            this.cancelAddNum();
        });
        this.node.on("iceFail", () => {
            this.curIceFailNum++;
            if (this.curIceFailNum > 5) {
                cc.gameControl.setGameState(false);
                if (cc.gameControl.getCurIce() && !cc.gameControl.getCurIce().isDes) {
                    cc.gameControl.getCurIce().isLast = true;
                } else {
                    this.startOver();
                }
                return
            }
            if (this.iceMing) {
                this.iceMing.string = `x ${5 - this.curIceFailNum}`;
            }
        });
        // this.scheduleOnce(() => {
        //     if (cc.gameControl.getGameType() == cc.gameCfg.GameType.SIMPLE) {
        //         if (this.timerTime) {
        //             this.timerTime.node.active = true;
        //         }
        //         this.startTimer();
        //     }
        //     this.canCreIce = true;
        // }, cc.gameControl.canCreIceTime);
        this.gameTypeShow();
    },

    start () {

    },
    reStart() {
        cc.gameControl.setGameState(true);
        cc.gameControl.timerTime = 60;
        // this.canCreIce = false;
        // if (this.timerTime) {
        //     this.timerTime.node.active = false;
        //     this.timerTime.string = cc.gameControl.timerTime;
        // }
        // this.scheduleOnce(() => {
        //     if (cc.gameControl.getGameType() == cc.gameCfg.GameType.SIMPLE) {
        //         if (this.timerTime) {
        //             this.timerTime.node.active = true;
        //         }
        //         this.startTimer();
        //     }
        //     this.canCreIce = true;
        // }, cc.gameControl.canCreIceTime);
        cc.gameControl.createIceTong(this.iceTongCreateNode);
        this.canCreIceNum = 30;
        this.updataIceNum(this.canCreIceNum);
    },
    gamePause() {
        // cc.gameControl.gameIsPause = true;
    },
    gameContinue() {
        // cc.gameControl.gameIsPause = false;
        // this.startTimer();
        this.canCreIceNum = 10;
        this.updataIceNum(this.canCreIceNum);
    },
    cancelAddNum() {
        cc.gameControl.setGameState(false);
        if (cc.gameControl.getCurIce() && cc.gameControl.getCurIce().isDes) {
            this.startOver();
        } else {
            cc.gameControl.getCurIce().isLast = true;
        }
    },
    gameTypeShow() {
        switch (cc.gameControl.getGameType()) {
            case cc.gameCfg.GameType.SIMPLE: {
                if (this.iceMing) {
                    this.iceMing.node.parent.active = false;
                }
                if (this.iceNum) {
                    this.iceNum.node.parent.active = true;
                }
                break;
            }
            case cc.gameCfg.GameType.CRAZY: {
                if (this.iceMing) {
                    this.iceMing.node.parent.active = true;
                }
                if (this.iceNum) {
                    this.iceNum.node.active = false;
                }
                break;
            }
        }
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
        // this.scheduleOnce(() => {
        //     cc.gameControl.timerTime--;
        //     if (this.timerTime) {
        //         this.timerTime.string = cc.gameControl.timerTime;
        //     }
        //     if (cc.gameControl.timerTime > 0) {
        //         if (!cc.gameControl.gameIsPause) {
        //             this.startTimer();
        //         }
        //     } else {
        //         cc.gameControl.setGameState(false);
        //         if (cc.gameControl.getCurIce() && !cc.gameControl.getCurIce().isDes) {
        //             cc.gameControl.getCurIce().isLast = true;
        //         } else {
        //             this.startOver();
        //         }
        //     }
        // }, 1);
    },

    startOver() {
        cc.gameControl.setGameState(false);
        if (cc.gameControl.getGameType() == cc.gameCfg.GameType.SIMPLE && this.canRevive) {
            this.canRevive = false;
            cc.resManager.loadPrefab("prefab/revivePop", (prefab) => {
                const pop = cc.instantiate(prefab);
                this.node.addChild(pop);
            });
        } else {
            cc.director.loadScene("GameOverScene.fire");
        }
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
            this.canCreIceNum--;
            if (this.canCreIceNum > 0) {
                cc.gameControl.createIce(this.snowManBottom);
            } else {
                if (this.canAddNum) {
                    this.canAddNum = false;
                    this.gamePause();
                    cc.resManager.loadPrefab("prefab/addNumPop", (prefab) => {
                        const pop = cc.instantiate(prefab);
                        this.node.addChild(pop);
                    });
                } else {
                    cc.gameControl.setGameState(false);
                    if (cc.gameControl.getCurIce() && cc.gameControl.getCurIce().isDes) {
                        this.startOver();
                    } else {
                        cc.gameControl.getCurIce().isLast = true;
                    }
                }
            }
            this.canCreIceNum = this.canCreIceNum ? this.canCreIceNum : 0;
            this.updataIceNum(this.canCreIceNum);
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
