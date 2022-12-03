const express = require('express')

const app = express()

app.set('secret', 'scallion')

// 中间件区
app.use(require('cors')())
app.use(express.json())
app.use('/uploads', express.static(__dirname + '/uploads'))

require('./plugins/db')(app)
// 由于admin中index.js是一个函数，此处导入后，传入app实例，使得admin中index可以直接使用此处的app实例
require('./routes/admin')(app)



app.listen(3000, () => {
    console.log('serve is running at http://localhost:3000');
})