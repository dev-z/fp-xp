const axios = require('axios');

const stockCodes = ['AMZN', 'YHOO', 'FB', 'GOOGL', 'MSFT'];
const promises = [];
stockCodes.forEach((code) => {
  const url = `http://dev.markitondemand.com/MODApis/Api/v2/Quote/json?symbol=${code}`;
  promises.push(axios.get(url));
});
Promise.all(promises).then((res) => {
  const data = res
    .map(each => each.data.LastPrice)
    .reduce((acc, val) => {
      return val > acc ? val : acc;
    }, -1);
  console.log(data);
}, (err) => {
  console.log(err);
});
