import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import List from 'pages/List'
import Create from 'pages/Create'
import BulkActionProvider from 'contexts/BulkActionContext'

function App() {
  return (
    <BulkActionProvider>
      <Router>
        <Switch>
          <Route path="/create">
            <Create />
          </Route>
          <Route path="/">
            <List />
          </Route>
        </Switch>
      </Router>
    </BulkActionProvider>
  )
}

export default App
