# Markdown Example

This document demonstrates **syntax highlighting** for _Markdown_.

## Table of Contents

- [Introduction](#introduction)
- [Features](#features)
- [Code Examples](#code-examples)
- [Tables](#tables)

---

## Introduction

This is a paragraph with **bold text**, *italic text*, and ***bold italic***.
You can also use ~~strikethrough~~ and `inline code`.

Here's a [link to example](https://example.com) and an image:

![Alt text for image](https://example.com/image.png)

## Features

### Unordered List

- First item
- Second item
  - Nested item
  - Another nested item
- Third item

### Ordered List

1. First step
2. Second step
   1. Sub-step A
   2. Sub-step B
3. Third step

### Task List

- [x] Completed task
- [ ] Pending task
- [ ] Another pending task

## Code Examples

### Inline Code

Use `const` and `let` for variable declarations.

### Code Blocks

```typescript
interface User {
  id: number;
  name: string;
  email?: string;
}

async function fetchUser(id: number): Promise<User> {
  const response = await fetch(`/api/users/${id}`);
  return response.json();
}
```

```python
def fibonacci(n: int) -> int:
    """Calculate the nth Fibonacci number."""
    if n <= 1:
        return n
    return fibonacci(n - 1) + fibonacci(n - 2)

# Usage
result = fibonacci(10)
print(f"Result: {result}")
```

```bash
#!/bin/bash
echo "Hello, World!"
npm install
npm run build
```

## Tables

| Column 1 | Column 2 | Column 3 |
|----------|:--------:|---------:|
| Left     | Center   | Right    |
| Data A   | Data B   | Data C   |
| 100      | 200      | 300      |

## Blockquotes

> This is a blockquote.
> It can span multiple lines.
>
> > Nested blockquotes are also supported.

## Horizontal Rules

---

***

___

## Footnotes

Here's a sentence with a footnote[^1].

[^1]: This is the footnote content.

## Abbreviations

The HTML specification is maintained by the W3C.

*[HTML]: Hyper Text Markup Language
*[W3C]: World Wide Web Consortium

## Definition Lists

Term 1
: Definition for term 1

Term 2
: Definition for term 2
: Another definition for term 2

## Mathematical Expressions

Inline math: $E = mc^2$

Block math:

$$
\frac{n!}{k!(n-k)!} = \binom{n}{k}
$$

## Emoji

:smile: :rocket: :warning:

## HTML in Markdown

<details>
<summary>Click to expand</summary>

This content is hidden by default.

- Item 1
- Item 2

</details>

<kbd>Ctrl</kbd> + <kbd>C</kbd> to copy.

---

**End of Document**
