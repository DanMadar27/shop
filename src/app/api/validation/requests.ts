import { validateSearch } from '@/utils/validation';

export function validateSlug(slug: string) {
  return !isNaN(parseInt(slug));
}

export function validateGetManyRequest(skip: string, take: string, search = '') {
  if (isNaN(parseInt(skip)) || isNaN(parseInt(take))) {
    return false;
  }

  if (search && !validateSearch(search)) {
    return false;
  }
  
  return true;
}
