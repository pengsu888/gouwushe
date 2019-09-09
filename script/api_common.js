(function(window) {
    commonUrl = 'http://服务器接口地址/';
    apiKey = 'apiKey';
    apiSecret = 'apiSecret';

})(window);
// 定义开启openinstall上报登录数据  1开启、0关闭
var openinstaus = 1;
//验证手机号
var clipBoard;

function fncheckPhone(cellphone) {
    return /^(13[0-9]|14[5,7,9]|15[0-9]|16[6]|17[0-9]|18[0-9]|19[1,8,9])\d{8}$/.test(cellphone);
}
//时间戳的生成；
function fntimestamp() {
    return new Date().getTime();
}
$(function() {
    //监听输入框输入的是否是大于0的正整数；
    $(".phone_input").on("keyup", function() {
        $(this).val($(this).val().replace(/[^0-9]+/, ''));
        if ($(this).val().length == 1) {
            $(this).val() == '0' ? $(this).val('') : $(this).val();
        }
    });
    //监听输入框输入的是否是大于0的正整数；
    $(".yzm_input").on("keyup", function() {
        $(this).val($(this).val().replace(/[^0-9]+/, ''));
    });
    //验证密码输入

    $(".pwd_input").on("keyup", function() {
        $(this).val($(this).val().replace(/[^\w\/]/ig, ''));
    });
});

//复制邀请码
function fnCopy(yqm) {
    var clipBoard = api.require('clipBoard');
    clipBoard.set({
        value: yqm
    }, function(ret, err) {
        if (ret) {
            // alert(JSON.stringify(ret));
            api.toast({
                msg: '复制成功',
                duration: 2000,
                location: 'middle'
            });

        } else {
            // alert(JSON.stringify(err));
        }
    });
}
//封装阿里百川初始化方法
function aliInitTag() {

    // var alibaichuan = api.require('mAliBaiChuan');
    // alibaichuan.initTae(function(ret, err) {
    //     if (ret) {
    //         // alert("ret:" + JSON.stringify(ret));
    //     } else {
    //         // alert("err:" + JSON.stringify(err));
    //     }
    // });
}
//将参赛安装首字母排列
function sort_ASCII(obj) {
    var arr = new Array();
    var num = 0;
    for (var i in obj) {
        arr[num] = i;
        num++;
    }
    var sortArr = arr.sort();
    var sortObj = {};
    for (var i in sortArr) {
        sortObj[sortArr[i]] = obj[sortArr[i]];
    }
    return sortObj;
}
//判断字符串是否为空，是否存在，是否为undefined
function empty(arg) {
    if (arg === "") {
        return true;
    }
    if (arg === null) {
        return true;
    }
    if (arg === undefined) {
        return true;
    }
    if (arg == "") {
        return true;
    }
    if (arg == null) {
        return true;
    }
    if (arg == undefined) {
        return true;
    }
    return false;
}

//初始化阿里百川
function initALibaichuan() {
    var alibaichuan = api.require('mAliBaiChuan');
    alibaichuan.initTae(function(ret, err) {
        if (ret) {
            // alert("ret:" + JSON.stringify(ret));

        } else {
            // alert("err:" + JSON.stringify(err));
        }
    });
}
//验证用户是否登录
function checkUserLogin() {
    if (empty($api.getStorage("userInfo"))) {
        api.openWin({
            name: 'login',
            url: '../login/user_login.html',
            reload: true,
            animation: {
                type: "fade", //动画类型（详见动画类型常量）
                subType: "from_top", //动画子类型（详见动画子类型常量）
                duration: 300 //动画过渡时间，默认300毫秒
            }
        });
    }
}
//时间戳转换成时间
function timeMM(shijianchuo) {
    var date = new Date(shijianchuo);
    var yyyy = date.getFullYear();
    //获取完整的年份(4位,1970)
    var m = date.getMonth() + 1;
    //获取月份(0-11,0代表1月,用的时候记得加上1)
    if (m.toString().length == 1) {
        m = '0' + m;
    }
    var d = date.getDate();
    //获取日(1-31)
    if (d.toString().length == 1) {
        d = '0' + d;
    }
    var h = date.getHours();
    //获取小时数(0-23)
    if (h.toString().length == 1) {
        h = '0' + h;
    }
    var mm = date.getMinutes();
    //获取分钟数(0-59)
    if (mm.toString().length == 1) {
        mm = '0' + mm;
    }
    var s = date.getSeconds();
    //获取秒数(0-59)
    if (s.toString().length == 1) {
        s = '0' + s;
    }
    // var datetime = yyyy+'-'+m+'-'+d+' '+h+':'+mm;//+':'+s
    var datetime = yyyy + '.' + m + '.' + d;
    //+':'+s
    return datetime;
}
//时间戳转换成时间
function timeSS(shijianchuo) {
    var date = new Date(shijianchuo);
    var yyyy = date.getFullYear();
    //获取完整的年份(4位,1970)
    var m = date.getMonth() + 1;
    //获取月份(0-11,0代表1月,用的时候记得加上1)
    if (m.toString().length == 1) {
        m = '0' + m;
    }
    var d = date.getDate();
    //获取日(1-31)
    if (d.toString().length == 1) {
        d = '0' + d;
    }
    var h = date.getHours();
    //获取小时数(0-23)
    if (h.toString().length == 1) {
        h = '0' + h;
    }
    var mm = date.getMinutes();
    //获取分钟数(0-59)
    if (mm.toString().length == 1) {
        mm = '0' + mm;
    }
    var s = date.getSeconds();
    //获取秒数(0-59)
    if (s.toString().length == 1) {
        s = '0' + s;
    }
    var datetime = yyyy + '-' + m + '-' + d + ' ' + h + ':' + mm + ':' + s;
    //+':'+s
    return datetime;
}

