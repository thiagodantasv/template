// import { LoggedUser } from '../../domain/useCases/auth/authorizator'

export interface Request {
  verb: string
  path: string
  route: string
  file?: any
}
export interface HttpResponse {
  statusCode: number
  body?: any
}
export interface HttpRequest {
  request: Request
  body?: any
  query?: any
  params?: any
  headers?: any
  // currentUser?: LoggedUser
  currentGroup?: number
}
