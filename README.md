# node-multi-error

Multiple error handling.

```
npm install @yo1dog/multi-error
```

## Quick Start

```javascript
const {MultiError} = require('@yo1dog/multi-error');

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

## `MultiError#errors`

List of errors.

-----

## `MultiError#getErrors()`

List of errors.

-----

## `MultiError.origStackSymbol`

Symbol for the error's original stack.