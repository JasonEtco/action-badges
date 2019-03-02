const badgen = require('badgen')
const getCheckSuites = require('./get-check-suites')
const getStatus = require('./get-status')

const colors = {
  green: ['passing'],
  gray: ['neutral', 'unknown'],
  red: ['failing', 'error']
}

/**
 * Make the badge
 * @param {object} options
 * @param {string} options.owner
 * @param {string} options.repo
 * @param {string} options.suite
 * @returns {string}
 */
module.exports = async function makeBadge ({ owner, repo, suite }) {
  let status
  try {
    const checkSuites = await getCheckSuites({ owner, repo, suite })
    status = await getStatus(checkSuites)
  } catch (err) {
    console.error(err)
    status = 'error'
  }

  const color = Object.keys(colors).find(key => colors[key].includes(status)) || 'gray'
  return badgen({
    subject: 'build',
    status,
    color
  })
}
