import Header from './Header/Header';
import classes from './App.module.css';
import Footer from './Footer/Footer';
import Main from './Main/Main';

function App() {
  return (
    <div className={classes.App}>
      <Header />
      <Main />
      <Footer />
    </div>
  );
}

export default App;
