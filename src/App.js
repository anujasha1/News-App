import { useState } from 'react';
import './App.css';
import Navbar from './components/Navbar';
import News from './components/News';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoadingBar from 'react-top-loading-bar';

function App(){

  let pageSize = 5;
  const apiKey = process.env.REACT_APP_NEWS_API_KEY
  const[progress, setProgress] = useState(0)
  

    return (
      <div>
        <Router>
          <Navbar/>
          <LoadingBar color='#f11946' height={3} progress={progress}/>
          <Routes>
            <Route path="/" element={<News setProgress={setProgress} apiKey={apiKey}  pageSize={pageSize} country="in" category="general" />}/>
            <Route path="/business" element={<News setProgress={setProgress} apiKey={apiKey}  pageSize={pageSize} country="in" category="business" />}/>
            <Route path="/entertainment" element={<News setProgress={setProgress} apiKey={apiKey}  pageSize={pageSize} country="in" category="entertainment" />}/>
            <Route path="/general" element={<News setProgress={setProgress} apiKey={apiKey}  pageSize={pageSize} country="in" category="general" />}/>
            <Route path="/health" element={<News setProgress={setProgress} apiKey={apiKey}  pageSize={pageSize} country="in" category="health" />}/>
            <Route path="/science" element={<News setProgress={setProgress} apiKey={apiKey}  pageSize={pageSize} country="in" category="sciene" />}/>
            <Route path="/sports" element={<News setProgress={setProgress} apiKey={apiKey}  pageSize={pageSize} country="in" category="sports" />}/>
            <Route path="/technology" element={<News setProgress={setProgress} apiKey={apiKey}  pageSize={pageSize} country="in" category="technology" />}/>
          </Routes>
        </Router>
      </div>
    )
  
}

export default App