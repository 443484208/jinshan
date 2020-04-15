// pages/install/install.js
const api = require("../../utils/api-wx-1001-v2.js");

Page({

  /**
   * 页面的初始数据
   */
  data: {
    winData:{},
    list:[],
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
  },
  jump(e){
    wx.setStorage({
      key:"install",
      data:e.currentTarget.dataset['index']
    })
    
    wx.navigateTo({
      url: 'details'
    })

  },
  getValidADList(){
    var that=this;
    // 参数：type=1，page 1：首页，2：招标信息，
    // 3：在线活动，4：系列产品，5：安装施工，6：物流信息
    api.jinguang.getValidADList({
      type:1,
      page:5,
      success: function (res) {
        that.setData({
          'swiperData.list':res
        })
      },
      failure: function (resultCode, resultText) {

      }
    })
  },
  getCategoryCompanyList(){
    var that=this;
    // 参数：type2，
    // page 0 size 10
    api.jinguang.getCategoryCompanyList({
      type:2, 
      page:0,
      size:10,
      success: function (res) {
        that.setData({
          list:res.data
        })
      },
      failure: function (resultCode, resultText) {

      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getCategoryCompanyList();
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