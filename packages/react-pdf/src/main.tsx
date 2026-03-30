import { Buffer } from 'buffer';
(globalThis as unknown as Record<string, unknown>).Buffer = Buffer;

import { PDFViewer } from '@react-pdf/renderer';
import { MyDocument } from './App';
import { createRoot } from 'react-dom/client';

const App = () => (
  <PDFViewer style={{ width: '100vw', height: '100vh' }}>
    <MyDocument />
  </PDFViewer>
);

const root = createRoot(document.getElementById('root')!);
root.render(<App />);
