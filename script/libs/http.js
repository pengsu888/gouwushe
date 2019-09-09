var Http = {
    HOST:'http://app.youquanyun.com',
    API_URL:{
        'HOMEGOODSLIST': '/api/'+config.bizId+'/amoy/home/goods-list', // 商品列表

        'TAOBAOGOODSDETAIL': '/api/'+config.bizId+'/amoy/taobao/goods-detail', // 商品详情
        'TAOBAOGOODSITEM': '/api/'+config.bizId+'/amoy/taobao/goods-item', // 商品详情
        // 订单红包
        'USERCOLLECTION': '/api/'+config.bizId+'/amoy/user/collection', // 收藏商品
        'USERREDINFO': '/api/'+config.bizId+'/amoy/user/red-info', // 红包领取详情
        'USERRECEIVERED': '/api/'+config.bizId+'/amoy/user/receive-red', // 领取红包
        'USERREDDETAIL': '/api/'+config.bizId+'/amoy/user/red-detail', // 红包详情接口
        'USERGRABCOUPONLOG': '/api/'+config.bizId+'/amoy/user/grab-coupon-log', // 红包机会日志
        'USERREDRULE': '/api/'+config.bizId+'/amoy/user/red-rule', // 红包规则接口
        'USERREDLIST': '/api/'+config.bizId+'/amoy/user/red-list', // 红包页面接口
        // 信用卡
        'HOMECREDITINDEX': '/api/'+config.bizId+'/amoy/home/credit-index', // 信用卡首页
        'HOMECARDURL': '/api/'+config.bizId+'/amoy/home/card-url', // 获取卡片地址
        'HOMECARDLIST': '/api/'+config.bizId+'/amoy/home/card-list', // 卡片列表
        'HOMECARDDETAIL': '/api/'+config.bizId+'/amoy/home/card-detail', // 卡片详情
        'HOMECARDAPPLY': '/api/'+config.bizId+'/amoy/home/card-apply', // 申请卡片列表
    },
    post: function(params){
      console.log('post: '+ JSON.stringify(params))
        var _this = this;
        var token = this.getToken();
        var headers = {}
        if(token){
          headers.token = token
        }
        api.ajax({
            url: params.url,
            method: 'post',
            headers: headers,
            data: {
                values: params.data || {}
            }
        }, function (ret, err) {
          console.log('ret: '+ JSON.stringify(ret))
          console.log('err: '+ JSON.stringify(err))
          if (ret) {
            _this.handleRes(params,ret);
          } else {
            api.toast({msg: JSON.stringify(err.body)});
          }
        })
    },
    get: function(params){
      console.log('get: ', params)
        var _this = this;
        var token = this.getToken();
        var headers = {}
        if(token){
          headers.token = token
        }
        api.ajax({
            url: params.url,
            method: 'get',
            headers: headers,
            data: {
                values: params.data || {}
            }
        }, function (ret, err) {
          if (ret) {
            _this.handleRes(params,ret);
          } else {
            api.toast({msg: JSON.stringify(err.body)});
          }
        })
    },
    getToken: function(){
        var t = utils.storage.get('token');
        return t;
    },
    handleRes: function(params,res){
        if(typeof res == 'string' ){
            res = JSON.parse(res)
        }
        if(res.code==0){
            params.success && params.success(res)
        } else {
            if(res.code==1 || res.code == 2 || res.code == 3 || res.code == 4){
                if(params.error){
                    params.error(res);
                } else {
                    api.toast({msg:res.msg});
                }
            }else if(res.code==403){
                api.toast({msg:'授权失效或未授权,请重新登录'});
                utils.storage.remove('token')
                utils.storage.remove('userInfo')
                utils.auth.toLogin();
            }
        }
    }
}
