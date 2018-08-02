const GameControl = cc.Class({
    statics: {
        getInstance() {
            if (!this.gameControl) {
                this.gameControl = new GameControl();
            }
            return this.gameControl;
        },
    },
    isGame: false,  // 是否在游戏
    gameType: null, // 游戏类型
    moveV_x: null, // 移动的速度(x)
    moveV_y: null, // 移动速度（y）
    gameTime: null,// 游戏时间
    curTimer: null, // 开始的time
    gameScore: null, // 游戏的分数
    timerTime: null, // 倒计时的时间

    curIce: null,// 当前的冰淇凌
    ctor() {
        this.isGame = false;
        this.gameType = null;
        this.moveV_x = 74 / 3;
        this.moveV_y = -160;
        this.gameTime = 0;
        this.curTimer = null;
        this.gameScore = 0;
        this.timerTime = 30;
        this.curIce = null;
    },
    createIceTong(node) {
        const time = 2;
        if (this.isGame) {
            setTimeout(() => {
                const ice_tong = cc.instantiate(cc.resManager.resList["ICE_TONG"]);
                node.addChild(ice_tong);
                this.createIceTong(node);
            }, time * 1000);
        } else {
            cc.log(`游戏还未开始`);
        }

    },
    startTimer() {
        if (this.isGame) {
            this.curTimer = setTimeout(() => {
                this.gameTime++;
                this.moveV_x = this.moveV_x * (0.5 / 20) + this.moveV_x;
                if (this.gameTime <= 130) {
                    this.startTimer();
                }
            }, 1000);
        }
    },
    createIce(node) {
        const ice_tong = cc.instantiate(cc.resManager.resList["ICE"]);
        this.curIce = ice_tong;
        node.addChild(ice_tong);
    },
    setGameState(state) {
        this.isGame = state;
    },
    getGameState() {
        return this.isGame;
    },
    setGameType(type) {
        this.gameType = type;
    },
    getGameType() {
        return this.gameType;
    },
    setMoveV_x(v) {
        this.moveV_x = v;
    },
    getMoveV_x() {
        return this.moveV_x;
    },
    setMoveV_y(v) {
        this.moveV_y = v;
    },
    getMoveV_y() {
        return this.moveV_y;
    },
    setGameScore(score) {
        this.gameScore = score;
    },
    getGameScore() {
        return this.gameScore;
    },
    getCurIce() {
        return this.curIce;
    },
});

cc.gameControl = GameControl.getInstance();