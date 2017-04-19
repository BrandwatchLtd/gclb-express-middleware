const assert = require('assert');
const sinon = require('sinon');

const gclb = require('../src/index.js');

describe('gclb-express-middleware', () => {
  let req;
  let res;
  let next;

  beforeEach(() => {
    req = {
      headers: {
        host: 'hostit',
      },
      url: '/someurl',
    };
    res = {
      redirect: sinon.spy(),
      status: sinon.spy(),
    };
    next = sinon.spy();
  });

  describe('redirectToHttps', () => {
    it('should call next when https', () => {
      req.headers['x-forwarded-proto'] = 'https';
      gclb.redirectToHttps(req, res, next);
      assert(next.called, true);
    });

    it('should call res.redirect with correct params when http', () => {
      req.headers['x-forwarded-proto'] = 'http';
      gclb.redirectToHttps(req, res, next);
      assert(res.redirect.calledWith(301, 'https://hostit/someurl'), true);
    });
  });

  describe('blockNonHttps', () => {
    it('should call next when https', () => {
      req.headers['x-forwarded-proto'] = 'https';
      gclb.blockNonHttps(req, res, next);
      assert(next.called, true);
    });

    it('should call res.status with 404 when http', () => {
      req.headers['x-forwarded-proto'] = 'http';
      gclb.blockNonHttps(req, res, next);
      assert(res.status.calledWith(404), true);
    });
  });
});
