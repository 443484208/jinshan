var API_APP_ID= 1001;
var API_CREATE_TIME= 1586705426733;
var API_KEY= "1q2w3e4r5t6y7u8i";
var BASE_PATH_DEV= "https://dev.youdashi.cn/jinguang";
var BASE_PATH_RELEASE= "https://renzibu.cn";
var WEBSOCKET_URL_DEV= "wss://dev.youdashi.cn/jinguang/websocket";
var WEBSOCKET_URL_RELEASE= "wss://renzibu.cn/websocket";

var base64 = require('./base64.js');
var util = require('./util.js');
var IS_DEV = true;

var getBasePath = function() {
	return IS_DEV ? BASE_PATH_DEV : BASE_PATH_RELEASE;
}

var WEBSOCKET_URL = IS_DEV ? WEBSOCKET_URL_DEV : WEBSOCKET_URL_RELEASE;
var _CLIENT_ID_KEY = "client-id";

var getClientId = function() {
	return "a2cfd7b3-34ee-406b-8c3b-7293bcaaa7ca";
}

var ApiResultHandler = {
	onAuthFailed : function() {
		// 账号授权失败
	},
	onServerError : function(res, apiUrl) {
		var error = "API地址：" + apiUrl + "\n错误描述:\n" + res.data.resultText;
		// 服务器异常
		wx.showModal({
			title : '服务器异常',
			showCancel : false,
			content : error,
			success : function(res) {
			}
		})
	},
	onNetworkError : function(res) {
		var errMsg = res.errMsg;
		// 网络异常
		var errTxt = null;
		if (errMsg) {
			if (errMsg.indexOf('timeout') > -1) {
				errTxt = '网络请求超时，请稍候重试';

			} else if (errMsg.indexOf('fail') > -1) {
				errTxt = '网络请求失败，请稍候重试';
			}
		}
		if (errTxt) {
			errTxt = '请求失败，请稍候重试,错误信息:' + res;
		}
		wx.showToast({
			title : errTxt,
			icon : 'none',
			duration : 1500
		});
	}
}

var __setSessionId = function(sessionId) {
	wx.setStorageSync('sessionId', sessionId);
}
var __getSessionId = function() {
	return wx.getStorageSync('sessionId');
}

var syncSessionId = function(cookie) {
	if(!cookie) {
		return;
	}
	var cookieItems = cookie.split(";");
	for(var i = 0; i < cookieItems.length; i++) {
		var items = cookieItems[i].split('=');
		if(items.length == 2) {
			var key = items[0];
			var val = items[1];
			if(key.toUpperCase() == 'JSESSIONID') {
				__setSessionId(val);
				break;
			}
		}
	}
}

/**
 * 发送请求
 */
var sendApiRequest = function(apiUrl, paramString, format, success) {
	if (paramString != "") {
		paramString += "&";
	}
	paramString += "appVer=1.0&apiVer=1&appId=" + API_APP_ID
			+ "&os=10&osVer=0.00&clientId=" + getClientId();

	var encodeParamString = "";

	var nameAndValues = paramString.split("&");
	var names = [];
	var params = {};
	for (var i = 0; i < nameAndValues.length; i++) {
		var values = nameAndValues[i].split("=");
		names.push(values[0]);
		params[values[0]] = values[1];

		if (encodeParamString != "") {
			encodeParamString += "&";
		}
		encodeParamString += values[0];
		encodeParamString += "=" + encodeURIComponent(values[1]);
	}
	names.sort(function(a, b) {
		return a.localeCompare(b);
	});
	var finalParams = "";
	for (var i = 0; i < names.length; i++) {
		finalParams += names[i];
		finalParams += params[names[i]];
	}
	var sign = base64.CusBASE64.encoder(util.md5(finalParams + API_KEY));
	console.log("request:url=" + apiUrl + ", param=" + encodeParamString);
	wx.request({
		url : apiUrl,
		data : encodeParamString + "&sign=" + sign,
		header : {
			"content-type" : "application/x-www-form-urlencoded",
			"token" : wx.getStorageSync('token'),
			"Cookie" : "JSESSIONID=" + __getSessionId()
		},
		method : "POST",
		success : function(res) {
			syncSessionId(res.header['Set-Cookie']);
			var resultCode = res.data.resultCode;
			if (resultCode == 95 || resultCode == 6) {
				// TOKEN过期、或验证失败
				if (ApiResultHandler.onAuthFailed) {
					ApiResultHandler.onAuthFailed();
					return;
				}

			} else if (resultCode == -5 || resultCode == -6) {
				if (ApiResultHandler.onServerError) {
					ApiResultHandler.onServerError(res, apiUrl);
					return;
				}
			}
			console.log(apiUrl + ":");
			console.log(res.data);
			success(res.data);
		},
		fail : function(res) {
			// console.log("请求失败")
			if (res) {
				ApiResultHandler.onNetworkError(res);
			} else {
				console.log('unknown error');
			}
			// return typeof cb == "function" && cb("请求失败")
		}
	})

}
// 通过字面量方式实现的函数each
var each = function(object, callback) {
	var type = (function() {
		switch (object.constructor) {
		case Object:
			return 'Object';
			break;
		case Array:
			return 'Array';
			break;
		case NodeList:
			return 'NodeList';
			break;
		default:
			return 'null';
			break;
		}
	})();
	// 为数组或类数组时, 返回: index, value
	if (type === 'Array' || type === 'NodeList') {
		// 由于存在类数组NodeList, 所以不能直接调用every方法
		[].every.call(object, function(v, i) {
			return callback.call(v, i, v) === false ? false : true;
		});
	}
	// 为对象格式时,返回:key, value
	else if (type === 'Object') {
		for ( var i in object) {
			if (callback.call(object[i], i, object[i]) === false) {
				break;
			}
		}
	}
};

