const express = require("express")
const cors = require("cors")

const bodyParser = require("body-parser")
// const logger = require("./logger")

const controller_countries = require("./controllers/countries.controller")

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

var corsOptions = {
  origin: "*"
};

const db = require("./models");
const Countries = db.countries;

Countries.sequelize.sync().then(result => {
  console.log(result);
}).catch(err => {
  console.log(err);
});

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.send('Successful response.');
});

app.use('/request-type', (req, res, next) => {
  console.log('Request type: ', req.method);
  next();
});

app.post('/api/addOrUpdateCountry', function (req, res, next) {
  var countryName = req.body.country_name
  var countryCode = req.body.country_code
  // var trashBinLocation = req.body.trash_bin_location

  Countries.findOne({
    where: { country_code: countryCode }
  }).then(obj => {
    if (obj) {
      console.log(obj.dataValues.id)

      Countries.update(
        {
          country_name: countryName,
          country_code: countryCode
        }, {
        where: { id: obj.dataValues.id }
      }).then(resUpdate => {
        console.log("update success")
        res.send(resUpdate)
      })
    }
    else {
      Countries.create({
        country_name: countryName,
        country_code: countryCode
      }).then(resInsert => {
        console.log("insert success")
        res.send(resInsert)
      })
    }
  })

})

app.get("/api/countries/allpaging", controller_countries.allCountriesPaging)

app.get("/api/countries/like", controller_countries.countriesLike)

// set port, listen for requests
const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
  // logger.info(`Server is running on port ${PORT}.`)
});



