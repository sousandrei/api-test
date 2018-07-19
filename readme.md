API Test Project

## Usage

### Configuration

Fill the .env file or set those as environment variables


Example:
```bash
PORT=8080
KNEX_DEBUG=false
PAGE_SIZE=5

LOG_LEVEL=debug
LOG_FORMAT=text

POSTGRES_URL=127.0.0.1
POSTGRES_PORT=5432
POSTGRES_DATABASE=postgres
POSTGRES_USER=postgres
POSTGRES_PASSWORD=postgres
```

#### Log Levels
```
error:   0 
warn:    1 
info:    2 
verbose: 3 
debug:   4 
silly:   5 
```

#### Log Format
```
json
text
```

### Installing dependencies
```javascript
npm i 
npm start
```

### Running
```javascript
npm start
```
### Generating API documentation
```javascript
npm i -g aglio
aglio --theme-variables cyborg -i input.apib -o apidoc/api.html
```

## Notes
Libs folder should be used to store standalone functions of utilities that not belong to a single feature

all features are separate as small packages, facilitating migration to microservice or serverless architecture

