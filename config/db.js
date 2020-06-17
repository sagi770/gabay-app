const mysql = require("mysql2");

const SQLQuery = async (query, params) => {
  // eslint-disable-next-line no-useless-catch
  try {
    const connection = mysql.createConnection({
      host: process.env.MYSQL_HOST,
      user: process.env.MYSQL_USER,
      database: process.env.MYSQL_DB,
      password: process.env.MYSQL_PASS
    });

    const res = new Promise((resolve, reject) => {
      connection.execute(query, params, (err, result) => {
        if (err) return reject(err);
        resolve(result);
      });
    });

    connection.end();

    return res;
  } catch (err) {
    throw err;
  }
};

module.exports = SQLQuery;
