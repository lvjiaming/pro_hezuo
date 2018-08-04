
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
    let rankIndex = 0;
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
            let images_rank = wx.createImage();
            images_rank.src = `rankRes/Rank${index + 1}.png`;
            images_rank.onload = () => {
                console.log(`加载名词成功: ${rankIndex}`);
                context.drawImage(images_rank, 175, 60 * (rankIndex) + 170, 30, 30);
                rankIndex ++;
            };
            // context.font = "40px Arial";
            // context.fillStyle = "red";
            // context.textAlign = 'left';
            // context.fillText(index + 1, 180, 60 * (posIndex) + 200, 400);
        } else {
            context.font = "40px Arial";
            context.fillStyle = "red";
            context.textAlign = 'left';
            let off_x = 0;
            if ((index + 1) >= 10 ) {
                off_x = -6
            }
            context.fillText(index + 1, 180 + off_x, 60 * (posIndex) + 200, 400);
        }

        // 昵称
        context.font = "20px Arial";
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
        context.fillText(newStr, 280, 60 * (posIndex) + 190, 400);

        // 头像
        let images_head = wx.createImage();
        images_head.src = item.avatarUrl;
        images_head.onload = () => {
            console.log(`加载成功`);
            context.drawImage(images_head, 220, 60 * (touxiangIndex) + 165, 40, 40);
            touxiangIndex++
        };

        // 分数
        context.font = "26px Arial";
        context.fillStyle = "red";
        context.textAlign = 'left';
        context.fillText(item.KVDataList[0].value.socre ? item.KVDataList[0].value.socre : item.KVDataList[0].value, 480, 60 * (posIndex) + 190, 400);
        posIndex++;
    }

    // 自己的信息
    if (selfInfo) {
        if (selfInfo.rank <= 3) {
            let images_rank = wx.createImage();
            images_rank.src = `rankRes/Rank${selfInfo.rank}.png`;
            images_rank.onload = () => {
                context.drawImage(images_rank, 175, 70 * (6) + 128, 30, 30);
            };
        } else {
            context.font = "40px Arial";
            context.fillStyle = "red";
            context.textAlign = 'left';
            context.fillText(selfInfo.rank, 180, 70 * (6) + 160, 400);
        }

        context.font = "20px Arial";
        context.fillStyle = "red";
        context.textAlign = 'left';
        context.fillText(selfInfo.data.nickname, 280, 70 * (6) + 153, 400);

        let images_head1 = wx.createImage();
        images_head1.src = selfInfo.data.avatarUrl;
        images_head1.onload = () => {
            console.log(`加载成功`);
            context.drawImage(images_head1, 220, 70 * (6) + 125, 40, 40);
        };
        context.font = "26px Arial";
        context.fillStyle = "red";
        context.textAlign = 'left';
        context.fillText(selfInfo.data.KVDataList[0].value.socre, 480, 70 * (6) + 155, 400);
    }

    context.font = "25px Arial";
    context.fillStyle = "#035157";
    context.textAlign = 'center';
    let yeStr = `第${curIndex + 1}页`;
    context.fillText(yeStr, sharedCanvas.width / 2, 97 * (5) + 10, 400);
}
/**
 *  排序
 * @param type
 */
function sortUserData(data, selfSign) {
    data.forEach((item) => {
        item.KVDataList[0].value = typeof(item.KVDataList[0].value) == "string" ? JSON.parse(item.KVDataList[0].value) : item.KVDataList[0].value;
    });
    for (let i = 0; i < data.length - 1; i++) {
        for (let j = i + 1; j < data.length; j++) {
            let money1 = data[i].KVDataList[0].value.socre;
            let money2 = data[j].KVDataList[0].value.socre;
            money1 = money1 ? money1 : 0;
            money2 = money2 ? money2 : 0;
            if (money1 < money2) {
                const centData = data[i];
                data[i] = data[j];
                data[j] = centData;
            }
        }
    }
    if (selfSign) {
        data.forEach((item, index) => {
            if (item.avatarUrl == selfSign) {
                selfInfo = {};
                selfInfo.data = item;
                selfInfo.rank = index + 1;
            }
        });
    }
}
wx.onMessage(data => {

    const func = (ress, datas) => {

        // 测试代码
        // const shuju = [];
        // ress.data.forEach((item) => {
        //     shuju.push(item);
        // });
        // ress.data.forEach((item) => {
        //     shuju.push(item);
        // });
        // ress.data.forEach((item) => {
        //     shuju.push(item);
        // });
        // ress.data.forEach((item) => {
        //     shuju.push(item);
        // });
        // ress.data.forEach((item) => {
        //     shuju.push(item);
        // });
        // ress.data.forEach((item) => {
        //     shuju.push(item);
        // });
        // ress.data = shuju;

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

    console.log(`111: ${data.type}`);
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