const request = require('supertest')
const nock = require('nock')
const express = require('express')
const badgeRoute = require('../lib')

describe('action-badges', () => {
  let app

  beforeEach(() => {
    app = express()
    app.get('/:owner/:repo', badgeRoute)
    console.error = jest.fn()
  })

  describe('/:owner/:repo', () => {
    it('returns some SVG code', async () => {
      nock('https://api.github.com')
        .get(/\/repos\/JasonEtco\/example\/commits\/master\/check-suites/)
        .reply(200, { check_suites: [{ conclusion: 'success' }] })

      const res = await request(app).get('/JasonEtco/example')
      expect(res.status).toBe(200)
      expect(res.body.toString('utf8')).toMatchSnapshot()
    })

    it('returns an "error" badge on errors', async () => {
      nock('https://api.github.com')
        .get(/\/repos\/JasonEtco\/example\/commits\/master\/check-suites/)
        .reply(500)

      const res = await request(app).get('/JasonEtco/example')
      expect(res.status).toBe(200)
      expect(res.body.toString('utf8')).toMatchSnapshot()
    })
  })
})
