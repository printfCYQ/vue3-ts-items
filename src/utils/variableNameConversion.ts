/**
 * Convert a string from small hump to great hump.
 * Examples:
 *   'helloWorld' -> 'HelloWorld'
 *   'hello_world' -> 'Hello_World'
 * @param {string} str - The string to convert.
 * @returns {string} The converted string.
 */
const convertSmallHumpToGreatHump = (str: string): string => {
    return str.charAt(0).toUpperCase() + str.slice(1);
};

/**
 * Convert a string from small hump to snake.
 * Examples:
 *   'helloWorld' -> 'hello_world'
 *   'helloWorldClass' -> 'hello_world_class'
 * @param {string} str - The string to convert.
 * @returns {string} The converted string.
 */
const convertSmallHumpToSnake = (str: string): string => {
    return str.replace(/([A-Z])/g, '_$1').toLowerCase();
};

/**
 * Convert a string from small hump to kebab.
 * Examples:
 *   'helloWorld' -> 'hello-world'
 *   'helloWorldClass' -> 'hello-world-class'
 * @param {string} str - The string to convert.
 * @returns {string} The converted string.
 */
const convertSmallHumpToKebab = (str: string): string => {
    return str.replace(/([A-Z])/g, '-$1').toLowerCase();
};

/**
 * Convert a string from small hump to constant style.
 * Examples:
 *   'helloWorld' -> 'HELLO_WORLD'
 *   'helloWorldClass' -> 'HELLO_WORLD_CLASS'
 * @param {string} str - The string to convert.
 * @returns {string} The converted string.
 */
const convertSmallHumpToConst = (str: string): string => {
    return str
        .replace(/([A-Z])/g, '_$1')
        .toUpperCase()
        .replace(/^_/, '');
};
/**
 * Convert a string from great hump to small hump.
 * Examples:
 *   'HelloWorld' -> 'helloWorld'
 *   'HelloWorldClass' -> 'helloWorldClass'
 * @param {string} str - The string to convert.
 * @returns {string} The converted string.
 */
const convertGreatHumpToSmallHump = (str: string): string => {
    return str.charAt(0).toLowerCase() + str.slice(1);
};

/**
 * Convert a string from great hump to snake.
 * Examples:
 *   'HelloWorld' -> 'hello_world'
 *   'HelloWorldClass' -> 'hello_world_class'
 * @param {string} str - The string to convert.
 * @returns {string} The converted string.
 */
const convertGreatHumpToSnake = (str: string): string => {
    return convertSmallHumpToSnake(convertGreatHumpToSmallHump(str));
};
/**
 * Convert a string from great hump to kebab style.
 * Examples:
 *   'HelloWorld' -> 'hello-world'
 *   'HelloWorldClass' -> 'hello-world-class'
 * @param {string} str - The string to convert.
 * @returns {string} The converted string.
 */
const convertGreatHumpToKebab = (str: string): string => {
    return convertSmallHumpToKebab(convertGreatHumpToSmallHump(str))
};
/**
 * Convert a string from great hump to constant style.
 * Examples:
 *   'HelloWorld' -> 'HELLO_WORLD'
 *   'HelloWorldClass' -> 'HELLO_WORLD_CLASS'
 * @param {string} str - The string to convert.
 * @returns {string} The converted string.
 */
const convertGreatHumpToConst = (str: string): string => {
    return convertSmallHumpToConst(convertGreatHumpToSmallHump(str))
};
/**
 * Convert a string from snake case to small hump (camel case).
 * Examples:
 *   'hello_world' -> 'helloWorld'
 *   'this_is_a_test' -> 'thisIsATest'
 * @param {string} str - The snake case string to convert.
 * @returns {string} The converted camel case string.
 */

const convertSnakeToSmallHump = (str: string): string => {
    return str.replace(/_([a-z])/g, (match, group) => group.toUpperCase());
};

/**
 * Convert a string from snake case to great hump (Pascal case).
 * Examples:
 *   'hello_world' -> 'HelloWorld'
 *   'this_is_a_test' -> 'ThisIsATest'
 * @param {string} str - The snake case string to convert.
 * @returns {string} The converted Pascal case string.
 */
const convertSnakeToGreatHump = (str: string): string => {
    return str.split('_').map((word) => word.charAt(0).toUpperCase() + word.slice(1)).join('');
};
/**
 * Convert a string from snake case to kebab case.
 * Examples:
 *   'hello_world' -> 'hello-world'
 *   'this_is_a_test' -> 'this-is-a-test'
 * @param {string} str - The snake case string to convert.
 * @returns {string} The converted kebab case string.
 */
const convertSnakeToKebab = (str: string): string => {
    return str.replace(/_/g, '-');
};

/**
 * Convert a string from snake case to constant case.
 * Examples:
 *   'hello_world' -> 'HELLO_WORLD'
 *   'this_is_a_test' -> 'THIS_IS_A_TEST'
 * @param {string} str - The snake case string to convert.
 * @returns {string} The converted constant case string.
 */
const convertSnakeToConst = (str: string): string => {
    return str.toUpperCase();
};

