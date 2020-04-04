// pages/release/release.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    title: null,
    content: null,
    name: null,
    phone: null,
  },
  jumpPhone(e) {
    var type = e.currentTarget.dataset['type'];
    wx.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'],
      sourceType: [type],
      success(res) {
        // tempFilePath可以作为img标签的src属性显示图片
        const tempFilePaths = res.tempFilePaths
      }
    })
  },
  jumpUp() {
    if (!this.data.title) {
      wx.showToast({
        title: '请输入标题!', //标题
        icon: 'none',
        duration: 2000
      })
    }else if(!this.data.content){
      wx.showToast({
        title: '请输入通告内容!', //标题
        icon: 'none',
        duration: 2000
      })
    }else if(!this.data.name){
      wx.showToast({
        title: '请输入联系人姓名!', //标题
        icon: 'none',
        duration: 2000
      })
    }else if(!this.data.phone){
      wx.showToast({
        title: '请输入联系人的联系方式!', //标题
        icon: 'none',
        duration: 2000
      })
    }else{
      wx.showToast({
        title: '发布成功',
        icon: 'success',
        duration: 2000,
      });
      setTimeout(() => {
        wx.switchTab({
          url: '../index/index'
        })
      }, 2000)
    }
  },
  formName(e){
    this.setData({
      name:e.detail.value
    })
  },
  formContent(e){
    this.setData({
      content:e.detail.value
    })
  },
  formTitle(e){
    this.setData({
      title:e.detail.value
    })
  },
  formPhone(e){
    this.setData({
      phone:e.detail.value
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