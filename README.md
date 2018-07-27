# CalculatorProject
Web Development Course Assignment Project in BarIllan
author: Tomer G. & Yosef N.# CalculatorService

LINK: https://docs.google.com/document/d/1R4T4fGA5pt1w6ElWLhKVhKrreuQ4m5-lSrwepodqf_w/edit#

## Prerequisites
1. nodejs
2. npm
3. mocha
4. docker
5. docker compose

## Installing
 - git clone  https://github.com/toggit/CalculatorProject.git
 - npm install

## Run Server
 - route terminal to the git clone directory
 - npm start

### Unit testing and Intergation testing:
 - npm test 
 - or mocha test\unit-test.js

## Docker 
### Docker Container
 - route terminal to the git clone directory  
 - sudo docker build -t "test:CalculatorService" .
 - sudo docker run -p 3000:3000 test:CalculatorService

### Intergation testing:
 - npm test 
 - or mocha test\inetgration-test.js

### Docker Compose
 - docker-compose build  & docker-compose run
 - or docker-compse up
