const badgen = require('badgen')
const getCheckSuites = require('./get-check-suites')
const getStatus = require('./get-status')

const COLORS = {
  green: ['passing'],
  gray: ['neutral', 'unknown'],
  red: ['failing', 'error']
}

/**
 * Make the badge
 * @param {object} options
 * @param {string} options.owner - Owner of the repository
 * @param {string} options.repo - Name of the repository
 * @param {string} options.suite - A specific check suite to query for
 * @returns {string} - SVG code string
 */
module.exports = async function makeBadge ({ owner, repo, suite }) {
  let status
  try {
    const checkSuites = await getCheckSuites({ owner, repo, suite })
    status = getStatus(checkSuites)
  } catch (err) {
    if (err.status === 404) {
      status = 'unknown'
    } else {
      console.error(err)
      status = 'error'
    }
  }

  const color = Object.keys(COLORS).find(key => COLORS[key].includes(status))
  return badgen({
    subject: 'build',
    status,
    color
  })
}
