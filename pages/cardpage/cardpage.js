const app = getApp();
Page({
  data: {
    formats: {},
    readOnly: false,
    placeholder: '',
    editorHeight: 300,
    CustomBar: app.globalData.CustomBar,
    keyboardHeight: 0,
    changeHeight: 77,
    isIOS: false,
    Title: 80,
    // openId: app.globalData.openid,
    noteId: null,
    mode: '',
  },
  onLoad(options) {
    const platform = wx.getSystemInfoSync().platform
    const isIOS = platform === 'ios'
    const db = wx.cloud.database()
    this.setData({
      isIOS,
      mode: options.mode,
      noteId: options.id
    })
    console.log(this.data.noteId)

    if (this.data.noteId != 0) {
      //初始化富文本
      db.collection('notes').where({
        _id: this.data.noteId
      }).get().then(res => {
        this.editorCtx.setContents({
          html: res.data[0].html
        })
      })
    }

    const that = this
    //更改键盘高度，默认0
    this.updatePosition(1)
    let keyboardHeight = 0
    wx.onKeyboardHeightChange(res => {
      if (res.height === keyboardHeight) return
      const duration = res.height > 0 ? res.duration * 1000 : 0
      keyboardHeight = res.height
      setTimeout(() => {
        wx.pageScrollTo({
          scrollTop: 0,
          success() {
            that.updatePosition(keyboardHeight)
            that.editorCtx.scrollIntoView()
          }
        })
      }, duration)

    })
  },
  save() {
    const db = wx.cloud.database()
    console.log("失去焦点")
    this.editorCtx.getContents({
      success: (res) => {
        //文字
        // console.log(Object.values(res.delta.ops[0]))
        //图片
        // console.log(Object.values(Object.values(res.delta.ops[0])[1])[0])

        // console.log(res)
        for (let item in res.delta.ops) {
          for (let item2 in item) {
            // console.log(item2)
          }
        }
        //图片上传至云存储
        // let item = Object.values(Object.values(res.delta.ops[0])[1])
        // let suffix = /\.\w+$/.exec(item)[0];
        // wx.cloud.uploadFile({
        //   cloudPath: new Date().getTime() + suffix,
        //   filePath: Object.values(Object.values(res.delta.ops[0])[1])[0],
        //   success: res => {
        //     console.log(res.fileID)
        //   },
        //   fail(res){
        //     console.log("上传图片失败",res)
        //   }
        // })

        //上传至数据库
        if (this.data.noteId == 0) {
          db.collection("notes").add({
            data: {
              day: new Date().toDateString().slice(8, 10),
              month: new Date().toDateString().slice(4, 7).toUpperCase(),
              year: new Date().toDateString().slice(11, 15),
              html: res.html,
              preview: Object.values(res.delta.ops[0])[0]
            },
            success() {
              console.log("上传成功")
            },
            fail(res) {
              console.log("上传失败", res)
            }
          })
        } else {
          //处理更新
          console.log("处理更新")
          console.log(this.data.noteId)
        
          db.collection('notes').doc(this.data.noteId).update({
            data:{
              html: res.html,
              preview: Object.values(res.delta.ops[0])[0]
            }
          }).then(res=>{
            console.log(res,'update success')
          })
        }
      }
    })

  },
  back() {
    wx.redirectTo({
      url: '/pages/index/index',
    })
  },
  readOnlyChange() {
    this.setData({
      readOnly: !this.data.readOnly
    })
  },

  updatePosition(keyboardHeight) {
    const toolbarHeight = 50
    const {
      windowHeight,
      platform
    } = wx.getSystemInfoSync()
    let editorHeight = keyboardHeight > 0 ? (windowHeight - keyboardHeight - toolbarHeight) : windowHeight
    //更改可视区高度
    let changeHeight = keyboardHeight > 0 ? 64 : 110
    this.setData({
      editorHeight,
      keyboardHeight,
      changeHeight
    })
  },
  calNavigationBarAndStatusBar() {
    const systemInfo = wx.getSystemInfoSync()
    const {
      statusBarHeight,
      platform
    } = systemInfo
    const isIOS = platform === 'ios'
    const navigationBarHeight = isIOS ? 44 : 48
    return statusBarHeight + navigationBarHeight
  },
  onEditorReady() {
    const that = this
    wx.createSelectorQuery().select('#editor').context(function (res) {
      that.editorCtx = res.context
    }).exec()
  },
  blur() {
    this.editorCtx.blur()
  },
  format(e) {
    let {
      name,
      value
    } = e.target.dataset
    if (!name) return
    // console.log('format', name, value)
    this.editorCtx.format(name, value)

  },
  onStatusChange(e) {
    const formats = e.detail
    this.setData({
      formats
    })
  },
  insertDivider() {
    this.editorCtx.insertDivider({
      success: function () {
        console.log('insert divider success')
      }
    })
  },
  clear() {
    this.editorCtx.clear({
      success: function (res) {
        console.log("clear success")
      }
    })
  },
  removeFormat() {
    this.editorCtx.removeFormat()
  },
  insertDate() {
    const date = new Date()
    const formatDate = `${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()}`
    this.editorCtx.insertText({
      text: formatDate
    })
  },
  insertImage() {
    const that = this
    wx.chooseImage({
      count: 1,
      success: function (res) {
        that.editorCtx.insertImage({
          src: res.tempFilePaths[0],
          data: {
            id: 'abcd',
            role: 'god'
          },
          width: '80%',
          success: function () {
            console.log('insert image success')
          }
        })
      }
    })
  }
})