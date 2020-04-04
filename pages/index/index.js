//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    swiperData:[{
      src:'./../../image/bk-1.jpg'
    },{
      src:'./../../image/bk-2.jpg'
    },{
      src:'./../../image/bk-3.jpg'
    },{
      src:'./../../image/bk-4.jpg'
    }],
    list:[{
      src:'./../../image/biddinginformation.png',
      title:'招标信息',
      url:'tendering'
    },{
      src:'./../../image/activity.png',
      title:'活动',
      url:'activity'
    },{
      src:'./../../image/ProductLine.png',
      title:'产品系列',
      url:'productLine'
    },{
      src:'./../../image/Reserve.png',
      title:'预留'
    },{
      src:'./../../image/Reserve.png',
      title:'预留'
    },{
      src:'./../../image/Installationandconstruction.png',
      title:'安装施工',
      url:'install'
    },{
      src:'./../../image/Logisticsservice.png',
      title:'物流服务',
      url:'logisticsservice'
    },{
      src:'./../../image/legaladvice.png',
      title:'法律咨询',
      url:'legaladvice'
    },{
      src:'./../../image/Reserve.png',
      title:'预留'
    },{
      src:'./../../image/Reserve.png',
      title:'预留'
    }],
    tabbar: {
      value: {
        "backgroundColor": "#ffffff",
        "color": "#979795",
        "selectedColor": "#1c1c1b",
        "list": [
          {
            "pagePath": "../../pages/index/index",
            "text": "首页",
            "iconPath":"icon/home.png",
            "selectedIconPath":"icon/home.png"
          }, {
            "pagePath": "../../pages/purchase/purchase",
            "text": "采购",
            "iconPath":"icon/caigou.png",
            "selectedIconPath":"icon/caigou.png"
          }, {
            "pagePath": "../../pages/release/release",
            "text": "发布",
            "iconPath":"icon/fabu.png",
            "selectedIconPath":"icon/fabu.png",
            "isSpecial": true,
          }, {
            "pagePath": "../../pages/tool/tool",
            "text": "工具",
            "iconPath":"icon/gongju.png",
            "selectedIconPath":"icon/gongju.png"
          }, {
            "pagePath": "../../pages/mine/mine",
            "text": "我的",
            "iconPath":"icon/mine.png",
            "selectedIconPath":"icon/mine.png"
          }
        ]
      }
    }
  },
  jump(e){
    var url=this.data.list[e.currentTarget.dataset['index']].url;
    wx.navigateTo({
      url: '../'+url+'/'+url
    })
   console.log(e.currentTarget.dataset['index'])
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
