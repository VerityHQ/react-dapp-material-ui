import constants from 'core/types';

/**
 * vote - Vote on content
 */
export function upload(title, link) {
  return {
    type: constants.UPLOAD
  };
}