class Cache {
  private cache: { [key: string]: { value: any; expiry: number } };
  private ttl: number;

  constructor(ttlSeconds: number) {
    this.cache = {};
    this.ttl = ttlSeconds * 1000;
  }

  set(key: string, value: any) {
    const expiry = Date.now() + this.ttl;
    this.cache[key] = { value, expiry };
  }

  get<T>(key: string): T | undefined {
    const cachedItem = this.cache[key];
    if (!cachedItem) {
      return undefined;
    }

    if (Date.now() > cachedItem.expiry) {
      delete this.cache[key];
      return undefined;
    }

    return cachedItem.value;
  }

  del(key: string) {
    delete this.cache[key];
  }

  flush() {
    this.cache = {};
  }
}

export default Cache;
