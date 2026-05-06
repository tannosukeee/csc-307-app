# Jest Unit Testing Assignment

This package contains unit tests for three functions: `sum()`, `div()`, and `containsNumbers()`.

## Setup

The project is configured to use ES modules with Jest:

1. `package.json` is configured with `"type": "module"`
2. Jest is configured to use experimental VM modules
3. The `transform` option is reset to prevent CommonJS conversion

## Functions Under Test

### sum(a, b)
Returns the sum of two numbers.

### div(a, b)
Returns the division of a by b.

### containsNumbers(text)
Checks if a string contains any numeric digits.

## Running Tests

```bash
npm test
```

## Bug Found

**The test suite successfully identified a bug in the `containsNumbers()` function!**

### The Bug
The function uses `isNaN(text.charAt(i))` to check if a character is a number. However, `isNaN()` returns `false` for space characters (and empty strings), which causes the function to incorrectly return `true` for strings containing only spaces.

### Test Cases That Caught the Bug
- `containsNumbers('hello world')` - Expected: `false`, Got: `true`
- `containsNumbers(' ')` - Expected: `false`, Got: `true`

### Why This Happens
`isNaN(' ')` returns `false` because JavaScript coerces a space to `0` when converting to a number, and `0` is not NaN.

### The Fix
To fix this bug, the function should check if the character is actually a digit (0-9) rather than relying on `isNaN()`. Here's a corrected version:

```javascript
function containsNumbers(text) {
  for (let i = 0; i < text.length; i++) {
    const char = text.charAt(i);
    if (char >= '0' && char <= '9') {
      return true;
    }
  }
  return false;
}
```

Or using a regular expression:

```javascript
function containsNumbers(text) {
  return /\d/.test(text);
}
```

## Test Coverage

### div() function tests:
- Basic division
- Division with decimals
- Division by zero (returns Infinity)
- Zero divided by a number
- Negative numbers
- Both negative numbers

### containsNumbers() function tests:
- Text with numbers
- Text without numbers
- Only numbers
- Empty string
- String with spaces (catches bug)
- String with only space character (catches bug)
- String starting with number
- String ending with number
- Special characters only
- Mixed special characters and numbers
