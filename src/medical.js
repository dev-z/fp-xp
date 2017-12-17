const R = require('ramda');
const mockedDB = require('./dbmock')();

/**
 * Updates the inventory as per the given transaction object and returns a new Inventory instance
 * @param {Object} trans The transaction object
 * @returns {Inventory}
 */
function updateInventory(trans, currentInventory) {
  const { from, to, item, quantity } = trans;
  const fromPath = R.lensPath([from, item]);
  const toPath = R.lensPath([to, item]);

  return R.pipe(
    R.over(fromPath, x => x - quantity),
    R.over(toPath, x => x + quantity),
  )(currentInventory);
}

// Fetching the inventory data from db and creating a new inventory
// const itemList = mockedDB.getItems();
// const locList = mockedDB.getLocations();
const initAmounts = mockedDB.getAmounts();
const transactions = mockedDB.getTransactionLog();

/**
 * Traverse the transaction log and return the final inventory
 * @param {Object} initialInventory The inventory object
 * @param {Object} transLog The whole of transaction log
 * @param {Number} index The current index
 */
function executeTransactions(initialInventory, transLog, index) {
  if (index === transLog.length) {
    return initialInventory;
  }
  const newInventory = updateInventory(transLog[index], initialInventory);
  return executeTransactions(newInventory, transLog, index + 1);
}

const finalInventory = executeTransactions(initAmounts, transactions, 0);
console.log(JSON.stringify(finalInventory));
