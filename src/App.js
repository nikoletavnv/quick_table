import React from 'react';
import Table from './components/table/Table';
import columns from '../src/components/table/__mocks__/columns';
import data from '../src/components/table/__mocks__/data';

const renderExtraInfo = () => <p>This is the information that will be displayed every </p>
function App() {
  return (
    <div className="App">
      <Table threeStepSort={true} columns={columns} data={data} title="Hello World" footer="Bye World" renderExtraInfo={renderExtraInfo} />
    </div>
  );
}

export default App;
