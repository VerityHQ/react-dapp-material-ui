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

    VotingContract.setProvider(provider);

    const votingContractTransactionId = '0x0353bdc2bf8fa194aee03219caf091c5756c84b8';
    const contract = VotingContract.at(votingContractTransactionId);

    contract.createContent(link.value).then((result) => {
      alert(1)
      dispatch((() => {
        return {
          title: title,
          link: link.value,
          type: constants.UPLOAD
        };
      })());

    }).catch((err) => {
      console.log('error iz: ', err);
      alert(2)
    });

  }

}