var fs = require('fs');
var path = require('path');

var cmds  = {};
var valid = fs.readdirSync(path.dirname(module.filename) +'/commands').map(function(file){
  var name = file.split('.').shift();
  var mod = './commands/'+ file;

  cmds[name] = require(mod);
  return name;
});


module.exports = {
  run:function(){
    var argv = require('optimist').argv;
    var cmd = argv._[0];

    //console.log(argv);

    if (!cmd && argv.help){
      this.help();

    } else if (valid.indexOf(cmd) > -1) {
      var action = new cmds[cmd](argv);

      if (argv.help || argv.h) action.help();
      else action.execute();

    } else {
      console.warn(cmd ? 'Invalid command' : 'No command supplied');

      this.help();
    }
  },

  help:function(){
    console.info('Valid commands: '+ valid.join(', ') +'.');
    console.info('You must first run the auth command if you have not already, which will store an authentication token for later.');
  }
};
