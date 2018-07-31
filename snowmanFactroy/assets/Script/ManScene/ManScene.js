

cc.Class({
    extends: cc.Component,

    properties: {

    },



    onLoad () {
        const manager = cc.director.getCollisionManager();
        manager.enabled = true;
        cc.resManager.loadDirRes("DirRes", () => {
            cc.log(`加载完！！！`);
        });
    },

    start () {

    },

    // update (dt) {},
});
