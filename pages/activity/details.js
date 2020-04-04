// pages/activity/details.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    sideI:null,
    detailsI:0,
    swiperData:[{
      src:'./../../image/bk-1.jpg'
    },{
      src:'./../../image/bk-2.jpg'
    },{
      src:'./../../image/bk-3.jpg'
    },{
      src:'./../../image/bk-4.jpg'
    }],
  },
  jumpI(e){
    this.setData({
      detailsI:e.currentTarget.dataset['index']
    })
  },
  jumpTo(e){
    wx.navigateTo({
      url: 'index'
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    wx.setNavigationBarTitle({
      title: options.url
    })
    this.setData({
      sideI:options.key
    })
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