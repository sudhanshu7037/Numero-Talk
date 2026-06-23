// PAGE 17: VIP PHONE RECOMMENDATIONS (FIXED)

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
    {renderHeader(17)}

    <h2 className="font-serif text-2xl font-bold text-gray-900 mb-3">
      {t('vipRecommendationsTitle')}
    </h2>

    <div className="space-y-3 text-xs text-gray-700 leading-relaxed text-justify" style={{ flex: 1 }}>
      
      <h3 className="font-serif text-base font-bold text-gray-900">
        {t('selectingLuckyDigitsLabel')}
      </h3>

      <p className="text-[11px]">
        {t('selectingLuckyDigitsDesc')}
      </p>

      {/* Lucky Ending Combinations */}
      <div className="p-4 rounded-xl" style={{ background: '#FFFBEB', border: '1px solid #FEF3C7' }}>
        <strong className="uppercase tracking-wider block text-[10px] mb-2" style={{ color: '#B45309' }}>
          ✦ {language === 'en' ? 'Lucky Ending Combinations' : 'भाग्यशाली अंतिम संयोजन'}
        </strong>
        <p className="text-gray-700 text-[11px]">
          {t('luckyEndingDesc')}
        </p>
        <div className="mt-2 p-2 rounded" style={{ background: '#FEF3C7' }}>
          <span className="font-mono font-bold text-amber-900">1339, 3913, 5555</span>
        </div>
      </div>

      {/* Numbers to Avoid */}
      <div className="p-4 rounded-xl" style={{ background: '#FEE2E2', border: '1px solid #FECACA' }}>
        <strong className="uppercase tracking-wider block text-[10px] mb-2" style={{ color: '#B91C1C' }}>
          ✦ {language === 'en' ? 'Numbers to Avoid' : 'टालने के लिए संख्याएं'}
        </strong>
        <p className="text-gray-700 text-[11px]">
          {t('avoidEndingDesc')}
        </p>
        <div className="mt-2 p-2 rounded" style={{ background: '#FECACA' }}>
          <span className="font-mono font-bold text-red-900">4, 7, 8</span>
        </div>
      </div>

      {/* Recommendation */}
      <div className="p-3 rounded-xl" style={{ background: '#F0FDF4', border: '1px solid #BBFBBC' }}>
        <p className="text-[10px] text-green-900">
          {language === 'en'
            ? '✓ If your mobile compatibility score is LOW (below 50%), consider changing to a new lucky number. High scores ensure positive digital communication and opportunities.'
            : '✓ यदि आपका मोबाइल संगतता स्कोर कम है, तो नया भाग्यशाली नंबर लेने पर विचार करें।'}
        </p>
      </div>

    </div>
  </div>

  {renderFooter(17)}
</div>
