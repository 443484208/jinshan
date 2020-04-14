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
    sideBarList: [{
      key: 0,
      list: [{
        id: 0,
        name: '主机',
      }, {
        id: 1,
        name: ' 风机盘管 ',
      }, {
        id: 2,
        name: '空调机组',
      }, {
        id: 3,
        name: '冷却塔',
      }, {
        id: 4,
        name: '水箱',
      }, {
        id: 5,
        name: ' 水处理设备 ',
      }, {
        id: 6,
        name: '无负压阀',
      }]
    },
    {
      key: 1,
      list: [{
        id: 0,
        name: '风机',
      }, {
        id: 1,
        name: ' 风阀',
      }, {
        id: 2,
        name: '风口',
      }, {
        id: 3,
        name: ' 风管',
      }, {
        id: 4,
        name: '抗震支架',
      }, {
        id: 5,
        name: '防火门',
      }, {
        id: 6,
        name: '消声静压箱',
      }]
    },{
      key: 0,
      list: [{
        id: 0,
        name: '控制柜 ',
      }, {
        id: 1,
        name: '桥架',
      }]
    },{
      key: 0,
      list: [{
        id: 0,
        name: '组合式风阀',
      }, {
        id: 1,
        name: ' 地铁风机',
      }, {
        id: 2,
        name: ' 地铁消声器',
      }, {
        id: 3,
        name: ' 电缆支架 ',
      }, {
        id: 4,
        name: '声屏障',
      }]
    },{
      key: 0,
      list: [{
        id: 0,
        name: '汽车配件',
      }, {
        id: 1,
        name: ' 高压管',
      }, {
        id: 2,
        name: ' SMC化粪池',
      }, {
        id: 3,
        name: ' 加砂缠绕利品',
      }, {
        id: 4,
        name: ' GRC/GRP ',
      }, {
        id: 5,
        name: '3D打印',
      }]},{
        key: 0,
        list: [{
          id: 0,
          name: '环保',
        }, {
          id: 1,
          name: ' 净化',
        }, {
          id: 2,
          name: ' 通风格',
        }, {
          id: 3,
          name: ' 实验台',
        }]
    }],
    list:[{
      url:'../../image/1.jpg',
    },{
      url:'../../image/2.jpg',
    },{
      url:'../../image/3.jpg',
    }]
  },
  //导航处理
  sideBar(e) {
    that.getCompanyCategoryList(e.currentTarget.dataset['index']);
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
    console.log(id)

    api.jinguang.getCompanyCategoryList({
      categoryId :id,
      page :0,
      size :10,
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
  jump(e) {
    // wx.navigateTo({
    //   url: 'details'
    // })
wx.navigateTo({
      url: '../businessUnit/businessUnit?name='+e.currentTarget.dataset['item']
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