## validity-validate-each

Validate each value of an array.

## Installation

```
npm install validity-validate-each --save
```

## Usage

Below is a simple example for usage with schemata and save:

```js
var validity = require("@clocklimited/validity"),
  schemata = require("schemata"),
  save = require("save"),
  collection = save("author"),
  validateEach = require("@clocklimited/validity-validate-each");

var schema = schemata({
  emailAddresses: {
    type: Array,
    validators: {
      all: [validateEach(validity.required), validateEach(validity.email)],
    },
  },
});
```
