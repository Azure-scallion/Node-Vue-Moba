

module.exports = app => {
    const router = require('express').Router()
    const mongoose = require('mongoose')
    const Article = require('../../models/Article')
    const Category = require('../../models/Category')
    const Hero = require('../../models/Hero')

    // 新闻导入
    router.get('/news/init', async (req, res) => {
        const parent = await Category.findOne({ name: '新闻资讯' })
        const cats = await Category.find().where({ parent: parent }).lean()
        const newsTitle = ['蒙犽源·梦皮肤设计大赛开启公告', '元歌源·梦皮肤台词方案票选结果公布', '1v1可以跨区对战啦，谁是全服单挑王一试便知！', '元歌源·梦皮肤台词方案票选开启', '招募启动！BOE王者杯·人民电竞超级联赛王者荣耀挑战赛燃战在即', '共创策划周3周年纪念头像框票选结果公布【互动小任务第20期】', '11月17日全服不停机更新公告', '共创策划周3周年纪念头像框票选活动开启！【互动小任务第20期】', '蒙犽源·梦皮肤设计大赛开启公告', '元歌源·梦皮肤台词方案票选结果公布', '1v1可以跨区对战啦，谁是全服单挑王一试便知！', '元歌源·梦皮肤台词方案票选开启', '招募启动！BOE王者杯·人民电竞超级联赛王者荣耀挑战赛燃战在即', '共创策划周3周年纪念头像框票选结果公布【互动小任务第20期】', '共创策划周3周年纪念头像框票选活动开启！【互动小任务第20期】', '第二届泊寓王者荣耀大赛落幕，泊寓聚焦年轻人需求的增长之路', '12月7日部分开服问题说明公告', '王者营地12月7日开服公告', '王者荣耀12月7日开服公告', '12月5日体验服停机更新公告', '王者营地12月6日停服公告', '王者荣耀12月6日停服公告', '12月5日全服不停机更新公告', '12月2日体验服停机更新公告', '蒙犽源·梦皮肤设计大赛开启公告', '【神器传说的赐福】活动更新公告及FAQ', '【玉镖夺魁-十连必得皮肤】活动公告及FAQ', '上官婉儿【神器·万象笔】上线！神奇女侠最后一次返场！', '“一”启幸运活动开启，概率得史诗皮肤', '【英雄演练-送排位保护卡】活动公告', '元歌源·梦皮肤台词方案票选开启', '共创策划周3周年纪念头像框票选结果公布【互动小任务第20期】', '全球电竞力量齐聚  2022年王者荣耀世冠KIC正赛来袭', '2022年王者荣耀世界冠军杯KIC小组赛抽签分组结果公布！', '关于取消2022年王者荣耀世界冠军杯 - KPL选拔赛阶段线下观赛的通知', '2022年王者荣耀世界冠军杯KIC外卡赛本日正式开赛！', '8支全球队伍集结！KIC2022外卡赛战队巡礼', '谁能冲进小组赛？KPL赛区选拔赛战队巡礼', '2022年王者荣耀世界冠军杯KIC - KPL选拔赛门票11月18日开售', '2022年王者荣耀世界冠军杯KIC启动在即  全球电竞力量共逐荣耀巅峰']

        const newsList = newsTitle.map(title => {
            const randomCats = cats.slice(0).sort((a, b) => Math.random() - 0.5)
            return {
                categories: randomCats.slice(0, 2),
                title: title
            }
        })
        await Article.deleteMany({})
        await Article.insertMany(newsList)
        res.send(newsList)
    })

    // 新闻文章列表接口
    router.get('/news/list', async (req, res) => {

        //关联查询法：
        /*  const parent = await Category.findOne({ name: '新闻资讯' }).populate({
             path: 'children',
             populate: {
                 path: 'newsList',
             }
         }).lean() */

        // 聚和查询法
        const parent = await Category.findOne({ name: '新闻分类' })
        const cats = await Category.aggregate([
            { $match: { parent: parent._id } },   //$match 条件查询，类似于数据库中的where  ;即查询Category数据库中parent属性为parent_id的项
            {
                $lookup: {                            //$lookup 类似于数据库的join，用于数据库间的外链接 
                    from: 'articles',                  //链接数据库的集合名，集合名默认为数据库名的复数小写形式
                    localField: '_id',                 //该数据库的本地键
                    foreignField: 'categories',        //关联该数据库的外地键（查询该数据库的哪个属性）
                    as: 'newsList'                     //找到后给该集合取得名字
                }
            },
            {
                $addFields: {                           //添加属性:可添加可修改
                    newsList: { $slice: ['$newsList', 5] }   //对newsList属性限制，取newsList中的5条
                }
            }
        ])

        const subCats = cats.map(v => v._id)
        cats.unshift({
            name: '热门',
            newsList: await Article.find().where({
                categories: { $in: subCats }
            }).populate('categories').limit(5).lean()
        })
        cats.map(cat => {
            cat.newsList.map(news => {
                news.categoryName = (cat.name === '热门') ? news.categories[0].name : cat.name
                return news
            })
            return cat
        })
        res.send(cats)

    })

    // 英雄列表接口
    router.get('/heroes/list', async (req, res) => {
        const parent = await Category.findOne({ name: '英雄分类' })
        const cats = await Category.aggregate([
            { $match: { parent: parent._id } },   //$match 条件查询，类似于数据库中的where  ;即查询Category数据库中parent属性为parent_id的项
            {
                $lookup: {                            //$lookup 类似于数据库的join，用于数据库间的外链接 
                    from: 'heros',                  //链接数据库的集合名，集合名默认为数据库名的复数小写形式
                    localField: '_id',                 //该数据库的本地键
                    foreignField: 'categories',        //关联该数据库的外地键（查询该数据库的哪个属性）
                    as: 'heroList'                     //找到后给该集合取得名字
                }
            }
        ])

        const subCats = cats.map(v => v._id)
        cats.unshift({
            name: '全部',
            heroList: await Hero.find().where({
                categories: { $in: subCats }
            }).limit(20).lean()
        })

        res.send(cats)

    })

    // 文章详情
    router.get('/articles/:id', async (req, res) => {
        const data = await Article.findById(req.params.id).lean()
        data.related = await Article.find().where({
            categories: { $in: data.categories },
            title: { $ne: Article.title }
        }).limit(2)
        res.send(data)
    })

    //根据id获取英雄信息
    router.get('/heroes/:id', async (req, res) => {
        const data = await Hero.findById(req.params.id).populate('categories').populate('items1.sugges').populate('items2.sugges').lean()
        res.send(data)
    })


    app.use('/web/api', router)
}