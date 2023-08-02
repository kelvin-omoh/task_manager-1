

import './App.css';
import TaskList from './components/TaskList';

function App() {
  const URL=process.env.REACT_APP_SERVER_URL
  return (
    <div className="app">
      <div className="task-container">
        <TaskList URL={URL} />
      </div>
    
    </div>
  );
}

export default App;
