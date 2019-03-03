const request = require('@octokit/request')

// The unique ID for the production GitHub Actions app
const GITHUB_ACTIONS_APP_ID = 15368

/**
 * Get the GitHub Actions check suites for the given ref (default is `master`)
 * @param {object} options
 * @param {string} options.owner
 * @param {string} options.repo
 * @param {string} options.action
 * @param {string} [options.ref='master']
 * @returns {object[]}
 */
module.exports = async function getCheckSuites ({ owner, repo, action, ref = 'master' }) {
  const params = { owner, repo, ref, app_id: GITHUB_ACTIONS_APP_ID }
  if (action) params.check_name = action
  const result = await request('GET /repos/:owner/:repo/commits/:ref/check-suites', {
    ...params,
    headers: {
      accept: 'application/vnd.github.antiope-preview+json',
      authorization: `token ${process.env.GITHUB_TOKEN}`
    }
  })
  return result.data.check_suites
}
