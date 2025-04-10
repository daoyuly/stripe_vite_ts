import { StrictMode, useState } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App1 from './App.tsx'
import App2 from './hooks/0-Card-Minimal.tsx'
import App3 from './hooks/1-Card-Detailed.tsx'
import App4 from './hooks/2-Split-Card.tsx'
import App5 from './hooks/3-Payment-Request-Button.tsx'
import App6 from './hooks/4-IBAN.tsx'
import App7 from './hooks/5-iDEAL.tsx'
import App8 from './hooks/6-FPX.tsx'
import App9 from './hooks/7-P24.tsx'
import App10 from './hooks/8-EPS.tsx'
import App11 from './hooks/9-Payment-Element.tsx'
import App13 from './hooks/11-Custom-Checkout.tsx'
import App14 from './hooks/12-Embedded-Checkout.tsx'
import App15 from './advanced/index.tsx'
const components = [
  { label: 'Advanced', component: App15 },
  { label: 'Card', component: App1 },
  { label: 'Card Minimal', component: App2 },
  { label: 'Card Detailed', component: App3 },
  { label: 'Split Card', component: App4 },
  { label: 'Payment Request Button', component: App5 },
  { label: 'IBAN', component: App6 },
  { label: 'iDEAL', component: App7 },
  { label: 'FPX', component: App8 },
  { label: 'P24', component: App9 },
  { label: 'EPS', component: App10 },
  { label: 'Payment Element', component: App11 },
  { label: 'Custom Checkout', component: App13 },
  { label: 'Embedded Checkout', component: App14 },
];

const App = () => {
  const [selectedComponent, setSelectedComponent] = useState(0);

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedComponent(Number(e.target.value));
  };

  const SelectedComponent = components[selectedComponent].component;

  return (
    <div>
      <div style={{ marginBottom: '20px' }}>
        <label htmlFor="component-select">Select Payment Component: </label>
        <select
          id="component-select"
          value={selectedComponent}
          onChange={handleChange}
          style={{ padding: '8px', fontSize: '16px' }}
        >
          {components.map((comp, index) => (
            <option key={index} value={index}>
              {comp.label}
            </option>
          ))}
        </select>
      </div>
      <h1>{components[selectedComponent].label}</h1>
      <SelectedComponent />
    </div>
  );
};

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
