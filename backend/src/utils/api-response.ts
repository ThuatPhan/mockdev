import { Response } from 'express'
import { StatusCodes } from 'http-status-codes'

class ApiResponse<T> {
  public readonly code: number
  public readonly message: string
  public readonly data: T | null

  private constructor(code: number, data: T | null, message: string) {
    this.code = code
    this.data = data
    this.message = message
  }

  static success<T>(data: T, message = 'Success', code = StatusCodes.OK) {
    return new ApiResponse<T>(code, data, message)
  }

  static error<T>(message: string, code = StatusCodes.INTERNAL_SERVER_ERROR, errors: T | null = null) {
    return new ApiResponse<T>(code, errors, message)
  }

  send(res: Response): Response {
    return res.status(this.code).json({
      code: this.code,
      data: this.data,
      message: this.message
    })
  }
}

export default ApiResponse
