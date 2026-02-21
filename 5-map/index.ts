interface KeyValuePair {
  key: any
  value: any
  next: KeyValuePair | null
}

class Map {
  private buckets: KeyValuePair[] = [];

  private hash(key: any): number {
    const stringKey = String(key);  // "name" -> "name", 123 -> "123"
    
    let hash = 0;
    for (let i = 0; i < stringKey.length; i++) {
        const char = stringKey.charCodeAt(i);
        hash = hash + char; 
    }
    
    return hash; 
  }

  set(key: any, value: any) {
    const index = this.hash(key);
    const node = { key, value, next: null };

    if (!this.buckets[index]) {
      this.buckets[index] = node;
      return;
    }

    let current = this.buckets[index];
    while(current) {
      if(current.key === key) {
        current.value = value
        return
      }
      if(!current.next) {
        current.next = node
        return
      }
      current = current.next
    }
  }

  get(key: any): any {
    const index = this.hash(key);
    let current = this.buckets[index];

    while (current) {
      if (current.key === key) {
        return current.value;
      }
      if(current.next) {
        current = current.next;
      }
      return undefined
    }
  }

  delete(key: any): boolean {
    const index = this.hash(key)
    let current = this.buckets[index];
    let prev = null;

    while(current) {
      if(current.key === key) {
        if(prev) {
          prev.next = current.next 
        } else {
          this.buckets = this.buckets.filter((item: KeyValuePair, idx: number) => idx !== index)
        }
        return true
      }
      prev = current;
      if(current.next) {
        current = current.next;
      } else return false
    }
      return false;
  }
  
  clear() {
    this.buckets = []
  }
}