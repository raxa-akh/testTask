import React, { useEffect, useRef, useState } from 'react';
import type { PDFPageProxy } from 'pdfjs-dist';
import SelectionCanvas from './SelectionCanvas';
import './PageRenderer.css';

interface Props {
  page: PDFPageProxy;
  pageNumber: number;
  scale?: number;
}

const PageRenderer: React.FC<Props> = ({ page, pageNumber, scale = 1.5 }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  useEffect(() => {
    if (!canvasRef.current) return;
    const viewport = page.getViewport({ scale });
    canvasRef.current.width = viewport.width;
    canvasRef.current.height = viewport.height;
    setDimensions({ width: viewport.width, height: viewport.height });
    page.render({ canvasContext: canvasRef.current.getContext('2d')!, viewport });
  }, [page, scale]);

  return (
    <div className="page-wrapper">
      <canvas ref={canvasRef} className="page-canvas" />
      {dimensions.width > 0 && (
        <SelectionCanvas
          pageNumber={pageNumber}
          width={dimensions.width}
          height={dimensions.height}
          backgroundCanvas={canvasRef.current!}
        />
      )}
    </div>
  );
};

export default PageRenderer;
