const iconv = require('iconv-lite');
const request = require('./request');

const getData = async (id) => {
    const [mainPage, pricePage] = await Promise.all([
        request(`https://detail.tmall.com/item.htm?id=${id}`),
        request(`https://mdskip.taobao.com/core/initItemDetail.htm?itemId=${id}`)
    ]);
    const [res1, title, img] = /<img id="J_ImgBooth" alt="(.*?)" src="(.*?)".*?\/>/.exec(mainPage);
    const priceData = JSON.parse(pricePage);
    const price = Object.values(priceData.defaultModel.itemPriceResultDO.priceInfo).map(p => {
        return {
            price: p.price,
            promotion: p.promotionList
                        .map(({ price, type }) => { return { price, type }; })
                        .sort((a, b) => Number(b.price) - Number(a.price))
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
