// pages/payment/payment.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    time: 7200,
    hour: null,
    min: null,
    second: null,
    fxeid:false,
  },
  getDifferTime(getDate) {
    var that = this;
    setInterval(() => {
      var time = that.data.time - 1;
      var hour = parseInt(time / 3600);
      var min = parseInt((time - hour * 3600) / 60);
      var second = time - hour * 3600 - min * 60;
      that.setData({
        time: time,
        hour: hour,
        min: min,
        second: second,
      })
    }, 1000)
  },
  jump(){
    this.setData({
      fxeid:true

    })
  },
  jumpPayment(e){
    var i=e.currentTarget.dataset['index'];
    if(i==1){
      wx.showToast({
        title: '支付成功！',
        icon: 'success',
        duration: 2000,
      });
      setTimeout(() => {
        wx.reLaunch({
          url: '../myorder/myorder'
        })
      }, 2000)
    }else{
      wx.showToast({
        icon:'none',
        title: '尚未支付',
        duration: 2000,
      });
      this.setData({
        fxeid:false
      })
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // this.getDifferTime()
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