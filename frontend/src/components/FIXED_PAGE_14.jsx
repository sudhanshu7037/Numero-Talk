// PAGE 14: SPELLING CORRECTION SUGGESTIONS (FIXED)

<div
  className="pdf-page relative p-12 bg-white flex flex-col justify-between"
  style={{
    height: '297mm',
    width: '210mm',
    pageBreakAfter: 'always',
  }}
>
  {renderWatermark()}

  <div style={{ position: 'relative', zIndex: 1, flex: 1, display: 'flex', flexDirection: 'column' }}>
    {renderHeader(14)}

    <h2 className="font-serif text-2xl font-bold text-gray-900 mb-3">
      {t('spellingSuggestionsTitle')}
    </h2>

    <div className="space-y-3 text-xs text-gray-700 leading-relaxed text-justify" style={{ flex: 1 }}>
      
      <p className="text-[11px]">
        {t('spellingSuggestionsDesc')}
      </p>

      {/* Spelling Suggestions */}
      <div className="space-y-2">
        {nameSuggestions.map((s, idx) => (
          <div key={idx} className="p-3 rounded-xl" style={{ background: '#F3F4F6', border: '1px solid #E5E7EB' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '8px' }}>
              <div style={{ flex: 1 }}>
                <span className="font-bold text-gray-950 block text-[11px]">{s.name}</span>
                <span className="text-[9px] text-gray-500">{s.change}</span>
              </div>
              <div style={{ textAlign: 'right', whiteSpace: 'nowrap' }}>
                <div className="text-[10px] text-gray-500">{language === 'en' ? 'Sum' : 'योग'}</div>
                <span className="font-bold text-gray-900 font-mono text-[12px]">{s.reduced}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Recommendation */}
      <div className="p-3 rounded-xl mt-2" style={{ background: '#DBEAFE', border: '1px solid #93C5FD' }}>
        <p className="text-[10px] text-blue-900">
          {language === 'en'
            ? '💡 Adopting one of these spelling variations can align your name vibration with lucky numbers (1, 3, 5, 6, 9) for enhanced prosperity and harmony.'
            : '💡 इन वर्तनी विविधताओं को अपनाने से आपके नाम का कंपन भाग्यशाली संख्याओं के साथ संरेखित हो सकता है।'}
        </p>
      </div>

    </div>
  </div>

  {renderFooter(14)}
</div>
