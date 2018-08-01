
let curIndex = 0;
let selfInfo = null;
function drawRankList (data, type) {
    let sharedCanvas = wx.getSharedCanvas();
    let context = sharedCanvas.getContext('2d');
    context.clearRect(0, 0, sharedCanvas.width, sharedCanvas.height);
    console.log("11");
    console.log(sharedCanvas);

    //console.log(itemBg.src);
    let posIndex = 0;
    let touxiangIndex = 0;
    for (let index = curIndex * 5; index < (curIndex * 5) + 5; index++) {
        const item = data[index];
        if (!item) {
            break;
        }
        console.log(item);
        context.font = "26px Arial";
        context.fillStyle = "red";
        context.textAlign = 'left';

        // 名次
        if (index <= 2) {
            context.font = "50px Arial";
            context.fillStyle = "red";
            context.textAlign = 'left';
            context.fillText(index + 1, 80, 70 * (posIndex) + 160, 400);
        } else {
            context.font = "50px Arial";
            context.fillStyle = "red";
            context.textAlign = 'left';
            context.fillText(index + 1, 80, 70 * (posIndex) + 160, 400);
        }

        // 昵称
        context.font = "26px Arial";
        context.fillStyle = "red";
        context.textAlign = 'left';
        let newStr = "";
        if (!item.nickname) {
            item.nickname = "";
        }
        let needLimit = 0;
        let strLen = 0;
        let indexs = 0;
        for (let i = 0; i < item.nickname.length; i++) {
            if (item.nickname.charCodeAt(i) > 255) {
                strLen = strLen + 2;
            } else {
                strLen++;
            }
            if (i != (item.nickname.length - 1) && strLen >= 12) {
                needLimit = true;
                indexs = i + 1;
                break;
            }
        }
        if (needLimit) {
            newStr = item.nickname.slice(0, indexs) + "···";
        } else {
            newStr = item.nickname;
        }
        context.fillText(newStr, 280, 70 * (posIndex) + 160, 400);

        // 头像
        let images_head = wx.createImage();
        images_head.src = item.avatarUrl;
        images_head.onload = () => {
            console.log(`加载成功`);
            context.drawImage(images_head, 160, 70 * (touxiangIndex) + 120, 50, 50);
            touxiangIndex++
        };

        // 分数
        context.font = "26px Arial";
        context.fillStyle = "red";
        context.textAlign = 'left';
        context.fillText(item.KVDataList[0].value, 480, 70 * (posIndex) + 160, 400);
        posIndex++;
    }

    // 自己的信息
    context.font = "50px Arial";
    context.fillStyle = "red";
    context.textAlign = 'left';
    context.fillText(selfInfo.rank + 1, 80, 70 * (6) + 170, 400);

    context.font = "26px Arial";
    context.fillStyle = "red";
    context.textAlign = 'left';
    context.fillText(selfInfo.data.nickname, 280, 70 * (6) + 170, 400);

    let images_head1 = wx.createImage();
    images_head1.src = selfInfo.data.avatarUrl;
    images_head1.onload = () => {
        console.log(`加载成功`);
        context.drawImage(images_head1, 160, 70 * (6) + 130, 50, 50);
    };
    context.font = "26px Arial";
    context.fillStyle = "red";
    context.textAlign = 'left';
    context.fillText(selfInfo.data.KVDataList[0].value, 480, 70 * (6) + 170, 400);

    context.font = "35px Arial";
    context.fillStyle = "#570B17";
    context.textAlign = 'center';
    let yeStr = `第${curIndex + 1}页`;
    context.fillText(yeStr, sharedCanvas.width / 2, 97 * (5) + 5, 400);
}
/**
 *  排序
 * @param type
 */
function sortUserData(data, selfSign) {
    data.forEach((item) => {
        item.KVDataList[0].value = JSON.parse(item.KVDataList[0].value);
    });
    for (let i = 0; i < data.length - 1; i++) {
        for (let j = i + 1; j < data.length; j++) {
            let money1 = data[i].KVDataList[0].value;
            let money2 = data[j].KVDataList[0].value;
            money1 = money1 ? money1 : 0;
            money2 = money2 ? money2 : 0;
            if (money1 < money2) {
                const centData = data[i];
                data[i] = data[j];
                data[j] = centData;
            }
        }
    }
    data.forEach((item, index) => {
        if (item.avatarUrl == selfSign) {
            selfInfo = {};
            selfInfo.data = item;
            selfInfo.rank = index + 1;
        }
    });
}
wx.onMessage(data => {

    const func = (ress, datas) => {

        // 测试代码
        const shuju = [];
        ress.data.forEach((item) => {
            shuju.push(item);
        });
        ress.data.forEach((item) => {
            shuju.push(item);
        });
        ress.data.forEach((item) => {
            shuju.push(item);
        });
        ress.data.forEach((item) => {
            shuju.push(item);
        });
        ress.data.forEach((item) => {
            shuju.push(item);
        });
        ress.data.forEach((item) => {
            shuju.push(item);
        });
        ress.data = shuju;

        let allYe = Math.floor((ress.data.length) / 5);
        if (((ress.data.length) % 5) == 0) {

        } else {
            allYe ++;
        }
        console.log(`翻页的类型：${parseInt(datas.fanType)}`);
        switch (parseInt(datas.fanType)) {
            case 1: {
                if (curIndex > 0) {
                    curIndex --;
                } else {
                    curIndex = 0;
                }
                break;
            }
            case 2: {
                if ((curIndex + 1) < allYe) {
                    curIndex ++;
                } else {
                    curIndex = allYe - 1;
                }
                break;
            }
            case 3: {
                curIndex = 0;
                break;
            }
            default: {
                console.log(`不存在的： ${parseInt(datas.fanType)}`);
            }
        }
        console.log(`总页数：${allYe}`);
        console.log("收到的数据",ress.data);

        sortUserData(ress.data, datas.selfSign);
        drawRankList(ress.data);
    };


    switch (parseInt(data.type)) {
        case 1: {
            wx.getFriendCloudStorage({
                keyList: ["userdata"],
                success: res => {
                    func(res, data);
                },
            });
            break;
        }
        case 2: {
            wx.getGroupCloudStorage({
                shareTicket: data.shareTicket,
                keyList: ["userdata"],
                success: res => {
                    console.log("群数据");
                    console.log(res);
                    func(res, data);
                },
            });
            break;
        }
    }

    // wx.getGroupCloudStorage({
    //     shareTicket,
    //     keyList: ["userdata"],
    //     success: res => {
    //         console.log("群数据");
    //         console.log(res);
    //     },
    // });

});