import { Example } from "../../data/useCases/example"
import { I18n } from "../../implementations/internationalization/i18n"
import { ExampleController } from "../../presentation/controllers/example"

export const makeExampleController = (): ExampleController => {
  const i18n = new I18n()
  const uc = new Example(i18n)
  return new ExampleController(uc)
}