var client = require('../client');
var config = require('../config');

var read = require('read');

module.exports = function(argv){
  this.argv = argv;
};

module.exports.prototype = {
  execute:function(){
    var user = this.argv.username || this.argv.user;

    if (user){
      read({ prompt: 'Enter password: ', silent: true }, function(er, pass){
        client.login(user, pass).on('success', function(data){
          if (data.status && data.status.code != 0){
            console.warn('Error: '+ data.status.desc);

          } else if (!data.status || !data.session){
            console.warn('Unknown Error', data);

          } else {
            config.save(data.session);
          }
        });
      });
    } else {
      console.warn('Please provide a --user');
    }
  },

  help:function(){
    console.info('Login and create an authentication token. The token will be saved to ~/.nodewar.');
    console.info('You must provide this command with the --user option');
  }
};
