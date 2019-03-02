const { parse } = require('url')
const makeBadge = require('./make-badge')

const CACHE_CONTROL = ``

// Standard badge route
module.exports = async (req, res) => {
  const { owner, repo } = req.params
  const { query } = parse(req.url, true)
  const suite = query.workflow
  const badge = await makeBadge({ owner, repo, suite })
  res.send(badge)
}
