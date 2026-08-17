import { useState } from 'react'
import Question from "./Question";
import DocumentsView from "./Documents";
import AddDocument from "./AddDocument";
import "./App.css"

function App() {
	const [refreshTrigger, setRefreshTrigger] = useState(0);

    return (
      <div className="appLayout">
		<div className="sidebar">
			<div className="sidebarScroll">
				<DocumentsView refreshTrigger = {refreshTrigger}/>
			</div>
			<div className="sidebarFooter">
				<AddDocument onDocumentAdded = {() => setRefreshTrigger(prev => prev + 1)}/>
			</div>
		</div>
		<div className="content">
			<h2 className="sectionHeading">Ask Questions About Your Documents</h2>
			<Question/>
		</div>
      </div>
    );
}

export default App
