apiready = function() {
    new Vue({
        el: '#faquan_mrbf',
        data: {
            list: [],
            isOver: "false", //默认没有取完数据
            pageNum: 1,
            statu: "",
            new_list: [],
            share_rebate1: "",
            share_rebate2: "", //计算佣金比率
            isIos: "",
            goods_codeImg: "",
            shar_img_arr: [],
            share_bdimg_arr: [],
            num: 0,
            itemid: "",
            index: ""
        },
        ready: function() {
            var self = this;
            // 返回顶部
            $(window).scroll(function() {
                if ($(window).scrollTop() >= 500) {
                    $('.actGotop').fadeIn("fast");
                } else {
                    $('.actGotop').fadeOut(300);
                }
            });
            //判断是否登陆
            if (!empty($api.getStorage("userInfo"))) {
                user_id = $api.getStorage("userInfo").user_id;
            } else {
                user_id = '';
            }
            //计算佣金
            self.jisuan(-1, user_id);
            //监听淘口令
            getEvent();
            //下拉刷新
            self.loadFresh();
            setTimeout(function() {
                self.loadMyFa(true);
            }, 100)

            self.statu = $api.byId('statu');
            $('.actGotop').click(function() {
                $('html,body').animate({
                    scrollTop: '0px'
                }, 300);
            });

            //判断是否滑动到底部
            api.addEventListener({
                name: 'scrolltobottom',
                extra: {
                    threshold: 10 //设置距离底部多少距离时触发，默认值为0，数字类型
                }
            }, function(ret, err) {
                self.loadMyFa(false);
            });

            //判断手机类型
            if (api.systemType == "ios") {
                self.isIos = 1;
            } else if (api.systemType == "android") {
                self.isIos = 0;
            }
        },
        methods: {
            //下拉刷新
            loadFresh: function() {
                RefreshLoad();
            },

            //加载数据
            loadMyFa: function(isPull) {
                var self = this;
                api.showProgress({
                    style: 'default',
                    animationType: 'fade',
                    title: '数据加载中',
                    text: '',
                    modal: true
                });
                if (isPull) {
                    self.pageNum = 1;
                    self.isOver = "false";
                } else {
                    self.pageNum++
                }
                var cat = "";
                var subcat = "";
                if (api.pageParam.cat != null) {
                    cat = api.pageParam.cat;
                } else {
                    cat = 1;
                }
                if (api.pageParam.subcat != null) {
                    subcat = api.pageParam.subcat;
                } else {
                    subcat = "";
                }
                var obj = {
                    'cat': cat,
                    'subcat': subcat,
                    'order_t': 2,
                    'page': self.pageNum
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
                    url: commonUrl + 'soukeAppTttService/service/newapp/circleFriend',
                    method: 'post',
                    headers: {
                        'Content-Type': 'application/json;charset=utf-8'
                    },
                    data: {
                        body: {
                            'apiKey': apiKey,
                            'timestamp': timestamp,
                            'sign': sign,
                            'cat': cat,
                            'subcat': subcat,
                            'order_t': 2,
                            'page': self.pageNum
                        }
                    }
                }, function(ret, err) {
                    api.hideProgress();
                    if (ret) {
                        if (ret.result_code == 200) {
                            // console.log("每日必发：" + JSON.stringify(ret));
                            var data = ret.result_data.items;
                            if (data != "") {
                                $api.css(statu, 'display:block;');
                                // pageNum++;
                                // alert("bbbb:"+pageNum);
                            } else {
                                statu.innerHTML = "暂无数据";
                            }
                            if (data.length < 10 || data != "") {
                                statu.innerHTML = "已经到底啦 ~ 别扯了";
                                isOver = true;
                            }
                            self.getData(data, isPull);
                        } else {
                            //
                        }
                    } else {
                        //接口对接数据错误
                    }
                })
            },

            //数据重组
            getData: function(data, isPull) {
                var self = this;
                self.list = data;
                // alert(JSON.stringify(self.list))
                // console.log("数据重组"+JSON.stringify(self.list))
                for (var i = 0; i < data.length; i++) {
                    //文字表情转换
                    var emoPath, transMsg;
                    var reg = /\[(.*?)\]/gm;
                    data[i].contexts = data[i].context.replace(reg, function(match) {
                        for (var i = 0, len = emoData.length; i < len; i++) {
                            if (emoData[i].text === match) {
                                emoPath = '../../image/face/' + (emoData[i].name - 1) + '.png';
                                // alert(emoPath);
                                return '<img width="20" height="20" src="' + emoPath + '" />'
                            }
                        }
                        return match;
                    });
                    var tkfee = "";
                    if (self.user_id != "" || self.user_id != undefined) {
                        // alert(self.user_id);
                        // alert(share_rebate1+"//"+share_rebate2)
                        data[i].tkfee = "";
                        if (api.pageParam.cat != null && api.pageParam.cat == 1) {
                            if (data[i].apic.length == 1) {
                                tkfee = (data[i].apic[0].tk_fee * self.share_rebate1 * self.share_rebate2) / 10000;
                                tkfee = tkfee.toFixed(2);
                                // alert(tkfee);
                                data[i].tkfee = tkfee;
                            } else {
                                data[i].tkfee = "";
                            }
                        }
                    }
                    var data_sj = {};
                    data_sj.create_times = formatDate(data[i].create_time, type = 'Y-M-D H:I:S', auto = true);
                    //重组对象，把日期加入
                    self.new_list.push($.extend({}, data[i], data_sj));
                    //console.log("每日必发新数组：" + JSON.stringify(self.new_list));
                    // var datass = data;
                    var size = data.size;
                    if (data != "") {
                        $api.css(statu, 'display:block;');
                        // self.pageNum++;
                    } else {
                        statu.innerHTML = "暂无数据";
                    }
                    if (data.length < size && data != "") {
                        statu.innerHTML = "已经到底啦 ~ 别扯了";
                        self.isOver = true;
                    }

                }

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
                if (user_id == "" || user_id == undefined) {
                    api.openWin({
                        name: 'user_login',
                        url: '../login/user_login.html',
                    });
                }
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
                            // console.log("计算信息"+JSON.stringify(ret));
                            var sectionList = ret.result_data.sectionList
                            for (var i = 0; i < sectionList.length; i++) {
                                if (plateid == sectionList[i].section_id) {
                                    self.share_rebate1 = sectionList[i].share_rebate;
                                    self.share_rebate2 = ret.result_data.dislevel.share_rebate;
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

            //单击复制 & 分享复制
            getComment: function(id) {
                fnCopy($(".comments_" + id).html())
            },
            //复制评论
            getCommentPL: function(id) {
                fnCopy($(".commentPL_" + id).html())
            },

            //分享1
            share1: function(goods_id, id, length, itemid) {
                // alert(goods_id);
                var self = this;
                api.ajax({
                    url: 'http://v2.api.haodanku.com/supersearch/apikey/souke/keyword/' + goods_id + '/back/10/min_id/1/tb_p/1/sort/0/is_tmall/0/is_coupon/0/limitrate/0',
                    method: 'get',
                    type: 'json',
                    data: {}
                }, function(ret, err) {
                    console.log("商品详情输出：" + JSON.stringify(ret));
                    if (ret) {
                        item_title = ret.data[0].itemtitle;
                        pic_url = ret.data[0].itempic;
                        real_price = ret.data[0].itemendprice;
                        zk_final_price = ret.data[0].itemprice
                        jian = ret.data[0].couponmoney;
                        // alert(goods_id);
                        self.getGoods_codeImg(goods_id, 1, item_title, length, itemid);

                    }
                });
                //商品描述详情开始
                // var obj = {
                //     'num_iid': goods_id
                // };
                // var objArr = sort_ASCII(obj);
                // var timestamp = fntimestamp();
                // var version = '2.0';
                // var arr = apiSecret + timestamp + version + '';
                // for (i in objArr) {
                //     arr += objArr[i];
                // }
                // console.log(arr);
                // var sign = hex_md5(arr);
                // api.ajax({
                //     url: commonUrl + 'soukeAppTttService/service/ali/finditemDetail_ac',
                //     method: 'post',
                //     headers: {
                //         'Content-Type': 'application/json;charset=utf-8'
                //     },
                //     data: {
                //         body: {
                //             'apiKey': apiKey,
                //             'timestamp': timestamp,
                //             'sign': sign,
                //             'num_iid': goods_id
                //         }
                //     }
                // }, function(ret, err) {
                //     console.log("商品详情总接口：" + JSON.stringify(ret));
                //     if (ret.result_code == 500) {
                //         fnOpenTishi(1);
                //         return false;
                //         api.closeWin({
                //             name: 'good_detail'
                //         });
                //
                //     }
                //     if (ret) {
                //             item_title = ret.result_data[0].title;
                //             pic_url = ret.result_data[0].sale_creditLevelIcon;
                //             real_price = ret.result_data[0].reserve_price;
                //             zk_final_price =ret.result_data[0].zk_final_price
                //             jian = ret.result_data[0].coupon_money;
                //             // alert(goods_id);
                //             self.getGoods_codeImg(goods_id, 1, item_title, length, itemid);
                //
                //         }
                //   });
            },

            //分享2
            share2: function(itemid) {
                // alert(itemid);
                var self = this;
                //判断是否登陆
                if (!empty($api.getStorage("userInfo"))) {
                    user_id = $api.getStorage("userInfo").user_id;
                } else {
                    user_id = '';
                }
                if (user_id == "" || user_id == undefined) {
                    api.openWin({
                        name: 'user_login',
                        url: '../login/user_login.html',
                    });
                    return;
                }
                //判断类型
                if (api.pageParam.cat != null && api.pageParam.cat > 1) {
                    // alert(api.pageParam.cat);
                    self.num = 0;
                    api.showProgress({
                        style: 'default',
                        animationType: 'fade',
                        title: '数据加载中',
                        text: '',
                        modal: false
                    });
                    self.shar_img_arr = [];
                    for (var i = 0; i < $(".share_" + itemid).length; i++) {
                        //  alert($(".share_"+itemid).eq(i).find("span").html()) ;
                        self.shar_img_arr.push($(".share_" + itemid).eq(i).find("span").html()); //封装素材数组
                        api.showProgress({
                            style: 'default',
                            animationType: 'fade',
                            title: '素材加载中…',
                            text: '',
                            modal: false
                        });

                    }
                    self.saveImg(0, $(".share_" + itemid).length, itemid);
                } else {
                    self.num = 0;
                    api.showProgress({
                        style: 'default',
                        animationType: 'fade',
                        title: '数据加载中',
                        text: '',
                        modal: false
                    });
                    self.shar_img_arr = [];

                    for (var i = 0; i < $(".share_" + itemid).length; i++) {
                        //  alert($(".share_"+itemid).eq(i).find("p").html()) ;
                        api.showProgress({
                            style: 'default',
                            animationType: 'fade',
                            title: '生成海报中…',
                            text: '',
                            modal: false
                        });
                        self.share1($(".share_" + itemid).eq(i).find("p").html(), 0, $(".share_" + itemid).length, itemid);
                    }
                }


            },

            //获取商品带二维码的分享图片
            getGoods_codeImg: function(goods_id, url_type, item_title, length, itemid) {
                var self = this
                var obj = {
                    'user_id': user_id,
                    'is_ios': self.isIos,
                    'item_id': goods_id,
                    'url_type': url_type,
                    'item_title': encodeURIComponent(item_title),
                    'pic_url': pic_url,
                    'real_price': real_price,
                    'zk_final_price': zk_final_price,
                    'jian': jian,
                    'section_id': -1
                };
                // alert(JSON.stringify(obj));
                var objArr = sort_ASCII(obj);
                var timestamp = fntimestamp();
                var version = '2.0';
                var arr = apiSecret + timestamp + version + '';
                for (i in objArr) {
                    arr += objArr[i];
                }
                //console.log(arr);
                var sign = hex_md5(arr);
                api.ajax({
                    url: commonUrl + 'soukeAppTttService/service/api/switchconnection_ac',
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
                            'is_ios': self.isIos,
                            'item_id': goods_id,
                            'url_type': url_type,
                            'item_title': item_title,
                            'pic_url': pic_url,
                            'real_price': real_price,
                            'zk_final_price': zk_final_price,
                            'jian': jian,
                            'section_id': -1
                        }
                    }
                }, function(ret, err) {
                    console.log("分享页面：" + JSON.stringify(ret));
                    if (ret) {
                        if (ret.result_code == 200) {
                            self.shar_img_arr.push(ret.single_url);
                            if (self.shar_img_arr.length == length) {
                                // alert("生成完毕")
                                // alert(JSON.stringify(self.shar_img_arr));
                                self.saveImg(goods_id, length, itemid);
                            }
                        }
                        if (ret.result_code == 501) {
                            api.hideProgress();
                            api.openFrame({
                                name: 'tb_sq_tc',
                                url: '../frame/tb_sq_tc.html',
                                rect: {
                                    x: 0,
                                    y: 0,
                                    w: api.winWidth,
                                    h: api.winHeight
                                },
                                bgColor: 'rgba(0,0,0,0.6)',
                                bounces: false
                            });
                        }
                    } else {
                        api.hideProgress();
                        self.num++
                            if (self.num == length) {
                                alert("生成分享图片失败了~");
                                // console.log(JSON.stringify(err));
                            }
                            //  api.alert({ msg: JSON.stringify(err) });
                    }
                });

            },

            //分享模块
            actionMenu: function(itemid) {
                var self = this;
                var dialogBox = api.require('dialogBox');
                dialogBox.actionMenu({
                    rect: {
                        h: 150
                    },
                    texts: {
                        cancel: '取消'
                    },
                    tapClose: true,
                    items: [{
                        text: '微信好友',
                        icon: 'widget://image/goods/share_wx.png'
                    }, {
                        text: '朋友圈',
                        icon: 'widget://image/goods/share_wxzone.png'
                    }, {
                        text: 'QQ',
                        icon: 'widget://image/goods/share_qq.png'
                    }, {
                        text: '保存图片',
                        icon: 'widget://image/goods/share_dowimg.png'
                    }, {
                        text: 'QQ空间',
                        icon: 'widget://image/goods/share_qqzone.png'
                            // }, {
                            //     text: '微博',
                            //     icon: 'widget://image/goods/share_wb.png'
                    }],
                    styles: {
                        bg: '#FFF',
                        column: 4,
                        itemText: {
                            color: '#000',
                            size: 12,
                            marginT: 4,
                        },
                        itemIcon: {
                            size: 40
                        },
                        cancel: {
                            bg: 'fs://icon.png',
                            color: '#000',
                            h: 44,
                            size: 14
                        }
                    }
                }, function(ret) {
                    // alert(JSON.stringify(ret));

                    if (ret.eventType == "cancel") {
                        self.closeDialog();
                    } else if (ret.index == 0) {
                        self.index = 0;
                        self.closeDialog();
                        self.share2(itemid);
                    } else if (ret.index == 1) {
                        self.index = 1;
                        self.closeDialog();
                        self.share2(itemid);
                    } else if (ret.index == 2) {
                        self.index = 2;
                        self.closeDialog();
                        self.share2(itemid);
                    } else if (ret.index == 3) {
                        self.index = 3;
                        self.closeDialog();
                        self.share2(itemid);
                    } else if (ret.index == 4) {
                        self.index = 4;
                        self.closeDialog();
                        self.share2(itemid);
                    } else if (ret.index == 5) {
                        self.index = 5;
                        self.closeDialog();
                        self.share2(itemid);
                    }
                });
                // self.shareTo();
            },

            //关闭分享模块
            closeDialog: function() {
                var dialogBox = api.require('dialogBox');
                dialogBox.close({
                    dialogName: 'actionMenu'
                });
            },

            //保存图片
            saveImg: function(goods_id, length, itemid) {
                var self = this;
                var resultList = api.hasPermission({
                    list: ['storage']
                });
                if (!resultList[0].granted) {
                    api.hideProgress();
                    //存储未授权
                    api.requestPermission({
                        list: ['storage'],
                        code: 1000
                    }, function(ret, err) {
                        // api.alert({
                        //     msg: JSON.stringify(ret)
                        // });
                        if (!ret.never) {
                            //禁止权限
                            return;
                        } else {
                            self.saveImgTo(goods_id, length, itemid);
                        }
                    });
                } else {
                    self.saveImgTo(goods_id, length, itemid);
                }
                // api.alert({
                //     msg: JSON.stringify(resultList)
                // });
            },
            saveImgTo: function(goods_id, length, itemid) {
                var fs = api.require('fs');
                var self = this;
                // alert(goods_id);
                var index = self.index;
                self.getComment(itemid)
                self.share_bdimg_arr = [];
                self.removeImg();
                fs.createDir({
                    path: 'fs://quanquantui'
                }, function(ret, err) {
                    // alert(ret.status);
                    if (ret.status) {
                        for (var i = 0; i < self.shar_img_arr.length; i++) {
                            //下载到本地
                            // var time = (new Date()).getTime();
                            api.download({
                                url: self.shar_img_arr[i],
                                savePath: "fs://quanquantui/share" + goods_id + "tt" + i + ".jpg",
                                report: false,
                                cache: true,
                                allowResume: true
                            }, function(ret, err) {
                                // alert(ret.state);
                                if (ret.state == 1) {
                                    if (index == '1' || index == '3') {
                                        api.saveMediaToAlbum({ //保存图片和视频到系统相册
                                            path: ret.savePath
                                        }, function(ret, err) {
                                            // alert(ret.status);
                                            // alert(JSON.stringify(err))
                                            if (ret && ret.status) {
                                                // alert('图片保存成功');
                                                api.hideProgress();
                                            } else {
                                                // alert('保存图片失败');
                                            }
                                        });
                                    } else {
                                        self.share_bdimg_arr.push(ret.savePath);
                                        // alert(alert(JSON.stringify(self.share_bdimg_arr)))
                                        // alert(self.share_bdimg_arr.length)
                                        if (self.share_bdimg_arr.length == length) {
                                            api.hideProgress();
                                            self.shareTo(itemid);
                                        }
                                        // alert(JSON.stringify(ret.savePath))
                                    }

                                } else {

                                }
                            });
                        }
                    }
                });
                if (index == '1' || index == '3') {
                    var dialogBox = api.require('dialogBox');
                    dialogBox.scene({
                        tapClose: true,
                        rect: {
                            w: 280,
                            h: 320
                        },
                        texts: {
                            title: '朋友圈分享攻略',
                            okBtnTitle: '打开朋友圈'
                        },
                        styles: {
                            bg: '#fff',
                            title: {
                                marginT: 10,
                                bg: '#fff',
                                h: 48,
                                size: 20,
                                color: '#000'
                            },
                            sceneImg: {
                                h: 100,
                                path: 'widget://image/ic_dialog_share_wx.png'
                            },
                            cell: {
                                bg: '#fff',
                                h: 38,
                                text: {
                                    color: '#636363',
                                    size: 13
                                },
                                icon: {
                                    marginL: 12,
                                    marginT: 9,
                                    w: 20,
                                    h: 20,
                                    corner: 2
                                }
                            },
                            ok: {
                                h: 60,
                                bg: '#fff',
                                titleColor: '#FF6145',
                                titleSize: 18
                            }
                        },
                        optionDatas: [{
                            icon: 'widget://image/icon_pay_tick_selected.png',
                            text: '分享文案已自动复制'
                        }, {
                            icon: 'widget://image/icon_pay_tick_selected.png',
                            text: '图片已保存至手机相册'
                        }, {
                            icon: 'widget://image/icon_pay_tick_def.png',
                            text: '打开朋友圈选择相册图片并粘贴文案'
                        }]
                    }, function(ret, err) {
                        // alert("222222"+JSON.stringify(ret));
                        if (ret.eventType == "ok") {
                            var dialogBox = api.require('dialogBox');
                            dialogBox.close({
                                dialogName: 'scene'
                            });
                            $("#shareImg").hide();
                            window.location.href = 'weixin://'; //打开微信对话栏
                        } else {
                            // alert("333333"+JSON.stringify(err));
                        }
                    });
                }
            },

            //分享到
            shareTo: function(itemid) {
                var self = this;
                // alert(JSON.stringify(self.share_bdimg_arr))
                self.getComment(itemid)
                var j = self.index;
                if (api.systemType == "ios") {
                    var sharedModule = api.require('shareAction');
                    sharedModule.share({
                        images: self.share_bdimg_arr,
                        type: 'image',
                    });
                } else {
                    if (j == 0) {
                        var wx = api.require('wx');
                        wx.shareImage({
                            apiKey: '',
                            scene: 'session',
                            contentUrl: self.share_bdimg_arr[0]
                        }, function(ret, err) {
                            if (ret.status) {
                                // alert('分享成功');
                            } else {
                                // alert(err.code);
                            }
                        });
                    } else if (j == 2) {
                        //qq
                        var qq = api.require('QQPlus');
                        qq.shareImage({
                            type: 'QFriend',
                            imgPath: self.share_bdimg_arr[0]
                        }, function(ret, err) {
                            if (ret.status) {
                                // alert("分享成功！");
                            } else {
                                // api.alert({
                                //     msg: JSON.stringify(err)
                                // });
                            }
                        });
                    } else if (j == 4) {
                        //qqzone
                        var qq = api.require('QQPlus');
                        qq.shareImage({
                            type: 'QZone',
                            imgPath: self.share_bdimg_arr[0]
                        }, function(ret, err) {
                            if (ret.status) {
                                // alert("分享成功！");
                            } else {
                                // api.alert({
                                //     msg: JSON.stringify(err)
                                // });
                            }
                        });
                    }
                }
            },
            //移除图片
            removeImg: function() {
                var fs = api.require('fs');
                fs.rmdir({
                    path: 'fs://quanquantui'
                }, function(ret, err) {
                    if (ret.status) {} else {}
                });
            },

            //打开详情页
            openGoodDel: function(goods_id, i_imgurl) {
                if (goods_id == "" || goods_id == null) {
                    // alert("没有此商品")
                } else {
                    api.openWin({
                        name: 'good_detail',
                        url: '../goods/good_detail.html',
                        pageParam: {
                            goods_id: goods_id,
                            section_id: -1,
                        }
                    });

                }
            },
        }
    })
}
