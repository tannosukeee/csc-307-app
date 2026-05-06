// module.test.js
import mut from './module.js'; // MUT = Module Under Test

// Test cases for sum()
test('Testing sum -- success', () => {
  const expected = 30;
  const got = mut.sum(12, 18);
  expect(got).toBe(expected);
});

// Test cases for div()
describe('div function', () => {
  test('Testing div -- basic division', () => {
    const expected = 2;
    const got = mut.div(10, 5);
    expect(got).toBe(expected);
  });

  test('Testing div -- division with decimals', () => {
    const expected = 2.5;
    const got = mut.div(5, 2);
    expect(got).toBe(expected);
  });

  test('Testing div -- division by zero returns Infinity', () => {
    const got = mut.div(10, 0);
    expect(got).toBe(Infinity);
  });

  test('Testing div -- zero divided by number', () => {
    const expected = 0;
    const got = mut.div(0, 5);
    expect(got).toBe(expected);
  });

  test('Testing div -- negative numbers', () => {
    const expected = -2;
    const got = mut.div(-10, 5);
    expect(got).toBe(expected);
  });

  test('Testing div -- both negative numbers', () => {
    const expected = 2;
    const got = mut.div(-10, -5);
    expect(got).toBe(expected);
  });
});

// Test cases for containsNumbers()
describe('containsNumbers function', () => {
  test('Testing containsNumbers -- text with numbers', () => {
    const got = mut.containsNumbers('hello123');
    expect(got).toBe(true);
  });

  test('Testing containsNumbers -- text without numbers', () => {
    const got = mut.containsNumbers('hello');
    expect(got).toBe(false);
  });

  test('Testing containsNumbers -- only numbers', () => {
    const got = mut.containsNumbers('12345');
    expect(got).toBe(true);
  });

  test('Testing containsNumbers -- empty string', () => {
    const got = mut.containsNumbers('');
    expect(got).toBe(false);
  });

  test('Testing containsNumbers -- string with spaces', () => {
    const got = mut.containsNumbers('hello world');
    expect(got).toBe(false);
  });

  test('Testing containsNumbers -- string with space character (BUG TEST)', () => {
    const got = mut.containsNumbers(' ');
    expect(got).toBe(false);
  });

  test('Testing containsNumbers -- string starting with number', () => {
    const got = mut.containsNumbers('1hello');
    expect(got).toBe(true);
  });

  test('Testing containsNumbers -- string ending with number', () => {
    const got = mut.containsNumbers('hello1');
    expect(got).toBe(true);
  });

  test('Testing containsNumbers -- special characters only', () => {
    const got = mut.containsNumbers('!@#$%');
    expect(got).toBe(false);
  });

  test('Testing containsNumbers -- mixed special chars and numbers', () => {
    const got = mut.containsNumbers('hello!@3');
    expect(got).toBe(true);
  });
});
