import { Request, Response, NextFunction } from 'express'

export const fileHandleExpress = (req: Request, _: Response, next: NextFunction): void => {
  const { file } = req
  Object.assign(req.body, { file: file })
  return next()
}
