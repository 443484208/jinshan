// pages/chat/chat.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    name:null,
    list:[{
      type:0,
      content:' 您好，我是客服机器人米免。您是否要咨询以下问题呢?如果不是，请直接输入您的问题:)1.我的订单什么时候发货2.我想修改订单3.如何办理退换货/退换插流程怎么走?4.退换货的时效是多少天?5.退款时长为多少?',
      date:'1月10日 10:48'
    },{
      type:1,
      content:'怎么查找订单',
      date:'1月10日 10:48'
    }]
  },
  jumpDate(){
    var newDate=new Date();
    var month=newDate.getMonth()+1;
    var day=newDate.getDate();
    var hour=newDate.getHours();
    var  min=newDate.getMinutes();
    return (month+"月"+day+'日 '+hour+':',min)
  },
  inname(e){
    this.setData({
      name: e.detail.value
       
      })
  },
  searchSubmit(){
    console.log(".....")
    var arr={
      type:1,
      content:this.data.name,
      date:this.jumpDate()
    }
    var list=this.data.list;
    list.push(arr);
    console.log(list)

    this.setData({
      list:list,
      name:'',
    })
  },
  add(){
      wx.chooseImage({
        count: 1,
        sizeType: ['original', 'compressed'],
        sourceType: ['album', 'camera'],
        success (res) {
          // tempFilePath可以作为img标签的src属性显示图片
          const tempFilePaths = res.tempFilePaths
          console.log(tempFilePaths)
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