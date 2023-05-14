import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import dummyData from './Components/dummyData.json';
import ConversationList from './Components/ConversationList';
import ConversationDetail from './Components/ConversationDetail';
import ChatWindow from './Components/ChatWindow';
import "./App.css"
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <Router>
      <div className="App">
        <ConversationList
          conversations={dummyData.conversations}
        />
        <Switch>
          <Route path="/conversation/:ID" component={ConversationDetail} />
          <Route path="/new-conversation/:id" render={({ match }) => <ChatWindow id={match.params.id} />} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
