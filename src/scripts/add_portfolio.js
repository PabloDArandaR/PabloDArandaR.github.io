import { warn } from 'console';
import fs from 'fs';
import readline from 'readline';

const PORTFOLIO_PATH = "src/content/portfolio" 
const PORTFOLIO_SNIPPET_PATH = "src/scripts/resources/portfolio_snippet_template.astro"
const PORTFOLIO_MAIN_PATH = "src/scripts/resources/portfolio_snippet_template.astro"


function checkPortfolioPath(){
	fs.stat(PORTFOLIO_PATH, (err, _stats) => {
		if (err) {
			if (err.code === 'ENOENT'){
				fs.mkdirSync(PORTFOLIO_PATH)
			}
			else {
				console.error('Error ocurred: ', err)
				return false;
			}
		}
	});
	return true;
};

function askQuestion(question){
	const r1 = readline.createInterface({
		input: process.stdin,
		output: process.stdout
		});
	return new Promise((resolve) => {
		r1.question(question, (answer) => {
			r1.close();
			resolve(answer);
		})
	});
}

async function main(){


	if (checkPortfolioPath()) {
		console.log('Portfolio path found or created');
	}

	let codename = ''; 
	await askQuestion('What is the project codename? ').then((answer) => {
		codename = answer;
	});
	console.log('Codename is: ' + codename)
	
	let main_file_content;
	try {
		main_file_content = fs.readFileSync(PORTFOLIO_MAIN_PATH,'utf-8');
	} catch(err) {
		console.error(err);
		return;
	}

	let content = main_file_content.toString();
	let result_main = content.replaceAll("CODENAME", codename);

	console.log(result_main);
}

main()
