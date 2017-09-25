import constants from 'core/types';
import TruffleContract from 'truffle-contract';
import VotingContractJSON from '../../../build/contracts/Voting.json';

/**
 * upload - Upload title + link (a.k.a. url)
 */
export function upload(title, link) {
  return (dispatch, getState) => {
    const { provider } = getState().provider;
    const VotingContract = TruffleContract(VotingContractJSON);

    VotingContract.setProvider(provider.currentProvider);

    const votingContractTransactionId = '0xf3a5c51623fe1a581cf8c27c358345effe873533';
    const contract = VotingContract.at(votingContractTransactionId);

    contract.createContent(link, title).then((result) => {
      dispatch((() => {
        return {
          title: title,
          link: link.value,
          type: constants.UPLOAD
        };
      })());

    }).catch((err) => {
      console.log('error iz: ', err);
    });

  }

}