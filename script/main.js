apiready = function() {
    new Vue({
        el: '#main_body',
        data: {
            list: [], //首页数据数组
            isOver: "false", //默认没有取完数据
            pageNum: 1,
            statu: "",
            banner_arr: [], //存储轮播图
            banner_bgcol1: [], //轮播图背景颜色1
            banner_bgcol2: [], //轮播图背景颜色2
            extend_arr: [], //存储轮播图点击事件
            plateid_arr: "", //存储轮播图plateid；
            hot_plateid: "",
            plateid: "", //商品板块id；
            min_level_name: "", //最小等级名称
            min_share_rebate: "", //最小等级分享比率
            level_name: "", //当前等级名称
            max_shop_rebate: "", //最高等级购物比率
            min_shop_rebate: "", //最小等级购物比率
            max_level_name: "", //最高等级名称
            dis_level_id: "", //当前等级ID
            shop_rebate: "", //当前购物比率
            max_share_rebate: "", //最高等级分享比率
            share_rebate: "", //当前分享比率
            my_share_rebate: "", //板块分享比率
            my_shop_rebate: "", //板块购物比率
            user_id: "",
            data_length: "",
            goods_list: [],
            hot_list: [],
            new_list: [],
            show_type: 1,
            lunbo_flag: 0,
            banner_hight: 144
        },
        ready: function() {
            var self = this;

            $(".Placeholder").css("width", document.body.clientWidth);
            $(".Placeholder").css("height", document.body.clientHeight);
            self.banner_hight = api.winWidth * 0.4;
            // 返回顶部
            $(window).scroll(function() {
                if ($(window).scrollTop() >= 1000) {
                    $('.actGotop').fadeIn("fast");
                } else {
                    $('.actGotop').fadeOut(300);
                }
            });
            $('.actGotop').click(function() {
                $('html,body').animate({
                    scrollTop: '0px'
                }, 300);
            });

            //百川初始化
            var alibaichuan = api.require('mAliBaiChuan');
            alibaichuan.initTae(function(ret, err) {
                if (ret) {
                    // alert("ret:" + JSON.stringify(ret));
                } else {
                    // alert("err:" + JSON.stringify(err));
                }
            });

            // 商品列表数据
            // 监听事件apiReady滚动到底部，加载更多功能
            api.addEventListener({
                name: 'scrolltobottom',
                extra: {
                    threshold: 120 //设置距离底部多少距离时触发，默认值为0，数字类型
                }
            }, function(ret, err) {

                self.loadMyFa_goods(self.plateid, false);
            });

            //判断是否登陆
            if (!empty($api.getStorage("userInfo"))) {
                user_id = $api.getStorage("userInfo").user_id;
                fnOpenPop_up(0, 1, user_id);
            } else {
                user_id = '';
                $(".yh_bottom").hide();
            }

            //给商品状态
            self.statu = $api.byId('statu');

            //下拉刷新
            self.loadFresh();

            //加载列表
            self.getList();

        },
        methods: {
            //下拉刷新
            loadFresh: function() {
                RefreshLoad();
            },

            //首页数据
            getList: function() {
                var self = this;
                var obj = {};
                var objArr = sort_ASCII(obj);
                var timestamp = fntimestamp();
                var version = '2.0';
                var arr = apiSecret + timestamp + version + '';
                for (i in objArr) {
                    arr += objArr[i];
                }
                var sign = hex_md5(arr);
                api.ajax({
                    url: commonUrl + 'soukeAppTttService/service/newapp/homepagebody',
                    method: 'post',
                    headers: {
                        'Content-Type': 'application/json;charset=utf-8'
                    },
                    data: {
                        body: {
                            apiKey: apiKey,
                            timestamp: timestamp,
                            sign: sign,
                        }
                    }
                }, function(ret, err) {
                    // console.log("首页信息：" + JSON.stringify(ret));
                    if (ret) {
                        if (ret.result_code == 200) {
                            $(".noWlan").hide();
                            var bg = ret.result.bg;
                            var bgcol1 = ret.result.bgcol1;
                            var bgcol2 = ret.result.bgcol2;
                            var bgpic = ret.result.bgpic;
                            self.list = ret.result.view;
                            self.lunbo_flag = ret.result.lunbo_bg;
                            for (var i = 0; i < ret.result.view.length; i++) {
                                //焦点图
                                if (ret.result.view[i].type == "banner") {
                                    for (var b = 0; b < ret.result.view[i].data.length; b++) {
                                        plateid_arr = {
                                            'platename': ret.result.view[i].data[b].platename,
                                            'plateid': ret.result.view[i].data[b].plateid,
                                            'platetype': ret.result.view[i].data[b].platetype,
                                            'platetag': ret.result.view[i].data[b].platetag,
                                            'tagid': ret.result.view[i].data[b].tagid,
                                            'tagname': ret.result.view[i].data[b].tagname
                                        }
                                        self.banner_arr.push(ret.result.view[i].data[b].img);
                                        self.banner_bgcol1.push(ret.result.view[i].data[b].bgcol1);
                                        self.banner_bgcol2.push(ret.result.view[i].data[b].bgcol2);
                                        self.extend_arr.push(plateid_arr);
                                    }
                                    self.$nextTick(function() {
                                        if (bg == 1) {
                                            if (self.lunbo_flag == 0) {
                                                //无轮播颜色
                                                $("body").css({
                                                    "background": "url(" + bgpic + ") no-repeat",
                                                    "background-size": "100%",
                                                    "z-index": 9999
                                                });
                                            } else {
                                                //有轮播颜色
                                                api.sendEvent({
                                                    name: 'bgColor',
                                                    extra: {
                                                        key1: self.banner_bgcol1[0],
                                                        key2: self.banner_bgcol2[0]
                                                    }
                                                });
                                                $("#focus").css({
                                                    "background": "url(" + bgpic + ")   left top no-repeat,linear-gradient(to right,rgb(" + self.banner_bgcol1[0] + "),rgb(" + self.banner_bgcol2[0] + "))",
                                                    "background-size": "100%",
                                                    "z-index": 9999
                                                });
                                                var mySlider_w = $("#focus").offset().top;
                                                var UIScrollPicture = api.require('UIScrollPicture');
                                                UIScrollPicture.addEventListener({
                                                    name: 'scroll'
                                                }, function(ret, err) {
                                                    if (ret) {
                                                        var index = ret.index;
                                                        var bg1 = self.banner_bgcol1[index];
                                                        var bg2 = self.banner_bgcol2[index];
                                                        if ($(window).scrollTop() >= 100) {} else {
                                                            api.sendEvent({
                                                                name: 'bgColor',
                                                                extra: {
                                                                    key1: bg1,
                                                                    key2: bg2
                                                                }
                                                            });
                                                        }

                                                        // $("#focus").css({
                                                        //     "background": "linear-gradient(rgb(" + bg1 + "),rgb(" + bg2 + "))",
                                                        //     "background-size": "100% 100%",
                                                        //     "z-index":9
                                                        //
                                                        // });
                                                        $("#focus").css({
                                                            "background": "url(" + bgpic + ")   left top no-repeat,linear-gradient(to right,rgb(" + bg1 + "),rgb(" + bg2 + "))",
                                                            "background-size": "100%",
                                                            "z-index": 9999
                                                        });
                                                        // $(".bgll").css({
                                                        //     "background": "rgb(" + bg1 + ")",
                                                        //     "background-size": "100%",
                                                        //     "z-index": 9999
                                                        // });
                                                        // alert("背景颜色左："+bg1+"背景颜色右："+bg2)
                                                        // alert(JSON.stringify(ret));
                                                    } else {
                                                        alert(JSON.stringify(err));
                                                    }
                                                });
                                            }
                                        } else if (bg == 0) {
                                            if (self.lunbo_flag == 0) {
                                                $(".bgll").css({
                                                    "background": "linear-gradient(to right,rgb(" + bgcol1 + "),rgb(" + bgcol2 + "))",
                                                    "background-size": "100% 100%"
                                                });
                                            } else {
                                                //有轮播颜色
                                                api.sendEvent({
                                                    name: 'bgColor',
                                                    extra: {
                                                        key1: self.banner_bgcol1[0],
                                                        key2: self.banner_bgcol2[0]
                                                    }
                                                });
                                                $("#focus").css({
                                                    "background": "linear-gradient(to right,rgb(" + self.banner_bgcol1[0] + "),rgb(" + self.banner_bgcol2[0] + "))",
                                                    "background-size": "100%",
                                                    "z-index": 9999
                                                });
                                                var mySlider_w = $("#focus").offset().top;
                                                var UIScrollPicture = api.require('UIScrollPicture');
                                                UIScrollPicture.addEventListener({
                                                    name: 'scroll'
                                                }, function(ret, err) {
                                                    if (ret) {
                                                        var index = ret.index;
                                                        var bg1 = self.banner_bgcol1[index];
                                                        var bg2 = self.banner_bgcol2[index];
                                                        if ($(window).scrollTop() >= 100) {} else {
                                                            api.sendEvent({
                                                                name: 'bgColor',
                                                                extra: {
                                                                    key1: bg1,
                                                                    key2: bg2
                                                                }
                                                            });
                                                        }
                                                        $("#focus").css({
                                                            "background": "linear-gradient(to right,rgb(" + bg1 + "),rgb(" + bg2 + "))",
                                                            "background-size": "100%",
                                                            "z-index": 9999
                                                        });

                                                    } else {
                                                        alert(JSON.stringify(err));
                                                    }
                                                });
                                                $(".bgll").css({
                                                    "background": "linear-gradient(to right,rgb(" + bgcol1 + "),rgb(" + bgcol2 + "))",
                                                    "background-size": "100% 100%"
                                                });
                                            }
                                        }
                                        if ($("#focus").length > 0) {
                                            var mySlider_w = $("#focus").offset().top;
                                            var UIScrollPicture = api.require('UIScrollPicture');
                                            UIScrollPicture.open({
                                                rect: {
                                                    x: 0,
                                                    y: mySlider_w,
                                                    w: api.winWidth,
                                                    h: api.winWidth * 0.4,

                                                },
                                                data: {
                                                    paths: self.banner_arr,
                                                },
                                                styles: {
                                                    indicator: {
                                                        dot: {
                                                            w: 8,
                                                            h: 8,
                                                            r: 4,
                                                            margin: 10
                                                        },
                                                        align: 'center',
                                                        color: 'rgba(255, 255, 255, 0.5)',
                                                        activeColor: '#FFFFFF'
                                                    }
                                                },
                                                // placeholderImg: 'widget://image/lunbotu.jpg', //网络未加载完时的占位图
                                                contentMode: 'ScaleAspectFill',
                                                cornerRadius:8,
                                                scrollerCorner:12,
                                                touchWait: true, //触摸后停止自动播放
                                                interval: 3, //图片轮换时间间隔，单位是秒（s）
                                                fixedOn: 'home_frame0', //模块视图添加到指定 frame 的名字
                                                loop: true, //是否循环播放
                                                fixed: false //模块是否随所属 window 或 frame 滚动
                                            }, function(ret, err) {
                                                if (ret) {
                                                    // alert(ret.index);
                                                    for (var n = 0; n < self.extend_arr.length; n++) {

                                                        if (ret.eventType == "click" && ret.index == n) {

                                                            //                                                          window.location.href=extend_arr[n];
                                                            if (self.extend_arr[n].platetype == 1) { //计算佣金时  true来判断此商品模块计算佣金的时候plateid是否为-1.

                                                                openSectionFrame(self.extend_arr[n].plateid, self.extend_arr[n].platename, true);
                                                            } else if (self.extend_arr[n].platetype == 2) {
                                                                fnOpenFunction(self.extend_arr[n].platetag, self.extend_arr[n].tagid, self.extend_arr[n].tagname);
                                                            } else if (self.extend_arr[n].platetype == 3) { //商品详情
                                                                openGoodDel(self.extend_arr[n].plateid, -1);
                                                            } else if (self.extend_arr[n].platetype == 5) {
                                                                open_Gf_bankuai(self.extend_arr[n].plateid, 0, self.extend_arr[n].platename);
                                                            } else if (self.extend_arr[n].platetype == 4) {
                                                                //window.location.href = self.extend_arr[n].plateid;
                                                                api.openWin({
                                                                    name: 'jump_href_win',
                                                                    url: 'jump_href_win.html',
                                                                    pageParam: {
                                                                        url: self.extend_arr[n].plateid,
                                                                        name: self.extend_arr[n].platename,
                                                                    },

                                                                });
                                                            } else if (self.extend_arr[n].platetype == 6) {
                                                                openFenlei_type(self.extend_arr[n].plateid, self.extend_arr[n].platename);
                                                            } else if (self.extend_arr[n].platetype == 7) {
                                                                openPddSectionFrame(self.extend_arr[n].plateid, self.extend_arr[n].platename, true);
                                                            } else if (self.extend_arr[n].platetype == 8) {
                                                                openPddFenlei_type(self.extend_arr[n].plateid, self.extend_arr[n].platename, true);
                                                            } else if (self.extend_arr[n].platetype == 9) {
                                                                openPddGoodDel(self.extend_arr[n].plateid, self.extend_arr[n].platename, true);
                                                            }
                                                        }
                                                    }
                                                } else {}
                                            });
                                        }
                                    })
                                }

                                //滚动条swiper
                                if (ret.result.view[i].type == "scroll") {
                                    self.$nextTick(function() {
                                        var swiper = new Swiper('.scroll', {
                                            direction: 'vertical',
                                            slidesPerView: 1,
                                            spaceBetween: 30,
                                            mousewheel: true,
                                            autoplay: {
                                                delay: 2500,
                                                disableOnInteraction: false,
                                            },
                                        });
                                    })
                                }

                                //热销
                                if (ret.result.view[i].type == "hot") {
                                    for (var h = 0; h < ret.result.view[i].data.length; h++) {
                                        self.hot_plateid = ret.result.view[i].data[h].plateid;
                                    }
                                    self.$nextTick(function() {
                                        // var swiper = new Swiper('.hot_s', {
                                        //     direction: 'horizontal',
                                        //     slidesPerView: 3,
                                        //     autoplay: false,
                                        //     // loop:true,
                                        //     observer: true,
                                        //     observeParents:true,
                                        //     // on: {
                                        //     //    touchStart: function(event){api.setFrameGroupAttr({name:'home_frame0',scrollEnabled:false});},
                                        //     //    touchEnd: function(event){api.setFrameGroupAttr({name:'home_frame0',scrollEnabled:false});},
                                        //     //    touchMoveOpposite: function(event){api.setFrameGroupAttr({name:'home_frame0',scrollEnabled:false});},
                                        //     //    sliderMove:function(event){api.setFrameGroupAttr({name:'home_frame0',scrollEnabled:false});},
                                        //     //  }
                                        // });
                                    })

                                    self.loadMyFa_hot(self.hot_plateid, false)
                                }

                                //商品
                                if (ret.result.view[i].type == "goods") {
                                    for (var g = 0; g < ret.result.view[i].data.length; g++) {
                                        // if (ret.result.view[i].data[g].platetype == 2) {
                                        //     plateid = ret.result.view[i].data[g].plateid;
                                        // } else {
                                        //     plateid = -1;
                                        // }
                                        plateid = ret.result.view[i].data[g].plateid;
                                        self.plateid = plateid;
                                        self.jisuan(plateid, user_id)
                                    }
                                }
                            }
                        }
                    } else {
                        $(".noWlan").show();
                    }
                })
            },
            //算佣金
            jisuan: function(plateid, user_id) {
                var self = this;
                //判断是否登陆
                if (!empty($api.getStorage("userInfo"))) {
                    user_id = $api.getStorage("userInfo").user_id;
                } else {
                    user_id = '';
                }
                // if (user_id == "" || user_id == undefined) {
                //     api.openWin({
                //         name: 'user_login',
                //         url: 'widget://html/login/user_login.html',
                //     });
                // }
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
                    api.hideProgress();
                    if (ret) {
                        if (ret.result_code == 200) {
                            self.loadMyFa_goods(plateid, true);
                            // console.log("计算信息"+JSON.stringify(ret));
                            var sectionList = ret.result_data.sectionList
                            for (var i = 0; i < sectionList.length; i++) {
                                if (plateid == sectionList[i].section_id) {
                                    // self.share_rebate1 = sectionList[i].share_rebate;
                                    // self.share_rebate2 = ret.result_data.dislevel.share_rebate;
                                    self.min_share_rebate = ret.result_data.dislevel.min_share_rebate; //最小等级分享比率
                                    self.share_rebate = ret.result_data.dislevel.share_rebate; //当前分享比率
                                    self.my_share_rebate = sectionList[i].share_rebate; //板块分享比率
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

            },
            //热销数据
            loadMyFa_hot: function(plateid, isPull) {
                var self = this;
                // Math.ceil(n); 返回大于等于n的最小整数。
                var randomNum4 = Math.ceil(Math.random() * 10); // 主要获取1到10的随机整数，取0的几率极小。
                // console.log(randomNum4);
                // alert(randomNum4);
                // if (!isPull && self.isOver) {
                //     return;
                // }
                //判断如果是下拉刷新，
                if (isPull) {
                    self.pageNum = randomNum4;
                    self.isOver = "false";
                }

                //热销产品
                var obj = {
                    'user_id': self.user_id,
                    'size': 10,
                    'device_id': '',
                    'page': self.pageNum,
                    'section_id': plateid,
                    'class_id': 0,


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
                    url: commonUrl + 'soukeAppTttService/service/class/item_ac',
                    method: 'post',
                    headers: {
                        'Content-Type': 'application/json;charset=utf-8'
                    },
                    data: {
                        body: {
                            'apiKey': apiKey,
                            'timestamp': timestamp,
                            'sign': sign,
                            'user_id': self.user_id,
                            'size': 10,
                            'device_id': '',
                            'page': self.pageNum,
                            'section_id': plateid,
                            'class_id': 0,
                        }
                    }
                }, function(ret, err) {
                    // console.log("商品信息111："+JSON.stringify(ret));
                    if (ret) {
                        if (ret.result_code == 200) {
                            if (ret.result_data != "") {

                                self.hot_list = ret.result_data.items;

                            }
                            //  console.log("商品信息qqqqqqq："+JSON.stringify(ret.result_data.items));
                            else {
                                // fnShowData(data, isPull);
                                api.toast({
                                    msg: ret.result_message,
                                    duration: 2000,
                                    location: 'middle'
                                });

                            }
                        }
                    } else {
                        // api.alert({ msg: JSON.stringify(err) });
                        // alert(1)
                    }
                });

            },

            //商品数据
            loadMyFa_goods: function(plateid, isPull) {
                var self = this;
                // Math.ceil(n); 返回大于等于n的最小整数。
                var randomNum4 = Math.ceil(Math.random() * 10); // 主要获取1到10的随机整数，取0的几率极小。
                // console.log(randomNum4);
                // alert(randomNum4);
                // alert(self.pageNum)
                // if (!isPull && self.isOver) {
                //     return;
                // }
                //判断如果是下拉刷新，
                if (isPull) {
                    self.pageNum = randomNum4;
                    self.isOver = "false";
                } else {
                    self.pageNum++
                }

                //列表样式
                var object = {
                    'section_id': plateid
                };

                var objArr = sort_ASCII(object);
                var timestamp = fntimestamp();
                var version = '2.0';
                var arr = apiSecret + timestamp + version + '';
                for (i in objArr) {
                    arr += objArr[i];
                }
                // console.log(arr);
                var sign = hex_md5(arr);
                api.ajax({
                    url: commonUrl + 'soukeAppTttService/service/section/class_ac ',
                    method: 'post',
                    headers: {
                        'Content-Type': 'application/json;charset=utf-8'
                    },
                    data: {
                        body: {
                            'apiKey': apiKey,
                            'timestamp': timestamp,
                            'sign': sign,
                            'section_id': plateid
                        }
                    }
                }, function(ret, err) {
                    if (ret) {
                        if (ret.result_code == 200) {
                            // console.log("样式信息------："+JSON.stringify(ret));
                            if (ret.result_class.show_type == 1) {
                                self.show_type = 1;
                            } else if (ret.result_class.show_type == 2) {
                                self.show_type = 2;
                            } else if (ret.result_class.show_type == 3) {
                                self.show_type = 3;
                            } else {
                                self.show_type = 4;
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
                //商品板块产品
                var obj = {
                    'user_id': self.user_id,
                    'size': 10,
                    'device_id': '',
                    'page': self.pageNum,
                    'section_id': plateid,
                    'class_id': 0,
                    'find_type': 'volume',
                    'sort_order': 'DESC'

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
                    url: commonUrl + 'soukeAppTttService/service/class/item_ac',
                    method: 'post',
                    headers: {
                        'Content-Type': 'application/json;charset=utf-8'
                    },
                    data: {
                        body: {
                            'apiKey': apiKey,
                            'timestamp': timestamp,
                            'sign': sign,
                            'user_id': self.user_id,
                            'size': 10,
                            'device_id': '',
                            'page': self.pageNum,
                            'section_id': plateid,
                            'class_id': 0,
                            'find_type': 'volume',
                            'sort_order': 'DESC'
                        }
                    }
                }, function(ret, err) {
                    // console.log("商品信息222：" + JSON.stringify(ret.result_data.items));
                    if (ret) {
                        if (ret.result_code == 200) {
                            if (ret.result_data != "") {
                                self.goods_list = ret.result_data.items;
                                for (var i = 0; i < ret.result_data.items.length; i++) {
                                    var tkfee = ""
                                    if (user_id == "") {
                                        tkfee = (ret.result_data.items[i].tk_fee * self.my_share_rebate * self.min_share_rebate) / 10000;
                                        tkfee = Math.floor(tkfee * 100) / 100;
                                    } else {
                                        tkfee = (ret.result_data.items[i].tk_fee * self.my_share_rebate * self.share_rebate) / 10000;
                                        tkfee = Math.floor(tkfee * 100) / 100;
                                    }
                                    // var tkfee = (ret.result_data.items[i].tk_fee) / 10000;
                                    var data = {};
                                    data.tkfee = tkfee;
                                    //重组对象，把计算率加入
                                    self.new_list.push($.extend({}, ret.result_data.items[i], data));
                                    var datas = ret.result_data.items;
                                    var size = ret.result_data.size;
                                    if (datas != "") {
                                        $api.css(statu, 'display:block;');
                                        // self.pageNum++;
                                    } else {
                                        statu.innerHTML = "暂无数据";
                                    }
                                    if (datas.length < size && datas != "") {
                                        statu.innerHTML = "已经到底啦 ~ 别扯了";
                                        isOver = true;
                                    }
                                }
                                //  console.log("数据末尾添加佣金："+JSON.stringify(self.new_list));
                            } else {
                                // fnShowData(data, isPull);
                                api.toast({
                                    msg: ret.result_message,
                                    duration: 2000,
                                    location: 'middle'
                                });
                                // console.log("*****************")
                            }
                        }
                    } else {
                        // api.alert({ msg: JSON.stringify(err) });
                        // alert(1)
                    }
                });

            },

            //跳转
            goPage: function(platetype, plateid, platename, platetag, tagid, tagname, name) {
                if (platetype == 1) { //商品板块
                    openSectionFrame(plateid, platename, true);
                }
                if (platetype == 2) { //APP板块
                    fnOpenFunction(platetag, tagid, tagname);
                }
                if (platetype == 3) { //商品详情页
                    openGoodDel(plateid, -1)
                }
                if (platetype == 4) { //外链
                    //  window.location.href = plateid;
                    api.openWin({
                        name: 'jump_href_win',
                        url: 'jump_href_win.html',
                        pageParam: {
                            url: plateid,
                            name: name,
                        },

                    });
                }

                if (platetype == 5) { //官方板块
                    open_Gf_bankuai(plateid, platename, true);
                } else if (platetype == 6) { //淘宝分类
                    openFenlei_type(plateid, platename)
                } else if (platetype == 7) { //拼多多
                    openPddSectionFrame(plateid, platename, true)
                } else if (platetype == 8) { //拼多多分类
                    openPddFenlei_type(plateid, platename, true)
                }
                if (platetype == 9) { //拼多多商品
                    openPddGoodDel(plateid, platename, true)
                }

            },

            //跳转详情
            openGoodDel: function(goods_id, section_id) {
                openGoodDel(goods_id, section_id);
                $api.setStorage("list_url", "");
            },

            //到分享商品页面
            openShare: function(num_iid, user_id, url_type, item_title, tk_fee, section_id) {
                if (!empty($api.getStorage("userInfo"))) {
                    user_id = $api.getStorage("userInfo").user_id;
                    var goods_id = num_iid;
                    var user_id;
                    var url_type = 1;
                    var tk_fee;
                    //阿里百川授权登陆
                    var alibaichuan = api.require('mAliBaiChuan');
                    alibaichuan.showLogin(function(ret, err) {
                        if (ret) {
                            // alert("登录success:" + JSON.stringify(ret));
                            if (ret.isLogin == "true") {
                                api.openWin({
                                    name: 'creat_share_win',
                                    url: 'widget://html/win/creat_share_win.html',
                                    pageParam: {
                                        goods_id: goods_id,
                                        section_id: section_id,
                                        user_id: user_id,
                                        url_type: 1,
                                        item_title: item_title,
                                        tk_fee: tk_fee
                                    }
                                });
                            }
                        } else {
                            // alert("登录error:" + JSON.stringify(err));
                        }
                    });
                } else {
                    api.toast({
                        msg: '请先登录',
                        duration: 1000,
                        location: 'middle'
                    });
                    if ($api.getStorage("control_version") == $api.getStorage("now_version")) {
                        if ($api.getStorage("login") == 0) {
                            api.openWin({
                                name: 'user_login',
                                url: 'widget://html/login/user_login.html',
                                delay: 1000,
                            });
                        } else {
                            api.openWin({
                                name: 'login',
                                url: 'widget://html/login/user_login.html',
                                delay: 1000,
                            });
                        }
                    } else {
                        api.openWin({
                            name: 'login',
                            url: 'widget://html/login/user_login.html',
                            delay: 1000,
                        });
                    }
                }
            }

        }
    })
}
