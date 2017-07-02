module.exports = (app) => {
    /* mount mongodb to app */
    require('./../utils/db')(app);

    /* mount midware */
    require('./midwares')(app);

    /* crawler of items */
    require('./crawler')(app);

    /*  todo
        proxy /taobao to www.taobao.com
        proxy /tmall to www.tmall.com
    */
    // require('./proxyToTaobao')(app);

    app.all('*', (req, res) => {
        res.send(404);
    })
}