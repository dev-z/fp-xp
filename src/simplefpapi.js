/* ------------------------------------------------------------------------ *
 * 2. Simple REST API server built in one of the Node.js libraries like     *
 * ExpressJS. The purpose is to make them see how trivial and useful FP is  *
 * in real life apps.                                                       *
 *                                                                          *
 * It should expose 4 end points /add, /sub, /mul, div/ each taking two URL *
 * params as numbers and returning the sum. eg. /add/4/5 gives 9            *
 * It should validate that these are actual numbers and handle cases like   *
 * divide by zero with appropriate HTTP return code.                        *
 * ------------------------------------------------------------------------ */
// Importing the core modules ------------------- //
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

// BASE CONFIGURATIONS -------------------------- //
const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

// Require route initiator functions ----------- //
const mathRoutes = require('./routes/maths');

// ROUTES FOR API ------------------------------ //
const router = express.Router();

function loadRoutes() {
  // --- UNPROTECTED ROUTES --- //
  // Test route to make sure everything is working
  router.get('/', (req, res) => {
    res.status(200).json({
      message: 'Maths-API is up and running!',
    });
  });
  // User unprotected routes
  mathRoutes(router);
  // REGISTER OUR ROUTES ------------------------- //
  app.use('/', router);
}

// HELPER FUNCTIONS ---------------------------- //
function startServer() {
  loadRoutes();
  const port = process.env.PORT || 8001;
  app.listen(port, () => {
    console.info(`API Server up and running on port ${port}`);
  });
}

// START THE SERVER ----------------------------- //
startServer();
