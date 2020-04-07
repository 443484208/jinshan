// pages/activity/activity.js
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
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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