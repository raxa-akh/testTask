import React from 'react';
import { useSelector } from 'react-redux';
import type { RootState } from '../store';
import './Base64List.css';

const Base64List: React.FC = () => {
  const frags = useSelector((s: RootState) => s.selection.fragments);
  return (
    <div className="base64-list">
      {frags.map((f, i) => (
        <img key={i} src={f.base64} alt={`sel-${i}`} />
      ))}
    </div>
  );
};

export default Base64List;
