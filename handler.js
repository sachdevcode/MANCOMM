'use strict';
const app = require('./main')
const serverless = require('serverless-http')

module.exports.hello = serverless(app) 
// module.exports.hello = async (event) => {
//   try {
//       // Your code logic here
//       console.log("Received event:", JSON.stringify(event));

//       return {
//           statusCode: 200,
//           body: JSON.stringify({ message: "Hello from Lambda!" })
//       };
//   } catch (error) {
//       console.error("Error:", error);
//       return {
//           statusCode: 500,
//           body: JSON.stringify({ message: "Iernal Server Error" })
//       };
//   }
// };