import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router';
import RootLayout from './layouts/RootLayout';
import { BoardLayout } from './layouts/BoardLayout';
import { AboutLayout } from './layouts/AboutLayout';
import { NotFound } from './layouts/NotFound';

function App() {
  return <Router>
    <RootLayout>
      <Routes>
        <Route path='/' element={<BoardLayout />} />
        <Route path="/about" element={<AboutLayout />} />
        <Route path="*" element={<NotFound />}></Route>
      </Routes>
    </RootLayout>
  </Router>
}

export default App