/**
 * Convert a string from kebab case to small hump (camel case).
 * Examples:
 *   'hello-world' -> 'helloWorld'
 *   'this-is-a-test' -> 'thisIsATest'
 * @param {string} str - The kebab case string to convert.
 * @returns {string} The converted camel case string.
 */
const convertKebabToSmallHump = (str: string): string => {
    return str.replace(/-([a-z])/g, (match, group) => group.toUpperCase());
};

/**
 * Convert a string from kebab case to great hump (Pascal case).
 * Examples:
 *   'hello-world' -> 'HelloWorld'
 *   'this-is-a-test' -> 'ThisIsATest'
 * @param {string} str - The kebab case string to convert.
 * @returns {string} The converted Pascal case string.
 */
const convertKebabToGreatHump = (str: string): string => {
    return convertSmallHumpToGreatHump(convertKebabToSmallHump(str));
};

/**
 * Convert a string from kebab case to snake case.
 * Examples:
 *   'hello-world' -> 'hello_world'
 *   'this-is-a-test' -> 'this_is_a_test'
 * @param {string} str - The kebab case string to convert.
 * @returns {string} The converted snake case string.
 */

const convertKebabToSnake = (str: string): string => {
    return str.replace(/-/g, '_');
};

/**
 * Convert a string from kebab case to constant case.
 * Examples:
 *   'hello-world' -> 'HELLO_WORLD'
 *   'this-is-a-test' -> 'THIS_IS_A_TEST'
 * @param {string} str - The kebab case string to convert.
 * @returns {string} The converted constant case string.
 */
const convertKebabToConst = (str: string): string => {
    return str.toUpperCase().replace(/-/g, '_');
};

/**
 * Convert a string from constant case to small hump (camel case).
 * Examples:
 *   'HELLO_WORLD' -> 'helloWorld'
 *   'THIS_IS_A_TEST' -> 'thisIsATest'
 * @param {string} str - The constant case string to convert.
 * @returns {string} The converted camel case string.
 */
const convertConstToSmallHump = (str: string): string => {
    return str.split('_').map((word, index) => index === 0 ? word.toLowerCase() : word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()).join('');
};
/**
 * Convert a string from constant case to great hump (Pascal case).
 * Examples:
 *   'HELLO_WORLD' -> 'HelloWorld'
 *   'THIS_IS_A_TEST' -> 'ThisIsATest'
 * @param {string} str - The constant case string to convert.
 * @returns {string} The converted Pascal case string.
 */
const convertConstToGreatHump = (str: string): string => {
    return convertSmallHumpToGreatHump(convertConstToSmallHump(str));
};

/**
 * Convert a string from constant case to snake case.
 * Examples:
 *   'HELLO_WORLD' -> 'hello_world'
 *   'THIS_IS_A_TEST' -> 'this_is_a_test'
 * @param {string} str - The constant case string to convert.
 * @returns {string} The converted snake case string.
 */
const convertConstToSnake = (str: string): string => {
    return str.toLowerCase().replace(/_/g, '_');
};

/**
 * Convert a string from constant case to kebab case.
 * Examples:
 *   'HELLO_WORLD' -> 'hello-world'
 *   'THIS_IS_A_TEST' -> 'this-is-a-test'
 * @param {string} str - The constant case string to convert.
 * @returns {string} The converted kebab case string.
 */

const convertConstToKebab = (str: string): string => {
    return str.toLowerCase().replace(/_/g, '-');
};

export interface InputTypeItem {
    label: string;
    example: string;
    regex: RegExp;
    fns: Array<(str: string) => string>
}

const inputTypes: InputTypeItem[] = [
    {
        label: "smallHump",
        example: "helloWorld",
        regex: /^[a-z][a-zA-Z0-9]*$/,
        fns: [
            convertSmallHumpToGreatHump,
            convertSmallHumpToSnake,
            convertSmallHumpToKebab,
            convertSmallHumpToConst,
        ],
    },
    {
        label: "greatHump",
        example: "HelloWorld",
        regex: /^[A-Z][a-zA-Z0-9]*$/,
        fns: [
            convertGreatHumpToSmallHump,
            convertGreatHumpToSnake,
            convertGreatHumpToKebab,
            convertGreatHumpToConst,
        ],
    },
    {
        label: "snake",
        example: "hello_world",
        regex: /^[a-z_][a-z0-9_]*$/,
        fns: [
            convertSnakeToSmallHump,
            convertSnakeToGreatHump,
            convertSnakeToKebab,
            convertSnakeToConst,
        ],
    },
    {
        label: "kebab",
        example: "hello-world",
        regex: /^[a-z-][a-z0-9-]*$/,
        fns: [
            convertKebabToSmallHump,
            convertKebabToGreatHump,
            convertKebabToSnake,
            convertKebabToConst,
        ],
    },
    {
        label: "const",
        example: "HELLO_WORLD",
        regex: /^[A-Z_][A-Z0-9_]*$/,
        fns: [
            convertConstToSmallHump,
            convertConstToGreatHump,
            convertConstToSnake,
            convertConstToKebab,
        ],
    },
];

export default inputTypes