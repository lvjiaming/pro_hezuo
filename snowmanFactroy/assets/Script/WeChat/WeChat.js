const isWx =!!window['wx'];
cc.wxLogin = (cb) => {
    if (isWx) {
        wx.login({
            success: () => {
                cc.log('微信登录成功');
                const sysemInfo = wx.getSystemInfoSync();
                cc.log(sysemInfo);
                const userInfoButton =  wx.createUserInfoButton({
                    type: "text",
                    text: "获取用户信息",
                    // image: "localRes/xxqp_qd_small_zc.png",
                    style: {
                        left: sysemInfo.screenWidth ? (sysemInfo.screenWidth / 2 - 110 / 2 ): 280,
                        top: sysemInfo.screenHeight ? (sysemInfo.screenHeight / 2) : 200,
                        width: 110,
                        height: 45,
                        lineHeight: 40,
                        backgroundColor: '#ff0000',
                        color: '#ffffff',
                        textAlign: 'center',
                        fontSize: 16,
                        borderRadius: 4
                    }
                });
                userInfoButton.show();
                userInfoButton.onTap((res) => {
                    cc.log(`用户信息: ${res}`);
                    cc.log(res);
                    cc.gameControl.setSelfLoginInfo(res);
                    userInfoButton.destroy();
                    // 托管数据
                    // const data = {socre: 12, guanNum: 1};  // 伪造数据
                    // cc.updateWxData(data);
                    if (cb && cb instanceof Function) {
                         cb(res);
                    }
                });
            },
            fail:function(){
                cc.log('微信登录失败');
            },
        });
    }
};

cc.updateWxData = (data) => {
    if (isWx) {
        let KVDataList = [];
        KVDataList.push({key:'userdata',value:JSON.stringify(data)});
        wx.setUserCloudStorage({
            KVDataList:KVDataList,
            fail:res=>{
                console.log('setUserCloudStorage 接口调用失败',res);
            }
        });
    }
};

cc.wxShareCanvas = (path, cb) => {
    if(isWx){
        path = path ? path : canvas.toTempFilePathSync({destWidth: 960, destHeight: 720});
        wx.shareAppMessage({
            title: '雪人工厂',
            imageUrl:path,
            success:function(res){
                cc.log(res);
                if (cb) {
                    cb(res);
                }
            },
        });
    }
};
cc.wxBannerAd = (style) => {
    if (isWx) {
        const bannerAd = wx.createBannerAd({
            adUnitId: "",
            style: style
        });
        bannerAd.onLoad(() => {
            cc.log(`广告加载成功！`);
            bannerAd.show();
        });
        bannerAd.onError((err) => {
            cc.log(`加载失败：${err.errMsg}, ${err.errCode}`);
        });
    }
};
cc.wxRewardedVideoAd = (cb) => {
    if (isWx) {
        // const sysemInfo = wx.getSystemInfoSync();
        // if (sysemInfo.SDKVersion)
        const rewardedVideoAd = wx.createRewardedVideoAd({
            adUnitId: "",
        });
        rewardedVideoAd.onLoad(() => {
            cc.log(`广告加载成功！`);
            rewardedVideoAd.show();
        });
        rewardedVideoAd.onError((err) => {
            cc.log(`加载失败：${err.errMsg}`);
        });
        rewardedVideoAd.onClose((res) => {
            if (cb) {
                cb(res.isEnded);
            }
        });
    }
};