var getApiRequestJson = function(apiUri, paramMap, success) {
	var apiUrl = getBasePath() + apiUri;
	var paramString = "";
	each(paramMap, function(key, value) {
		if (typeof value == 'function') {
			return;
		}
		if (value != null && value != undefined) {
			if (paramString != '') {
				paramString += "&";
			}
			paramString += key + "=" + encodeURIComponent(value);
		}
	});
	return sendApiRequest(apiUrl, paramString, "json", success);
};

exports.IS_DEV = IS_DEV;
exports.WEBSOCKET_URL = WEBSOCKET_URL;
exports.ApiResultHandler = ApiResultHandler;

var RESULT_CONNECT_ERROR=-10;
var RESULT_HIGHT_CONCURRENCY=-9;
var RESULT_UNKNOWN_APP_ID=-8;
var RESULT_UNSUPPORTED_API_VERSION=-7;
var RESULT_API_NOT_FOUND=-6;
var RESULT_EXCEPTION=-5;
var RESULT_PARAM_ERROR=-4;
var RESULT_BASIC_INFO_NOT_FOUND=-3;
var RESULT_JSON_ERROR=-2;
var RESULT_SIGN_ERROR=-1;
var RESULT_SUCCESS=1;
var RESULT_FAILED=2;
var RESULT_SEND_EMAIL_ERROR=3;
var RESULT_ACCOUNT_EXIST=4;
var RESULT_PERMISSION_DENIED=5;
var RESULT_ACCOUNT_AUTH_FAILED=6;
var RESULT_ACCOUNT_NOT_FOUND=7;
var RESULT_INVALID_PHONE_NUMBER=8;
var RESULT_VERIFY_CODE_ERROR=9;
var RESULT_INVALID_PASSWORD=10;
var RESULT_PHONE_BOUND_ERROR=11;
var RESULT_INVALID_USER_PROFILE=12;
var RESULT_USER_PROFILE_NOT_FOUND=13;
var RESULT_INVALID_EMAIL=14;
var RESULT_STORAGE_NOT_FOUND=15;
var RESULT_IDCARD_ERROR=16;
var RESULT_UNSUPPORT_ACCOUNT_ROLE=17;
var RESULT_ACCOUNT_NEED_VALIDATE=18;
var RESULT_SEND_SMS_ERROR=19;
var RESULT_WEB_SOCKET_NOT_OPEND=20;
var RESULT_USER_PROFILE_EXIST=21;
var RESULT_ORDER_ERROR=22;
var RESULT_ACCOUNT_TOKEN_ERROR=23;
var RESULT_NAME_ALREADY_REAL=24;
var RESULT_THIRD_INFO_ALREADY_ACCOUNT=25;
var RESULT_ACCOUNT_REBIND_THIRD=26;
var RESULT_INVALID_ADDRESS=27;
var RESULT_PAYMENT_ERROR=28;
var RESULT_REQUEST_MORE_ORDER=29;
var RESULT_AMOUNT_VALUE_ERROR=30;
var RESULT_ORDER_EXPIRED=31;
var RESULT_EXIST_AD=32;
var RESULT_SEND_SMS_FREQUENCE=33;
var RESULT_INVALID_OLD_PASSWORD=34;
var RESULT_ORDER_COUNT_OVER_MAX=35;
var RESULT_CODE_THIRD_APP_ERROR=36;
var RESULT_THIRD_AUTH_ERROR=37;
var RESULT_WX_SESSION_NOT_FOUND=38;
var RESULT_CODE_AMOUNT_NOT_ENOUGH=39;
var RESULT_BANK_CARD_NOT_BIND=40;
var RESULT_AD_ALREADY_ACTIVED=41;
var RESULT_MESSAGE_SEND_ERROR=42;
var RESULT_BANK_CARD_NUM_ERROR=43;
var RESULT_CATEGORY_NAME_EXIST=45;
var RESULT_CATEGORY_NOT_FOUND=46;
var RESULT_SHARE_ERROR=55;
var RESULT_COMMENT_NOT_FOUND=56;

