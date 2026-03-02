type HTTPMethod =
  | 'GET'
  | 'POST'
  | 'PUT'
  | 'DELETE'
  | 'PATCH'
  | 'HEAD'
  | 'OPTIONS'

type Headers = Record<string, string>
type Body = string | FormData | URLSearchParams | Blob | ArrayBuffer | null

class RequestBuilder {
  private method: HTTPMethod = 'GET'
  private url: string = ''
  private headers: Headers = {}
  private body: Body = null

  setMethod(method: HTTPMethod): this {
    this.method = method
    return this
  }

  setUrl(url: string): this {
    this.url = url
    return this
  }

  setHeader(key: string, value: string): this {
    this.headers[key] = value
    return this
  }

  setBody(body: Body): this {
    this.body = body

    // Автоматически устанавливаем Content-Type если это JSON
    if (
      body &&
      typeof body === 'object' &&
      !(body instanceof FormData) &&
      !(body instanceof URLSearchParams)
    ) {
      this.setHeader('Content-Type', 'application/json')
    }

    return this
  }

  async exec<T>(): Promise<T> {
    if (!this.url) {
      throw new Error('URL не установлен. Используйте setUrl() перед exec()')
    }

    const requestOptions: RequestInit = {
      method: this.method,
      headers: this.headers,
    }

    if (this.method !== 'GET' && this.method !== 'HEAD') {
      requestOptions.body = this.body
    }

    try {
      const response = await fetch(this.url, requestOptions)
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      const contentType = response.headers.get('content-type')
      if (contentType && contentType.includes('application/json')) {
        return (await response.json()) as T
      } else {
        // Если это не JSON, возвращаем как текст или другое
        return (await response.text()) as T
      }
    } catch (e) {
      if (e instanceof Error) {
        throw new Error(e.message)
      }
      throw new Error('Произошла неизвестная ошибка')
    }
  }
}
