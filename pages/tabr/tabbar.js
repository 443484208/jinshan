// tabBarComponent/tabBar.js
const app = getApp();
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    swiperData: {
      type: Object,
        list:[{
          src:'./../../image/bk-1.jpg'
        },{
          src:'./../../image/bk-2.jpg'
        },{
          src:'./../../image/bk-3.jpg'
        },{
          src:'./../../image/bk-4.jpg'
        }],
      
    }
  },
  
  /**
   * 组件的初始数据
   */
  data: {
  },

  /**
   * 组件的方法列表
   */
  methods: {
    jump(){
      wx.switchTab({
        url: '../index/index'
      })
    },
    jumpDetails(e){
      var list=this.data.list[e.currentTarget.dataset['index']];
      list.i=e.currentTarget.dataset['index'];
      wx.navigateTo({
        url: '../productLine/details?list='+JSON.stringify(list)
      })
    },
    start(e){
      wx.showToast({
        title: '收藏成功！', // 标题
        icon: 'success',  // 图标类型，默认success
        duration: 3000  // 提示窗停留时间，默认1500ms
      })
    },
    zhuanfa(e){
      wx.showToast({
        title: '转发成功！', // 标题
        icon: 'success',  // 图标类型，默认success
        duration: 3000  // 提示窗停留时间，默认1500ms
      })
    },
  }
})
