import { useEffect } from 'react';
import { Button } from 'antd';
import { connect } from 'react-redux';
import { initWeb3, changeAuthorization } from './redux/login/actions';
import logo from './logo.svg';
import './App.css';

function App(props) {

  const { authorized, initWeb3Props, changeAuthorizationProps } = props;

  // Connect to provider and init web3
  useEffect(
    function initWeb3Effect() {
      if (authorized) {
        initWeb3Props();
      }
    },
    [authorized, initWeb3Props],
  );

    
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <Button type="primary" onClick={() => changeAuthorizationProps()}>Activate Web3</Button>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}
const mapStateToProps = (state) => ({
  authorized: state.login.authorized,
});


const mapDispatchToProps = (dispatch) => ({
  initWeb3Props: () => dispatch(initWeb3()),
  changeAuthorizationProps: () => dispatch(changeAuthorization())
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
