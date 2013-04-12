var client = require('../client');
var each = Array.prototype.forEach;

function log_species(sp){
  console.info(sp.species_name +' (SID: '+ sp.sid +')')

  if (sp.username){
    console.info('Created by '+ sp.username);
  }
}

module.exports = function(argv){
  this.argv = argv;
};

module.exports.prototype = {
  execute:function(){
    var argv = this.argv;

    client.load_list().on('success', function(data){
      if (!argv['without-my']){
        console.info('My Species:');

        each.call(data.my_species, log_species);
      }

      if (argv['with-strangers']){
        console.info('Strangers Species:');

        each.call(data.strangers_species, log_species);
      }
    });
  },

  help:function(){
    console.info('List all available species. This will give you a version and species ID.');
  }
};
