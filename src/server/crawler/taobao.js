const iconv = require('iconv-lite');
const f = require('float');
const request = require('./request');

const getData = async (id) => {
    const [mainPage, pricePage] = await Promise.all([
        request(`https://item.taobao.com/item.htm?id=${id}`),
        request(`https://mdskip.taobao.com/core/initItemDetail.htm?itemId=${id}`)
    ]);
    const [res1, title] = /<h3 class="tb-main-title" data-title="(.*?)">/.exec(mainPage);
    const [res2, img] = /<img id="J_ImgBooth" src="(.*?)"/.exec(mainPage);
    const priceData = JSON.parse(pricePage);
    const price = Object.values(priceData.defaultModel.itemPriceResultDO.priceInfo).map(p => {
        const reduce = f.round(Number(p.price) - (p.promotionList.length > 1 ? p.promotionList.reduce((pre, cur) => {
            const min = Math.min(Number(pre.price), Number(cur.price));
            return min;
        }) : Number(p.promotionList && p.promotionList[0].price || p.price)), 2);
        return {
            price: p.price,
            reduce,
            promotion: p.promotionList
                        .map(({ price, type }) => { return { price, type }; })
                        .sort((a, b) => Number(a.price) < Number(b.price))
        }
    });
    return { id, title, img, price };
};

module.exports = async (id, app) => {
    const found = !! await app.db_find({ id });
    if (found) {
        console.log('update', id);
        app.db_update(id, await getData(id));
        return id;
    } else {
        console.log('insert', id);
        await app.db_insert(await getData(id));
        return id;
    }
}
