// PAGE 20: REMEDIES & SPECIAL MANTRA (FIXED)

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
    {renderHeader(20)}

    <h2 className="font-serif text-2xl font-bold text-gray-900 mb-3">
      {t('remediesTitle')}
    </h2>

    <div className="space-y-3 text-xs text-gray-700 leading-relaxed text-justify" style={{ flex: 1 }}>
      
      {/* Your Personal Mantra */}
      <div className="p-4 rounded-xl" style={{ background: '#F3E8FF', border: '2px solid #D8B4FE' }}>
        <strong className="uppercase tracking-wider block text-[10px] mb-2" style={{ color: '#7E22CE' }}>
          ✦ {t('yourPersonalMantraLabel')}
        </strong>
        <p className="font-serif text-[13px] italic text-center text-purple-900 font-bold leading-relaxed">
          "{getTranslation(templateTranslations.personalMantra[moolank])}"
        </p>
        <p className="text-[9px] text-purple-700 text-center mt-2">
          {language === 'en'
            ? 'Recite this daily, especially during meditation or challenging moments.'
            : 'इसे प्रतिदिन जपें, विशेषकर ध्यान के समय।'}
        </p>
      </div>

      {/* Recommended Remedies */}
      <div className="p-4 rounded-xl" style={{ background: '#CCFBF1', border: '1px solid #99F6E4' }}>
        <strong className="uppercase tracking-wider block text-[10px] mb-2" style={{ color: '#0D9488' }}>
          ✦ {t('recommendedRemediesLabel')}
        </strong>
        <ul className="space-y-1 text-[10px] text-gray-700">
          {[
            language === 'en' ? '🔮 Wear recommended gemstone on Friday' : '🔮 शुक्रवार को रत्न पहनें',
            language === 'en' ? '🔘 Chant mantra 108 times daily' : '🔘 मंत्र 108 बार जपें',
            language === 'en' ? '🙏 Donate to charity on auspicious dates' : '🙏 शुभ तारीख को दान करें',
            language === 'en' ? '💧 Offer water to sun during sunrise' : '💧 सूर्य को जल अर्पित करें',
          ].map((remedy, i) => (
            <li key={i} className="flex items-start gap-1">
              <span className="flex-shrink-0">{remedy.split(' ')[0]}</span>
              <span className="text-gray-600">{remedy.slice(3)}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Lucky Numerology Days & Times */}
      <div className="p-4 rounded-xl" style={{ background: '#DBEAFE', border: '1px solid #93C5FD' }}>
        <strong className="uppercase tracking-wider block text-[10px] mb-2" style={{ color: '#0369A1' }}>
          ✦ {language === 'en' ? 'Lucky Numerology Days & Times' : 'भाग्यशाली दिन और समय'}
        </strong>
        <div className="grid grid-cols-2 gap-2 text-[10px]">
          <div>
            <span className="font-bold text-blue-900">{language === 'en' ? 'Days' : 'दिन'}:</span>
            <p className="text-gray-600">{language === 'en' ? 'Wednesday, Friday' : 'बुधवार, शुक्रवार'}</p>
          </div>
          <div>
            <span className="font-bold text-blue-900">{language === 'en' ? 'Time' : 'समय'}:</span>
            <p className="text-gray-600">{language === 'en' ? '6-9 AM, 3-6 PM' : '6-9 सुबह, 3-6 शाम'}</p>
          </div>
        </div>
      </div>

      {/* Final Blessings */}
      <div className="p-4 rounded-xl text-center" style={{ background: '#FEF3C7', border: '1px solid #FCD34D' }}>
        <p className="font-serif italic text-[11px] text-amber-900 leading-relaxed">
          {language === 'en'
            ? '✨ May your numerology guide you toward prosperity, harmony, and inner peace. Trust the numbers, align with the universe, and embrace your destiny. 🙏'
            : '✨ संख्याओं पर भरोसा करें, ब्रह्मांड के साथ संरेखित हों। आपकी संख्याएं, आपका भाग्य। 🙏'}
        </p>
      </div>

    </div>
  </div>

  {renderFooter(20)}
</div>
