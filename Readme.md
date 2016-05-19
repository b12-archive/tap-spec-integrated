[![Coveralls – test coverage
](https://img.shields.io/coveralls/studio-b12/tap-spec-integrated.svg?style=flat-square
)](https://coveralls.io/r/studio-b12/tap-spec-integrated
) [![Travis – build status
](https://img.shields.io/travis/studio-b12/tap-spec-integrated/master.svg?style=flat-square
)](https://travis-ci.org/studio-b12/tap-spec-integrated
) [![David – status of dependencies
](https://img.shields.io/david/studio-b12/tap-spec-integrated.svg?style=flat-square
)](https://david-dm.org/studio-b12/tap-spec-integrated
) [![Stability: experimental
](https://img.shields.io/badge/stability-experimental-yellow.svg?style=flat-square
)](https://nodejs.org/api/documentation.html#documentation_stability_index
) [![Code style: airbnb
](https://img.shields.io/badge/code%20style-airbnb-777777.svg?style=flat-square)
](https://github.com/airbnb/javascript)




<a id="/"></a>&nbsp;

# tap-spec-integrated

**A simple integrated TAP reporter. Works in node and browsers**

<p align="center"><img
  alt="screenshot"
  src="https://cdn.rawgit.com/studio-b12/tap-spec-integrated/e2ac5af/screenshot.png"
  width="652"
  height="530"
/></p>

Why?

* Very simple. Doesn’t drop arbitrary console output.
* Works in browsers seamlessly.
* More flexible setup than with traditional command-line based TAP reporters. This means you can run your tests seamlessly with [node-dev](https://github.com/fgnass/node-dev) and similar tools.
* Outputs in real-time.




<a id="/demo"></a>&nbsp;

## Demo

*tap-spec-integrated* formats [its own tests](https://travis-ci.org/studio-b12/tap-spec-integrated).



<a id="/installation"></a>&nbsp;

## Installation

```sh
$ npm install tap-spec-integrated
```




<a id="/usage"></a>&nbsp;

## Usage

Add this to the top of your test file:

```js
require('tap-spec-integrated');
```




<a id="/license"></a>&nbsp;

## License

[MIT](./License.md) © [Studio B12](http://studio-b12.de)
