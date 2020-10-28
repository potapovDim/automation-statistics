const {connectedDb} = require('./mysql');

async function getTablesList() {
  return new Promise((res, rej) => {
    connectedDb.query('SHOW TABLES', function(err, result) {
      if(err) {
        rej(err);
      }
      res(result);
    })
  });
}

/**
 * @example
 * {
 *   id: string,
 *   run: any,
 *   date: number,
 *   stackTrace: string,
 *   env?: string, //optional
 *   project?: any, //optional
 * }
 */
async function createCasesListTable() {
  return new Promise((res, rej) => {
    connectedDb.query(`
    CREATE TABLE table_name (
        id string,
        run string,
        date string,
        stackTrace string,
        env string,
        project string
    )
    `, function(err, result) {
      if(err) {
        rej(err);
      }
      res(result);
    })
  });
}

/**
 * @example
 * {
 *    id: string, as run
 *    count: string,
 *    runStatus: sting,
 *    project: string,
 * }
 */

async function createCasesListTable() {
  return new Promise((res, rej) => {
    connectedDb.query(`
    CREATE TABLE table_name (
        id string,
        count string,
        runStatus string,
        project string,
    )
    `, function(err, result) {
      if(err) {
        rej(err);
      }
      res(result);
    })
  });
}