const express = require('express')
const path = require('path')
const cors = require('cors')()
const makeBadge = require('./make-badge')
const app = express()

const CACHE_CONTROL = `public, max-age=60, stale-while-revalidate=604800, stale-if-error=604800`

// Landing page
app.get('/', (_, res) => res.sendFile(path.join(__dirname, 'index.html')))

/**
 * Standard badge route
 */
app.get('/:owner/:repo', cors, async (req, res) => {
  const { owner, repo } = req.params
  const suite = req.query.workflow

  const badge = await makeBadge({ owner, repo, suite })

  res.setHeader('Content-Type', 'image/svg+xml;charset=utf-8')
  res.setHeader('Cache-Control', `${CACHE_CONTROL}, s-maxage=604800`)
  res.send(badge)
})

// Don't start the server in the test environment
if (process.env.NODE_ENV !== 'test') {
  app.listen(3000, () => {
    console.log('http://localhost:3000')
  })
}
