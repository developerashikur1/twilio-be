import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Call from './components/Call';
import Home from './components/Home';
import Layout from './components/Layout';
import Payment from './components/Payment';

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/call" element={<Call />} />
          <Route path="/payment" element={<Payment />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App; 