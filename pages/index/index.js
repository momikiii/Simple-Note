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
    day: '',
    month: '',
    year: '',
    HoverText: [{
      id: 1,
      class: "allCards",
      text: "ALL CARDS",
      url: ""
    }, {
      id: 2,
      class: "alarm",
      text: "ALARM",
      url: ""
    }, {
      id: 3,
      class: "shareUs",
      text: "SHARE",
      type: "share",
      url: ""
    }, {
      id: 4,
      class: "nightMode",
      text: "NIGHT MODE",
      url: ""
    }, {
      id: 5,
      class: "feedBack",
      text: "FEEDBACK",
      url: ""
    }, {
      id: 6,
      class: "aboutUs",
      text: "ABOUT ME",
      url: ""
    }, ]
  },
  onShareAppMessage: function (res) {
    if (res.from === 'button') {
      // 来自页面内转发按钮
      console.log(res.target)
    }
    return {
      title: 'SIMPLE NOTE 短记',
      imageUrl: "https://7369-simple-note-develop-sql1w-1303186574.tcb.qcloud.la/SimpleNote-Logo.png?sign=595a84b79592cb063cbf9a3719673c76&t=1600613428"
    }
  },
  onLoad() {
    this.setData({
      day: new Date().toDateString().slice(8, 10),
      month: new Date().toDateString().slice(4, 7).toUpperCase(),
      year: new Date().toDateString().slice(11, 15),
    })
    wx.login({
      success: (res) => {
        wx.request({
          url: 'https://api.weixin.qq.com/sns/jscode2session?appid=wxf9fe1644856c5abc&secret=031e96ce4134e6df67ae9a8f475cc652&js_code=' + res.code + '&grant_type=authorization_code',
          success: (res2) => {
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
  close() {
    this.setData({
      txtItemAnimate: "slideOutLeft",
    })
    setTimeout(() => {
      this.setData({
        MenuAnimate: "slideOutLeft",
      })
    }, 300)
    setTimeout(() => {
      this.setData({
        leftFlag: false,
      })
      console.log(this.data.leftFlag)
    }, 800)
  },
  leftmenu() {
    this.setData({
      txtItemAnimate: "slideInLeft",
      MenuAnimate: "slideInLeft",
      leftFlag: true,
    })
  },
  allCards(){
    wx.showToast({
      title: '待开发,敬请等待',
      icon: 'none'
    })
  },
  alarm(){
    wx.navigateTo({
      url: '/pages/alarm/alarm',
    })
  },
  shareUs(){
    console.log("share")
    wx.showShareMenu({
      withShareTicket: true,
      menus: ['shareAppMessage', 'shareTimeline']
    })
  },
  nightMode(){
    wx.showToast({
      title: '待开发,敬请等待',
      icon: 'none'
    })
  },
  feedBack(){
    wx.showToast({
      title: '待开发,敬请等待',
      icon: 'none'
    })
  },
  aboutUs(){
    wx.navigateTo({
      url: '/pages/aboutMe/aboutMe',
    })
  }

})