var client = require('../client');
var fs = require('fs');

module.exports = function(argv){
  this.argv = argv;
};

module.exports.prototype = {
  execute:function(){
    var argv = this.argv;
    var sid = argv.sid;

    if (!sid)
      return console.warn('Please specify a Species ID.');
    else if (!argv.file)
      return console.warn('Please specify a file.');
    else if (!fs.existsSync(argv.file))
      return console.warn('Plese specify an existing file.');

	if (!argv.lang)
  	  lang = 0;  //default to javascript 
	else if (argv.lang == "js")
	  lang = 0;
	else if (argv.lang == "cs")
	  lang = 1;
	else
	  return console.warn('Unknown language')

    // TODO waiting on fix from restler (#113)
    client.load(sid).on('success', function(data){
      if (data.species){
        var version = data.species.version + 1;
        var code = fs.readFileSync(argv.file).toString();
		
        // TODO once patched, we can have our own success handler!
        client.save(sid, version, code, lang);
      } else {
        if (data.status && data.status.code < 1){
          console.info('Successfully saved new code to '+ sid);
        } else {
          console.warn(data.status.name +': '+ data.status.desc);
        }
      }
    });
  },

  help:function(){
    console.info('Save code. You must provide a --sid and a --file option. Optionally specify language with --lang=cs or --lang=js');
  }
};
