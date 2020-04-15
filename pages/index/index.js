//index.js
//获取应用实例
const app = getApp()
const api = require("../../utils/api-wx-1001-v2.js");
Page({
  data: {
    name:null,
    allCount:'',
    todayCount: '',
    newList:[1,2,3],
    winData:{},
    swiperData:{
        list:[{
          coverUrl:'./../../image/bk-1.jpg'
        },{
          coverUrl:'./../../image/bk-2.jpg'
        },{
          coverUrl:'./../../image/bk-3.jpg'
        },{
          coverUrl:'./../../image/bk-4.jpg'
        }]
    } ,
    list:[{
      src:'./../../image/biddinginformation.png',
      title:'招标信息',
      url:'tendering/tendering'
    },{
      src:'./../../image/activity.png',
      title:'在线活动',
      url:'activity/activity'
    },{
      src:'./../../image/ProductLine.png',
      title:'系列产品',
      url:'productLine/index'
    },{
      src:'./../../image/Reserve.png',
      title:'预留'
    },{
      src:'./../../image/Reserve.png',
      title:'预留'
    },{
      src:'./../../image/Installationandconstruction.png',
      title:'安装施工',
      url:'install/install'
    },{
      src:'./../../image/Logisticsservice.png',
      title:'物流服务',
      url:'logisticsservice/logisticsservice'
    },{
      src:'./../../image/legaladvice.png',
      title:'法律咨询',
      url:'legaladvice/legaladvice'
    },{
      src:'./../../image/Reserve.png',
      title:'预留'
    },{
      src:'./../../image/Reserve.png',
      title:'预留'
    }],
    tabbar: {
      value: {
        "backgroundColor": "#ffffff",
        "color": "#979795",
        "selectedColor": "#1c1c1b",
        "list": [
          {
            "pagePath": "../../pages/index/index",
            "text": "首页",
            "iconPath":"icon/home.png",
            "selectedIconPath":"icon/home.png"
          }, {
            "pagePath": "../../pages/purchase/purchase",
            "text": "采购需求",
            "iconPath":"icon/caigou.png",
            "selectedIconPath":"icon/caigou.png"
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
  inname(e) {
    let name = e.detail.value;
    this.setData({
      name: name
    })
  },
  // 广告
  getValidADList(){
    var that=this;
    // 参数：type=1，page 1：首页，2：招标信息，
    // 3：在线活动，4：系列产品，5：安装施工，6：物流信息
    api.jinguang.getValidADList({
      type:1,
      page:1,
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
  // 当天浏览量
 getShowViewLog(){
   var that=this;
    // 浏览量：getShowViewLog 参数：startTime (当天0点),endTime （当天11:59）
    // let startTime1 = parseInt(new Date(new Date(new Date().toLocaleDateString()).getTime()).getTime()/1000); // 当天0点
// let endTime1 = parseInt(new Date(new Date(new Date().toLocaleDateString()).getTime() +24 * 60 * 60 * 1000 -1).getTime()/1000);// 当天23:59
let startTime1 = new Date(new Date(new Date().toLocaleDateString()).getTime()).getTime(); // 当天0点
let endTime1 =new Date(new Date(new Date().toLocaleDateString()).getTime() +24 * 60 * 60 * 1000 -1).getTime();// 当天23:59
console.log(startTime1)
console.log(endTime1)
    api.jinguang.getShowViewLog({
      startTime:startTime1,
      endTime:endTime1,
      success: function (res) {
        that.setData({
          allCount: res.allCount,
          todayCount: res.todayCount
        })
      },
      failure: function (resultCode, resultText) {

      }
    })
  },
  jumpPhone(e){
    var phone=e.currentTarget.dataset['index'].userProfile.phoneNumber.phone;
    wx.makePhoneCall({
      phoneNumber: phone //仅为示例，并非真实的电话号码
    })
  },
 
  jumpFabulous(e){
    wx.showToast({
      title: '点赞成功',
      icon: 'success',
      duration: 2000
    })
  },
  jumpForwarde(e){
    wx.showToast({
      title: '转发成功',
      icon: 'success',
      duration: 2000
    })
  },
  jump(e){
    var url=this.data.list[e.currentTarget.dataset['index']].url;
    wx.navigateTo({
      url: '../'+url
    })
   console.log(e.currentTarget.dataset['index'])
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  jumpDetails(e) {
    wx.navigateTo({
      url: 'details'
    })
  },
  previewImage (e) {
    var current = e.currentTarget.dataset['index'];//获取data-src
    var imglist = [e.currentTarget.dataset['index']];//获取data-list
    console.log(current)
    console.log(imglist)
    wx.previewImage({
      current: current, // 当前显示图片的http链接  
      urls:imglist // 需要预览的图片http链接列表  
    })
  } , 
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
  // 最新消息
  getNewNoteLists(){
    var that=this;
    // 函数：getNeedList 参数：type=1,source = 1,status = 1
    api.jinguang.getNewNoteList({
      type:1,
      source:1,
      status:2,
      page:0,
      size:10,
      keyword:that.data.name,
      success: function (res) {
        for(var i =0;i<res.data.length;i++){
          res.data[i].createTime =that.getDifferTime(res.data[i].createTime);
        }
      that.setData({
        newList:res.data
      })
      },
      failure: function (resultCode, resultText) {

      }
    })
  },
  // 最新消息
  getNewNoteList(){
    var that=this;
    // 函数：getNeedList 参数：type=1,source = 1,status = 1
    api.jinguang.getNewNoteList({
      type:1,
      source:1,
      status:2,
      page:0,
      size:10,
      success: function (res) {
        for(var i =0;i<res.data.length;i++){
          res.data[i].createTime =that.getDifferTime(res.data[i].createTime);
        }
      that.setData({
        newList:res.data
      })
      },
      failure: function (resultCode, resultText) {

      }
    })
  },
  addViewInfo(){
    // 函数：addViewInfo 参数： targetType =9  targetId = 1
    api.jinguang.addViewInfo({
      targetType:9,
      targetId:1,
      success: function (res) {
      
      },
      failure: function (resultCode, resultText) {

      }
    })
  },
  onLoad: function () {
    this.getNewNoteList();
    this.addViewInfo();
    this.getValidADList();
    this.getShowViewLog();
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse){
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },
  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  }
})
