// pages/setup/logon.js
const api = require("../../utils/api-wx-1001-v2.js");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    codeI: 60,
    phone: null,
    code: null,
    isPhone: false,
  },
  getCode(getDate) {
    var that = this;
   var ss= setInterval(() => {
      var time = that.data.codeI - 1;
      that.setData({
        codeI: time,
      })
      if (time == 0) {
        clearInterval(ss);
        that.setData({
          codeI: 60,
        })
      }
    }, 1000)
  },
  jumpCode() {
    var that = this;
    var phone = this.data.phone;
    let str = /^1\d{10}$/
    if (str.test(phone)) {
      if (this.data.codeI == 60) {
        api.jinguang.sendCodeByPhone({
          phone: '18900000000',
          success: function (res) {},
          failure: function (resultCode, resultText) {}
        });
        that.isAccountExistByPhone();
        that.getCode();
        wx.showToast({
          title: '已发送验证码！', // 标题
          icon: 'success', // 图标类型，默认success
          duration: 3000 // 提示窗停留时间，默认1500ms
        })
      }
    } else {
      wx.showToast({
        title: '请输入正确的手机号码', // 标题
        icon: 'none', // 图标类型，默认success
        duration: 3000 // 提示窗停留时间，默认1500ms
      })
    }
  },
  isAccountExistByPhone() {
    var that = this;
    api.jinguang.isAccountExistByPhone({
      phone: '18900000000',
      zone: '86',
      success: function (res) {
        console.log({
          res
        });
        console.log('5555')
        that.isPhone = res.data;
      },
      failure: function (resultCode, resultText) {}
    });
  },
  login() {
    var phone = this.data.phone;
    let str = /^1\d{10}$/;
    if (str.test(phone)) {
      if (that.isPhone) {
        api.jinguang.loginByPhoneAndPassword({
          phone: '18900000000',
          password: '123456',
          code: '123456',
          success: function (res) {
            console.log({
              res
            });
            wx.showToast({
              title: '登录成功！', // 标题
              icon: 'none', // 图标类型，默认success
              duration: 3000 // 提示窗停留时间，默认1500ms
            })
            wx.navigateBack({
              delta: 1
            })
          },
          failure: function (resultCode, resultText) {}
        });
      } else {
        api.jinguang.registerByPhone({
          phone: '18900000000',
          password: '123456',
          code: '123456',
          success: function (res) {
            console.log({
              res
            });
            wx.showToast({
              title: '登录成功！', // 标题
              icon: 'none', // 图标类型，默认success
              duration: 3000 // 提示窗停留时间，默认1500ms
            })
            wx.navigateBack({
              delta: 1
            })
          },
          failure: function (resultCode, resultText) {}
        });
      }






    } else {
      wx.showToast({
        title: '请输入正确的手机号码', // 标题
        icon: 'none', // 图标类型，默认success
        duration: 3000 // 提示窗停留时间，默认1500ms
      })
    }
  },
  inputPhone(e) {
    let phoneNumber = e.detail.value;
    this.setData({
      phone: phoneNumber
    })
  },
  inputCode(e) {
    let code = e.detail.value;
    this.setData({
      code: code
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