var jinguangResultCode = {"45":"名称已存在","46":"不存在","-10":"服务器链接失败","10":"密码格式不正确","11":"绑定手机错误","55":"分享错误","12":"用户资料不正确","56":"评论不存在","13":"用户资料不存在","14":"邮箱不合法","-1":"签名错误","15":"存储资源不存在","-2":"JSON解析错误","16":"身份证信息有误","-3":"没有找到基础参数","17":"不支持的账号角色","-4":"参数错误","18":"账号信息需要验证","-5":"服务器异常","19":"短信发送失败","-6":"API路径不存在","-7":"API版本不支持","-8":"未知的AppId","-9":"高并发","1":"成功","2":"失败","3":"发送邮件错误","4":"账号已存在","5":"权限不足","6":"账号验证失败","7":"账号不存在","8":"手机号不合法","9":"验证码错误","20":"WebSocket没有打开","21":"用户资料已经存在","22":"订单异常","23":"账号Token错误","24":"已经是实名","25":"已被其他账号使用","26":"重复绑定第三方账号","27":"地址不合法","28":"支付错误","29":"申请了更多的订单","30":"金额异常","31":"订单已过期","32":"存在广告","33":"短信发送过于频发","34":"旧密码不正确","35":"超出最大允许的订单数","36":"第三方应用错误","37":"第三方授权出错","38":"微信小程序会话秘钥不存在","39":"余额不足","40":"未绑定银行卡","41":"广告已被激活过了","42":"发送消息错误","43":"银行卡卡号错误"}
var jinguang = {appId:1001,
setBasePath : function(basePath) {this.basePath = basePath;},
__callback : function(res, param) {var resultCode = res.resultCode;var resultText = res.resultText;if (resultCode == RESULT_SUCCESS) {	if (param && param.success) {		param.success(res.data);	}} else {	if (param && param.failure) {		param.failure(resultCode, resultText);	}}}
,getQrCodeBase64Data: function(param){
getApiRequestJson("/api/common/qrcode",param,function(res) {
jinguang.__callback(res, param);});},
getSettingConfig: function(param){
getApiRequestJson("/api/common/config",param,function(res) {
jinguang.__callback(res, param);});},
getCityByIp: function(param){
getApiRequestJson("/api/common/iptocity",param,function(res) {
jinguang.__callback(res, param);});},
getViewCount: function(param){
getApiRequestJson("/api/common/view",param,function(res) {
jinguang.__callback(res, param);});},
updateUserProfileIfNotNull: function(param){
getApiRequestJson("/api/userprofile/update/notnull",param,function(res) {
jinguang.__callback(res, param);});},
getUserProfileDetail: function(param){
getApiRequestJson("/api/userprofile/detail",param,function(res) {
jinguang.__callback(res, param);});},
getUserProfileByPhone: function(param){
getApiRequestJson("/api/userprofile/phone",param,function(res) {
jinguang.__callback(res, param);});},
getPoi: function(param){
getApiRequestJson("/api/lbs/poi",param,function(res) {
jinguang.__callback(res, param);});},
getPoiByAddressInfo: function(param){
getApiRequestJson("/api/lbs/poi/address",param,function(res) {
jinguang.__callback(res, param);});},
getValidADList: function(param){
getApiRequestJson("/api/ad/list",param,function(res) {
jinguang.__callback(res, param);});},
activeAD: function(param){
getApiRequestJson("/api/ad/active",param,function(res) {
jinguang.__callback(res, param);});},
clickAD: function(param){
getApiRequestJson("/api/ad/click",param,function(res) {
jinguang.__callback(res, param);});},
deleteAD: function(param){
getApiRequestJson("/api/ad/delete",param,function(res) {
jinguang.__callback(res, param);});},
getAD: function(param){
getApiRequestJson("/api/ad/detail",param,function(res) {
jinguang.__callback(res, param);});},
saveAD: function(param){
getApiRequestJson("/api/ad/save",param,function(res) {
jinguang.__callback(res, param);});},
addShare: function(param){
getApiRequestJson("/api/share/add",param,function(res) {
jinguang.__callback(res, param);});},
getRoleList: function(param){
getApiRequestJson("/api/account/role/list",param,function(res) {
jinguang.__callback(res, param);});},
getAuthUser: function(param){
getApiRequestJson("/api/account/detail",param,function(res) {
jinguang.__callback(res, param);});},
sendCodeByPhone: function(param){
getApiRequestJson("/api/account/phone/code/send",param,function(res) {
jinguang.__callback(res, param);});},
verifyByPhone: function(param){
getApiRequestJson("/api/account/phone/code/verify",param,function(res) {
jinguang.__callback(res, param);});},
decryptWxData: function(param){
getApiRequestJson("/api/account/third/wx/data/decrypt",param,function(res) {
jinguang.__callback(res, param);});},
bindPhone: function(param){
getApiRequestJson("/api/account/phone/bind",param,function(res) {
jinguang.__callback(res, param);});},
getRoleTypeList: function(param){
getApiRequestJson("/api/account/type/role/list",param,function(res) {
jinguang.__callback(res, param);});},
updatePasswordByPhone: function(param){
getApiRequestJson("/api/account/password/phone/update",param,function(res) {
jinguang.__callback(res, param);});},
getAndBindWeixinPhoneNumber: function(param){
getApiRequestJson("/api/account/weixin/phone/bind",param,function(res) {
jinguang.__callback(res, param);});},
isAccountExistByPhone: function(param){
getApiRequestJson("/api/account/phone/exist",param,function(res) {
jinguang.__callback(res, param);});},
updateOrderCancel: function(param){
getApiRequestJson("/api/order/update/cancel",param,function(res) {
jinguang.__callback(res, param);});},
updateOrderWaitRefund: function(param){
getApiRequestJson("/api/order/update/refund/wait",param,function(res) {
jinguang.__callback(res, param);});},
updateOrderRefund: function(param){
getApiRequestJson("/api/order/update/refund",param,function(res) {
jinguang.__callback(res, param);});},
updateRefundFailure: function(param){
getApiRequestJson("/api/order/update/refund/failure",param,function(res) {
jinguang.__callback(res, param);});},
updateOrderProcess: function(param){
getApiRequestJson("/api/order/update/process",param,function(res) {
jinguang.__callback(res, param);});},
updateOrderComplete: function(param){
getApiRequestJson("/api/order/update/complete",param,function(res) {
jinguang.__callback(res, param);});},
generateRechargeOrder: function(param){
getApiRequestJson("/api/order/generate/recharge/order",param,function(res) {
jinguang.__callback(res, param);});},
getOrderList: function(param){
getApiRequestJson("/api/order/list",param,function(res) {
jinguang.__callback(res, param);});},
registerByPhone: function(param){
getApiRequestJson("/api/account/register/phone",param,function(res) {
jinguang.__callback(res, param);});},
getPrivateDownloadUrl: function(param){
getApiRequestJson("/api/storage/url",param,function(res) {
jinguang.__callback(res, param);});},
getUploadPolicy: function(param){
getApiRequestJson("/api/storage/policy",param,function(res) {
jinguang.__callback(res, param);});},
addFromUrl: function(param){
getApiRequestJson("/api/storage/from/url",param,function(res) {
jinguang.__callback(res, param);});},
getParentIsNullList: function(param){
getApiRequestJson("/api/category/list/parentnull",param,function(res) {
jinguang.__callback(res, param);});},
getChildCategory: function(param){
getApiRequestJson("/api/category/child/category",param,function(res) {
jinguang.__callback(res, param);});},
deleteCategory: function(param){
getApiRequestJson("/api/category/delete",param,function(res) {
jinguang.__callback(res, param);});},
saveCategory: function(param){
getApiRequestJson("/api/category/save",param,function(res) {
jinguang.__callback(res, param);});},
getCategoryTree: function(param){
getApiRequestJson("/api/category/tree",param,function(res) {
jinguang.__callback(res, param);});},
logout: function(param){
getApiRequestJson("/api/account/logout",param,function(res) {
jinguang.__callback(res, param);});},
getCountInfo: function(param){
getApiRequestJson("/api/count/info",param,function(res) {
jinguang.__callback(res, param);});},
addViewInfo: function(param){
getApiRequestJson("/api/view/add",param,function(res) {
jinguang.__callback(res, param);});},
getViewLogList: function(param){
getApiRequestJson("/api/view/list",param,function(res) {
jinguang.__callback(res, param);});},
getShowViewLog: function(param){
getApiRequestJson("/api/view/show",param,function(res) {
jinguang.__callback(res, param);});},
saveView: function(param){
getApiRequestJson("/api/view/view/save",param,function(res) {
jinguang.__callback(res, param);});},
loginByToken: function(param){
getApiRequestJson("/api/account/login/token",param,function(res) {
jinguang.__callback(res, param);});},
loginByThird: function(param){
getApiRequestJson("/api/account/login/third",param,function(res) {
jinguang.__callback(res, param);});},
loginByPhoneAndPassword: function(param){
getApiRequestJson("/api/account/login/phone",param,function(res) {
jinguang.__callback(res, param);});},
saveNeed: function(param){
getApiRequestJson("/api/need/save",param,function(res) {
jinguang.__callback(res, param);});},
updateStatus: function(param){
getApiRequestJson("/api/need/update/status",param,function(res) {
jinguang.__callback(res, param);});},
getNeedDetail: function(param){
getApiRequestJson("/api/need/detail",param,function(res) {
jinguang.__callback(res, param);});},
getNeedList: function(param){
getApiRequestJson("/api/need/list",param,function(res) {
jinguang.__callback(res, param);});},
addOrDeleteCollection: function(param){
getApiRequestJson("/api/collection/addordelete",param,function(res) {
jinguang.__callback(res, param);});},
getCollectionList: function(param){
getApiRequestJson("/api/collection/list",param,function(res) {
jinguang.__callback(res, param);});},
setPaymentComplete: function(param){
getApiRequestJson("/api/payment/complete",param,function(res) {
jinguang.__callback(res, param);});},
getPaymentStatus: function(param){
getApiRequestJson("/api/payment/status",param,function(res) {
jinguang.__callback(res, param);});},
generatePayParam: function(param){
getApiRequestJson("/api/payment/param",param,function(res) {
jinguang.__callback(res, param);});},
getPaymentList: function(param){
getApiRequestJson("/api/payment/getpaymentlist",param,function(res) {
jinguang.__callback(res, param);});},
getCategoryCompanyList: function(param){
getApiRequestJson("/api/company/list",param,function(res) {
jinguang.__callback(res, param);});},
saveCompanyProduct: function(param){
getApiRequestJson("/api/company/product/save",param,function(res) {
jinguang.__callback(res, param);});},
saveCompany: function(param){
getApiRequestJson("/api/company/save",param,function(res) {
jinguang.__callback(res, param);});},
deleteCompany: function(param){
getApiRequestJson("/api/company/delete",param,function(res) {
jinguang.__callback(res, param);});},
getCompanyDetail: function(param){
getApiRequestJson("/api/company/detail",param,function(res) {
jinguang.__callback(res, param);});},
deleteCompanyProduct: function(param){
getApiRequestJson("/api/company/product/delete",param,function(res) {
jinguang.__callback(res, param);});},
getCompanyProductDetail: function(param){
getApiRequestJson("/api/company/product/detail",param,function(res) {
jinguang.__callback(res, param);});},
getCompanyProductList: function(param){
getApiRequestJson("/api/company/product/list",param,function(res) {
jinguang.__callback(res, param);});},
getCompanyTypeProductList: function(param){
getApiRequestJson("/api/company/product/type/list",param,function(res) {
jinguang.__callback(res, param);});}}
exports.jinguang = jinguang;
exports.jinguangResultCode = jinguangResultCode;