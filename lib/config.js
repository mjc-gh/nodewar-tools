var fs = require('fs');

var home = process.env.HOME;
var fname = home + '/.nodewar';

module.exports = {
  save:function(session){
    var fd = fs.openSync(fname, 'w', 0600);

    if (fs.writeSync(fd, session)){
      console.log('Session configuration saved');
    } else {
      console.warn('Failed to write configuration');
    }
  },

  read:function(){
    var fd = fs.openSync(fname, 'w', 0600);
    return fs.readFileSync(fname).toString();
  }
};
