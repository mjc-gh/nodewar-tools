var API_URL = 'http://nodewar.com/api/';

var config = require('./config');
var http = require('restler');

function url(path){
  return API_URL + path + '.json';
};

function req_options(obj){
  var opts = {
    headers: { Cookie: 'session='+ config.read() },
    parser: http.parsers.json
  };

  for (var i in obj)
    opts[i] = obj[i];

  return opts;
};

module.exports = {
  login:function(uname, passwd){
    return http.post(url('login'), req_options({
      data: { email_or_username: uname, pw: passwd }
    }));
  },

  load_list:function(){
    return http.get(url('file/load_list'), req_options());
  },

  load:function(sid){
    return http.get(url('file/load'), req_options({
      query: { sid: sid }
    }));
  },

  save:function(sid, version, code){
    return http.post(url('file/save'), req_options({
      data: {
        sid: sid,
        version: version,
        lang: 0, // TODO figure out lang
        code: code
      }
    }));
  }
};