function timeHH() {
    var myDate = new Date(); //获取系统当前时间
    var datatime = myDate.getHours(); //获取当前小时数(0-23)
    //+':'+s
    return datatime;
}

function formatDateTime(timeStamp) {
    var date = new Date();
    date.setTime(timeStamp * 1000);
    var y = date.getFullYear();
    var m = date.getMonth() + 1;
    m = m < 10 ? ('0' + m) : m;
    var d = date.getDate();
    d = d < 10 ? ('0' + d) : d;
    return y + '-' + m + '-' + d;
};
// loading 加载
function loading() {
    var activity = api.require('UILoading');
    activity.keyFrame({
        rect: {
            w: 80,
            h: 100
        },
        styles: {
            bg: 'rgba(0,0,0,0)',
            corner: 5,
            interval: 50,
            frame: {
                w: 80,
                h: 80
            }
        },
        content: [{
            frame: 'widget://image/loadingTwo/ic_page_loading_frame2.png'
        }, {
            frame: 'widget://image/loadingTwo/ic_page_loading_frame3.png'
        }, {
            frame: 'widget://image/loadingTwo/ic_page_loading_frame4.png'
        }, {
            frame: 'widget://image/loadingTwo/ic_page_loading_frame5.png'
        }, {
            frame: 'widget://image/loadingTwo/ic_page_loading_frame6.png'
        }, {
            frame: 'widget://image/loadingTwo/ic_page_loading_frame7.png'
        }, {
            frame: 'widget://image/loadingTwo/ic_page_loading_frame8.png'
        }, {
            frame: 'widget://image/loadingTwo/ic_page_loading_frame9.png'
        }, {
            frame: 'widget://image/loadingTwo/ic_page_loading_frame10.png'
        }, {
            frame: 'widget://image/loadingTwo/ic_page_loading_frame11.png'
        }, {
            frame: 'widget://image/loadingTwo/ic_page_loading_frame12.png'
        }, {
            frame: 'widget://image/loadingTwo/ic_page_loading_frame13.png'
        }, {
            frame: 'widget://image/loadingTwo/ic_page_loading_frame14.png'
        }, {
            frame: 'widget://image/loadingTwo/ic_page_loading_frame15.png'
        }, {
            frame: 'widget://image/loadingTwo/ic_page_loading_frame16.png'
        }, {
            frame: 'widget://image/loadingTwo/ic_page_loading_frame17.png'
        }, {
            frame: 'widget://image/loadingTwo/ic_page_loading_frame18.png'
        }, {
            frame: 'widget://image/loadingTwo/ic_page_loading_frame19.png'
        }, {
            frame: 'widget://image/loadingTwo/ic_page_loading_frame20.png'
        }, ],
        //mask:'rgba(0,0,0,0)'
    });
}

