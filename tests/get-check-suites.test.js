const nock = require('nock')
const getCheckSuites = require('../lib/get-check-suites')

describe('getCheckSuites', () => {
  let nocked

  beforeEach(() => {
    nocked = nock('https://api.github.com')
  })

  it('returns an array of check suites', async () => {
    nocked
      .get(/\/repos\/JasonEtco\/example\/commits\/master\/check-suites/)
      .reply(200, { check_suites: [1, 2] })
    const checkSuites = await getCheckSuites({
      owner: 'JasonEtco',
      repo: 'example'
    })
    expect(nocked.isDone()).toBe(true)
    expect(checkSuites).toEqual([1, 2])
  })

  it('returns an array of check suites with a specific ref', async () => {
    nocked
      .get(/\/repos\/JasonEtco\/example\/commits\/my-ref\/check-suites/)
      .reply(200, { check_suites: [1, 2] })
    const checkSuites = await getCheckSuites({
      owner: 'JasonEtco',
      repo: 'example',
      ref: 'my-ref'
    })
    expect(nocked.isDone()).toBe(true)
    expect(checkSuites).toEqual([1, 2])
  })

  it('returns an array of check suites with a specific suite', async () => {
    nocked
      .get(/\/repos\/JasonEtco\/example\/commits\/master\/check-suites\?.*check_name=my-action/)
      .reply(200, { check_suites: [1] })
    const checkSuites = await getCheckSuites({
      owner: 'JasonEtco',
      repo: 'example',
      action: 'my-action'
    })
    expect(nocked.isDone()).toBe(true)
    expect(checkSuites).toEqual([1])
  })
})
