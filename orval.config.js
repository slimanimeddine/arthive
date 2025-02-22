module.exports = {
  mentorium: {
    output: {
      mode: 'tags-split',
      target: 'src/api',
      schemas: 'src/api/model',
      client: 'react-query',
    },
    input: {
      target: 'http://localhost:8000/docs.openapi',
    },
    hooks: {
      afterAllFilesWrite: {
        command: './after.sh',
        injectGeneratedDirsAndFiles: false,
      },
    },
  },
  mentoriumZod: {
    input: {
      target: 'http://localhost:8000/docs.openapi',
    },
    output: {
      mode: 'tags-split',
      client: 'zod',
      target: 'src/api/zod/schemas',
    },
    hooks: {
      afterAllFilesWrite: {
        command: './after-zod.sh',
        injectGeneratedDirsAndFiles: false,
      },
    },
  },
}
