var fs = require('fs');

var home = process.env.HOME;
var fname = home + '/.nodewar';

module.exports = {
  open:function(){
    return fs.openSync(fname, 'w', 0600);
  },

  save:function(session){
    if (fs.writeSync(this.open(), session)){
      console.log('Session configuration saved');
    } else {
      console.warn('Failed to write configuration');
    }
  },

  read:function(){
    try {
      return fs.readFileSync(fname).toString();
    } catch(e) {
      console.warn('Failed to read configuration file');
    }
  }
};
