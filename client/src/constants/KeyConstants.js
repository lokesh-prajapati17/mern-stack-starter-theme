/**
 * Storage and Header Keys Constants
 */
export const STORAGE_KEYS = {
  AUTH_TOKEN: "custom_mern_auth_token",
  REFRESH_TOKEN: "custom_mern_refresh_token",
  USER_DATA: "custom_mern_user_data",
  THEME_MODE: "custom_mern_theme_mode",
  CUSTOMIZATION: "custom_mern_customization",
};

export const HEADER_KEYS = {
  AUTHORIZATION: "Authorization",
  BEARER: "Bearer",
  CONTENT_TYPE: "Content-Type",
  ACCEPT: "Accept",
  APPLICATION_JSON: "application/json",
};

export const HTTP_STATUS = {
  OK: 200,
  CREATED: 201,
  ACCEPTED: 202,
  NO_CONTENT: 204,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  CONFLICT: 409,
  UNPROCESSABLE_ENTITY: 422,
  INTERNAL_SERVER_ERROR: 500,
};
