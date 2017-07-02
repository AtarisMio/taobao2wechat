const show = async (req, res) => {
    const { id } = req.params;
    const data = await req.app.db_find({ id });
    res.render('show', data);
};

const put = async (req, res) => {
    res.render('put', { title: '淘宝链接转换' });
}
module.exports = {
    show,
    put
};