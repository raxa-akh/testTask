import React, { useRef, useState, MouseEvent } from 'react';
import { useDispatch } from 'react-redux';
import { addFragment, Fragment } from '../store/selectionSlice';
import type { AppDispatch } from '../store';
import './SelectionCanvas.css';

interface Props {
  pageNumber: number;
  width: number;
  height: number;
  backgroundCanvas: HTMLCanvasElement;
}

interface Rect { x: number; y: number; w: number; h: number; }

const SelectionCanvas: React.FC<Props> = ({
  pageNumber,
  width,
  height,
  backgroundCanvas
}) => {
  const overlayRef = useRef<HTMLDivElement>(null);
  const dispatch = useDispatch<AppDispatch>();
  const [rect, setRect] = useState<Rect | null>(null);
  const [dragging, setDragging] = useState(false);

  const onMouseDown = (e: MouseEvent<HTMLDivElement>) => {
    if (!overlayRef.current) return;
    const { left, top } = overlayRef.current.getBoundingClientRect();
    const x = e.clientX - left;
    const y = e.clientY - top;
    setRect({ x, y, w: 0, h: 0 });
    setDragging(true);
  };
  const onMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!dragging || !rect || !overlayRef.current) return;
    const { left, top } = overlayRef.current.getBoundingClientRect();
    const x = e.clientX - left;
    const y = e.clientY - top;
    setRect({ ...rect, w: x - rect.x, h: y - rect.y });
  };
  const onMouseUp = () => setDragging(false);

  const applySelection = () => {
    if (!rect) return;
    const temp = document.createElement('canvas');
    temp.width = Math.abs(rect.w);
    temp.height = Math.abs(rect.h);
    const ctx = temp.getContext('2d')!;
    ctx.drawImage(
      backgroundCanvas,
      rect.x, rect.y, rect.w, rect.h,
      0, 0, Math.abs(rect.w), Math.abs(rect.h)
    );
    const data = temp.toDataURL();
    dispatch(addFragment({ pageNumber, base64: data } as Fragment));
    setRect(null);
  };

  return (
    <div
      ref={overlayRef}
      className="selection-overlay"
      style={{ width, height, cursor: dragging ? 'crosshair' : 'default' }}
      onMouseDown={onMouseDown}
      onMouseMove={onMouseMove}
      onMouseUp={onMouseUp}
      onMouseLeave={onMouseUp}
    >
      {rect && (
        <div
          className="selection-rect"
          style={{
            left: rect.x,
            top: rect.y,
            width: rect.w,
            height: rect.h
          }}
        />
      )}
      {rect && !dragging && (
        <button
          className="apply-button"
          style={{
            left: rect.x + rect.w - 60,
            top: rect.y + rect.h + 8
          }}
          onMouseDown={e => e.stopPropagation()}
          onMouseUp={e => e.stopPropagation()}
          onClick={e => {
            e.stopPropagation();
            applySelection();
          }}
        >
          Apply
        </button>
      )}
    </div>
  );
};

export default SelectionCanvas;
