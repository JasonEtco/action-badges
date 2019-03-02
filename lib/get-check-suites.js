const octokit = require('@octokit/rest')()

// The unique ID for the production GitHub Actions app
const GITHUB_ACTIONS_APP_ID = 15368

/**
 * Get the GitHub Actions check suites for the given ref (default is `master`)
 * @param {object} options
 * @param {string} options.owner
 * @param {string} options.repo
 * @param {string} options.suite
 * @param {string} [options.ref='master']
 * @returns {object[]}
 */
module.exports = async function getCheckSuites ({ owner, repo, suite, ref = 'master' }) {
  const result = await octokit.checks.listSuitesForRef({
    owner,
    repo,
    ref,
    check_name: suite,
    app_id: GITHUB_ACTIONS_APP_ID
  })

  return result.data.check_suites
}
