import { DEFAULT_LANGUAGE } from "@/constants/i18n"

export type RouteOptions = {
  layoutId?: string
  storyId?: string
  type?: string
  language?: string
  categoryId?: string
}

export const createRoute = (options: RouteOptions) => {
  const { 
    layoutId, 
    categoryId,
    language = DEFAULT_LANGUAGE
  } = options;

  if (categoryId) {
    return createCategoryRoute(options);
  }

  if (layoutId) {
    return createLayoutRoute(options);
  }

  return '/' + language;
}

export const createLayoutRoute = (options: RouteOptions) => {
  const {
    language = DEFAULT_LANGUAGE,
    storyId,
    type = 'scenario',
    layoutId
  } = options;

  let path = '/' + language + '/layout/' + layoutId;
  path += '/' + type;

  if (!storyId) {
    return path;
  }

  return path + '/' + storyId;
}

export const createCategoryRoute = (options: RouteOptions) => {
  const {
    language = DEFAULT_LANGUAGE,
    categoryId,
    storyId,
    type = 'scenario',
    layoutId
  } = options;

  let path = '/' + language + '/category/' + categoryId;

  if (!layoutId) {
    return path;
  }
  
  path += '/' + layoutId + '/' + type;

  if (!storyId) {
    return path;
  }

  return path + '/' + storyId;
}

