#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const axios = require("axios");
const { program } = require("commander");
const pc = require("picocolors");
const ora = require("ora");
require("dotenv").config({ path: '.env.local' });

const CONFIG_PATH = path.join(__dirname, '.tmdb-cli-config.json');

const getApiKey = () => {
  if (fs.existsSync(CONFIG_PATH)) {
    const config = JSON.parse(fs.readFileSync(CONFIG_PATH, 'utf-8'));
    return config.apiKey;
  }
  return null;
};

const saveApiKey = (apiKey) => {
  fs.writeFileSync(CONFIG_PATH, JSON.stringify({ apiKey }, null, 2));
};

const API_BASE_URL = "https://api.themoviedb.org/3/movie";
let API_KEY = getApiKey();

const init = async () => {
  if (!API_KEY) {
    const readline = require('readline').createInterface({
      input: process.stdin,
      output: process.stdout
    });

    API_KEY = await new Promise(resolve => {
      console.log(pc.yellow('No API key found. Please enter your TMDB API key:'));
      readline.question('API Key: ', (key) => {
        readline.close();
        resolve(key);
      });
    });
    
    saveApiKey(API_KEY);
  }
  
  program.parse(process.argv);
};

init();

const fetchMovies = async (type, limit) => {
  const spinner = ora('Fetching movies...').start();
  try {
    const response = await axios.get(`${API_BASE_URL}/${type}`, {
      params: { api_key: API_KEY, language: "en-US" },
    });
    const movies = response.data.results.slice(0, limit);

    spinner.succeed('Movies fetched successfully!');
    console.log(`\n${pc.blue(pc.bold(type.replace('_', ' ').toUpperCase()))} Movies:\n`);
    
    movies.forEach((movie, index) => {
      console.log(
        `${pc.green(`${index + 1}.`)} ${pc.bold(movie.title)} ` +
        `(${pc.yellow('★')} ${movie.vote_average}) ` +
        `- ${pc.dim(movie.release_date)}`
      );
    });
  } catch (error) {
    spinner.fail('Failed to fetch movies');
    console.error(pc.red('Error:'), error.response?.data?.status_message || error.message);
    process.exit(1);
  }
};

program
  .name('tmdb-cli')
  .version("1.0.0")
  .description(pc.yellow("A CLI tool to fetch movie details from TMDB"))
  .option("-t, --type <type>", "Type of movies to fetch", "popular")
  .option("-l, --limit <number>", "Limit the number of results", 10)
  .addHelpText('after', `
Examples:
  $ tmdb-cli --type popular
  $ tmdb-cli -t upcoming -l 5
  
Available Types:
  - playing   (Now Playing)
  - popular   (Popular Movies)
  - top       (Top Rated)
  - upcoming  (Upcoming Movies)
  `)
  .action((options) => {
    if (!API_KEY) {
      console.error(pc.red('Error: TMDB_API_KEY is not set in .env.local file'));
      process.exit(1);
    }

    const typeMap = {
      playing: "now_playing",
      popular: "popular",
      top: "top_rated",
      upcoming: "upcoming",
    };

    const type = typeMap[options.type.toLowerCase()];
    if (!type) {
      console.error(pc.red('Invalid type!'), 'Use one of:', Object.keys(typeMap).join(', '));
      process.exit(1);
    }

    const limit = parseInt(options.limit) || 10;
    if (isNaN(limit) || limit < 1 || limit > 20) {
      console.error(pc.red('Error: Limit must be a number between 1 and 20'));
      process.exit(1);
    }

    fetchMovies(type, limit);
  });
