const { parse } = require('url')
const makeBadge = require('./make-badge')

// Standard badge route
module.exports = async (req, res) => {
  const { pathname, query } = parse(req.url, true)
  const [, owner, repo] = pathname.split('/')
  const { action } = query
  const badge = await makeBadge({ owner, repo, action })
  res.end(badge)
}
