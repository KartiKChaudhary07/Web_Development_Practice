/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import WritingDesk from './components/WritingDesk';
import ReaderSection from './components/ReaderSection';

const App = () => {
  const [activePage, setActivePage] = useState('writer');

  return (
    <div>
      <nav style={{ display: 'flex', justifyContent: 'center', padding: '10px', backgroundColor: '#333', color: 'white' }}>
        <button
          onClick={() => setActivePage('writer')}
          style={{ marginRight: '10px', padding: '10px', backgroundColor: activePage === 'writer' ? '#555' : '#333', color: 'white' }}
        >
          Writing Desk
        </button>
        <button
          onClick={() => setActivePage('reader')}
          style={{ padding: '10px', backgroundColor: activePage === 'reader' ? '#555' : '#333', color: 'white' }}
        >
          Reader Section
        </button>
      </nav>
      <div>
        {activePage === 'writer' ? <WritingDesk /> : <ReaderSection />}
      </div>
    </div>
  );
};

export default App;
