import { readdirSync } from 'fs'
import { PORTFOLIO_PATH } from '../consts'

export function getDirectories(source){
	readdirSync(source, { withFileTypes: true })
    		.filter(dirent => dirent.isDirectory())
    		.map(dirent => dirent.name)
}

export function getPortfolioElements(){
	return getDirectories(PORTFOLIO_PATH);
}

export function generatePortfolioElements(){
	let projects = getDirectories(PORTFOLIO_PATH);
	// let n_rows = Math.ceil(projects.length/2);
	snippets = document.getElementById('portfolio-snippets')
	console.log("Number of elements in projects: " + projects.length)
	for (var i = 0; i < projects.length; i++){
		const heading = document.createElement("h2");
		heading.textContent = projects[i];
		snippets.appendChild(heading);
	}
}
