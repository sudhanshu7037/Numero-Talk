// PAGE 12: PERSONALITY NUMBER (FIXED)

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
    {renderHeader(12)}

    <h2 className="font-serif text-2xl font-bold text-gray-900 mb-3">
      {t('personalityTitle')}
    </h2>

    <div className="space-y-3 text-xs text-gray-700 leading-relaxed text-justify" style={{ flex: 1 }}>
      
      <h3 className="font-serif text-lg font-bold" style={{ color: '#B45309' }}>
        {language === 'en' ? 'Personality Number' : 'व्यक्तित्व संख्या'} {personality} — {t('rulerLabel')}: {getTranslation(planetaryLords[personality])}
      </h3>

      {/* How the world sees you */}
      <div className="p-4 rounded-xl" style={{ background: '#FFFBEB', border: '1px solid #FEF3C7' }}>
        <strong className="uppercase tracking-wider block text-[10px] mb-1" style={{ color: '#B45309' }}>
          ✦ {language === 'en' ? 'How the World Sees You' : 'दुनिया आपको कैसे देखती है'}
        </strong>
        <p>{t('personalityDesc')}</p>
      </div>

      {/* Vibe Details */}
      <div className="p-4 rounded-xl" style={{ background: '#FEF3C7', border: '1px solid #FCD34D' }}>
        <strong className="uppercase tracking-wider block text-[10px] mb-1" style={{ color: '#D97706' }}>
          ✦ {t('vibeDetailsLabel')}
        </strong>
        <p className="text-gray-700">{t('personalityVibeDetails', { lord: getTranslation(planetaryLords[personality]) })}</p>
      </div>

      {/* First Impression & Social Presence */}
      <div className="p-4 rounded-xl" style={{ background: '#CCFBF1', border: '1px solid #99F6E4' }}>
        <strong className="uppercase tracking-wider block text-[10px] mb-2" style={{ color: '#0D9488' }}>
          ✦ {language === 'en' ? 'First Impression & Social Presence' : 'पहली छाप और सामाजिक उपस्थिति'}
        </strong>
        <p className="text-gray-700 text-[10px]">
          {language === 'en'
            ? `Your Personality Number ${personality} is your outer shell. It shapes first impressions, your energy in new environments, and your social persona. It is your public face, your cosmic calling card.`
            : `आपका व्यक्तित्व संख्या ${personality} आपका बाहरी आवरण है। यह पहली छाप को आकार देता है।`}
        </p>
      </div>

      {/* Outer Strengths & Social Patterns Grid */}
      <div className="grid grid-cols-2 gap-2">
        <div className="p-3 rounded-xl" style={{ background: '#F3F4F6', border: '1px solid #E5E7EB' }}>
          <div className="text-[9px] uppercase font-bold text-gray-500 mb-1">{language === 'en' ? 'Outer Strengths' : 'बाहरी शक्तियां'}</div>
          {['Charming presence', 'Natural communicator', 'Reliable', 'Strong first impressions'].map((s, i) => (
            <div key={i} className="text-[10px] text-gray-600 flex items-center gap-1 mt-0.5">
              <span style={{ color: '#059669' }}>+</span> {s}
            </div>
          ))}
        </div>
        <div className="p-3 rounded-xl" style={{ background: '#F3F4F6', border: '1px solid #E5E7EB' }}>
          <div className="text-[9px] uppercase font-bold text-gray-500 mb-1">{language === 'en' ? 'Social Patterns' : 'सामाजिक पैटर्न'}</div>
          {['Quality over quantity', 'Loyal to close circle', 'Diplomatic', 'Values authenticity'].map((s, i) => (
            <div key={i} className="text-[10px] text-gray-600 flex items-center gap-1 mt-0.5">
              <span style={{ color: '#B45309' }}>▸</span> {s}
            </div>
          ))}
        </div>
      </div>

    </div>
  </div>

  {renderFooter(12)}
</div>
