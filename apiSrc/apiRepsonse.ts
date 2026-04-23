export const API_RESPONSE_CODES = {
  success: 200,
  created: 201,
  badRequest: 400,
  notFound: 404,
  methodNotAllowed: 405
} as const;

export const API_RESPONSE_MESSAGES = {
  methodNotSupported: 'This request method is not supported.',
  searchProductMissing: 'Bad request, search_product parameter is missing in POST request.',
  userCreated: 'User created!',
  userUpdated: 'User updated!',
  accountDeleted: 'Account deleted!',
  userExists: 'User exists!',
  emailOrPasswordMissing: 'Bad request, email or password parameter is missing in POST request.',
  userNotFound: 'User not found!'
} as const;
