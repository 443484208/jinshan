// pages/install/details.js
const api = require("../../utils/api-wx-1001-v2.js");
var that;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tarData:{},
    winData:{},
    itemData:{},
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
  start(){
    wx.showToast({
      title: '收藏成功！', // 标题
      icon: 'success',  // 图标类型，默认success
      duration: 3000  // 提示窗停留时间，默认1500ms
    })
  },
  jump(){
    wx.navigateTo({
      url: '../productLine/details'
    })
  },
  getValidADList(){
    var that=this;
    // 参数：type=1，page 1：首页，2：招标信息，
    // 3：在线活动，4：系列产品，5：安装施工，6：物流信息
    api.jinguang.getValidADList({
      type:1,
      page:6,
      success: function (res) {
        that.setData({
          'swiperData.list':res
        })
      },
      failure: function (resultCode, resultText) {

      }
    })
  },
  // 列表
  getCompanyTypeProductList (){
    api.jinguang.getCompanyTypeProductList ({
      companyType:3,
      page:0,
      size:10,
      success: function (res) {
        that.setData({
          lists:res.data
        })
        console.log(res)
        
      },
      failure: function (resultCode, resultText) {
      }
    })
    // 函数名称：getCategoryCompanyList 参数 type=1,page,size
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    that=this;
    that.getValidADList();
    that.getCompanyTypeProductList()
    if(wx.getStorageSync('logi')){
      that.setData({
        itemData:wx.getStorageSync('logi')
      })
      console.log(this.data.itemData);

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
  onShareAppMessage: function (res) {
    return {
      title: '物流详情',
      path: "/pages/logisticsservice/details",
    };
  }
})