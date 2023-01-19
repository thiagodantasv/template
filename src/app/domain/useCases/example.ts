import { Result } from "../protocols/result"

export interface IExampleDto {
  id: number
}

export interface IExampleDtoResponse {
  exampleResponse: string
}

export interface ExampleUc {
  exec: (data: IExampleDto) => Promise<Result<IExampleDtoResponse>>
}