function loading_close() {
    var uiloading = api.require('UILoading');
    uiloading.closeKeyFrame();
}
// 下拉刷新
function RefreshLoad() {
    api.setCustomRefreshHeaderInfo({
        bgColor: '#eee',
        images: [
            'widget://image/loading/circle_loading_00000.png',
            'widget://image/loading/circle_loading_00001.png',
            'widget://image/loading/circle_loading_00002.png',
            'widget://image/loading/circle_loading_00003.png',
            'widget://image/loading/circle_loading_00004.png',
            'widget://image/loading/circle_loading_00005.png',
            'widget://image/loading/circle_loading_00006.png',
            'widget://image/loading/circle_loading_00007.png',
            'widget://image/loading/circle_loading_00008.png',
            'widget://image/loading/circle_loading_00009.png',
            'widget://image/loading/circle_loading_00010.png',
            'widget://image/loading/circle_loading_00011.png',
            'widget://image/loading/circle_loading_00012.png',
            'widget://image/loading/circle_loading_00013.png',
            'widget://image/loading/circle_loading_00014.png',
            'widget://image/loading/circle_loading_00015.png',
            'widget://image/loading/circle_loading_00016.png',
            'widget://image/loading/circle_loading_00017.png',
            'widget://image/loading/circle_loading_00018.png',
            'widget://image/loading/circle_loading_00019.png',
            'widget://image/loading/circle_loading_00020.png',
            'widget://image/loading/circle_loading_00021.png',
            'widget://image/loading/circle_loading_00022.png',
            'widget://image/loading/circle_loading_00023.png',
            'widget://image/loading/circle_loading_00024.png',
            'widget://image/loading/circle_loading_00025.png',
            'widget://image/loading/circle_loading_00026.png',
            'widget://image/loading/circle_loading_00027.png',
            'widget://image/loading/circle_loading_00028.png',
            'widget://image/loading/circle_loading_00029.png',
            'widget://image/loading/circle_loading_00030.png'
        ],
        tips: {
            pull: '下拉刷新',
            threshold: '松开立即刷新',
            load: '正在刷新'
        }
    }, function() {

        //下拉刷新被触发，自动进入加载状态，使用 api.refreshHeaderLoadDone() 手动结束加载中状态
        setTimeout(function() {
            location = location;
            api.refreshHeaderLoadDone();
        }, 1000);
    });
}
//淘宝计算佣金
function jisuan(plateid, user_id) {
    var obj = {
        'user_id': user_id,
    };
    var objArr = sort_ASCII(obj);
    var timestamp = fntimestamp();
    var version = '2.0';
    var arr = apiSecret + timestamp + version + '';
    for (i in objArr) {
        arr += objArr[i];
    }
    var sign = hex_md5(arr);
    // alert(sign);
    api.ajax({
        url: commonUrl + 'soukeAppTttService/service/user/finduserShareRebate_ac',
        method: 'post',
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
        data: {
            body: {
                'apiKey': apiKey,
                'timestamp': timestamp,
                'sign': sign,
                'user_id': user_id,
            }
        }
    }, function(ret, err) {
        if (ret) {
            if (ret.result_code == 200) {
                // console.log("计算信息" + JSON.stringify(ret));
                min_level_name = ret.result_data.dislevel.min_level_name; //最小等级名称
                min_share_rebate = ret.result_data.dislevel.min_share_rebate; //最小等级分享比率
                level_name = ret.result_data.dislevel.level_name; //当前等级名称
                max_shop_rebate = ret.result_data.dislevel.max_shop_rebate; //最高等级购物比率
                min_shop_rebate = ret.result_data.dislevel.min_shop_rebate; //最小等级购物比率
                max_level_name = ret.result_data.dislevel.max_level_name; //最高等级名称
                dis_level_id = ret.result_data.dislevel.dis_level_id; //当前等级ID
                shop_rebate = ret.result_data.dislevel.shop_rebate; //当前购物比率
                max_share_rebate = ret.result_data.dislevel.max_share_rebate; //最高等级分享比率
                share_rebate = ret.result_data.dislevel.share_rebate; //当前分享比率
                var sectionList = ret.result_data.sectionList;
                for (var i = 0; i < sectionList.length; i++) {
                    if (plateid == sectionList[i].section_id) {
                        my_share_rebate = sectionList[i].share_rebate; //板块分享比率
                        my_shop_rebate = sectionList[i].shop_rebate; //板块购物比率
                    }
                }
            } else {
                api.toast({
                    msg: ret.result_message,
                    duration: 2000,
                    location: 'middle'
                });
            }
        } else {
            // api.alert({ msg: JSON.stringify(err) });
        }
    });
}
//拼多多计算佣金
function Pddjisuan(user_id) {
    var obj = {
        'user_id': user_id,
    };
    var objArr = sort_ASCII(obj);
    var timestamp = fntimestamp();
    var version = '2.0';
    var arr = apiSecret + timestamp + version + '';
    for (i in objArr) {
        arr += objArr[i];
    }
    var sign = hex_md5(arr);
    api.ajax({
        url: commonUrl + 'soukeAppTttService/service/pdd/findShareRebate',
        method: 'post',
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
        data: {
            body: {
                'apiKey': apiKey,
                'timestamp': timestamp,
                'sign': sign,
                'user_id': user_id,
            }
        }
    }, function(ret, err) {
        if (ret) {
            if (ret.result_code == 200) {
                // console.log("拼多多计算信息" + JSON.stringify(ret));
                pdd_min_level_name = ret.result_data.dislevel.min_level_name; //最小等级名称
                pdd_min_share_rebate = ret.result_data.dislevel.min_share_rebate; //最小等级分享比率
                pdd_level_name = ret.result_data.dislevel.level_name; //当前等级名称
                pdd_max_shop_rebate = ret.result_data.dislevel.max_shop_rebate; //最高等级自购比率
                pdd_min_shop_rebate = ret.result_data.dislevel.min_shop_rebate; //最小等级自购比率
                pdd_max_level_name = ret.result_data.dislevel.max_level_name; //最高等级名称
                pdd_dis_level_id = ret.result_data.dislevel.dis_level_id; //当前等级ID
                pdd_shop_rebate = ret.result_data.dislevel.shop_rebate; //当前等级自购比率
                pdd_max_share_rebate = ret.result_data.dislevel.max_share_rebate; //最高等级分享比率
                pdd_share_rebate = ret.result_data.dislevel.share_rebate; //当前等级分享比率
                pdd_share_ratio = ret.result_data.share_ratio; //最高等级分享比率
                pdd_split_rate = ret.result_data.split_rate; //当前等级分享比率
                // alert(pdd_share_rebate);
            } else {
                api.toast({
                    msg: ret.result_message,
                    duration: 2000,
                    location: 'middle'
                });
            }
        } else {
            // api.alert({ msg: JSON.stringify(err) });
        }
    });
}
//京东计算佣金
function jdjisuan(user_id) {
    var obj = {
        'user_id': user_id,
    };
    var objArr = sort_ASCII(obj);
    var timestamp = fntimestamp();
    var version = '2.0';
    var arr = apiSecret + timestamp + version + '';
    for (i in objArr) {
        arr += objArr[i];
    }
    var sign = hex_md5(arr);
    api.ajax({
        url: commonUrl + 'soukeAppTttService/service/jd/findJdRebate',
        method: 'post',
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
        data: {
            body: {
                'apiKey': apiKey,
                'timestamp': timestamp,
                'sign': sign,
                'user_id': user_id,
            }
        }
    }, function(ret, err) {
        if (ret) {
            if (ret.result_code == 200) {
                // console.log("京东计算信息" + JSON.stringify(ret));
                jd_min_level_name = ret.result_data.dislevel.min_level_name; //最小等级名称
                jd_min_share_rebate = ret.result_data.dislevel.min_share_rebate; //最小等级分享比率
                jd_level_name = ret.result_data.dislevel.level_name; //当前等级名称
                jd_max_shop_rebate = ret.result_data.dislevel.max_shop_rebate; //最高等级自购比率
                jd_min_shop_rebate = ret.result_data.dislevel.min_shop_rebate; //最小等级自购比率
                jd_max_level_name = ret.result_data.dislevel.max_level_name; //最高等级名称
                jd_dis_level_id = ret.result_data.dislevel.dis_level_id; //当前等级ID
                jd_shop_rebate = ret.result_data.dislevel.shop_rebate; //当前等级自购比率
                jd_max_share_rebate = ret.result_data.dislevel.max_share_rebate; //最高等级分享比率
                jd_share_rebate = ret.result_data.dislevel.share_rebate; //当前等级分享比率
                jd_share_ratio = ret.result_data.share_ratio; //最高等级分享比率
                jd_split_rate = ret.result_data.split_rate; //当前等级分享比率
                // alert(jd_share_rebate);
            } else {
                api.toast({
                    msg: ret.result_message,
                    duration: 2000,
                    location: 'middle'
                });
            }
        } else {
            // api.alert({ msg: JSON.stringify(err) });
        }
    });
}

