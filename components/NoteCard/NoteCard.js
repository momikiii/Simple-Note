// components/CreateCard/CreateCard.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {

  },

  created(){
    const db = wx.cloud.database()
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
    //读取数据库中的notes
    db.collection('notes').where({
      _openid: this.data.openId, // 填入当前用户 openid
    }).get().then(res => {
      console.log(res.data)
      this.setData({
        notes: res.data
      })
    })

  },

  /**
   * 组件的初始数据
   */
  data: {
    imgsrc: "https://7369-simple-note-develop-sql1w-1303186574.tcb.qcloud.la/6f7cf8f4a363c01a668046267ef012d3ecfd13a9.jpg%401320w_742h.png?sign=d916680d6add8430b6f5104b4537ae2d&t=1600496557",
    isImg: false,
    openid: '',
    notes: []
  },

  /**
   * 组件的方法列表
   */
  methods: {
    createCard(){
      wx.navigateTo({
        url: '/pages/cardpage/cardpage?mode=WRITTING',
      })
    }
  }
})
