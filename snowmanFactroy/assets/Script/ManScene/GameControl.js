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
    ctor() {
        this.isGame = false;
        this.gameType = null;
        this.moveV_x = 74 / 2;
        this.moveV_y = -130;
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
    createIce(node) {
        const ice_tong = cc.instantiate(cc.resManager.resList["ICE"]);
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
});

cc.gameControl = GameControl.getInstance();