module.exports = {

  DATABASE: {
    status: 500,
    code: 5000,
    message: 'Database issues...'
  },

  AWS_FAILURE: {
    status: 500,
    code: 5010,
    message: 'Amazon S3 has failed us'
  },

  NOT_FOUND: {
    status: 404,
    code: 4000,
    message: 'Resource not found'
  }

};