// pages/tool/tool.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    swiperData: [{
      src: './../../image/banner@2x.png'
    }, {
      src: './../../image/banner@2x.png'
    }, {
      src: './../../image/banner@2x.png'
    }],
    background: ['demo-text-1', 'demo-text-2', 'demo-text-3'],
    indicatorDots:true,
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
            "text": "采购",
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
            "iconPath":"icon/gongjus.png",
            "selectedIconPath":"icon/gongjus.png"
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
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
// var timer = setInterval(this.autoScrollLine, 30)
    // console.log(document.getElementById('scroll-box'))
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

  },
  autoScrollLine() {
    var box = document.getElementById('scroll-box')
    var parent = document.getElementsByTagName('ul')[0]
    var parent2 = document.getElementsByTagName('ul')[1]
    parent2.innerHTML = parent.innerHTML
    /*判断滚动内容是否已经滚完，滚完了则滚动的值重新设置到0  
            否则就每隔30毫秒向上滚动1px*/

    if (box.scrollTop >= parent.offsetHeight) {
      box.scrollTop = 0;
    } else {
      box.scrollTop++;
    }
    /*判断滚动的距离刚好为一条公告的高度时停掉定时器，
    隔1s之后重新启动定时器即可实现公告滚动停留效果 */

    if (box.scrollTop % box.offsetHeight == 0) {
      clearInterval(timer)
      setTimeout(() => {
        timer = setInterval(this.autoScrollLine, 30)
      }, 1000)

    }
  },

})