import constants from 'core/types';

/**
 * vote - Vote on content
 */
export function voteUp() {
  alert('will vote!!')
  return {
    type: constants.VOTE
  };
}