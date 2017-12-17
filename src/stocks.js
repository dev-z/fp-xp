// -----------------------------------------------------------------------//
// 3. Given a set of stock market codes like ["AMZN" "YHOO" "FB" "GOOGL"  //
// "MSFT"], find out the which one had the highest last price.            //
//                                                                        //
// An example URL is                                                      //
// http://dev.markitondemand.com/MODApis/Api/v2/Quote/json?symbol=AMZN    //
// which gives a Amazon's JSON with a "LastPrice" key.                    //
//                                                                        //
// This is a problem which can be easily parallelized.Sequentially this   //
// takes a very long time.Try writing the code to fetch the data on each  //
// core and then aggregate it.                                            //
// ---------------------------------------------------------------------- //

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
    .reduce((acc, val) => (val > acc ? val : acc), -1);
  console.log(data);
}, (err) => {
  console.log(err);
});
