// pages/tendering/tendering.js

const api = require("../../utils/api-wx-1001-v2.js");
var that;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    name:null,
    winData:{},
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
    list:[{
      name:'石家庄北海山城中村改造项目',
      tips:'回迁楼项目',
      date:'2010-03-12'
    },{
      name:'石家庄北海山城中村改造项目',
      tips:'回迁楼项目',
      date:'2010-03-12'
    },{
      name:'石家庄北海山城中村改造项目',
      tips:'回迁楼项目',
      date:'2010-03-12'
    },{
      name:'石家庄北海山城中村改造项目',
      tips:'回迁楼项目',
      date:'2010-03-12'
    },{
      name:'石家庄北海山城中村改造项目',
      tips:'回迁楼项目',
      date:'2010-03-12'
    },{
      name:'石家庄北海山城中村改造项目',
      tips:'回迁楼项目',
      date:'2010-03-12'
    }]
  },
  inname(e) {
    let name = e.detail.value;
    this.setData({
      name: name
    })
  },
  dateNew(data){
    var date=new Date(data);
    return date.getFullYear()+'-'+((date.getMonth()+1<10?'0'+(date.getMonth()+1):date.getMonth()+1))+'-'+((date.getDate()<10?'0'+(date.getDate()):date.getDate()))
  },
  jumpSwiper(){
    wx.navigateTo({
      url: '../productLine/details'
    })
  },
  jump(e){
    var url=this.data.list[e.currentTarget.dataset['index']].url;
    wx.navigateTo({
      url: 'details'
    })
  },
  getNeedLists(){
    console.log(that.data.name)
    api.jinguang.getNeedList({
      type:1,
      source:1,
      status:2,
      page:0,
      size:10,
      keyword:that.data.name,
      success: function (res) {
        for(var i=0;i<res.data.length;i++){
          res.data[i].createTime=that.dateNew(res.data[i].createTime)
        }
        that.setData({
          list:res.data
        })
        console.log(res)
      },
      failure: function (resultCode, resultText) {
    
      }
    })
  },
  getNeedList(){
	// 函数：getNeedList 参数：type=1,source = 1,status = 1  
	api.jinguang.getNeedList({
	  type:1,
	  source:1,
    status:2,
	  page:0,
	  size:10,
	  success: function (res) {
      for(var i=0;i<res.data.length;i++){
        res.data[i].createTime=that.dateNew(res.data[i].createTime)
      }
	    that.setData({
	      list:res.data
	    })
	    console.log(res)
	  },
	  failure: function (resultCode, resultText) {
	
	  }
	})
  },
  // 广告
  getValidADList(){
    var that=this;
    // 参数：type=1，page 1：首页，2：招标信息，
    // 3：在线活动，4：系列产品，5：安装施工，6：物流信息
    api.jinguang.getValidADList({
      type:1,
      page:2,
      success: function (res) {
        that.setData({
          'swiperData.list':res
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
    this.getValidADList();
    this.getNeedList();
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