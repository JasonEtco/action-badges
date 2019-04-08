const getStatus = require('../lib/get-status')

describe('getStatus', () => {
  it('returns `passing` if all check suites have `conclusion: success`', () => {
    const actual = getStatus([{ conclusion: 'success' }])
    expect(actual).toBe('1/1 passing')
  })

  it('returns `failing` if any check suites have a failing conclusion', () => {
    const actual = getStatus([{ conclusion: 'timed_out' }])
    expect(actual).toBe('1/1 failing')
  })

  it('returns `neutral` if all check suites have `conclusion: neutral`', () => {
    const actual = getStatus([{ conclusion: 'neutral' }])
    expect(actual).toBe('1/1 neutral')
  })

  it('returns `mixed` if it gets confused', () => {
    const actual = getStatus([{ conclusion: 'pizza' }])
    expect(actual).toBe('1/1 mixed')
  })

  // Failing > everything else

  it('returns `failing` for tests with success and failed conclusions', () => {
    const actual = getStatus([{ conclusion: 'success' }, { conclusion: 'failed' }])
    expect(actual).toBe('1/2 failing')
  })

  it('returns `failing` for tests with timed-out and failed conclusions', () => {
    const actual = getStatus([{ conclusion: 'timed_out' }, { conclusion: 'failed' }])
    expect(actual).toBe('2/2 failing')
  })

  it('returns `failing` for tests with neutral and failed conclusions', () => {
    const actual = getStatus([{ conclusion: 'neutral' }, { conclusion: 'failed' }])
    expect(actual).toBe('1/2 failing')
  })

  it('returns `failing` for tests with confused and failed conclusions', () => {
    const actual = getStatus([{ conclusion: 'pizza' }, { conclusion: 'failed' }])
    expect(actual).toBe('1/2 failing')
  })
  
  // Mixed outcomes

  it('returns `mixed` for tests with success and confused conclusions', () => {
    const actual = getStatus([{ conclusion: 'success' }, { conclusion: 'pizza' }])
    expect(actual).toBe('2/2 mixed')
  })

  it('returns `mixed` for tests with neutral and confused conclusions', () => {
    const actual = getStatus([{ conclusion: 'neutral' }, { conclusion: 'pizza' }])
    expect(actual).toBe('2/2 mixed')
  })
})
