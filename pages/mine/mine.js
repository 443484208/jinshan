// pages/mine/mine.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo:{},
    loginBlooean: false,
    list: [{
      name: '我的服务',
      list: [{
        icon: './../../image/release.png',
        name: '我的发布',
        url: 'myRelease',
      }, {
        icon: './../../image/Order.png',
        name: '我的订单',
        url: 'myorder',
      }, {
        icon: './../../image/integral.png',
        name: '我的积分',
        url: 'integral',
      }, {
        icon: './../../image/Favorite.png',
        name: '我的收藏',
        url: 'collection',
      }, {
        icon: './../../image/sz.png',
        name: '设置',
        url: 'setup',
      }]
    }],
    tabbar: {
      value: {
        "backgroundColor": "#ffffff",
        "color": "#979795",
        "selectedColor": "#1c1c1b",
        "list": [{
          "pagePath": "../../pages/index/index",
          "text": "首页",
          "iconPath": "icon/homes.png",
          "selectedIconPath": "icon/homes.png"
        }, {
          "pagePath": "../../pages/purchase/purchase",
          "text": "采购需求",
          "iconPath": "icon/caigou.png",
          "selectedIconPath": "icon/caigou.png"
        }, {
          "pagePath": "../../pages/release/release",
          "text": "发布",
          "iconPath": "icon/fabu.png",
          "selectedIconPath": "icon/fabu.png",
          "isSpecial": true,
        }, {
          "pagePath": "../../pages/tool/tool",
          "text": "工具",
          "iconPath": "icon/gongju.png",
          "selectedIconPath": "icon/gongju.png"
        }, {
          "pagePath": "../../pages/mine/mine",
          "text": "我的",
          "iconPath": "icon/mines.png",
          "selectedIconPath": "icon/mines.png"
        }]
      }
    }
  },
  jump(e) {
    var url = e.currentTarget.dataset['index'].url;
    if(this.data.loginBlooean){
      wx.navigateTo({
        url: '../' + url + '/' + url
      })
    }else{
      wx.showToast({
        title: '请登录后再操作',
        icon: 'none',
        duration: 2000
      })
    }
    
  },
  jumpLogin() {
    var that = this;
    wx.login({
      success: function (res) {
        console.log(res)
        wx.setStorage({
          key: "loginBlooean",
          data: "true"
        })
        that.getUserInfo();
        that.setData({
          loginBlooean: true
        })
        //获取登录的临时凭证
        var code = res.code;
        //调用后端，获取微信的session_key,secret
      }
    })
  },
  getUserInfo(){
    var that=this;
    wx.getUserInfo({
      success: function(res) {
        that.setData({
          userInfo :res.userInfo
        })
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      loginBlooean: wx.getStorageSync('loginBlooean')
    })
    if(this.data.loginBlooean){
      this.getUserInfo()
    }
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})