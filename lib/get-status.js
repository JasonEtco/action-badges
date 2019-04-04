/**
 * Get a status string for the badge from the check suites
 * @param {object[]} checkSuites
 * @returns {string}
 */
module.exports = function getStatus (checkSuites) {
  const numOfTests = checkSuites.length

  if (checkSuites.every(suite => suite.conclusion === 'success')) {
    return numOfTests + '/' + numOfTests + ' passing'
  }

  const failures = ['canceled', 'timed_out', 'failed']
  const numOfFailing = checkSuites.filter(suite => failures.includes(suite.conclusion)).length
  if (numOfFailing > 0) {
    return numOfFailing + '/' + numOfTests + ' failing'
  }

  if (checkSuites.every(suite => suite.conclusion === 'neutral')) {
    return numOfTests + '/' + numOfTests + ' neutral'
  }

  return 'mixed'
}
