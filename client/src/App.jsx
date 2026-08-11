import { useState } from 'react'
import Question from "./Question";
import DocumentsView from "./Documents";
import AddDocument from "./AddDocument";

function App() {
  return (
    <div className="App">
      <h1>Ask Questions About Your Documents</h1>
      <Question />
      <DocumentsView />
      <AddDocument />

    </div>
  );
}

export default App
