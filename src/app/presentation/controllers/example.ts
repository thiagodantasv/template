import { serverError, serverResponse } from "../helpers/http"
import { Controller } from "../protocols/controller"
import { HttpRequest, HttpResponse } from "../protocols/http"

export class ExampleController implements Controller {
  constructor (
    private readonly uc: any
  ) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const response = await this.uc.exec({...httpRequest.body})
      return serverResponse(response)
    } catch (error) {
      console.log(error)
      return serverError()
    }
  }
}