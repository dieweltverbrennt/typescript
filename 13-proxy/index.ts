class ProductAPI {
  private baseUrl: string = 'https://dummyjson.com/products'

  async getProduct(id: number): Promise<any> {
    try {
      const response = await fetch(`${this.baseUrl}/${id}`)
      if (!response.ok) {
        throw new Error(`Error ${response.status}`)
      }
      return await response.json()
    } catch (e) {
      if (e instanceof Error) {
        throw new Error(e.message)
      }
    }
  }
}

class ProductAPIProxy {
  private api: ProductAPI

  constructor() {
    this.api = new ProductAPI()
  }

  async getProduct(id: number): Promise<any> {
    if (id >= 10) {
      throw new Error(
        `Access denied: Product with ID ${id} is not available. Only products with ID < 10 are accessible.`,
      )
    }

    try {
      return await this.api.getProduct(id)
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(`Proxy error: ${error.message}`)
      }
    }
  }
}
