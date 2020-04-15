// pages/activity/details.js
const api = require("../../utils/api-wx-1001-v2.js");
var that;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list:[],
    sideI:null,
    detailsI:1,
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
    tabbar: {
      value: {
        "backgroundColor": "#ffffff",
        "color": "#979795",
        "selectedColor": "#1c1c1b",
        "list": [
          {
            "pagePath": "../../pages/index/index",
            "text": "首页",
            "iconPath":"icon/homes.png",
            "selectedIconPath":"icon/homes.png"
          }, {
            "pagePath": "../../pages/purchase/purchase",
            "text": "采购需求",
            "iconPath":"icon/cagou2.png",
            "selectedIconPath":"icon/cagou2.png"
          }, {
            "pagePath": "../../pages/release/release",
            "text": "发布",
            "iconPath":"icon/fabu.png",
            "selectedIconPath":"icon/fabu.png",
            "isSpecial": true,
          }, {
            "pagePath": "../../pages/tool/tool",
            "text": "工具",
            "iconPath":"icon/gongju.png",
            "selectedIconPath":"icon/gongju.png"
          }, {
            "pagePath": "../../pages/mine/mine",
            "text": "我的",
            "iconPath":"icon/mine.png",
            "selectedIconPath":"icon/mine.png"
          }
        ]
      }
    }
  },
  getDifferTime(getDate) {
    const nowDate = new Date();
    const targetDate =   new Date(getDate);

    const differTime = new Date(nowDate.getTime() - targetDate.getTime());
    const differDays = parseInt(differTime / (1000 * 60 * 60 * 24));
    const differYear = parseInt(differDays / 365);
    const differMonth = parseInt(differDays / 30);
    const differHours = nowDate.getHours() - targetDate.getHours();
    const differMinutes = Math.abs(nowDate.getMinutes() - targetDate.getMinutes());
    const differAry = [{
      dateDes: `${differYear}年前`,
      dateVal: differYear
    }, {
      dateDes: `${differMonth}月前`,
      dateVal: differMonth
    }, {
      dateDes: `${differDays}日前`,
      dateVal: differDays
    }, {
      dateDes: `${differHours==1&&differMinutes==0?`${differHours}小时前`:`${differHours}小时前`}`,
      dateVal: (differHours == 1 && differMinutes == 0) ? differHours : 0
    }, {
      dateDes: `${differHours>=1?`${differHours}小时${differMinutes}分前`:`${differMinutes}分钟前`}`,
      dateVal: differHours >= 1 ? differHours : differMinutes
    }];
    console.log(differAry)
    for(var i=0;i<differAry.length;i++){
      if(differAry[i].dateVal > 0){
        return differAry[i].dateDes
      }
    }
  },
  // 广告
  getValidADList(){
    // 参数：type=1，page 1：首页，2：招标信息，
    // 3：在线活动，4：系列产品，5：安装施工，6：物流信息
    api.jinguang.getValidADList({
      type:1,
      page:8,
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
  // 列表
  getNeedLists(i){
    // 参数source (1:平台， 2：用户)
    api.jinguang.getNeedList({
      type:2,
      source:i,
      status:2,
      page:0,
      size:30,
      success: function (res) {
        for(var i=0;i<res.data.length;i++){
          res.data[i].createTime=that.getDifferTime(res.data[i].createTime)
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
  // 列表
  getNeedList(){
    // 参数source (1:平台， 2：用户)
    api.jinguang.getNeedList({
      type:2,
      source:1,
      status:2,
      page:0,
      size:30,
      success: function (res) {
        for(var i=0;i<res.data.length;i++){
          res.data[i].createTime=that.getDifferTime(res.data[i].createTime)
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
  jump(e){
    // this.setData({
    //   detailsI:e.currentTarget.dataset['index']
    // })
    console.log(e.currentTarget.dataset['index'])
    wx.setStorageSync('list', e.currentTarget.dataset['index'])
    wx.navigateTo({
      url: 'details?id='+e.currentTarget.dataset['index'].id
    })
  },
  jumpTo(e){
    wx.navigateTo({
      url: 'index'
    })
  },
  jumpI(e){
    this.setData({
      detailsI:e.currentTarget.dataset['index']
    })
    that.getNeedLists(e.currentTarget.dataset['index'])
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
   that=this;
   that.getValidADList();
   that.getNeedList();
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