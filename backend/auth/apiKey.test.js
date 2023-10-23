const apiKey = require('./apiKey');
const database = require('../db/db');

afterAll(async () => {
  await database.closeDb();
});

describe('apiKey', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  afterEach(() => {
    jest.resetAllMocks();
    jest.clearAllTimers();
    jest.restoreAllMocks();
  });

  it('compareKeys should return true for matching key', async () => {
    const testKey = 'abcdef';
    const storedKey = await apiKey.newHash(testKey);

    const result = await apiKey.compareKeys(storedKey, testKey);
    expect(result).toBe(true);
  });

  it('should return false for non-matching keys', async () => {
    const testKey = 'abcdef';
    const storedKey = await apiKey.newHash('anotherKey');

    const result = await apiKey.compareKeys(storedKey, testKey);
    expect(result).toBe(false);
  });

  it('getAllStoredKeys should return all stored keys', async () => {
    const testKeyHash = await apiKey.newHash('abcdef');
    await apiKey.storeKey(testKeyHash);

    const result = await apiKey.getAllStoredKeys();
    expect(result.length).toBe(1);
  });

  it('isValid should return true for valid key', async () => {
    const testKey = 'abcdef';
    const testKeyHash = await apiKey.newHash(testKey);
    await apiKey.storeKey(testKeyHash);

    const result = await apiKey.isValid(testKey);
    expect(result).toBe(true);
  });

  it('isValid should return false for invalid key', async () => {
    const testKey = 'invalidKey';
    const anotherKeyHash = await apiKey.newHash('anotherKey');
    await apiKey.storeKey(anotherKeyHash);

    const result = await apiKey.isValid(testKey);
    expect(result).toBe(false);
  });
});
