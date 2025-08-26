import { BaseError } from './base-error.ts'

export class FetchImageError extends BaseError {
  constructor() {
    super('Fetch image error')
  }
}
