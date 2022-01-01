const readline = require('readline'),
	rl = readline.createInterface(process.stdin, process.stdout);

const { exec } = require('child_process');

rl.setPrompt('AutoGit> ');
rl.prompt();

rl.on('line', function(line) {

	const args = line.trim().split(/ +/);

	const command = args.shift().toLowerCase();

	switch(command) {
	case 'args':
		console.log(args);

		break;
	case 'fullpush':
		if(!args) return console.log('No commit message defined');

		exec(`git add . && git commit -m "${args.join(" ")}" && git push`, (error, stdout, stderr)=>{if(error) {console.log(`error:${error.message}`);return;}if(stderr) {console.log(`stderr:${stderr}`);return;}console.log(`stdout:${stdout}`);});
		break;
	case 'exit':
		console.log('Exiting program...');
		process.exit(0);

		break;
	default:
		console.log(`${command} is not a command`);
		break;
	}
	rl.prompt();

}).on('close', function() {
	console.log('exit\nExiting program...');
	process.exit(0);
});