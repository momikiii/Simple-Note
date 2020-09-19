const app = getApp();
Component({
  /**
   * 组件的一些选项
   */
  options: {
    addGlobalClass: true,
    multipleSlots: true
  },
  /**
   * 组件的对外属性
   */
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
  /**
   * 组件的初始数据
   */
  data: {
    StatusBar: app.globalData.StatusBar,
    CustomBar: app.globalData.CustomBar,
    Custom: app.globalData.Custom,
    leftFlag: true,
    MenuAnimate: "slideInLeft",
    txtItemAnimate: "slideInLeft",
    HoverText:[{
      id:1,
      class: "allCards",
      text: "ALL CARDS",
      url: ""
    },{
      id:2,
      class: "animate__delay-2s",
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
  /**
   * 组件的方法列表
   */
  methods: {
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
        MenuAnimate: "slideOutLeft"
      })
      setTimeout(()=>{
        this.setData({
          leftFlag: false,
        })
        console.log(this.data.leftFlag)
      },1000)
    },
    leftmenu() {
      this.setData({
        MenuAnimate: "slideInLeft",
        leftFlag: true,
      })
      console.log(this.data.leftFlag)
    }
  }
})