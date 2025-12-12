/**
 * JavaScript Example
 * Demonstrates syntax highlighting
 */

"use strict";

// Constants and Numbers
const MAX_RETRIES = 3;
const PI = 3.14159;
const HEX_VALUE = 0xff;
const IS_ENABLED = true;
const NULL_VALUE = null;
const UNDEFINED_VALUE = undefined;

// Class
class EventEmitter {
  #listeners = new Map();

  constructor(name) {
    this.name = name;
  }

  on(event, callback) {
    if (!this.#listeners.has(event)) {
      this.#listeners.set(event, []);
    }
    this.#listeners.get(event).push(callback);
    return this;
  }

  emit(event, ...args) {
    const callbacks = this.#listeners.get(event) || [];
    callbacks.forEach((cb) => cb(...args));
  }

  static create(name) {
    return new EventEmitter(name);
  }
}

// Function declaration
function fibonacci(n) {
  if (n <= 1) return n;
  return fibonacci(n - 1) + fibonacci(n - 2);
}

// Arrow function
const square = (x) => x * x;

// Async/Await
async function loadConfig(path) {
  try {
    const response = await fetch(path);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Config load failed:", error.message);
    throw error;
  }
}

// Destructuring
const { name, age = 18 } = { name: "Bob" };
const [first, second, ...rest] = [1, 2, 3, 4, 5];

// Spread operator
const merged = { ...{ a: 1 }, ...{ b: 2 } };

// Array methods
const numbers = [1, 2, 3, 4, 5];
const processed = numbers
  .filter((n) => n % 2 === 0)
  .map((n) => n ** 2)
  .reduce((acc, n) => acc + n, 0);

// Template literals
const greeting = `Hello, ${name}!
Welcome to our app.`;

// Regular expression
const urlPattern = /https?:\/\/[\w.-]+(?:\/[\w.-]*)*\/?/gi;

// Symbol
const uniqueKey = Symbol("unique");

// Proxy
const handler = {
  get(target, prop) {
    return prop in target ? target[prop] : "default";
  },
};

// Promise
const delay = (ms) =>
  new Promise((resolve) => setTimeout(resolve, ms));

// Export
module.exports = { EventEmitter, fibonacci, loadConfig };
