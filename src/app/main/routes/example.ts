import { Router } from "express"
import { adaptRoute } from "../adapters/express-route-adapter"
import { makeExampleController } from "../factories/example"

export default (router: Router): void => {
  router.post(
    '/example',
    adaptRoute(makeExampleController())
  )
}