const {connectedDb} = require('./mysql');


function crashAppIfError(err) {
  console.error(err);
  process.exit(1);
}

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
    CREATE TABLE test_cases (
        caseId string,
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
 * @example test case structure
 * {
 *    id: string, as run
 *    count: string,
 *    runStatus: sting,
 *    project: string,
 * }
 */
async function createRunsTable() {
  return new Promise((res, rej) => {
    connectedDb.query(`
    CREATE TABLE runs (
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

/**
 * @returns void
 */
async function initDatabaseTables() {
  const tables = await getTablesList().catch(crashAppIfError);
  // TODO this logic should be improved
  if(tables.length === 2) {
    return;
  }
  await createCasesListTable().catch(crashAppIfError);
  await createRunsTable().catch(crashAppIfError);
}

module.exports = {
  initDatabaseTables
};
