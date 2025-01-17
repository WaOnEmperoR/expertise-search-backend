module.exports = {
  "databases": {
    "Main": {
      "database": process.env.DB_NAME||"expertise_search",
      "username": process.env.DB_USERNAME,
      "password": process.env.DB_PASSWORD,
      "host": "127.0.0.1",
      "port": 3306,
      "dialect": "mysql", 
      "pool": {
        "max": 5,
        "min": 0,
        "acquire": 30000,
        "idle": 10000
      }
    }
  }
}