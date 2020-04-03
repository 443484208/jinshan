//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    swiperData:[{
      src:'./../../image/banner@2x.png'
    },{
      src:'./../../image/banner@2x.png'
    },{
      src:'./../../image/banner@2x.png'
    }],
    list:[{
      src:'./../../image/biddinginformation.png',
      title:'招标信息'
    },{
      src:'./../../image/activity.png',
      title:'活动'
    },{
      src:'./../../image/ProductLine.png',
      title:'产品系列'
    },{
      src:'./../../image/Reserve.png',
      title:'预留'
    },{
      src:'./../../image/Reserve.png',
      title:'预留'
    },{
      src:'./../../image/Installationandconstruction.png',
      title:'安装施工'
    },{
      src:'./../../image/Logisticsservice.png',
      title:'物流服务'
    },{
      src:'./../../image/legaladvice.png',
      title:'法律咨询'
    },{
      src:'./../../image/Reserve.png',
      title:'预留'
    },{
      src:'./../../image/Reserve.png',
      title:'预留'
    }]
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
