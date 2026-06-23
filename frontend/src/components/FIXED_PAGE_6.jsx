// PAGE 6: MOOLANK CHALLENGES & HEALTH (FIXED)
// Replace the entire Page 6 section in DetailedReportTemplate.jsx with this code

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
    {renderHeader(6)}

    <h2 className="font-serif text-2xl font-bold text-gray-900 mb-3">
      {t('moolankChallengesTitle')}
    </h2>

    <div className="space-y-3 text-xs text-gray-700 leading-relaxed text-justify" style={{ flex: 1, overflowWrap: 'break-word' }}>
      
      {/* Challenges Card */}
      <div className="p-4 rounded-xl" style={{ background: '#FEE2E2', border: '1px solid #FECACA' }}>
        <strong className="uppercase tracking-wider block text-[10px] mb-2" style={{ color: '#B91C1C' }}>
          ✦ {t('challengesLabel')}
        </strong>
        <p className="text-gray-700">{getTranslation(currentMoolank.weaknesses)}</p>
      </div>

      {/* Areas Requiring Attention */}
      <div className="p-4 rounded-xl" style={{ background: '#FFEDD5', border: '1px solid #FDBA74' }}>
        <strong className="uppercase tracking-wider block text-[10px] mb-2" style={{ color: '#92400E' }}>
          ✦ {language === 'en' ? 'Areas Requiring Attention' : 'ध्यान आवश्यक क्षेत्र'}
        </strong>
        <ul className="list-disc list-inside space-y-1 text-gray-700">
          {getTranslation(currentMoolank.weaknesses)
            .split('.')
            .filter((s) => s.trim().length > 10)
            .slice(0, 4)
            .map((w, i) => (
              <li key={i} className="text-[10px]">{w.trim()}.</li>
            ))}
        </ul>
      </div>

      {/* Health Guidelines */}
      <div>
        <h3 className="font-serif text-sm font-bold text-gray-900 mb-1">
          {t('healthGuidelineTitle')} {moolank}
        </h3>
        <p className="text-[10px] text-gray-600">{t('healthGuidelineText', { num: moolank })}</p>
      </div>

      {/* Wellness Tips */}
      <div className="p-4 rounded-xl" style={{ background: '#CCFBF1', border: '1px solid #99F6E4' }}>
        <strong className="uppercase tracking-wider block text-[10px] mb-2" style={{ color: '#0D9488' }}>
          ✦ {language === 'en' ? 'Health & Wellness Tips' : 'स्वास्थ्य सुझाव'}
        </strong>
        <div className="grid grid-cols-2 gap-2">
          {[
            language === 'en' ? 'Avoid excessive stress' : 'तनाव से बचें',
            language === 'en' ? 'Practice meditation daily' : 'ध्यान करें',
            language === 'en' ? 'Keep hydrated always' : 'हाइड्रेटेड रहें',
            language === 'en' ? 'Yoga & breathing' : 'योग करें',
            language === 'en' ? 'Avoid late-night meals' : 'रात को खाना न खाएं',
            language === 'en' ? 'Regular check-ups' : 'स्वास्थ्य जांच',
          ].map((tip, i) => (
            <span key={i} className="text-[10px] text-gray-700 flex items-center gap-1">
              <span style={{ color: '#0D9488' }}>✓</span> {tip}
            </span>
          ))}
        </div>
      </div>

      {/* Emotional Balance */}
      <div className="p-4 rounded-xl" style={{ background: '#F3E8FF', border: '1px solid #E9D5FF' }}>
        <strong className="uppercase tracking-wider block text-[10px] mb-1" style={{ color: '#7E22CE' }}>
          ✦ {language === 'en' ? 'Emotional Balance' : 'भावनात्मक संतुलन'}
        </strong>
        <p className="text-[10px] text-gray-600">
          {language === 'en'
            ? `People with Moolank ${moolank} are emotionally intense. Channel through creative outlets, journaling, or spiritual practices. Strong emotional boundaries are key.`
            : `मूलांक ${moolank} वाले लोग भावनात्मक रूप से तीव्र होते हैं। रचनात्मक अभिव्यक्ति के माध्यम से चैनल करें।`}
        </p>
      </div>

    </div>
  </div>

  {renderFooter(6)}
</div>
