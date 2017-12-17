const R = require('ramda');

function performAction(params, fn) {
  const { a, b } = params;
  const aNum = Number(a);
  const bNum = Number(b);
  if (Number.isNaN(aNum) || Number.isNaN(bNum)) {
    return {
      error: true,
      message: 'One or more of the given params is not a number.',
    };
  }
  const result = fn(a, b);
  return {
    error: false,
    result,
  };
}
// eslint-disable-next-line
module.exports = function userUnpRoutes(router) {
  router.route('/sum/:a/:b')
    /**
     * @desc Adds two numbers (accessed at POST http://host:port/sum/4/5)
     */
    .get((req, res) => {
      const result = performAction(req.params, R.add);
      if (result.error) {
        res.status(400).send(result);
      } else {
        res.status(200).send(result);
      }
    });
  router.route('/sub/:a/:b')
    /**
     * @desc Subtracts two numbers. First param - Second param (accessed at POST http://host:port/sub/4/5)
     */
    .get((req, res) => {
      const result = performAction(req.params, R.subtract);
      if (result.error) {
        res.status(400).send(result);
      } else {
        res.status(200).send(result);
      }
    });
  router.route('/mul/:a/:b')
    /**
     * @desc Subtracts two numbers. First param - Second param (accessed at POST http://host:port/mul/4/5)
     */
    .get((req, res) => {
      const result = performAction(req.params, R.multiply);
      if (result.error) {
        res.status(400).send(result);
      } else {
        res.status(200).send(result);
      }
    });
  router.route('/div/:a/:b')
    /**
     * @desc Subtracts two numbers. First param - Second param (accessed at POST http://host:port/div/4/5)
     */
    .get((req, res) => {
      if (req.params.b === '0') {
        res.status(400).send({
          error: 'ZERO_DIVISON_ERROR',
          message: 'Division by Zero is not allowed.',
        });
      } else {
        const result = performAction(req.params, R.divide);
        if (result.error) {
          res.status(400).send(result);
        } else {
          res.status(200).send(result);
        }
      }
    });
};
