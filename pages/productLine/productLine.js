// pages/productLine/productLine.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
	  sideBarI:0,
	  sideBarList:[{
		  id:0,
		  name:'制冷主机', 
	  },{
		  id:1,
		  name:'冷却塔',  
	  },{
		  id:2,
		  name:'风机',    
	  },{
		  id:3,
		  name:'风阀', 
	  },{
		  id:4,
		  name:'风口', 
	  },{
		  id:5,
		  name:'消声器',
	  },{
		  id:6,
		  name:'风管', 
	  },{
		  id:7,
		  name:'水箱',
	  },{
		  id:8,
		  name:'机房配件',
	  }]
  },
  //导航处理
  sideBar(e){
	  this.setData({
		  sideBarI:e.currentTarget.dataset['index']
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