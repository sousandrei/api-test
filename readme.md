API Test Project

## Usage

### Configuration

Fill the .env file or set those as environment variables

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

