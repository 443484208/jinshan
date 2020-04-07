//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    winData:{},

    swiperData:{
      list:[{
        src:'./../../image/bk-1.jpg'
      },{
        src:'./../../image/bk-2.jpg'
      },{
        src:'./../../image/bk-3.jpg'
      },{
        src:'./../../image/bk-4.jpg'
      }]
  } ,
    list:[{
      src:'./../../image/biddinginformation.png',
      title:'中央空调'
    },{
      src:'./../../image/activity.png',
      title:'通风排烟'
    },{
      src:'./../../image/ProductLine.png',
      title:'电气设备'
    },{
      src:'./../../image/Reserve.png',
      title:'轨道交通'
    },{
      src:'./../../image/Reserve.png',
      title:'复合材料'
    },{
      src:'./../../image/Installationandconstruction.png',
      title:'其他产品'
    }],
    lists:[{
      url:'../../image/dikongqi.jpg',
      name:'低温空气源热泵'
    },{
      url:'../../image/fengleng.jpg',
      name:'风冷螺杆机组'
    },{
      url:'../../image/fenglengmokuai.jpg',
      name:'风冷模块机组'
    },{
      url:'../../image/fenglengmokuai.jpg',
      name:'降膜式水冷冷水机组'
    },{
      url:'../../image/fenglengmokuai.jpg',
      name:'降膜式水源热泵机组'
    },{
      url:'../../image/fenglengmokuai.jpg',
      name:'满液式水冷冷水机组'
    },{
      url:'../../image/fenglengmokuai.jpg',
      name:'满液式水源热泵机组'
    },{
      url:'../../image/fenglengmokuai.jpg',
      name:'模块化水（地）源热泵机组'
    },{
      url:'../../image/fenglengmokuai.jpg',
      name:'食用菌空调一体机'
    },{
      url:'../../image/fenglengmokuai.jpg',
      name:'水（地）源热泵机组'
    },{
      url:'../../image/fenglengmokuai.jpg',
      name:'水冷冷水机组'
    },{
      url:'../../image/fenglengmokuai.jpg',
      name:'小型水（地）源热泵机组'
    }]
  },
  jumpTo(e){
    wx.navigateTo({
      url: 'productLine?url='+this.data.list[e.currentTarget.dataset['index']].title+'&key='+e.currentTarget.dataset['index']
    })
    // e.currentTarget.dataset['index']
  },
  jumpSwiper(){
    wx.navigateTo({
      url: '../productLine/details'
    })
  },
  jumpTolist(e){
    var list=this.data.list[e.currentTarget.dataset['index']];
    list.i=e.currentTarget.dataset['index'];
    wx.navigateTo({
      url: '../productLine/details?list='+JSON.stringify(list)
    })
  
    // e.currentTarget.dataset['index']
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse){
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },
  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  }
})
