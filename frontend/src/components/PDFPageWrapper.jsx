import React from 'react';

/**
 * Universal PDF Page Wrapper
 * Use this for ALL pages to ensure consistent rendering.
 * Handles watermark, header, footer, and content layout automatically.
 */
export function PDFPageWrapper({
  pageNo,
  renderHeader,
  renderFooter,
  renderWatermark,
  children,
}) {
  return (
    <div
      className="pdf-page"
      style={{
        height: '297mm',
        width: '210mm',
        padding: '14mm',
        boxSizing: 'border-box',
        background: '#ffffff',
        position: 'relative',
        overflow: 'hidden',
        pageBreakAfter: 'always',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {/* Watermark stays behind */}
      {renderWatermark && renderWatermark()}

      {/* Main content container */}
      <div
        style={{
          position: 'relative',
          zIndex: 1,
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          width: '100%',
          minHeight: '220mm',
        }}
      >
        {/* Header always at top */}
        {renderHeader && renderHeader(pageNo)}

        {/* Flexible content area */}
        <div style={{ flex: 1, minHeight: 0 }}>
          {children}
        </div>

        {/* Footer always at bottom */}
        {renderFooter && renderFooter(pageNo)}
      </div>
    </div>
  );
}
