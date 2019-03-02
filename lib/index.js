const express = require('express')
const cors = require('cors')()
const makeBadge = require('./make-badge')
const app = express()

/**
 * Standard badge route
 */
app.get('/:owner/:repo', cors, async (req, res) => {
  const { owner, repo } = req.params
  const suite = req.query.workflow

  const badge = await makeBadge({ owner, repo, suite })
  res.send(badge)
})

// Don't start the server in the test environment
if (process.env.NODE_ENV !== 'test') {
  app.listen(3000, () => {
    console.log('http://localhost:3000')
  })
}
