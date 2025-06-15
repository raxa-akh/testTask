import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loadPDF } from './store/pdfSlice';
import PDFViewer from './components/PDFViewer';
import Base64List from './components/Base64List';
import type { RootState, AppDispatch } from './store';
import './App.css';

const App: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const error = useSelector((s: RootState) => s.pdf.error);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const fileName = params.get('fileName') || '/example.pdf';
    dispatch(loadPDF(fileName));
  }, [dispatch]);

  return (
    <div className="app-container">
      <div className="pdf-container">
        {error ? <p>Ошибка: {error}</p> : <PDFViewer />}
      </div>
      <div className="fragments-container">
        <h3>Selected Fragments</h3>
        <Base64List />
      </div>
    </div>
  );
};

export default App;
