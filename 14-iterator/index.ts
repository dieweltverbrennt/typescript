interface Item {
  id: number
  date: string
  title: string
}

interface Iterator<T> {
  current(): T | undefined
  next(): T | undefined
  hasNext(): boolean
  reset(): void
  getIndex(): number
}

class ItemCollection {
  private items: Item[]

  constructor(items: Item[]) {
    this.items = [...items]
  }

  // Создание итератора для обхода по id
  createIdIterator(): ItemIterator {
    const sortedById = [...this.items].sort((a, b) => a.id - b.id)
    return new ItemIterator(sortedById)
  }

  // Создание итератора для обхода по дате
  createDateIterator(): ItemIterator {
    const sortedByDate = [...this.items].sort((a, b) => {
      const dateA = this.parseDate(a.date)
      const dateB = this.parseDate(b.date)
      return dateA.getTime() - dateB.getTime()
    })
    return new ItemIterator(sortedByDate)
  }

  // Вспомогательный метод для парсинга даты из формата "DD-MM-YYYY"
  private parseDate(dateStr: string): Date {
    const [day, month, year] = dateStr.split('-').map(Number)
    return new Date(year, month - 1, day)
  }

  // Метод для получения всех элементов (для отладки)
  getAll(): Item[] {
    return [...this.items]
  }
}

// Конкретный итератор
class ItemIterator implements Iterator<Item> {
  private items: Item[]
  private index: number = 0

  constructor(items: Item[]) {
    this.items = items
  }

  // Получить текущий элемент
  current(): Item | undefined {
    return this.items[this.index]
  }

  // Перейти к следующему элементу и вернуть его
  next(): Item | undefined {
    if (this.hasNext()) {
      this.index++
      return this.current()
    }
    return undefined
  }

  // Проверить, есть ли следующий элемент
  hasNext(): boolean {
    return this.index < this.items.length - 1
  }

  // Сбросить итератор в начало
  reset(): void {
    this.index = 0
  }

  // Получить текущий индекс
  getIndex(): number {
    return this.index
  }

  // Дополнительный метод для получения всех оставшихся элементов
  remaining(): Item[] {
    return this.items.slice(this.index)
  }
}
