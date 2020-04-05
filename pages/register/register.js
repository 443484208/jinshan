// pages/release/release.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    title: null,
    email: null,
    name: null,
    job: null,
  },
  jumpUp() {
    if (!this.data.name) {
      wx.showToast({
        title: '请输入姓名!', //标题
        icon: 'none',
        duration: 2000
      })
    }else if(!this.data.title){
      wx.showToast({
        title: '请输入公司名!', //标题
        icon: 'none',
        duration: 2000
      })
    }else if(!this.data.job){
      wx.showToast({
        title: '请输入您的职务!', //标题
        icon: 'none',
        duration: 2000
      })
    }else{
      wx.showToast({
        title: '入驻提交成功',
        icon: 'success',
        duration: 2000,
      });
      setTimeout(() => {
        wx.switchTab({
          url: '../mine/mine'
        })
      }, 2000)
    }
  },
  formName(e){
    this.setData({
      name:e.detail.value
    })
  },
  formtitle(e){
    this.setData({
      title:e.detail.value
    })
  },
  formjob(e){
    this.setData({
      job:e.detail.value
    })
  },
  formemail(e){
    this.setData({
      email:e.detail.value
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