import constants from 'core/types';

/**
 * vote - Vote on content
 */
export function voteUp() {
  return {
    type: constants.VOTE
  };
}