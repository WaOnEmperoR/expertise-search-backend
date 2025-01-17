module.exports = (sequelize, Sequelize) => {
  const Countries = sequelize.define("countries", {
    country_name: {
      type: Sequelize.STRING
    },
    country_code: {
      type: Sequelize.STRING
    }
  });

  return Countries;
};