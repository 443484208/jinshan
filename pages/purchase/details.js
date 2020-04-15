// pages/install/details.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list:{}
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
  jumpPhone() {
		var phone=this.data.list.servicePhone;
		wx.makePhoneCall({
			phoneNumber: phone //仅为示例，并非真实的电话号码
		})
	},
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
		if (wx.getStorageSync('list')) {
			this.setData({
				list: wx.getStorageSync('list')
			})
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