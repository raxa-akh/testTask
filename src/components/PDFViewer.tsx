import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import type { RootState } from '../store';
import type { PDFDocumentProxy, PDFPageProxy } from 'pdfjs-dist';
import PageRenderer from './PageRenderer';

const PDFViewer: React.FC = () => {
  const pdf = useSelector((s: RootState) => s.pdf.document) as PDFDocumentProxy | null;
  const [pages, setPages] = useState<PDFPageProxy[]>([]);

  useEffect(() => {
    if (!pdf) return;
    (async () => {
      const arr: PDFPageProxy[] = [];
      for (let i = 1; i <= pdf.numPages; i++) {
        const page = await pdf.getPage(i);
        arr.push(page);
      }
      setPages(arr);
    })();
  }, [pdf]);

  if (!pdf) return null;
  return (
    <div style={{ padding: 16 }}>
      {pages.map((page, idx) => (
        <PageRenderer
          key={idx}
          page={page}
          pageNumber={idx + 1}
          scale={1.5}
        />
      ))}
    </div>
  );
};

export default PDFViewer;
