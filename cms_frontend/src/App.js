import { CssBaseline } from '@mui/material';
import './App.css';
import Router from './Router';
import Navbar from './components/Navbar';

function App() {
  return (
    <div>
      <CssBaseline />
      <Navbar />
      <Router />

    </div>
  );
}
export default App;
