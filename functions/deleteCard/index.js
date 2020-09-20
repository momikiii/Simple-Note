// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

// 1. 获取数据库引用
const db = cloud.database();
const _ = db.command;

// 云函数入口函数
exports.main = async (event, context) => {
  var result = await db.collection("notes")
    .where({
      _id: event._id
    })
    .remove()
    .then(console.log)
    .catch(console.error)
    return true
}