function getEvent() {
    // $api.clearStorage();
    var tpw = $api.getStorage('tpw_data');
    if (!tpw) {
        getsymbol();
    }
    // //监听淘口令
    api.addEventListener({
        name: 'resume'
    }, function(ret, err) {
        if ($api.getStorage("search_status") == 1 || $api.getStorage("search_status") == undefined) {
            var clipBoard = api.require('clipBoard');
            clipBoard.get(function(ret, err) {
                // alert(JSON.stringify(ret));
                var noShopName;
                if (ret) {
                    var value = ret.value;
                    api.closeWin({
                        name: 'sousuo_win'
                    });
                    if (!empty(value)) {
                        var reg = new RegExp("^[a-zA-Z0-9]{11}$");
                        // alert(value);
                        if (value.search("♀") != -1) {
                            if (!empty($api.getStorage("userInfo"))) {
                                user_id = $api.getStorage("userInfo").user_id;
                            } else {
                                var strArr = value.split("♀")[1].split("♀");
                                var Yaoqingma = strArr[0];
                                clipBoard.set({
                                    value: ''
                                }, function(ret, err) {
                                    if (ret) {
                                        // alert(JSON.stringify(ret));
                                    } else {
                                        // alert(JSON.stringify(err));
                                    }
                                });
                                var dialogBox = api.require('dialogBox');
                                dialogBox.discount({
                                    rect: {
                                        w: 275,
                                        h: 360
                                    },
                                    styles: {
                                        bg: '#FFF',
                                        image: {
                                            path: 'widget://image/register_window.png',
                                            marginB: 150
                                        },
                                        cancel: {
                                            icon: 'widget://image/home/home_update_btn_close.png',
                                            marginB: 80,
                                            w: 30,
                                            h: 30
                                        }
                                    }
                                }, function(ret) {
                                    // alert(JSON.stringify(ret));
                                    if (ret.eventType == 'image') {
                                        api.openWin({
                                            name: 'regist',
                                            url: '../login/regist.html',
                                            rect: {
                                                x: 0,
                                                y: 0,
                                                w: 'auto',
                                                h: 'auto'
                                            },
                                            pageParam: {
                                                Yaoqingma: Yaoqingma
                                            },
                                            bounces: false,
                                            bgColor: 'rgba(0,0,0,0)',
                                            vScrollBarEnabled: true,
                                            hScrollBarEnabled: true
                                        });
                                        dialogBox.close({
                                            dialogName: 'discount'
                                        });
                                    } else {
                                        dialogBox.close({
                                            dialogName: 'discount'
                                        });
                                    }
                                });
                                return;
                            }
                        }
                        getsymbol();
                        var tpw_data = $api.getStorage('tpw_data');
                        // console.log(!tpw_data);
                        value = value.replace(new RegExp('\\$', 'gm'), "￥");
                        if (tpw_data) {
                            for (var i = 0; i < tpw_data.length; i++) {
                                var symbol = tpw_data[i].symbol;
                                if (value.search(symbol) != -1) {
                                    // console.log(symbol);
                                    var strArr = value.split(symbol)[1].split(symbol);
                                    jiexitaoKouLing = strArr[0];
                                    if (reg.test(jiexitaoKouLing)) {
                                        popTkl(jiexitaoKouLing);
                                        return;
                                    } else {
                                        var i = 1;
                                        while (true) {
                                            i++;
                                            jiexitaoKouLing = value.split(symbol)[i].split(symbol)[0];
                                            if (empty(jiexitaoKouLing)) {
                                                break;
                                            }
                                            if (reg.test(jiexitaoKouLing)) {
                                                popTkl(jiexitaoKouLing);
                                                return;
                                            }
                                        }
                                    }
                                }
                            }
                        }
                        jiexitaoKouLing = value;
                        popTitle(jiexitaoKouLing);
                    } else {}
                }
            });
        }
    });

}

