// pages/tendering/tendering.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
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
  getNeedList(){
	// 函数：getNeedList 参数：type=1,source = 1,status = 1  
	api.jinguang.getNeedList({
	  type:1,
	  source:1,
	  status:1,
	  page:0,
	  size:10,
	  success: function (res) {
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