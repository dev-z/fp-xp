// eslint-disable-next-line
module.exports = function mockDB() {
  /**
   * Return a list of items
   */
  function getItems() {
    return ['Paracetamol', 'Ibuprofen', 'Syringe', 'Scalpel'];
  }

  /**
   * Returns a list of locations
   */
  function getLocations() {
    return ['Dispensary', 'ICU', 'Warehouse'];
  }

  /**
   * Returns a JSON object containg the info of amounts of item stored in each location
   */
  function getAmounts() {
    return {
      Warehouse: {
        Paracetamol: 10,
        Ibuprofen: 50,
        Syringe: 80,
        Scalpel: 100,
      },
      ICU: {
        Paracetamol: 0,
        Ibuprofen: 20,
        Syringe: 7,
        Scalpel: 8,
      },
      Dispensary: {
        Paracetamol: 50,
        Ibuprofen: 33,
        Syringe: 10,
        Scalpel: 80,
      },
    };
  }

  /**
   * Returns the transaction log for a given day
   */
  function getTransactionLog() {
    return [
      {
        from: 'Warehouse',
        to: 'Dispensary',
        item: 'Paracetamol',
        quantity: 2,
      },
      {
        from: 'Warehouse',
        to: 'Dispensary',
        item: 'Ibuprofen',
        quantity: 5,
      },
      {
        from: 'Dispensary',
        to: 'ICU',
        item: 'Syringe',
        quantity: 2,
      },
      {
        from: 'Warehouse',
        to: 'ICU',
        item: 'Scalpel',
        quantity: 10,
      },
    ];
  }
  return {
    getItems,
    getLocations,
    getAmounts,
    getTransactionLog,
  };
};
