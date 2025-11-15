import { useState } from 'react';
import './App.css'
import Calender from './Calender/Calender'

function App() {
  const [selected, setSelected] = useState(new Date());
  return (
    <div
      style={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '2rem',
        gap: '3rem',
        fontFamily: 'system-ui, sans-serif',
      }}
    >
      <h1 style={{ marginBottom: '0.5rem', color: '#2c3e50' }}>Altrata Calendar Assessment</h1>
      <section
        style={{
          textAlign: 'center',
          width: '100%',
          maxWidth: '380px',
        }}
      >
        <h2 style={{ margin: '0 0 0.5rem', color: '#34495e' }}>
          1. Static (prop-only)
        </h2>
        <Calender date={new Date(2025, 10, 15)} />
      </section>
      <section
        style={{
          textAlign: 'center',
          width: '100%',
          maxWidth: '380px',
        }}
      >
        <h2 style={{ margin: '0 0 0.5rem', color: '#34495e' }}>
          2. Interactive (click & navigate)
        </h2>
        <p style={{ margin: '0 0 0.5rem', color: '#7f8c8d' }}>
          Selected: <strong>{selected.toDateString()}</strong>
        </p>
        <Calender
          date={selected}
          onDateChange={setSelected}
          interactive={true}
        />
      </section>
    </div>
  )
}

export default App
