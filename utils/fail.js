import {yibaiduResultCode} from "./api-wx-1001-v2.js"
import {toast} from "./tools.js"
const fail=(code)=>{
	toast({
		showCancel:false,
		content:yibaiduResultCode[code]
	})
}
export default fail;