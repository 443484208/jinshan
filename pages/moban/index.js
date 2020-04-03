//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
	  sideBarI:0,
	  sideBarList:[{
		  id:0,
		  name:'制冷主机', 
	  },{
		  id:1,
		  name:'冷却塔',  
	  },{
		  id:2,
		  name:'风机',    
	  },{
		  id:3,
		  name:'风阀', 
	  },{
		  id:4,
		  name:'风口', 
	  },{
		  id:5,
		  name:'消声器',
	  },{
		  id:6,
		  name:'风管', 
	  },{
		  id:7,
		  name:'水箱',
	  },{
		  id:8,
		  name:'机房配件',
	  }]
  },
  //导航处理
  sideBar(e){
	  this.setData({
		  sideBarI:e.currentTarget.dataset['index']
	  })
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