function popTkl(jiexitaoKouLing) {
    api.openFrame({
        name: 'pop',
        url: '../pop/pop.html',
        rect: {
            x: 0,
            y: 0,
            w: 'auto',
            h: 'auto'
        },
        pageParam: {
            key: jiexitaoKouLing
        },
        bounces: false,
        bgColor: 'rgba(0,0,0,0)',
        vScrollBarEnabled: true,
        hScrollBarEnabled: true
    });
}

function popTitle(jiexitaoKouLing) {
    api.openFrame({
        name: 'pop_title',
        url: '../pop/pop_title.html',
        rect: {
            x: 0,
            y: 0,
            w: 'auto',
            h: 'auto'
        },
        pageParam: {
            key: jiexitaoKouLing
        },
        bounces: false,
        bgColor: 'rgba(0,0,0,0)',
        vScrollBarEnabled: true,
        hScrollBarEnabled: true
    });
}

function closePopframe() {
    api.addEventListener({
        name: 'closePopframe'
    }, function(ret, err) {
        if (ret) {
            //  alert( JSON.stringify( ret ) );
            if (ret.value.close) {
                api.closeFrame({
                    name: 'pop'
                });
            }
        } else {
            //  alert( JSON.stringify( err ) );
        }
    });
    api.addEventListener({
        name: 'closePoptitleframe'
    }, function(ret, err) {
        if (ret) {
            //  alert( JSON.stringify( ret ) );
            if (ret.value.close) {
                api.closeFrame({
                    name: 'pop_title'
                });
            }
        } else {
            //  alert( JSON.stringify( err ) );
        }
    });
}

//跳转封装
//百宝箱
function fnOpenMoreFl() {
    api.openWin({
        name: 'good_fenlei_win',
        url: 'widget://html/win/good_fenlei_win.html',
        pageParam: {
            name: 'test'
        }
    });
}
//跳转APP板块(针对win页面)
function fnOpenFunction(winName, tagid, tagname) {
    // alert(winName);
    // alert(tagname);
    if (winName == "custom_win") { //判断是否是自定义页
        api.openWin({
            name: winName,
            url: 'widget://html/win/' + winName + '.html',
            reload: true,
            animation: {
                type: "fade", //动画类型（详见动画类型常量）
                subType: "from_top", //动画子类型（详见动画子类型常量）
                duration: 300 //动画过渡时间，默认300毫秒
            },
            pageParam: {
                tagid: tagid,
                tagname: tagname,
            }
        });
    } else if (empty($api.getStorage("userInfo"))) {
        api.openWin({
            name: 'user_login',
            url: 'widget://html/login/user_login.html',
        });
    } else {
        api.openWin({
            name: winName,
            url: 'widget://html/win/' + winName + '.html',
            reload: true,
            animation: {
                type: "fade", //动画类型（详见动画类型常量）
                subType: "from_top", //动画子类型（详见动画子类型常量）
                duration: 300 //动画过渡时间，默认300毫秒
            },
            pageParam: {
                tagid: tagid,
                tagname: tagname,
            }
        });
    }
}
//跳转官方商品板块
function open_Gf_bankuai(winName, tagid, tagname) {
    api.openWin({
        name: winName,
        url: 'widget://html/win/' + winName + '.html',
        reload: true,
        animation: {
            type: "fade", //动画类型（详见动画类型常量）
            subType: "from_top", //动画子类型（详见动画子类型常量）
            duration: 300 //动画过渡时间，默认300毫秒
        },
        pageParam: {
            tagid: tagid,
            tagname: tagname,
        }
    });
}
//我的工具跳转APP板块(针对win页面)
function fnOpenMyFunction(winName, winUrl) {
    if (empty($api.getStorage("userInfo"))) {
        api.openWin({
            name: 'user_login',
            url: 'widget://html/login/user_login.html',
        });
    } else {
        api.openWin({
            name: winName,
            url: winUrl + '.html',
            reload: true,
            animation: {
                type: "fade", //动画类型（详见动画类型常量）
                subType: "from_top", //动画子类型（详见动画子类型常量）
                duration: 300 //动画过渡时间，默认300毫秒
            }
        });
    }
}
//跳转自定义链接
function openWebUrl(url, adv_name) {
    api.openWin({
        name: 'jump_href_win',
        url: 'widget://html/win/jump_href_win.html',
        animation: {
            type: "fade", //动画类型（详见动画类型常量）
            subType: "from_top", //动画子类型（详见动画子类型常量）
            duration: 300 //动画过渡时间，默认300毫秒
        },
        pageParam: {
            url: url,
            name: adv_name
        },

    });
}

