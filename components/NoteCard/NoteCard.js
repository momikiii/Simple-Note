// components/CreateCard/CreateCard.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {
    imgsrc: "https://7369-simple-note-develop-sql1w-1303186574.tcb.qcloud.la/6f7cf8f4a363c01a668046267ef012d3ecfd13a9.jpg%401320w_742h.png?sign=d916680d6add8430b6f5104b4537ae2d&t=1600496557",
    isImg: true
  },

  /**
   * 组件的方法列表
   */
  methods: {
    createCard(){
      wx.navigateTo({
        url: '/pages/cardpage/cardpage',
      })
    }
  }
})
