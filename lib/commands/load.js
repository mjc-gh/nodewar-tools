var client = require('../client');

module.exports = function(argv){
  this.argv = argv;
};

module.exports.prototype = {
  execute:function(){
    var argv = this.argv;
    var sid = argv.sid;

    if (!sid){
      return console.warn('Please provide a Species ID');
    }

    client.load(sid).on('success', function(data){
      var sp = data.species;

      if (!data.status){
        console.info('Results for '+ sp.sid +':');
        console.info('Name: '+ sp.species_name +' (v: '+ sp.version +')');

        if (argv.data || argv.verbose)
          console.log('Raw Data:\n', sp);
      } else {
        console.warn(data.status.name +': '+ data.status.desc);
      }

    });
  },

  help:function(){
    console.log('View a specific species. This will give you a version and species ID.');
  }
};