//跳转淘宝商品详情页
function openGoodDel(goods_id, section_id) {
    api.openWin({
        name: 'good_detail' + "" + goods_id,
        url: 'widget://html/goods/good_detail.html',
        bounces: false,
        animation: {
            type: "fade", //动画类型（详见动画类型常量）
            subType: "from_top", //动画子类型（详见动画子类型常量）
            duration: 300 //动画过渡时间，默认300毫秒
        },
        pageParam: {
            goods_id: goods_id,
            section_id: section_id
        }
    });
}
//跳转拼多多商品详情页
function openPddGoodDel(goods_id) {
    api.openWin({
        name: 'pdd_good_detail',
        url: 'widget://html/goods/pdd_good_detail.html',
        bounces: true,
        animation: {
            type: "fade", //动画类型（详见动画类型常量）
            subType: "from_top", //动画子类型（详见动画子类型常量）
            duration: 300 //动画过渡时间，默认300毫秒
        },
        pageParam: {
            goods_id: goods_id
        }
    });
}
//跳转京东页面
function openJdGoodDel(skuId) {
    api.openWin({
        name: 'jd_good_detail',
        url: 'widget://html/goods/jd_good_detail.html',
        bounces: true,
        animation: {
            type: "fade", //动画类型（详见动画类型常量）
            subType: "from_top", //动画子类型（详见动画子类型常量）
            duration: 300 //动画过渡时间，默认300毫秒
        },
        pageParam: {
            goods_id: skuId
        }
    });
}
//跳转淘宝分类
function openFenlei_type(class_id, class_name) {
    api.openWin({
        name: 'fenlei_type_win',
        url: 'widget://html/win/fenlei_type_win.html',
        animation: {
            type: "fade", //动画类型（详见动画类型常量）
            subType: "from_top", //动画子类型（详见动画子类型常量）
            duration: 300 //动画过渡时间，默认300毫秒
        },
        pageParam: {
            class_id: class_id,
            class_name: class_name
        }
    });
}
//跳转拼多多分类
function openPddFenlei_type(class_id, class_name) {
    api.openWin({
        name: 'pdd_fenlei_type_win',
        url: 'widget://html/win/pdd_fenlei_type_win.html',
        animation: {
            type: "fade", //动画类型（详见动画类型常量）
            subType: "from_top", //动画子类型（详见动画子类型常量）
            duration: 300 //动画过渡时间，默认300毫秒
        },
        pageParam: {
            class_id: class_id,
            class_name: class_name
        }
    });
}
//跳转官方板块
function openBankuaiFrame(activity_type, activity_name, is_status) {
    api.openWin({
        name: 'bankuai_win',
        url: 'widget://html/win/bankuai_win.html',
        animation: {
            type: "fade", //动画类型（详见动画类型常量）
            subType: "from_top", //动画子类型（详见动画子类型常量）
            duration: 300 //动画过渡时间，默认300毫秒
        },
        pageParam: {
            activity_type: activity_type,
            activity_name: activity_name
        }
    });
}
//跳转淘宝商品板块
function openSectionFrame(section_id, activity_name, is_status) {
    api.openWin({
        name: 'section_win',
        url: 'widget://html/win/section_win.html',
        reload: true,
        animation: {
            type: "fade", //动画类型（详见动画类型常量）
            subType: "from_top", //动画子类型（详见动画子类型常量）
            duration: 300 //动画过渡时间，默认300毫秒
        },
        pageParam: {
            section_id: section_id,
            activity_name: activity_name,
            is_status: is_status
        }
    });
}
//跳转拼多多商品板块
function openPddSectionFrame(section_id, activity_name, is_status) {
    api.openWin({
        name: 'pdd_section_win',
        url: 'widget://html/win/pdd_section_win.html',
        reload: true,
        animation: {
            type: "fade", //动画类型（详见动画类型常量）
            subType: "from_top", //动画子类型（详见动画子类型常量）
            duration: 300 //动画过渡时间，默认300毫秒
        },
        pageParam: {
            section_id: section_id,
            activity_name: activity_name,
            is_status: is_status
        }
    });
}
//加载显示提示框
function LoadingOne() {
    api.showProgress({
        style: 'default',
        animationType: 'fade',
        title: '数据加载中',
        text: '请稍后...',
        modal: false
    });
}

