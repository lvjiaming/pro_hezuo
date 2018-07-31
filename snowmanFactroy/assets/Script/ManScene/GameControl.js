const GameControl = cc.Class({
    statics: {
        getInstance() {
            if (!this.gameControl) {
                this.gameControl = new GameControl();
            }
            return this.gameControl;
        },
    },
    isGame: false,
    ctor() {
        this.isGame = false;
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
});

cc.gameControl = GameControl.getInstance();