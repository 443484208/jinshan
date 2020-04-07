// pages/install/details.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    winData:{},

    swiperData: {
      list: [{
        src: './../../image/bk-1.jpg'
      }, {
        src: './../../image/bk-2.jpg'
      }, {
        src: './../../image/bk-3.jpg'
      }, {
        src: './../../image/bk-4.jpg'
      }]
    },
    list:[{
      url:'../../image/dikongqi.jpg',
      name:'低温空气源热泵'
    },{
      url:'../../image/fengleng.jpg',
      name:'风冷螺杆机组'
    },{
      url:'../../image/fenglengmokuai.jpg',
      name:'风冷模块机组'
    },{
      url:'../../image/fenglengmokuai.jpg',
      name:'降膜式水冷冷水机组'
    },{
      url:'../../image/fenglengmokuai.jpg',
      name:'降膜式水源热泵机组'
    },{
      url:'../../image/fenglengmokuai.jpg',
      name:'满液式水冷冷水机组'
    },{
      url:'../../image/fenglengmokuai.jpg',
      name:'满液式水源热泵机组'
    },{
      url:'../../image/fenglengmokuai.jpg',
      name:'模块化水（地）源热泵机组'
    },{
      url:'../../image/fenglengmokuai.jpg',
      name:'食用菌空调一体机'
    },{
      url:'../../image/fenglengmokuai.jpg',
      name:'水（地）源热泵机组'
    },{
      url:'../../image/fenglengmokuai.jpg',
      name:'水冷冷水机组'
    },{
      url:'../../image/fenglengmokuai.jpg',
      name:'小型水（地）源热泵机组'
    }]
  },
  jump(){
    wx.switchTab({
      url: '../index/index'
    })
  },
  jumpDetails(e){
    var list=this.data.list[e.currentTarget.dataset['index']];
    list.i=e.currentTarget.dataset['index'];
    wx.navigateTo({
      url: '../productLine/details?list='+JSON.stringify(list)
    })
  },
  start(e){
    wx.showToast({
      title: '收藏成功！', // 标题
      icon: 'success',  // 图标类型，默认success
      duration: 3000  // 提示窗停留时间，默认1500ms
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: '主机事业部'+options.name,
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