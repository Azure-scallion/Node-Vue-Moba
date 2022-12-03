const mongoose = require('mongoose')

const schema = new mongoose.Schema({
    username: { type: String },
    password: {
        type: String,
        // select值为false，使得保存后的密码不在前端显示
        select: false,
        // 对密码进行加密，10为加密等级，越高加密时间越长，10-12为适宜区间
        set(val) {
            return require('bcryptjs').hashSync(val, 10)
        }
    }

})

module.exports = mongoose.model('AdminUser', schema)