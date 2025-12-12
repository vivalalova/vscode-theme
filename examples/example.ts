/**
 * TypeScript Example
 * Demonstrates syntax highlighting
 */

import { readFile } from "fs/promises";

// Constants and Numbers
const MAX_RETRIES = 3;
const PI = 3.14159;
const HEX_VALUE = 0xff;
const IS_ENABLED = true;

// Interface
interface User {
  id: number;
  name: string;
  email?: string;
}

// Type Alias
type Status = "pending" | "active" | "inactive";

// Enum
enum Direction {
  Up = 1,
  Down,
  Left,
  Right,
}

// Class with generics
class Repository<T extends User> {
  private items: T[] = [];

  constructor(private readonly name: string) {}

  async add(item: T): Promise<void> {
    this.items.push(item);
  }

  find(predicate: (item: T) => boolean): T | undefined {
    return this.items.find(predicate);
  }

  get count(): number {
    return this.items.length;
  }
}

// Function with parameters
function greet(name: string, age: number = 18): string {
  return `Hello, ${name}! You are ${age} years old.`;
}

// Arrow function
const multiply = (a: number, b: number): number => a * b;

// Async function
async function fetchData(url: string): Promise<unknown> {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error: ${response.status}`);
    }
    return response.json();
  } catch (error) {
    console.error("Failed to fetch:", error);
    throw error;
  }
}

// Object destructuring
const { id, name: userName } = { id: 1, name: "Alice" };

// Array methods (chaining)
const numbers = [1, 2, 3, 4, 5];
const doubled = numbers
  .filter((n) => n > 2)
  .map((n) => n * 2)
  .reduce((sum, n) => sum + n, 0);

// Template literal
const message = `User ${userName} has ID ${id}`;

// Regular expression
const emailRegex = /^[\w-]+(\.[\w-]+)*@[\w-]+(\.[\w-]+)+$/;

// Export
export { Repository, greet, fetchData };
export type { User, Status };
