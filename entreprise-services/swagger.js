const swaggerAutogen = require('swagger-autogen')()

const outputFile = './swagger_output.json'
const endpointsFiles = ['./app/router/router.js']


swaggerAutogen(outputFile, endpointsFiles).then(() => {
    require('./server.js')
})