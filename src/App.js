import { useLocation } from 'react-router-dom';
import './App.css';
import MenuAcc from './Member/account/MenuAcc';
import Header from './Layout/Header';
import MenuLeft from './Layout/MenuLeft';
import Footer from './Layout/Footer';

function App(props) {
  let params1 = useLocation()
  return (
    <>
        <Header/>
        <section>
          <div className='container'>
            <div className='row'>
              {params1['pathname'].includes("account") ? <MenuAcc/> : <MenuLeft/>}
              {props.children}
            </div>
          </div>
        </section>
        <Footer/>
    </>
  );
}

export default App;
