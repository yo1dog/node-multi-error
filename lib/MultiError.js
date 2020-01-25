const ExtendableError = require('@yo1dog/extendable-error');
const getInfoString   = require('./getInfoString');


class MultiError extends ExtendableError {
  /**
   * Creates an error that consists of multiple errors.
   * 
   * @param {...Error} errs
   */
  constructor(...errs) {
    super(`Multiple errors (${errs.length}).`);
    
    this.setUnenumerable(MultiError.errsSymbol, errs);
    this.setUnenumerable(MultiError.origStackSymbol, this.stack);
    
    // create a getter for the stack
    // @ts-ignore
    this.stack = null;
    Object.defineProperty(this, 'stack', {
      get: () => getStack(this)
    });
  }
  
  /**
   * Returns the list of errors.
   * 
   * @returns {Error[]}
   */
  getErrors() {
    return /** @type {any} */(this)[MultiError.errsSymbol].slice(0);
  }
}

/**
 * @param {MultiError} multiErr 
 */
function getStack(multiErr) {
  const errs = /** @type {any} */(multiErr)[MultiError.errsSymbol];
  
  // start with this error's original stack trace
  let stack = /** @type {any} */(multiErr)[MultiError.origStackSymbol];
  
  for (let i = 0; i < errs.length; ++i) {
    const err = errs[i];
    
    stack += '\n\n\n';
    stack += `Error ${i + 1}/${errs.length}:\n`;
    stack += '================================================\n';
    stack += '================================================\n';
    stack += '\n';
    
    // should be an error
    if (err instanceof Error) {
      stack += err.stack;
    }
    else {
      // if not then create an informative string about it
      stack += getInfoString(err);
    }
  }
  
  stack += '\n\n\n';
  stack += '================================================\n';
  stack += '================================================\n';
  stack += '\n';
  stack += `End of multiple errors (${errs.length}).`;
  
  return stack;
}

MultiError.errsSymbol      = Symbol('errs');
MultiError.origStackSymbol = Symbol('origStack');

module.exports = MultiError;