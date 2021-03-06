// pages/tendering/details.js
const api = require("../../utils/api-wx-1001-v2.js");
var that;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    winData:{},
    list:{}
  },
  dateNew(data){
    var date=new Date(data);
    return date.getFullYear()+'-'+((date.getMonth()+1<10?'0'+(date.getMonth()+1):date.getMonth()+1))+'-'+((date.getDate()<10?'0'+(date.getDate()):date.getDate()))
  },
// 
getNeedDetail(id){
  // 参数：type=1，page 1：首页，2：招标信息，
  // 3：在线活动，4：系列产品，5：安装施工，6：物流信息
  api.jinguang.getNeedDetail({
    needId:id,
    success: function (res) {
      res.startTime=that.dateNew(res.startTime);
      res.endTime=that.dateNew(res.endTime);
      
      that.setData({
        list:res
      })
      console.log(res)
    },
    failure: function (resultCode, resultText) {

    }
  })
},
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    that=this;
if(options.id){
  this.getNeedDetail(options.id);

  wx.setNavigationBarTitle({
    title: '发布详情',
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