import i18n from 'i18n'
import path from 'path'
import cors from 'cors'
import dotenv from 'dotenv'
import express, { Express, Request, Response, Router } from 'express'
import { readdirSync } from 'fs'
import bodyParser from 'body-parser'
import helmet from 'helmet'
import configEnv from './env'
import { Connection, createConnection } from 'typeorm'
import { StatusCodes } from 'http-status-codes'
import swaggerJSDoc from 'swagger-jsdoc'
import swaggerUi from 'swagger-ui-express'

export class Application {
  public app: Express
  public readonly rootDir: string
  public readonly routesDir: string

  constructor () {
    dotenv.config()
    this.rootDir = __dirname
    this.routesDir = path.join(this.rootDir, 'app', 'main', 'routes')

    this.app = express()
    this.setupDotEnv()
    this.setupMiddlewares()
    this.setupRoutes()
    this.setupI18n()
    this.setupSwagger()

    this.app.get('/', (req: Request, res: Response) => {
      res.send(`API is alive in ${process.env.NODE_ENV} environment`)
    })
  }

  private setupDotEnv (): void {
    configEnv.database.dev = {
      DRIVER: process.env.DEV_DB_DRIVER,
      HOST: process.env.DEV_DB_HOST,
      PORT: process.env.DEV_DB_PORT,
      USERNAME: process.env.DEV_DB_USERNAME,
      PASSWORD: process.env.DEV_DB_PASSWORD,
      NAME: process.env.DEV_DB_NAME
    }

    configEnv.database.staging = {
      DRIVER: process.env.STAGING_DB_DRIVER,
      HOST: process.env.STAGING_DB_HOST,
      PORT: process.env.STAGING_DB_PORT,
      USERNAME: process.env.STAGING_DB_USERNAME,
      PASSWORD: process.env.STAGING_DB_PASSWORD,
      NAME: process.env.STAGING_DB_NAME
    }

    configEnv.database.test = {
      DRIVER: process.env.TEST_DB_DRIVER,
      HOST: process.env.TEST_DB_HOST,
      PORT: process.env.TEST_DB_PORT,
      USERNAME: process.env.TEST_DB_USERNAME,
      PASSWORD: process.env.TEST_DB_PASSWORD,
      NAME: process.env.TEST_DB_NAME
    }

    configEnv.database.ci = {
      DRIVER: process.env.CI_DB_DRIVER,
      HOST: process.env.CI_DB_HOST,
      PORT: process.env.CI_DB_PORT,
      USERNAME: process.env.CI_DB_USERNAME,
      PASSWORD: process.env.CI_DB_PASSWORD,
      NAME: process.env.CI_DB_NAME
    }

    configEnv.database.prod = {
      DRIVER: process.env.PROD_DB_DRIVER,
      HOST: process.env.PROD_DB_HOST,
      PORT: process.env.PROD_DB_PORT,
      USERNAME: process.env.PROD_DB_USERNAME,
      PASSWORD: process.env.PROD_DB_PASSWORD,
      NAME: process.env.PROD_DB_NAME
    }
  }

  private setupMiddlewares (): void {
    this.app.use(bodyParser.json())
    this.app.use(helmet())
    this.app.use(cors())
    this.app.use((error, req, res, next) => {
      if (error instanceof SyntaxError) {
        res.status(StatusCodes.OK).json({
          msg: i18n.__('BAD_REQUEST')
        })
      } else {
        next()
      }
    })
  }

  private setupRoutes (): void {
    const router = Router()
    this.app.use(configEnv.ROUTE_ROOT, router)
    readdirSync(this.routesDir).map(async file => {
      if (!file.includes('.test.') && !file.includes('.spec.')) {
        (await import(path.join(this.routesDir, file))).default(router)
      }
    })
  }

  private setupI18n (): void {
    i18n.configure({
      locales: configEnv.i18n.LOCALES,
      directory: path.join(this.rootDir, 'locales'),
      defaultLocale: configEnv.i18n.DEFAULT_LOCALE
    })
  }

  public async setupDb (): Promise<Connection> {
    const env = process.env.NODE_ENV?.trim().toLowerCase()
    console.log(`Db is running in ${process.env.NODE_ENV?.trim()} environment`)
    // eslint-disable-next-line no-async-promise-executor
    return await new Promise(async (resolve) => {
      const connection = await createConnection({
        type: configEnv.database[env].DRIVER as any,
        host: configEnv.database[env].HOST,
        port: configEnv.database[env].PORT as any,
        username: configEnv.database[env].USERNAME,
        password: configEnv.database[env].PASSWORD,
        database: configEnv.database[env].NAME,
        entities: [
          configEnv.typeorm.ENTITIES_FOLDER
        ],
        synchronize: false,
        timezone: '+00:00',
        logging: false
      })
      resolve(connection)
      console.log('TypeORM Connection Started')
    })
  }

  private setupSwagger (): void {
    const options = {
      definition: {
        info: {
          title: 'Gamers Bank API',
          version: '1.0.0'
        },
        host: process.env.LOCAL_HOST,
        basePath: configEnv.ROUTE_ROOT,
        securityDefinitions: {
          ApiKeyAuth: {
            type: 'apiKey',
            in: 'header',
            name: 'Authorization'
          }
        }
      },
      apis: ['./src/docs/**/*.yaml']
    }

    const swaggerSpec = swaggerJSDoc(options)
    this.app.use('/api-reference', swaggerUi.serve, swaggerUi.setup(swaggerSpec))
    console.log('🎉 Documentation is runner: /api-reference')
  }
}
