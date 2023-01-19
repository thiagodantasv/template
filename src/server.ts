import configEnv from './env'
import { Application } from './app'

const application = new Application()

application.setupDb().then(() => {
  application.app.listen(configEnv.PORT, async () => {
    console.log('Port %s', configEnv.PORT)
  })
}).catch(err => {
  console.error(err)
})

export default application
