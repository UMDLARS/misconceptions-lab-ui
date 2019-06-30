# The Return of the Julian
## Instructions
### Install Method 1 (NPM)
Download the latest nodejs
```
# Using Ubuntu
curl -sL https://deb.nodesource.com/setup_12.x | sudo -E bash -
sudo apt-get install -y nodejs
```
One time setup on a system:

```npm install -g @angular/cli```

First you do `npm install`. Then you do `ng serve`. Easy as 🥧!

### Install Method 2 (Docker) :whale:
Install docker on your system first: 
* [mac] 
* [windows] 
* [linux] 

Once installed then use the following commands in the terminal/cmd:

~~~~
docker build -t umdlars/webtemplate .
docker run -p 44477:4200 umdlars/webtemplate
~~~~

Now you can open your webbrowser of choice and go to `http://localhost:44477' 


## Links
### Components 
https://akveo.github.io/nebular/docs/components/components-overview

## Auto-Generated Stuff

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 7.3.0.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).

[mac]: https://docs.docker.com/v17.12/docker-for-mac/install/
[windows]: https://docs.docker.com/docker-for-windows/install/
[linux]: https://docs.docker.com/install/linux/docker-ce/ubuntu/
