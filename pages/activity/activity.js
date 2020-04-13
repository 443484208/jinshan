// pages/activity/activity.js
const api = require("../../utils/api-wx-1001-v2.js");
var that;
Page({

  /**
   * 页面的初始数据
   */
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
    activityI:0,
    list:[{
      i:0,
    },
    {
      i:1,
    },
    {
      i:0,
    }]
  },
  jumpSwiper(){
    wx.navigateTo({
      url: '../productLine/details'
    })
  },
  jump(e){
    this.setData({
      activityI:e.currentTarget.dataset['index']
    })
  },
  jumpTo(e){
    wx.navigateTo({
      url: 'details?url=第一届金光线上采销大会&key='+this.data.list[e.currentTarget.dataset['index']].i
    })
    
  },
  // 广告
  getValidADList(){
    var that=this;
    // 参数：type=1，page 1：首页，2：招标信息，
    // 3：在线活动，4：系列产品，5：安装施工，6：物流信息
    api.jinguang.getValidADList({
      type:1,
      page:3,
      success: function (res) {
        that.setData({
          'swiperData.list':res
        })
        console.log(res)
      },
      failure: function (resultCode, resultText) {

      }
    })
  },
  getNeedList(){
    // 函数：getNeedList 参数：type=1,source = 1,status = 1  
    api.jinguang.getNeedList({
      type:1,
      source:1,
      status:1,
      page:3,
      size:10,
      success: function (res) {
        that.setData({
          list:res
        })
        console.log(res)
      },
      failure: function (resultCode, resultText) {
    
      }
    })
    },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    that=this;
    this.getValidADList();
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