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
                    userInfoButton.destroy();
                    // 托管数据
                    const data = {socre: 12};  // 伪造数据
                    let KVDataList = [];
                    KVDataList.push({key:'userdata',value:JSON.stringify(data.socre)});
                    wx.setUserCloudStorage({
                        KVDataList:KVDataList,
                        fail:res=>{
                            console.log('setUserCloudStorage 接口调用失败',res);
                        }
                    });
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

cc.wxShareCanvas = () => {
    if(isWx){
        wx.shareAppMessage({
            title: '雪人工厂',
            imageUrl:canvas.toTempFilePathSync({  // 截屏分享，不截屏，则此参数的值为分享图片的路径
                destWidth: 960,
                destHeight: 720
            }),
            success:function(res){
                cc.log(res)
            },
        });
    }
};