/**
 * Get a status string for the badge from the check suites
 * @param {object[]} checkSuites
 * @returns {string}
 */
module.exports = function getStatus (checkSuites) {
  if (checkSuites.every(suite => suite.conclusion === 'success')) {
    return 'passing'
  }

  const failures = ['canceled', 'timed_out', 'failed']
  if (checkSuites.some(suite => failures.includes(suite.conclusion))) {
    return 'failing'
  }

  if (checkSuites.every(suite => suite.conclusion === 'neutral')) {
    return 'neutral'
  }

  return 'mixed'
}
