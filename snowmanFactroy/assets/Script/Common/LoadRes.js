
cc.resManager = {};
cc.resManager.loadDirRes = (path, cb) => {
    cc.loader.loadResDir(path, (err, list) => {
        if (err) {
            cc.error(`err: ${err}`);
        } else {
            cc.resManager.resList = {};
            for (let item in list) {
                if (list[item] instanceof cc.Prefab) {
                    cc.resManager.resList[list[item]._name.toUpperCase()] = list[item]
                }
            }
            cc.log(cc.resManager.resList);
            if (cb && cb instanceof Function) {
                cb();
            }
        }
    });
};
cc.resManager.loadPrefab = (path, cb) => {
    cc.loader.loadRes(path, (err, prefab) => {
        if (err) {
            cc.error(`err: ${err}`);
        } else {
            if (cb) {
                cb(prefab);
            }
        }
    });
};
cc.resManager.loadTex = (path, cb) => {
    cc.loader.loadRes(path, cc.SpriteFrame, (err, prefab) => {
        if (err) {
            cc.error(`err: ${err}`);
        } else {
            if (cb) {
                cb(prefab);
            }
        }
    });
};