function LoadingTwo() {
    api.showProgress({
        style: 'default',
        animationType: 'fade',
        title: '数据加载中...',
        text: '',
        modal: false
    });
}
//服务器接口异常提示
function serviceErr() {
    api.toast({
        msg: '哎呦,服务器开个小差!',
        duration: 2000,
        location: 'middle'
    });
}
// 商品异常提示弹窗
function fnOpenTishi(state) {
    var dialogBox = api.require('dialogBox');
    dialogBox.raffle({
        texts: {
            title: '温馨提示',
            mainText: '该商品未参与推广或已下架',
            // subText: '这就中了，还有什么你做不到',
            leftTitle: '点击返回',
            // rightTitle: '告诉好友'
        },
        styles: {
            bg: '#fff',
            w: 300,
            corner: 8,
            title: {
                marginT: 20,
                size: 18,
                color: '#000'
            },
            icon: {
                marginT: 20,
                w: 40,
                h: 40,
                iconPath: 'widget://image/no_find.png'
            },
            main: {
                marginT: 20,
                color: '#636363',
                size: 16
            },
            sub: {
                marginT: 8,
                color: '#999999',
                size: 14
            },
            left: {
                marginB: 20,
                marginL: 65,
                w: 175,
                h: 35,
                corner: 5,
                bg: '#ED5748',
                color: '#FFF',
                size: 16
            },
        }
    }, function(ret, err) {
        if (ret) {
            var dialogBox = api.require('dialogBox');
            dialogBox.close({
                dialogName: 'alert'
            });
            if (state == 1) {
                api.closeWin();
            }
            // alert(JSON.stringify(ret));
        } else {
            alert(JSON.stringify(err));
        }
    });
}
//APP弹窗
function fnOpenPop_up(scene, type, user_id) {
    var timestamp = fntimestamp();
    var obj = {
        'scene': scene,
        'time': timeSS(timestamp),
        'type': type,
        'user_id': user_id
    };
    var objArr = sort_ASCII(obj);
    var version = '2.0';
    var arr = apiSecret + timestamp + version + '';
    for (i in objArr) {
        arr += objArr[i];
    }
    var sign = hex_md5(arr);
    api.ajax({
        url: commonUrl + 'soukeAppTttService/service/find/window_ac',
        method: 'post',
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
        data: {
            body: {
                'scene': scene,
                'time': timeSS(timestamp),
                'type': type,
                'user_id': user_id,
                'apiKey': apiKey,
                'timestamp': timestamp,
                'sign': sign,
            }
        }
    }, function(ret, err) {
        if (ret) {
            // console.log("弹框："+JSON.stringify( ret ) );
            if (ret.result_code == 200) {
                var H_height = api.winHeight / 2;
                var B_margin = H_height / 2;
                var dialogBox = api.require('dialogBox');
                var popPath = 'fs://pop_up.png';
                var pop_link = ret.result_data.link;
                var pop_title = ret.result_data.title;
                api.download({
                    url: ret.result_data.img,
                    savePath: popPath,
                }, function(ret, err) {
                    if (ret.state == 1) {
                        dialogBox.discount({
                            rect: {
                                w: api.winWidth / 1.5,
                                h: "auto"
                            },
                            styles: {
                                // bg: '#FFF',
                                image: {
                                    path: popPath,
                                    marginB: B_margin
                                },
                                cancel: {
                                    icon: 'widget://image/home/home_update_btn_close.png',
                                    w: 35,
                                    h: 35
                                }
                            }
                        }, function(ret) {
                            // alert(JSON.stringify(ret));
                            if (ret.eventType == 'cancel') {
                                closePop_up(scene, type, user_id, popPath);
                            } else if (ret.eventType == 'image') {
                                removeImg_pop(popPath);
                                dialogBox.close({
                                    dialogName: 'discount'
                                });
                                api.openWin({
                                    name: 'pop_link_win',
                                    url: './pop_link_win.html',
                                    animation: {
                                        type: "fade", //动画类型（详见动画类型常量）
                                        subType: "from_top", //动画子类型（详见动画子类型常量）
                                        duration: 300 //动画过渡时间，默认300毫秒
                                    },
                                    pageParam: {
                                        pop_link: pop_link,
                                        pop_title: pop_title,
                                    }
                                });

                            }
                        });
                    } else {

                    }
                });
            } else if (ret.result_code == 500) {}
        } else {
            // alert( JSON.stringify( err ) );
        }
    });
}

function removeImg_pop(savePath) {
    var fs = api.require('fs');
    fs.remove({
        path: savePath
    }, function(ret, err) {
        if (ret.status) {
            // alert(JSON.stringify(ret));
            // alert("删除成功");
        } else {
            // alert(JSON.stringify(err));
        }
    });
}

function closePop_up(scene, type, user_id, popPath) {
    var dialogBox = api.require('dialogBox');
    var timestamp = fntimestamp();
    var obj = {
        'scene': scene,
        'time': timeSS(timestamp),
        'type': type,
        'user_id': user_id
    };
    var objArr = sort_ASCII(obj);
    var version = '2.0';
    var arr = apiSecret + timestamp + version + '';
    for (i in objArr) {
        arr += objArr[i];
    }
    var sign = hex_md5(arr);
    api.ajax({
        url: commonUrl + 'soukeAppTttService/service/save/windowRecord_ac',
        method: 'post',
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
        data: {
            body: {
                'scene': scene,
                'time': timeSS(timestamp),
                'type': type,
                'user_id': user_id,
                'apiKey': apiKey,
                'timestamp': timestamp,
                'sign': sign,
            }
        }
    }, function(ret, err) {
        if (ret) {
            // console.log("弹框guanbi："+JSON.stringify( ret ) );
            if (ret.result_code == 200) {
                removeImg_pop(popPath);
                dialogBox.close({
                    dialogName: 'discount'
                });
            } else if (ret.result_code == 500) {
                removeImg_pop(popPath);
                dialogBox.close({
                    dialogName: 'discount'
                });
            }
        } else {
            // alert( JSON.stringify( err ) );
        }
    });
}
/**
 * 时间格式方法
 *
 * @param {any} timeStamp  时间戳，秒级/毫秒级
 * @param {any} type 格式化时间类型，默认  Y-M-D H:I:S
 * @returns {string} formatTime 格式化后的时间 例如： 2017-05-05 12:09:22
 */
