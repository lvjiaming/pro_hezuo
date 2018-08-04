const GameControl = cc.Class({
    statics: {
        getInstance() {
            if (!this.gameControl) {
                this.gameControl = new GameControl();
            }
            return this.gameControl;
        },
    },
    selfLoginInfo: null,  // 自己的登录信息

    isGame: false,  // 是否在游戏
    gameType: null, // 游戏类型
    moveV_x: null, // 移动的速度(x)
    moveV_y: null, // 移动速度（y）
    gameTime: null,// 游戏时间
    curTimer: null, // 开始的time
    gameScore: null, // 游戏的分数
    timerTime: null, // 倒计时的时间
    canCreIceTime: null, // 可以丢的时间

    crazyA: null, // 疯狂模式的加速

    curIce: null,// 当前的冰淇凌
    ctor() {
        this.isGame = false;
        this.gameType = null;
        this.moveV_x = 74 / 3;
        this.moveV_y = -160;
        this.gameTime = 0;
        this.curTimer = null;
        this.gameScore = 0;
        this.timerTime = 60;
        this.curIce = null;
        this.canCreIceTime = 10;
        this.selfLoginInfo = null;
        this.crazyA = 0;
    },
    createIceTong(node) {
        let time = (Math.random()*(30-15) + 15) / 10;
        if (this.gameType == cc.gameCfg.GameType.CRAZY) {
            time = (Math.random()*(20-10) + 10) / 10
        }
        setTimeout(() => {
            if (this.isGame) {
                const ice_tong = cc.instantiate(cc.resManager.resList["ICE_TONG"]);
                node.addChild(ice_tong);
                this.createIceTong(node);
            } else {
                cc.log(`游戏还未开始`);
            }
        }, time * 1000);

    },
    startTimer() {
        if (this.isGame) {
            this.curTimer = setTimeout(() => {
                this.gameTime ++;
                if (this.gameTime % 20 == 0) {
                    this.crazyA = this.crazyA + 0.5;
                }
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
    setSelfLoginInfo(info) {
        this.selfLoginInfo = info;
    },
    getSelfLoginInfo() {
        return this.selfLoginInfo;
    },
    getCrzayA() {
        return this.crazyA;
    },
});

cc.gameControl = GameControl.getInstance();