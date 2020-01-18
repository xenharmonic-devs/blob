# Blob

Beautiful Lattice Overhead Brojector

_An idea by Joakim Bang Larsen_

source: https://www.facebook.com/groups/234189900598263/permalink/320419298641989/

## Running the app

Copy the contents of the `public` folder to any webserver and open `index.html`

or

Install the package locally and run `npm run app`. The page will be hosted at `http://localhost:3000`.
To stop it, press `Ctrl+C`

## How to contribute

### Important folders

`public` - this hosts all the built files, ready to be uploaded to any webserver. This is also the place, where you
can add any images or third-party libraries to use.

`src` - this has all the source files for the client side code. this can use all the newest javascript syntax, it will
be compiled back to ES6 and minified

`server` - a small webserver, which hosts the files inside `public`

### The stack

The project is using [nodejs](https://nodejs.org/en/), and it uses [npm](https://www.npmjs.com/) to get
additional third-party packages.

On the client side it uses [react](https://reactjs.org/) and [redux](https://redux.js.org/) for a data oriented DOM
management.

For styling it uses [sass](https://sass-lang.com/) and [css modules](https://github.com/css-modules/css-modules).

For utility functions and better data flow management it uses [ramda](https://ramdajs.com/)

### Installing

You need to have nodejs installed and the repo cloned to your computer. To install the dependencies of the project,
navigate to the project root via any command line interface and run `npm install`.

### Starting the dev mode

After that you need to run `npm run dev`. This will do a bunch of things in the background:

* start a webserver at `http://localhost:3000/dev.html`
* watch changes of the files inside the `public` folder and trigger a server restart when any of the files change
* when the server restarts, then it signals the browser to reload the page for you
* when you change the source files inside the `src` folder, it will re-build the bundle and save it to `public`

_You can stop the server any time by pressing `Ctrl+C`_

### Linting and formatting

The project uses [eslint](https://eslint.org/) with rules from [standard js](https://standardjs.com/) for linting,
and [prettier](https://prettier.io/) for formatting javascript files.

It uses [stylelint](https://stylelint.io/) for formatting css files.

### Commiting

Commiting has no special rules, you can write anything inside the message, but in the future we might shift
over to using [commitizen](http://commitizen.github.io/cz-cli/).

When you commit, then the linter will check the code and stop the commit process, if it finds any errors. It will also
try and fix any formatting errors. After linting passes, a new bundle will be built in the public folder and added to
the commited files. This will make sure, that the contents of the public folder on github is up to date.
