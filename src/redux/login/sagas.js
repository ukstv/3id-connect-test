import { all, takeEvery, put, call} from 'redux-saga/effects';
import { notification } from 'antd';
import Web3 from 'web3';
import { didAuthentication, setupIdx, linkIDXSkyDB } from '../../services/SkyDB';
import { actions } from './actions';

function* INIT_WEB3_SAGA() {
  yield put({
    type: actions.INITIALIZING_WEB3,
    payload: {
      initializingWeb3: true,
      end2endLoadingIndicator: true,
    },
  });

  try {
    const { authProvider, ceramic, idx, web3Modal } = yield call(didAuthentication);

    yield put({
      type: actions.AUTHENTICATED_WITH_DID,
      payload: {
        didAuthenticated: true,
        authProvider,
        ceramic,
        idx,
        selectedAccount: authProvider.address.toLowerCase(),
        web3Modal,
      },
    });

    notification.info({
      message: `Authenticated with DID ${idx.id}`,
      placement: 'bottomRight',
    });

    const seedKey = yield call(setupIdx, ceramic);

    yield put({
      type: actions.IDX_SETUP_CREATED,
      payload: {
        idxSetup: true,
        idxDefinitionID: seedKey,
      },
    });

    notification.info({
      message: `IDX setup created with definition ID ${seedKey}`,
      placement: 'bottomRight',
    });

    const skynetClient = yield call(linkIDXSkyDB, idx, seedKey);

    yield put({
      type: actions.IDX_SKYDB_LINK,
      payload: {
        idxSkyDBLink: true,
        skynetClient,
      },
    });

    notification.info({
      message: `IDX linked to SKYDb`,
      placement: 'bottomRight',
    });

    const web3 = new Web3(authProvider.provider);

    yield put({
      type: actions.SET_WEB3,
      payload: {
        web3,
        initializingWeb3: false,
        end2endLoadingIndicator: false,
        isLoggedIn: true,
      },
    });

  } catch (err) {
    yield put({
      type: actions.WEB3_ERROR,
      payload: {
        authorized: false,
        initializingWeb3: false,
        end2endLoadingIndicator: false,
      },
    });

    notification.error({
      message: 'Error connecting',
      placement: 'bottomRight',
    });
  }
}

export default function* rootSaga() {
  yield all([
    takeEvery(actions.INIT_WEB3, INIT_WEB3_SAGA),
  ]);
}
