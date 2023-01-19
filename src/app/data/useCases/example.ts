import { Result } from "../../domain/protocols/result"
import { ExampleUc, IExampleDto, IExampleDtoResponse } from "../../domain/useCases/example"
import { ok } from "../helpers/result"
import { Internationalization } from "../protocols/utils/internationalization"

export class Example implements ExampleUc {
  constructor (
    private readonly i18n: Internationalization
  ) {}

  async exec(data: IExampleDto): Promise<Result<IExampleDtoResponse>> {
    return ok(this.i18n.t('EXAMPLE_MESSAGE'), {
      exampleResponse: 'example response'
    })
  }
}