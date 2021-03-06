// pages/setup/setup.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo:{}
  },
  jump(){
    wx.showModal({
      title: '提示',
      content: '确定要退出登录吗',
      success (res) {
        if (res.confirm) {
          wx.showToast({
            title: '退出登录成功！',
            icon: 'success',
            duration: 2000
          })
          wx.clearStorage()
          setTimeout(() => {
            wx.navigateBack({
              delta: 1
            })
          }, 1000);
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
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
    this.getUserInfo();
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