import constants from 'core/types';

/**
 * upload - Upload title + link
 */
export function upload(title, link) {
  return (dispatch, getState) => {
    const { provider } = getState().provider;

    dispatch((() => {
      return {
        title: title,
        link: link,
        type: constants.UPLOAD
      };
    })());
  }

}