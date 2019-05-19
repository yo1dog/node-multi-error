# node-multi-error

## Quick Start

```javascript
const MultiError = require('@yo1dog/multi-error');

const errA = new Error('error A');
const errB = new Error('error B');

throw new MultiError(errA, errB);

/*
MultiError: Multiple errors (2).
    at readme.js:6:1
    at Script.runInThisContext (vm.js:123:20)
    ...


Error 1/2:
================================================
================================================

Error: error A
    at readme.js:3:14
    at Script.runInThisContext (vm.js:123:20)
    ...


Error 2/2:
================================================
================================================

Error: error B
    at readme.js:4:14
    ...


================================================
================================================

End of multiple errors (2).
*/
```

# Docs

## `MultiError.prototype.getErrors()`

Returns the list of errors.

Equivalent to:
```javascript
this[MultiError.errsSymbol].slice(0);
```

-----

## `MultiError.errsSymbol`

Symbol for getting errors.

-----

## `MultiError.origStack`

Symbol for the error's original stack.