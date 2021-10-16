const db = require("../models");
const Score = db.scores;
const Op = db.Sequelize.Op;


exports.create = async (req, res) => {
    await Score.create(req.body)
    .then(data => {
        res.send(data);
    }).catch();
};


exports.findAll = async (req, res) => {
    await Score.findAll()
      .then(data => {
        res.send(data);
      }).catch();
};


exports.findByType = async (req, res) => {
  const type = req.params.type;
  await Score.findAll({
    where: { type: type },
    order: [
      ['value', 'DESC']
    ]
  })
    .then(data => {
      res.send(data);
    }).catch();
};


/* exports.findOne = async (req, res) => {
    const id = req.params.id;
    await Score.findOne({
      where: { id: id }
    })
      .then(data => {
        res.send(data);
      }).catch();
}; */



exports.update = async (req, res) => {
    const id = req.params.id;
    await Score.update(req.body, {
      where: { id: id }
    }).then(data => {
      res.send(data);
    }).catch();
};



exports.delete = async (req, res) => {
    const id = req.params.id;
    await Score.destroy({
      where: { id: id }
    }).then(data => {
      res.send({ error: data ? false : true });
    }).catch();
};
