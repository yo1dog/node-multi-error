declare const errsSymbol: unique symbol;
declare const origStackSymbol: unique symbol;

declare class MultiError extends Error {
  private readonly [errsSymbol]: Error[];
  public readonly [origStackSymbol]: string;
  
  /**
   * Creates an error that consists of multiple errors.
   */
  public constructor(...errs: Error[]);
  
  /**
   * Returns the list of errors.
   */
  public getErrors(): Error[];
  
  static readonly errsSymbol: typeof errsSymbol;
  static readonly origStackSymbol: typeof origStackSymbol;
}

export = MultiError;