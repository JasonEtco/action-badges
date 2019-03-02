const createServer = require('./lib')
createServer().listen(3000, () => {
  console.log('http://localhost:3000')
})