function formatDate(timeStamp) {
    var type = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'Y-M-D H:I:S';
    var auto = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
    var time = (timeStamp + '').length === 10 ? new Date(parseInt(timeStamp) * 1000) : new Date(parseInt(timeStamp));

    var _year = time.getFullYear();

    var _month = time.getMonth() + 1 < 10 ? '0' + (time.getMonth() + 1) : time.getMonth() + 1;

    var _date = time.getDate() < 10 ? '0' + time.getDate() : time.getDate();

    var _hours = time.getHours() < 10 ? '0' + time.getHours() : time.getHours();

    var _minutes = time.getMinutes() < 10 ? '0' + time.getMinutes() : time.getMinutes();

    var _secconds = time.getSeconds() < 10 ? '0' + time.getSeconds() : time.getSeconds();

    var formatTime = '';
    var distinctTime = new Date().getTime() - time.getTime();

    if (auto) {
        if (distinctTime <= 1 * 60 * 1000) {
            // console.log('一分钟以内，以秒数计算');
            var _s = Math.floor(distinctTime / 1000 % 60);

            formatTime = _s + '刚刚';
        } else if (distinctTime <= 1 * 3600 * 1000) {
            // console.log('一小时以内,以分钟计算');
            var _m = Math.floor(distinctTime / (60 * 1000) % 60);

            formatTime = _m + '分钟前';
        } else if (distinctTime <= 24 * 3600 * 1000) {
            // console.log('一天以内，以小时计算');
            var _h = Math.floor(distinctTime / (60 * 60 * 1000) % 24);

            formatTime = _h + '小时前';
        } else if (distinctTime <= 2 * 24 * 3600 * 1000) {
            var _d = Math.floor(distinctTime / (24 * 60 * 60 * 1000) % 2);

            formatTime = '昨天 ' + _hours + ':' + _minutes; // console.log('30天以内,以天数计算');
        } else {
            // 30天以外只显示年月日
            // formatTime = _year + '-' + _month + '-' + _date;
            formatTime = _month + '-' + _date + ' ' + _hours + ':' + _minutes;
        }
    } else {
        switch (type) {
            case 'Y-M-D H:I:S':
                formatTime = _year + '-' + _month + '-' + _date + ' ' + _hours + ':' + _minutes + ':' + _secconds;
                break;

            case 'Y-M-D H:I:S zh':
                formatTime = _year + '年' + _month + '月' + _date + '日  ' + _hours + ':' + _minutes + ':' + _secconds;
                break;

            case 'Y-M-D H:I':
                formatTime = _year + '-' + _month + '-' + _date + ' ' + _hours + ':' + _minutes;
                break;

            case 'Y-M-D H':
                formatTime = _year + '-' + _month + '-' + _date + ' ' + _hours;
                break;

            case 'Y-M-D':
                formatTime = _year + '-' + _month + '-' + _date;
                break;

            case 'Y-M-D zh':
                formatTime = _year + '年' + _month + '月' + _date + '日';
                break;

            case 'Y-M':
                formatTime = _year + '-' + _month;
                break;

            case 'Y':
                formatTime = _year;
                break;

            case 'M':
                formatTime = _month;
                break;

            case 'D':
                formatTime = _date;
                break;

            case 'H':
                formatTime = _hours;
                break;

            case 'I':
                formatTime = _minutes;
                break;

            case 'S':
                formatTime = _secconds;
                break;

            default:
                formatTime = _year + '-' + _month + '-' + _date + ' ' + _hours + ':' + _minutes + ':' + _secconds;
                break;
        }
    } // 返回格式化的日期字符串
    return formatTime;
}
//处理减法精确度缺失问题
function numSub(num1, num2) {
    var baseNum, baseNum1, baseNum2;
    var precision; // 精度
    try {
        baseNum1 = num1.toString().split(".")[1].length;
    } catch (e) {
        baseNum1 = 0;
    }
    try {
        baseNum2 = num2.toString().split(".")[1].length;
    } catch (e) {
        baseNum2 = 0;
    }
    baseNum = Math.pow(10, Math.max(baseNum1, baseNum2));
    precision = (baseNum1 >= baseNum2) ? baseNum1 : baseNum2;
    return ((num1 * baseNum - num2 * baseNum) / baseNum).toFixed(precision);
};
// 销量按万显示
function changeVolumn(num) {
    if (num <= 9999) {} else {
        num = Math.round((num / 10000) * 100) / 100 + "万";
    }
    return num;
}

// Math.floor(15.7784514000 * 100) / 100;  // 输出结果为 15.77     不四舍五入保留2位小数（若第二位小数为0，则保留一位小数）

//懒加载图片方法  数据列表中图片应该遵循这个格式。
// <img src="../image/moren.png"  data-original="{{=it.author.imgpath}}" class="lazyimg">
// src放未加载的图片
// data-original放数据图片
// class中加入lazyimg
function lazyload() {
    setTimeout(function() {
        $('.lazyimg').each(function() {
            var $self = $(this);
            if ($self.is('img')) {
                if ($self.attr('data-original')) {
                    $self.attr('src', $self.attr('data-original'));
                    $self.removeAttr('data-original');
                }
            }
        });
    }, 500);
}
// 查询淘口令符号
function getsymbol() {
    var obj = {}
    var objArr = sort_ASCII(obj);
    var timestamp = fntimestamp();
    var version = '2.0';
    var arr = apiSecret + timestamp + version + '';
    for (i in objArr) {
        arr += objArr[i];
    }
    // console.log(arr);
    var sign = hex_md5(arr);
    api.ajax({
        url: commonUrl + 'soukeAppTttService/service/app/getSymbol',
        method: 'post',
        asyn: false,
        headers: {
            'Content-Type': 'application/json'
        },
        data: {
            body: {
                'apiKey': apiKey,
                'timestamp': timestamp,
                'sign': sign
            }
        }
    }, function(ret, err) {
        // alert("查询淘口令符号：" + JSON.stringify(ret));
        // console.log("查询淘口令符号：" + JSON.stringify(ret));
        if (ret) {
            if (ret.result_code == 200) {
                var data = ret.result_data;
                $api.setStorage('tpw_data', data);
            } else {

            }
        } else {
            serviceErr();
        }
    });
}
