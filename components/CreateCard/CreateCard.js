// components/CreateCard/CreateCard.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {

  },

  created() {

  },
  /**
   * 组件的初始数据
   */
  data: {
    day: new Date().toDateString().slice(8, 10),
    month: new Date().toDateString().slice(4, 7).toUpperCase(),
    year: new Date().toDateString().slice(11, 15),
  },

  /**
   * 组件的方法列表
   */
  methods: {
    createCard() {
      wx.navigateTo({
        url: '/pages/cardpage/cardpage?mode=WRITTING',
      })
    }
  }
})