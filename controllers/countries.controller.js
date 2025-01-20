const db = require("../models/index");

const { Op } = require("sequelize");

const Countries = db.countries;

const getPagination = (page, size) => {
  const limit = size ? +size : 3;
  const offset = page ? page * limit : 0;

  return { limit, offset };
};

const getPagingData = (data, page, limit) => {
  const { count: totalItems, rows: trashDatas } = data;
  const currentPage = page ? +page : 0;
  const totalPages = Math.ceil(totalItems / limit);

  return { totalItems, trashDatas, totalPages, currentPage };
};

exports.allCountry = (req, res) => {
  Countries.findAll({
    attributes: ['country_name', 'country_code']
  }).then(data => {
    res.send(data)
  })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving countries."
      });
    });
}

exports.allCountriesPaging = (req, res) => {
  const { page, size } = req.query;

  const { limit, offset } = getPagination(page, size);

  Countries.findAndCountAll({
    limit: limit, offset: offset, order: [
      ['createdAt', 'DESC']
    ]
  })
    .then(data => {
      const response = getPagingData(data, page, limit);
      res.send(response);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving countries."
      });
    });
}

exports.countriesLike = (req, res) => {
  const { substring } = req.query;

  Countries.findAll({
    where: {
      country_name: {
        [Op.like]: '%' + substring + '%',
      }
    }
  }).then(data => {
    res.send(data)
  })
}