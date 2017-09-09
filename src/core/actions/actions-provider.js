import constants from 'core/types';

/**
 * specifyProvider - Specify the Web3 PRovider
 */
export function specifyProvider(provider) {
  alert('specifying provider')
  return {
    type: constants.SPECIFY_PROVIDER
  };
}