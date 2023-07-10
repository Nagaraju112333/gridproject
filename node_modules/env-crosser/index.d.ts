import { ValueOf } from "./externals"

declare interface EnvValues {
    /**
     * The value to return in a browser.
    */
    browser?: any,

    /**
    * The value to return in a web worker.
    */
    worker?: any,

    /**
    * The value to return in NodeJS.
    */
    node?: any,

    /**
    * The value to fall back to if all the other checks fail or a corresponding value isn't provided.
    */
    fallback?: any
}

/**
 * Return a specific value depending on the environment.
 * @param values The values to return.
 * @example
 * ```
 * const envCrosser = require("env-crosser");
 *
 * envCrosser({
 *     browser: "Browser!",
 *     worker: "Web Worker!",
 *     node: "NodeJS!",
 *     fallback: "???"
 * })
 * //=> "NodeJS!" (When using NodeJS)
 * ```
*/
declare function envCrosser<T extends EnvValues>(values: T): ValueOf<T>;

export = envCrosser;
