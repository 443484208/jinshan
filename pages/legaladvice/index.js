// pages/install/details.js
const api = require("../../utils/api-wx-1001-v2.js");
var that;

Page({

  /**
   * 页面的初始数据
   */
  data: {
    itemData:{},
    lists:[],

  },
  start(){
    wx.showToast({
      title: '收藏成功！', // 标题
      icon: 'success',  // 图标类型，默认success
      duration: 3000  // 提示窗停留时间，默认1500ms
    })
  },
  jump(){
    wx.switchTab({
      url: '../index/index'
    })
  },
  onLoad: function (options) {
    that=this;
    if(wx.getStorageSync('leg')){
      that.setData({
        itemData:wx.getStorageSync('leg')
      })
      console.log(this.data.itemData);
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