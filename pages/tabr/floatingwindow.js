// tabBarComponent/tabBar.js
const app = getApp();
Component({
	/**
	 * 组件的属性列表
	 */
	properties: {
		winData: {
			type: Object,
			list: {
				booleam:false
			},
		}
	},

	/**
	 * 组件的初始数据
	 */
	data: {},

	/**
	 * 组件的方法列表
	 */
	methods: {
		jumpSwiper() {
			
					wx.navigateTo({
				url: '../chat/chat'
			})
				
		
		},
	}
})
