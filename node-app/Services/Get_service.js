const helper = require("../Helper/Get.helper");

const getDataService = {
  async getUserMarkDetails(req, res) {
    try {
      const datas = await helper.GetData(req.body);
      // datas.sort((a, b) => a.rank - b.rank);
      for (let i = 0; i < datas.length - 1; i++) {
        for (let j = 0; j < datas.length - 1 - i; j++) {
          if (datas[j].rank > datas[j + 1].rank) {
            let temp = datas[j];
            datas[j] = datas[j + 1];
            datas[j + 1] = temp;
          }
        }
      }

      res.send(datas);
    } catch (err) {
      res.status(500).send({ error: "cannot fetch all users -name" });
    }
  },
};
module.exports = getDataService;
