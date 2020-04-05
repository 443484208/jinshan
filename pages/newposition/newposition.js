// pages/newposition/newposition.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    region: ['山东省', '', ''],
    regionlist:null,
    switch1Checked: true,
    
  },
  jumpTo(){
    wx.showToast({
      title: '新增地址成功！',
      icon: 'success',
      duration: 2000,
    });
    setTimeout(() => {
      wx.switchTab({
        url: '../writeorder/writeorder'
      })
    }, 2000)
  },
  switch1Change(e){
console.log(e.detail.value)
  },
  bindRegionChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value);
    var list="";
    for(var i=0;i<e.detail.value.length;i++){
      if(i==0){
        list=e.detail.value[i]
      }else{
        list+=('-'+e.detail.value[i]);
      }
    }
    this.setData({
      region:  e.detail.value,
      regionlist:list
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