import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import type { PDFDocumentProxy } from 'pdfjs-dist';
import { getDocument, GlobalWorkerOptions } from 'pdfjs-dist';


GlobalWorkerOptions.workerSrc = new URL(
  'pdfjs-dist/build/pdf.worker.min.js',
  import.meta.url
).toString();

export interface PDFState {
  document: PDFDocumentProxy | null;
  numPages: number;
  error?: string;
}

export const loadPDF = createAsyncThunk<PDFDocumentProxy, string>(
  'pdf/loadPDF',
  async (fileName, { rejectWithValue }) => {
    try {
      const loadingTask = getDocument(fileName);
      return await loadingTask.promise;
    } catch (e: any) {
      return rejectWithValue(e.message);
    }
  }
);

const initialState: PDFState = { document: null, numPages: 0 };

const pdfSlice = createSlice({
  name: 'pdf',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loadPDF.fulfilled, (state, action) => {
        state.document = action.payload;
        state.numPages = action.payload.numPages;
      })
      .addCase(loadPDF.rejected, (state, action) => {
        state.error = action.payload as string;
      });
  }
});

export default pdfSlice.reducer;
