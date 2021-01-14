import {getInfoString} from './getInfoString';
import {getPropertyDescriptor} from './getPropertyDescriptor';

export const origStackSymbol = Symbol('origStack');

/**
 * Creates an error that contains multiple errors.
 */
export class MultiError<T = unknown> extends Error {
  public errors!: T[];
  public [origStackSymbol]: string;
  
  constructor(...errs: T[]) {
    super(`Multiple errors (${errs.length}).`);
    Object.defineProperty(this, 'name', {enumerable: false, value: this.constructor.name});
    Object.defineProperty(this, 'errors', {enumerable: false, value: errs});
    
    // copy the stack
    // the stack may be a getter so we shouldn't simply copy the value
    // instead lets copy the property description
    const stackPropDesc = getPropertyDescriptor(this, 'stack') || {value: undefined};
    stackPropDesc.enumerable = false; // ensure unenumerable
    Object.defineProperty(this, origStackSymbol, stackPropDesc);
    
    // create a getter for the stack
    (this as any).stack = null;
    Object.defineProperty(this, 'stack', {
      get: () => getStack(this)
    });
  }
  
  getErrors() {
    return this.errors.slice(0);
  }
}

function getStack(multiErr: MultiError) {
  const errs = multiErr.errors;
  
  // start with this error's original stack trace
  let stack = multiErr[origStackSymbol];
  
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

export default MultiError;