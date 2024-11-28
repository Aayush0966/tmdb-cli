# TMDB CLI

TMDB CLI is a powerful and easy-to-use command-line tool that allows you to fetch and display movie information from [The Movie Database (TMDB)](https://www.themoviedb.org/). Effortlessly browse "Now Playing," "Popular," "Top Rated," and "Upcoming" movies right from your terminal.

## Features

- **Fetch movies by type**: Quickly retrieve lists of movies based on their category:
  - `Now Playing`
  - `Popular`
  - `Top Rated`
  - `Upcoming`
- **User-friendly CLI**: Simple commands and options for intuitive usage.
- **Clean output**: Displays movie titles with ratings for a visually appealing terminal experience.


## Usage

Run the CLI tool using the command `tmdb-app` with the appropriate options:

### Syntax
```bash
tmdb-app --type <category>
```

### Examples

#### Fetch Now Playing Movies:
```bash
tmdb-app --type "playing"
```

#### Fetch Popular Movies:
```bash
tmdb-app --type "popular"
```

#### Fetch Top Rated Movies:
```bash
tmdb-app --type "top"
```

#### Fetch Upcoming Movies:
```bash
tmdb-app --type "upcoming"
```

## Output Example

```plaintext
POPULAR Movies:

1. The Batman (Rating: 8.0)
2. Dune (Rating: 7.8)
3. Spider-Man: No Way Home (Rating: 8.3)
4. Encanto (Rating: 7.6)
...
```

## Configuration

1. **TMDB API Key**: TMDB CLI requires an API key to fetch data. Set your API key in a `.env` file in the project root:

    ```plaintext
    TMDB_API_KEY=your_api_key_here
    ```

2. Install dependencies:
    ```bash
    npm install
    ```

## Development Setup

If you wish to modify or extend the CLI tool, follow these steps:

1. Clone the repository:
    ```bash
    git clone https://github.com/Aayush0966/tmdb-cli.git
    ```
2. Navigate to the project directory:
    ```bash
    cd tmdb-cli
    ```
3. Install dependencies:
    ```bash
    npm install
    ```
4. Link the CLI locally:
    ```bash
    npm link
    ```
5. Test the CLI:
    ```bash
    tmdb-app --type "popular"
    ```

## Roadmap

- Add filtering by genres and release year.
- Include search functionality for movies by title.
- Display more details about movies (e.g., overview, release date).
- Add pagination for large lists.

## Contributing

Contributions are welcome! Feel free to open an issue or submit a pull request to improve the project.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Acknowledgments

- [TMDB API](https://developers.themoviedb.org/3/getting-started/introduction) for providing movie data.
- [Commander.js](https://github.com/tj/commander.js/) for creating a robust CLI interface.

---

Feel free to reach out with feedback, suggestions, or questions!

