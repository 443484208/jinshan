// pages/productLine/productLine.js
const api = require("../../utils/api-wx-1001-v2.js");
var that;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    winData:{},
    parentIds:null,
    sideBarI: 0,
    sideI: 0,
    sideBarList: [],
    list:[]
  },
  //导航处理
  sideBar(e) {
    that.getCompanyCategoryList(e.currentTarget.dataset['item'].id);
    that.setData({
      sideBarI: e.currentTarget.dataset['index']
    })

  },
   // 左边
   getChildCategory(){
    api.jinguang.getChildCategory({
      parentIds :that.data.parentIds,
      success: function (res) {
        that.setData({
          sideBarList:res
        })
        that.getCompanyCategoryList(res[0].id)
        
      },
      failure: function (resultCode, resultText) {
      }
    })
  },
  // list
  getCompanyCategoryList(id){
    console.log(id);
    api.jinguang.getCompanyCategoryList({
      categoryId :id,
      page :0,
      size :10,
      success: function (res) {
        that.setData({
          list:res.data
        })
        console.log(res)
        
      },
      failure: function (resultCode, resultText) {
      }
    })
  },
  jump(e) {
    // wx.navigateTo({
    //   url: 'details'
    // })
wx.navigateTo({
      url: '../businessUnit/businessUnit?id='+e.currentTarget.dataset['item'].company.name
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    that=this;
    console.log(options)
    wx.setNavigationBarTitle({
      title: options.url+'分类'
    })
    this.setData({
      parentIds:options.id
    })
    that.getChildCategory();
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