class PagedResponse<T> {
  public readonly items: T[]
  public readonly metaData: {
    page: number
    size: number
    total: number
    totalPages: number
    hasNext: boolean
    hasPrev: boolean
  }

  private constructor(items: T[], page: number, size: number, total: number) {
    this.items = items
    this.metaData = {
      page,
      size,
      total,
      totalPages: size > 0 ? Math.ceil(total / size) : 0,
      hasNext: page < total,
      hasPrev: page > 1
    }
  }

  public static of<T>(items: T[], page: number, size: number, total: number) {
    return new PagedResponse<T>(items, page, size, total)
  }
}

export default PagedResponse
