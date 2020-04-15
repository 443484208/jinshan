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
          coverUrl:'./../../image/bk-1.jpg'
        },{
          coverUrl:'./../../image/bk-2.jpg'
        },{
          coverUrl:'./../../image/bk-3.jpg'
        },{
          coverUrl:'./../../image/bk-4.jpg'
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
    jumpSwiper(e){
      if(e.currentTarget.dataset['index']){
        wx.navigateTo({
          url: '../productLine/details'
        })
      }else{

      }
      
    },
  }
})
