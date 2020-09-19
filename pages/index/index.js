const app = getApp();
Page({
  data: {
    StatusBar: app.globalData.StatusBar,
    CustomBar: app.globalData.CustomBar,
    Custom: app.globalData.Custom,
    leftFlag: false,
    openid: '',
    MenuAnimate: "slideInLeft",
    txtItemAnimate: "slideInLeft",
    HoverText:[{
      id:1,
      class: "allCards",
      text: "ALL CARDS",
      url: ""
    },{
      id:2,
      class: "alarm",
      text: "ALARM",
      url: ""
    },{
      id:3,
      class: "shareUs",
      text: "SHARE US",
      url: ""
    },{
      id:4,
      class: "nightMode",
      text: "NIGHT MODE",
      url: ""
    },{
      id:5,
      class: "feedBack",
      text: "FEEDBACK",
      url: ""
    },{
      id:6,
      class: "aboutUs",
      text: "ABOUT US",
      url: ""
    },]
  },
  onLoad(){
    //月
    console.log(new Date().toDateString().slice(4,7).toUpperCase())
    //日
    console.log(new Date().toDateString().slice(8,10))
    //年
    console.log(new Date().toDateString().slice(11,15))

    wx.login({
      success: (res)=>{
        wx.request({
          url: 'https://api.weixin.qq.com/sns/jscode2session?appid=wxf9fe1644856c5abc&secret=031e96ce4134e6df67ae9a8f475cc652&js_code='+res.code+'&grant_type=authorization_code',
          success: (res2)=>{
            this.setData({
              openid: res2.data.openid
            })
          }
        })
      }
    })
  },
  options: {
    addGlobalClass: true,
    multipleSlots: true
  },
  properties: {
    bgColor: {
      type: String,
      default: ''
    },
    isCustom: {
      type: [Boolean, String],
      default: false
    },
    isBack: {
      type: [Boolean, String],
      default: false
    },
    bgImage: {
      type: String,
      default: ''
    },
  },
  
  BackPage() {
    wx.navigateBack({
      delta: 1
    });
  },
  toHome() {
    wx.reLaunch({
      url: '/pages/index/index',
    })
  },
  close(){
    this.setData({
      txtItemAnimate: "slideOutLeft",
    })
    setTimeout(()=>{
      this.setData({
        MenuAnimate: "slideOutLeft",
      })
    },300)
    setTimeout(()=>{
      this.setData({
        leftFlag: false,
      })
      console.log(this.data.leftFlag)
    },800)
  },
  leftmenu() {
    this.setData({
      txtItemAnimate: "slideInLeft",
      MenuAnimate: "slideInLeft",
      leftFlag: true,
    })
  }
  
})
