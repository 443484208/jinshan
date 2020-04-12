var api = require("/api-wx-1001-v2.js")
var util = require('/util.js')
var typeImage = 1
var typeVideo = 2
var typeVoice = 3

var dataType = 0
/**buKeytype 
 * 1 修改头像
 * 2 添加视频
 * 3 添加语音
 * 4 添加图片
 * 5 添加印业执照和身份证图片
 * 6 上传学校logo
 * 
 * callback 未异步回调函数
  */
function uploadfile(fileUrl, oldObjectKey, buKeytype, duration,callback){
  // 返回选定照片的本地文件路径列表，tempFilePath可以作为img/video标签的src属性显示图片
  var videoKey = null, voiceKey = null, avtarKey = null, imageKey = null;
  var fileKey = null
  buKeytype = parseInt(buKeytype)
  console.log(buKeytype)
  if (buKeytype != 3 && buKeytype !=2   ){
      for (var u = 0; u < fileUrl.length; u++) {
       
        if (u == fileUrl.length-1){
          uploadFile(fileUrl[u], buKeytype, duration,function (res) {
            callback(res)
          })
        }else{
          uploadFile(fileUrl[u], buKeytype,duration,function (res) {
          })
        }
      }
  }else{
    uploadFile(fileUrl, buKeytype, duration, function (res) {
      callback(res)
    })
  }
  }
 

function uploadFile(fileUrl, buKeytype,duration,callback){
  var isPublic = buKeytype == 5?false:true
  var fileKey = null
  console.log(fileUrl)
  var myDate = new Date()
  var ossPath = myDate.getFullYear()
  // 获取文件后缀
  var pathArr = fileUrl.split('.')
  //  随机生成文件名称
  var fileRandName = Date.now() + "" + parseInt(Math.random() * 1000)
  var fileName = fileRandName + '.' + pathArr[3]
  // 要提交的key
  fileKey = ossPath + '/' + fileName
  //md5加密
  fileKey = util.md5(fileKey)
  if(buKeytype == 4){
    dataType = typeImage
  }else if (buKeytype == 3) {//上传语音
    fileKey = fileKey + '.aac'
    dataType = typeVoice
  }else  if (buKeytype == 2) {//上传视频
    fileKey = fileKey + '.mp4'
    dataType = typeVideo
  }
  wx.showLoading({
    title: '文件上传中···',
  })
  api.yds.getUploadPolicy({
    isPublic: isPublic, isHttps:true, success:function (datas) {
    var accessid = datas.accessKeyId;
    var signature = datas.signature;
    var policyBase64 = datas.policy;
    var host = datas.host; 
    wx.uploadFile({
      url: host,
      filePath: fileUrl,
      name: 'file',
      formData: {
        name: fileName,
        key: fileKey,
        policy: policyBase64,
        OSSAccessKeyId: accessid,
        signature: signature,
        success_action_status: "200"
      },
      success: function (re) {
        var data = re.data
        if (re.statusCode != 200) {
          wx.showModal({
            title: '提示',
            content: re,
            showCancel: false
          })
          return;
        }
        if (buKeytype == 5 ){
            console.log("addResource" + fileKey)
            callback(fileKey)
             wx.hideLoading()
        } else if(buKeytype == 1){//修改头像
          var avtarKey = fileKey;
          api.yds.updateUserProfileIfNotNull({
            qq: null, skills: null, weixin: null, gender: null, zone: null, phone: null, graduationSchool: null, avatarObjectKey: avtarKey, name: null, degree: null, introduction: null, email:null, success:function (res) {
            //更新用户信息
            api.yds.getAuthUser({ success: function (res) {
              wx.setStorageSync('authUserinfo', res)
              callback(fileKey)
              wx.hideLoading()
            }})
          }
        })
        } else if (buKeytype == 6){
          wx.hideLoading()
          callback(fileKey)
        }
        else{
          api.yds.addResource({
            type: dataType, objectKey: fileKey, duration: duration, success: function (ress) {
              wx.hideLoading()
              callback(fileKey)
            }
          })
        }
       
      },
      fail: function (r) {
        console.log(r);
        wx.hideLoading()
        
      }
    })
  }})
  return fileKey
 }

function downloadImage(url) {
  // 下载文件  
  wx.downloadFile({
    url: url,
    success: function (res) {
      console.log("下载文件：success");
      console.log(res);

      // 保存图片到系统相册  
      wx.saveImageToPhotosAlbum({
        filePath: res.tempFilePath,
        success(res) {
          console.log("保存图片：success");
          wx.showToast({
            title: '保存成功',
          });
        },
        fail(res) {
          console.log("保存图片：fail");
          console.log(res);
        }
      })
    },
    fail: function (res) {
      console.log("下载文件：fail");
      console.log(res);
    }
  })
}

module.exports = {
  uploadfile: uploadfile,
  downloadImage: downloadImage,
}