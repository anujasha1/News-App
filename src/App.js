import { Component } from 'react';
import './App.css';
import Navbar from './components/Navbar';
import News from './components/News';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoadingBar from 'react-top-loading-bar';

export default class App extends Component {
  pageSize = 5;
  apiKey = process.env.REACT_APP_NEWS_API_KEY
  state = ({
    progress: 0
  })

  setProgress = (progress) =>{
    this.setState({
      progress: progress
    })
  }

  render() {
    return (
      <div>
        <Router>
          <Navbar/>
          <LoadingBar color='#f11946' height={3} progress={this.state.progress}/>
          <Routes>
            <Route path="/" element={<News setProgress={this.setProgress} apiKey={this.apiKey}  pageSize={this.pageSize} country="in" category="general" />}/>
            <Route path="/business" element={<News setProgress={this.setProgress} apiKey={this.apiKey}  pageSize={this.pageSize} country="in" category="business" />}/>
            <Route path="/entertainment" element={<News setProgress={this.setProgress} apiKey={this.apiKey}  pageSize={this.pageSize} country="in" category="entertainment" />}/>
            <Route path="/general" element={<News setProgress={this.setProgress} apiKey={this.apiKey}  pageSize={this.pageSize} country="in" category="general" />}/>
            <Route path="/health" element={<News setProgress={this.setProgress} apiKey={this.apiKey}  pageSize={this.pageSize} country="in" category="health" />}/>
            <Route path="/science" element={<News setProgress={this.setProgress} apiKey={this.apiKey}  pageSize={this.pageSize} country="in" category="sciene" />}/>
            <Route path="/sports" element={<News setProgress={this.setProgress} apiKey={this.apiKey}  pageSize={this.pageSize} country="in" category="sports" />}/>
            <Route path="/technology" element={<News setProgress={this.setProgress} apiKey={this.apiKey}  pageSize={this.pageSize} country="in" category="technology" />}/>
          </Routes>
        </Router>
      </div>
    )
  }
}
