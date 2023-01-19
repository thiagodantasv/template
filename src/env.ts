const env = {
  PORT: 'FROM_ENV',
  ROUTE_ROOT: '/api/v1',
  database: {
    dev: {
      DRIVER: 'FROM_ENV',
      HOST: 'FROM_ENV',
      PORT: 'FROM_ENV',
      USERNAME: 'FROM_ENV',
      PASSWORD: 'FROM_ENV',
      NAME: 'FROM_ENV'
    },
    staging: {
      DRIVER: 'FROM_ENV',
      HOST: 'FROM_ENV',
      PORT: 'FROM_ENV',
      USERNAME: 'FROM_ENV',
      PASSWORD: 'FROM_ENV',
      NAME: 'FROM_ENV'
    },
    test: {
      DRIVER: 'FROM_ENV',
      HOST: 'FROM_ENV',
      PORT: 'FROM_ENV',
      USERNAME: 'FROM_ENV',
      PASSWORD: 'FROM_ENV',
      NAME: 'FROM_ENV'
    },
    ci: {
      DRIVER: 'FROM_ENV',
      HOST: 'FROM_ENV',
      PORT: 'FROM_ENV',
      USERNAME: 'FROM_ENV',
      PASSWORD: 'FROM_ENV',
      NAME: 'FROM_ENV'
    },
    prod: {
      DRIVER: 'FROM_ENV',
      HOST: 'FROM_ENV',
      PORT: 'FROM_ENV',
      USERNAME: 'FROM_ENV',
      PASSWORD: 'FROM_ENV',
      NAME: 'FROM_ENV'
    }
  },
  i18n: {
    LOCALES: ['br', 'en'],
    DEFAULT_LOCALE: 'br'
  },
  paginatedResult: {
    defaultItemsPerPage: 10,
    defaultCurrentPage: 1
  },
  typeorm: {
    ENTITIES_FOLDER: 'FROM_ENV'
  }
}

export default env
