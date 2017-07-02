const show = async (req, res) => {
    const { id } = req.params;
    const data = await req.app.db_find({ id });
    res.render('show', data);
};

const put = async (req, res) => {
    res.render('put');
}
module.exports = {
    show,
    put
};