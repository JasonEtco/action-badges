const makeBadge = require('./make-badge')

const CACHE_CONTROL = `public, max-age=60, stale-while-revalidate=604800, stale-if-error=604800`

// Standard badge route
module.exports = async (req, res) => {
  const { owner, repo } = req.params
  const suite = req.query.workflow

  const badge = await makeBadge({ owner, repo, suite })

  res.setHeader('Content-Type', 'image/svg+xml;charset=utf-8')
  res.setHeader('Cache-Control', `${CACHE_CONTROL}, s-maxage=604800`)
  res.send(badge)
}
