// 此处为一个函数，接收一个app对象，可以接收根目录下index中app的实例
module.exports = app => {
    const express = require('express')
    // 引入jwt加密token组件
    const jwt = require('jsonwebtoken')
    // 引入数据库模型中的用户模型
    const AdminUser = require('../../models/AdminUser')
    // 引入用于判断条件是否成立的包
    const assert = require('http-assert')
    // 定义一个express的子路由
    const router = express.Router({
        mergeParams: true
    })

    //登录校验中间件
    const auth = async (req, res, next) => {
        const token = String(req.headers.authorization || '').split(' ').pop()
        assert(token, 401, '请登录')
        const { id } = jwt.verify(token, app.get('secret')) //此处验证通过可以获得被散列加密的管理员id，证明用户身份，中间件放行，通过该路由
        assert(id, 401, '请登录')
        // console.log(tokenData);
        req.user = await AdminUser.findById(id)
        // console.log(req.user);
        assert(req.user, 401, '请登录')
        await next()
    }

    // 新建分类接口
    router.post('/', async (req, res) => {

        const model = await req.Model.create(req.body)
        res.send(model)
    })
    // 获取分类列表接口
    router.get('/', async (req, res) => {
        const queryOptions = {}
        if (req.Model.modelName === 'Category') {
            queryOptions.populate = 'parent'
        }
        const items = await req.Model.find().setOptions(queryOptions).limit(10)
        res.send(items)
    })
    //获取分类详情的接口
    router.get('/:id', async (req, res) => {
        const model = await req.Model.findById(req.params.id)
        res.send(model)
    })
    // 根据id修改分类详情的接口
    router.put('/:id', async (req, res) => {
        const model = await req.Model.findByIdAndUpdate(req.params.id, req.body)
        res.send(model)
    })
    // 根据id删除分类
    router.delete('/:id', async (req, res) => {
        await req.Model.findByIdAndDelete(req.params.id, req.body)
        res.send({ success: true })
    })

    // 在app上挂载一个中间件，通过req.params身上的resource，经inflection格式转化为数据模型的名称，最后挂载在req请求对象身上为Modle属性，用以指导数据指向所属的数据模型
    app.use('/admin/api/rest/:resource', auth, async (req, res, next) => {
        const modelName = require('inflection').classify(req.params.resource)
        req.Model = require(`../../models/${modelName}`)
        next()
    }, router)


    //上传图片url的保存与修改
    const multer = require('multer')
    const upload = multer({ dest: __dirname + '../../../uploads' })
    app.post('/admin/api/upload', auth, upload.single('file'), async (req, res) => {
        const file = req.file
        file.url = `http://localhost:3000/uploads/${file.filename}`
        res.send(file)
    })

    // 登录接口
    app.post('/admin/api/login', async (req, res) => {
        const { username, password } = req.body
        //1. 根据用户名找用户

        // 此处需要注意，由于AdminUser模型中，已将密码进行了加密且不在显示，默认无法直接获取，需要在.select中重新传入password
        const user = await AdminUser.findOne({ username: username }).select('+password')

        assert(user, 422, '用户不存在')

        //判断user是否存在，不存在则返回，状态码为422，错误信息为用户不存在的返回值

        /* if (!user) {
            return res.status(422).send({ message: '用户不存在' })   等效于上面assert的效果
        } */

        //2.校验密码
        // 通过bcryptjs比较用户传来的password和数据库中加密后的user.password
        const isValid = require('bcryptjs').compareSync(password, user.password)
        assert(isValid, 422, '密码错误')

        /* if (!isValid) {
            return res.status(422).send({ message: '密码错误' })
        } */
        //3. 返回token

        // jwt的sign方法，将用户信息进行散列加密，作为token发送给该用户
        // 通过app.get获取app的select加密设置（见index中）
        const token = jwt.sign({ id: user._id }, app.get('secret'))
        res.send({ token })

    })

    app.use(async (err, req, res, next) => {
        // console.log(err);
        res.status(err.status || 500).send({ message: err.message })
    })

}