import React from 'react';
import { 
  moolankData, 
  bhagyankData, 
  nameNumberData, 
  mobileNumberInterpretations, 
  luckyColors, 
  luckyDates, 
  luckyGemstones, 
  luckyRudrakshas, 
  specialMantras, 
  planetaryLords 
} from '../utils/detailedInterpretations';
import { 
  calculateMoolank, 
  calculateBhagyank, 
  calculateDestiny, 
  calculateSoulUrge, 
  calculatePersonality, 
  suggestNameCorrections,
  analyzeMobileNumber,
  checkMobileCompatibility
} from '../utils/numerologyEngine';

// Localized UI strings for the PDF report pages
const templateTranslations = {
  omGanesha: {
    en: "|| ॐ गं गणपतये नमः ||",
    hi: "|| ॐ गं गणपतये नमः ||",
    gu: "|| ॐ गं गणपतये नमः ||",
    mr: "|| ॐ गं गणपतये नमः ||"
  },
  shreeGaneshayaNamah: {
    en: "ॐ श्री गणेशाय नमः",
    hi: "ॐ श्री गणेशाय नमः",
    gu: "ॐ श्री गणेशाय नमः",
    mr: "ॐ श्री गणेशाय नमः"
  },
  reportHeader: {
    en: "Numero Talk Cosmic Report",
    hi: "न्यूमरो टॉक कॉस्मिक रिपोर्ट",
    gu: "ન્યૂમરો ટૉક કોસ્મિક રિપોર્ટ",
    mr: "न्यूमरो टॉक कॉस्मिक रिपोर्ट"
  },
  website: {
    en: "www.numerotalk.com",
    hi: "www.numerotalk.com",
    gu: "www.numerotalk.com",
    mr: "www.numerotalk.com"
  },
  footerText: {
    en: "Numero Talk | Numerologist | 9975392372",
    hi: "न्यूमरो टॉक | अंकशास्त्री | 9975392372",
    gu: "ન્યૂમરો ટૉક | અંકશાસ્ત્રી | 9975392372",
    mr: "न्यूमरो टॉक | अंकशास्त्रज्ञ | 9975392372"
  },
  watermarkText: {
    en: "NUMERO TALK",
    hi: "न्यूमरो टॉक",
    gu: "ન્યૂમરો ટૉક",
    mr: "न्यूमरो टॉक"
  },
  coverTitle: {
    en: "Vedic Numerology",
    hi: "वैदिक अंक ज्योतिष",
    gu: "વૈદિક અંક જ્યોતિષ",
    mr: "वैदिक अंक ज्योतिष"
  },
  coverSubtitle: {
    en: "Detailed Analysis Report",
    hi: "विस्तृत विश्लेषण रिपोर्ट",
    gu: "વિગતવાર વિશ્લેષણ અહેવાલ",
    mr: "विस्तृत विश्लेषण अहवाल"
  },
  coverDesc: {
    en: "Discover the mathematical vibrations governing your character, destiny, name correctness, and mobile frequency.",
    hi: "अपने चरित्र, भाग्य, नाम सुधार और मोबाइल आवृत्ति को नियंत्रित करने वाले गणितीय कंपनों की खोज करें।",
    gu: "તમારા ચરિત્ર, ભાગ્ય, નામ સુધારણા અને મોબાઇલ આવર્તનને નિયંત્રિત કરતા ગાણિતિક કંપનો શોધો.",
    mr: "तुमचे चारित्र्य, भाग्य, नाव सुधारणा आणि मोबाईल वारंवारता नियंत्रित करणारे गणितीय कंपन शोधा."
  },
  personalCoordinates: {
    en: "Personal Coordinates",
    hi: "व्यक्तिगत विवरण",
    gu: "વ્યક્તિગત વિગતો",
    mr: "वैयक्तिक तपशील"
  },
  nameLabel: {
    en: "Name:",
    hi: "नाम:",
    gu: "નામ:",
    mr: "नाव:"
  },
  dobLabel: {
    en: "Date of Birth:",
    hi: "जन्म तिथि:",
    gu: "જન્મ તારીખ:",
    mr: "जन्म तारीख:"
  },
  mobileLabel: {
    en: "Mobile Number:",
    hi: "मोबाइल नंबर:",
    gu: "મોબાઇલ નંબર:",
    mr: "मोबाईल नंबर:"
  },
  emailLabel: {
    en: "Email:",
    hi: "ईमेल:",
    gu: "ઈમેલ:",
    mr: "ईमेल:"
  },
  preparedBy: {
    en: "Prepared By: Numero Talk",
    hi: "तैयारकर्ता: न्यूमरो टॉक",
    gu: "તૈયારકર્તા: ન્યૂમરો ટૉક",
    mr: "तयारकर्ता: न्यूमरो टॉक"
  },
  vedicAstrologer: {
    en: "Vedic Astrologer & Numerologist | 9975392372",
    hi: "वैदिक ज्योतिषी और अंकशास्त्री | 9975392372",
    gu: "વૈદિક જ્યોતિષી અને અંકશાસ્ત્રી | 9975392372",
    mr: "वैदिक ज्योतिषी आणि अंकशास्त्रज्ञ | 9975392372"
  },
  tocTitle: {
    en: "Table of Contents",
    hi: "विषय सूची",
    gu: "અનુક્રમણિકા",
    mr: "अनुक्रमणिका"
  },
  introductionTitle: {
    en: "01. Esoteric Numerology",
    hi: "01. गूढ़ अंकशास्त्र",
    gu: "01. ગૂઢ અંકશાસ્ત્ર",
    mr: "01. गूढ अंकशास्त्र"
  },
  introductionTextP1: {
    en: "Numerology is the mystical study of the vibrational relationship between numbers and letters, mapping the mathematical signature of the universe. In Vedic and Pythagorean systems, everything that exists has a specific frequency. By analyzing your birth date and birth name, we can identify these coordinates and align them to reveal your life purpose and upcoming cycles.",
    hi: "अंकशास्त्र संख्याओं और अक्षरों के बीच के कंपन संबंधों का रहस्यमयी अध्ययन है, जो ब्रह्मांड के गणितीय हस्ताक्षर को दर्शाता है। वैदिक और पाइथागोरस प्रणालियों में, जो कुछ भी मौजूद है उसका एक विशिष्ट कंपन होता है। आपके जन्म की तारीख और जन्म के नाम का विश्लेषण करके, हम इन निर्देशांकों की पहचान कर सकते हैं और उन्हें आपके जीवन के उद्देश्य और आने वाले चक्रों को प्रकट करने के लिए संरेखित कर सकते हैं।",
    gu: "અંકશાસ્ત્ર એ સંખ્યાઓ અને અક્ષરો વચ્ચેના કંપન સંબંધોનો રહસ્યમય અભ્યાસ છે, જે બ્રહ્માંડની ગાણિતિક સહી દર્શાવે છે. વૈદિક અને પાયથાગોરિયન પ્રણાલીઓમાં, અસ્તિત્વમાં રહેલી દરેક વસ્તુની ચોક્કસ આવર્તન હોય છે. તમારા જન્મની તારીખ અને જન્મના નામનું વિશ્લેષણ કરીને, આપણે આ કોઓર્ડિનેટ્સ ઓળખી શકીએ છીએ અને તેમને તમારા જીવનના હેતુ અને આગામી ચક્રોને પ્રગટ કરવા માટે ગોઠવી શકીએ છીએ.",
    mr: "अंकशास्त्र हा संख्या आणि अक्षरे यांच्यातील स्पंदनात्मक संबंधांचा अनाकलनीय अभ्यास आहे, जो विश्वाच्या गणितीय स्वाक्षरीचा नकाशा तयार करतो. वैदिक आणि पायथागोरियन प्रणालींमध्ये, अस्तित्वात असलेल्या प्रत्येक गोष्टीची विशिष्ट वारंवारता असते. तुमच्या जन्मतारीख आणि जन्माच्या नावाचे विश्लेषण करून, आम्ही हे निर्देशांक ओळखू शकतो और तुमच्या जीवनाचा उद्देश आणि आगामी चक्र प्रकट करण्यासाठी त्यांना संरेखित करू शकतो."
  },
  introductionTextP2: {
    en: "Pythagorean System: Developed in ancient Greece, it uses a 9-digit system to map letters (A-Z) in a sequential order. It is highly detailed for evaluating character structures, soul desires, and public presentation.",
    hi: "पाइथागोरस प्रणाली: प्राचीन यूनान में विकसित, यह अक्षरों (A-Z) को एक क्रमबद्ध व्यवस्था में दर्शाने के लिए 9-अंकीय प्रणाली का उपयोग करती है। यह चरित्र संरचनाओं, आंतरिक इच्छाओं और सामाजिक प्रस्तुति के मूल्यांकन के लिए अत्यधिक विस्तृत है।",
    gu: "પાયથાગોરિયન સિસ્ટમ: પ્રાચીન ગ્રીસમાં વિકસિત, તે ક્રમિક ક્રમમાં અક્ષરો (A-Z) ને નકશા કરવા માટે 9-અંકની સિસ્ટમનો ઉપયોગ કરે છે. પાત્ર રચનાઓ, આત્માની ઈચ્છાઓ અને જાહેર રજૂઆતનું મૂલ્યાંકન કરવા માટે તે ખૂબ જ વિગતવાર છે.",
    mr: "पायथागोरियन प्रणाली: प्राचीन ग्रीसमध्ये विकसित, अक्षरे (A-Z) अनुक्रमिक क्रमाने मॅप करण्यासाठी 9-अंकी प्रणाली वापरते. वर्तन रचना, आत्म्याची इच्छा आणि सार्वजनिक सादरीकरण यांचे मूल्यमापन करण्यासाठी हे अत्यंत तपशीलवार आहे."
  },
  introductionTextP3: {
    en: "Chaldean System: Formulated in ancient Mesopotamia, it relies on sound frequencies. It skips number 9 (as it is considered holy) and maps characters based on their sound vibration. It is widely recognized for name corrections and predicting external circumstances.",
    hi: "चाल्डियन प्रणाली: प्राचीन मेसोपोटामिया में विकसित, यह ध्वनि आवृत्तियों पर निर्भर करती है। यह नंबर 9 को छोड़ देती है (क्योंकि इसे पवित्र माना जाता है) और ध्वनि कंपन के आधार पर अक्षरों को दर्शाती है। यह नाम सुधार और बाहरी परिस्थितियों की भविष्यवाणी के लिए व्यापक रूप से मान्यता प्राप्त है।",
    gu: "ચેલ્ડિયન સિસ્ટમ: પ્રાચીન મેસોપોટેમિયામાં બનેલી, તે ધ્વનિ કંપનો પર આધાર રાખે છે. તે નંબર 9 ને છોડી દે છે (કારણ કે તેને પવित्र માનવામાં આવે છે) અને અક્ષરોના અવાજના કંપન પર આધાર રાખીને નકશો બનાવે છે. તે નામ સુધારણા અને બાહ્ય પરિસ્થિતિઓની આગાહી કરવા માટે વ્યાપકપણે જાણીતી છે.",
    mr: "चाल्डियन प्रणाली: प्राचीन मेसोपोटेमियामध्ये तयार केली गेलेली, ही ध्वनीच्या वारंवारतेवर अवलंबून असते. हे ९ नंबर वगळते (कारण ते पवित्र मानले जाते) आणि त्यांच्या ध्वनी कंपनावर आधारित वर्णांचे वर्गीकरण करते. नाव सुधारणेसाठी आणि बाह्य परिस्थितीचा अंदाज घेण्यासाठी हे मोठ्या प्रमाणावर ओळखले जाते."
  },
  introductionTextP4: {
    en: "By combining these systems with Vedic principles of Moolank and Bhagyank, Numero Talk provides a comprehensive overview of your life's blueprint.",
    hi: "वैदिक मूलांक और भाग्यांक सिद्धांतों के साथ इन प्रणालियों का संयोजन करके, न्यूमरो टॉक आपके जीवन के ब्लूप्रिंट का एक विस्तृत विवरण प्रदान करता है।",
    gu: "વૈદિક મૂલાંક અને ભાગ્યાંક સિદ્ધાંતો સાથે આ પ્રણાલીઓનું સંયોજન કરીને, ન્યૂમરો ટૉક તમારા જીવનના બ્લુપ્રિન્ટની વિગતવાર વિગતો પ્રદાન કરે છે.",
    mr: "वैदिक मूलांक आणि भाग्यांक सिद्धांतांसह या प्रणाली एकत्रित करून, न्यूमरो टॉक तुमच्या जीवनाच्या आराखड्याचे सर्वसमावेशक विहंगम दृश्य प्रदान करते."
  },
  cosmicGridTitle: {
    en: "02. Cosmic Coordinates Grid",
    hi: "02. कॉस्मिक निर्देशांक ग्रिड",
    gu: "02. કોસ્મિક નિર્દેશાંકો ગ્રીડ",
    mr: "02. कॉस्मिक निर्देशांक ग्रीड"
  },
  moolankBoxTitle: {
    en: "Moolank (Birth Day)",
    hi: "मूलांक (जन्म दिन)",
    gu: "મૂલાંક (જન્મ દિવસ)",
    mr: "मूलांक (जन्म दिवस)"
  },
  bhagyankBoxTitle: {
    en: "Bhagyank (Life Path)",
    hi: "भाग्यांक (जीवन पथ)",
    gu: "ભાગ્યાંક (જીવન પથ)",
    mr: "भाग्यांक (जीवन मार्ग)"
  },
  destinyPythBoxTitle: {
    en: "Destiny (Pythagorean)",
    hi: "नामांक (पाइथागोरस)",
    gu: "નામાંક (પાયથાગોરસ)",
    mr: "नामांक (पायथागोरस)"
  },
  destinyChaldBoxTitle: {
    en: "Destiny (Chaldean)",
    hi: "नामांक (चाल्डियन)",
    gu: "નામાંક (ચેલ્ડિયન)",
    mr: "नामांक (चाल्डियन)"
  },
  soulUrgeBoxTitle: {
    en: "Soul Urge",
    hi: "आंतरिक इच्छा (सोल अर्ज)",
    gu: "આંતરિક ઈચ્છા (સોલ અર્જ)",
    mr: "आंतरिक इच्छा (सोल अर्ज)"
  },
  personalityBoxTitle: {
    en: "Personality",
    hi: "व्यक्तित्व (पर्सनालिटी)",
    gu: "વ્યક્તિત્વ (પર્સનાલિટી)",
    mr: "व्यक्तिमत्त्व (पर्सनालिटी)"
  },
  planetLabel: {
    en: "Planet",
    hi: "ग्रह",
    gu: "ગ્રહ",
    mr: "ग्रह"
  },
  pythDescLabel: {
    en: "Vibration of full name",
    hi: "पूर्ण नाम का कंपन",
    gu: "આખા નામનું કંપન",
    mr: "पूर्ण नावाचे कंपन"
  },
  chaldDescLabel: {
    en: "Sound vibration sum",
    hi: "ध्वनि कंपन का योग",
    gu: "ધ્વનિ કંપનનો સરવાળો",
    mr: "ध्वनी कंपनाचा योग"
  },
  vowelsLabel: {
    en: "Vibration of name vowels",
    hi: "नाम के स्वरों का कंपन",
    gu: "નામના સ્વરોનું કંપન",
    mr: "नावातील स्वरांचे कंपन"
  },
  consonantsLabel: {
    en: "Vibration of name consonants",
    hi: "नाम के व्यंजनों का कंपन",
    gu: "નામના વ્યંજનોનું કંપન",
    mr: "नावातील व्यंजनांचे कंपन"
  },
  moolankPositiveTitle: {
    en: "03. Moolank Analysis: Positive Traits",
    hi: "03. मूलांक विश्लेषण: सकारात्मक गुण",
    gu: "03. મૂલાંક વિશ્લેષણ: સકારાત્મક ગુણો",
    mr: "03. मूलांक विश्लेषण: सकारात्मक गुण"
  },
  moolankChallengesTitle: {
    en: "04. Moolank Analysis: Challenges & Health",
    hi: "04. मूलांक विश्लेषण: चुनौतियां और स्वास्थ्य",
    gu: "04. મૂલાંક વિશ્લેષણ: પડકારો અને આરોગ્ય",
    mr: "04. मूलांक विश्लेषण: आव्हाने आणि आरोग्य"
  },
  rulerLabel: {
    en: "Ruler",
    hi: "स्वामी",
    gu: "સ્વામી",
    mr: "स्वामी"
  },
  positiveVibrationsLabel: {
    en: "Positive Core Vibrations",
    hi: "सकारात्मक कोर कंपन",
    gu: "સકારાત્મક મુખ્ય કંપન",
    mr: "सकारात्मक मुख्य कंपन"
  },
  challengesLabel: {
    en: "Challenges & Pitfalls",
    hi: "चुनौतियां और कमजोरियां",
    gu: "પડકારો અને ખામીઓ",
    mr: "आव्हाने आणि त्रुटी"
  },
  healthGuidelineTitle: {
    en: "Health Guidelines for Moolank",
    hi: "मूलांक के लिए स्वास्थ्य दिशा-निर्देश",
    gu: "મૂલાંક માટે આરોગ્ય માર્ગદર્શિકા",
    mr: "मूलांकसाठी आरोग्य मार्गदर्शक तत्त्वे"
  },
  healthGuidelineText: {
    en: "According to Vedic numerology, the planetary ruler governs specific organs. For Moolank {num}, maintaining a balanced diet, practicing regular yoga, and avoiding anxiety are crucial to preventing health issues. Regular intake of water, herbs, and sleeping on time will maintain high physical vibrations.",
    hi: "वैदिक अंकशास्त्र के अनुसार, प्रत्येक ग्रह हमारे विशिष्ट अंगों को नियंत्रित करता है। मूलांक {num} के लिए संतुलित आहार बनाए रखना, नियमित योग का अभ्यास करना और मानसिक तनाव से बचना स्वास्थ्य समस्याओं को रोकने के लिए अत्यंत आवश्यक है। पानी का पर्याप्त सेवन, जड़ी-बूटियाँ और समय पर सोने से शारीरिक ऊर्जा बनी रहेगी।",
    gu: "વૈદિક અંકશાસ્ત્ર મુજબ, શાસક ગ્રહ ચોક્કસ અંગોનું સંચાલન કરે છે. મૂલાંક {num} માટે સંતુલિત આહાર જાળવવો, નિયમિત યોગાભ્યાસ કરવો અને ચિંતા ટાળવી એ સ્વાસ્થ્ય સમસ્યાઓ અટકાવવા માટે નિર્ણાયક છે. પાણી, વનસ્પતિનું નિયમિત સેવન અને સમયસર સૂવાથી શારીરિક ઊર્જા જળવાઈ રહેશે.",
    mr: "वैदिक अंकशास्त्रानुसार, स्वामी ग्रह विशिष्ट अवयवांवर नियंत्रण ठेवतो. मूलांक {num} साठी संतुलित आहार राखणे, नियमित योगासने करणे आणि चिंता टाळणे आरोग्य समस्या टाळण्यासाठी अत्यंत आवश्यक आहे. पाणी, औषधी वनस्पतींचे नियमित सेवन आणि वेळेवर झोपल्याने शारीरिक ऊर्जा टिकून राहील."
  },
  bhagyankLifePathTitle: {
    en: "05. Bhagyank Analysis: Life Path",
    hi: "05. भाग्यांक विश्लेषण: जीवन पथ",
    gu: "05. ભાગ્યાંક વિશ્લેષણ: જીવન પથ",
    mr: "05. भाग्यांक विश्लेषण: जीवन मार्ग"
  },
  bhagyankCareerTitle: {
    en: "06. Bhagyank Analysis: Career Direction",
    hi: "06. भाग्यांक विश्लेषण: करियर दिशा",
    gu: "06. ભાગ્યાંક વિશ્લેષણ: કારકિર્દી દિશા",
    mr: "06. भाग्यांक विश्लेषण: करिअर दिशा"
  },
  destinyJourneyLabel: {
    en: "Destiny Journey",
    hi: "भाग्य यात्रा",
    gu: "ભાગ્ય યાત્રા",
    mr: "भाग्य प्रवास"
  },
  professionalChannelsLabel: {
    en: "Recommended Professional Channels",
    hi: "अनुशंसित करियर मार्ग",
    gu: "ભલામણ કરેલ કારકિર્દી માર્ગો",
    mr: "शिफारस केलेले करिअर मार्ग"
  },
  bhagyankDescText: {
    en: "Your Bhagyank represents the path you are destined to walk. By choosing a career path that resonates with this number, you reduce friction, avoid unnecessary struggles, and achieve success quickly.",
    hi: "आपका भाग्यांक उस मार्ग का प्रतिनिधित्व करता है जिस पर चलना आपके भाग्य में लिखा है। इस संख्या से मेल खाने वाले करियर का चयन करके, आप जीवन के संघर्षों को कम कर सकते हैं और तेजी से सफलता प्राप्त कर सकते हैं।",
    gu: "તમારો ભાગ્યાંક એ માર્ગનું પ્રતિનિધિત્વ કરે છે જેના પર ચાલવું તમારા ભાગ્યમાં લખેલું છે. આ નંબર સાથે પડઘો પાડતી કારકિર્દી પસંદ કરીને, તમે સંઘર્ષો ઘટાડી શકો છો અને ઝડપી સફળતા મેળવી શકો છો.",
    mr: "तुमचा भाग्यांक त्या मार्गाचे प्रतिनिधित्व करतो ज्यावर चालणे तुमच्या नशिबात लिहिले आहे. या संख्येशी जुळणारे करिअर निवडून, तुम्ही संघर्ष कमी करू शकता आणि वेगाने यश मिळवू शकता."
  },
  destinyTitle: {
    en: "07. Destiny & Expression Number",
    hi: "07. भाग्य और अभिव्यक्ति संख्या",
    gu: "07. ભાગ્ય અને અભિવ્યક્તિ સંખ્યા",
    mr: "07. भाग्य आणि अभिव्यक्ती संख्या"
  },
  alignmentLabel: {
    en: "Vibration Sums & Planetary Alignment",
    hi: "कंपन योग और ग्रहीय संरेखण",
    gu: "કંપન સરવાળો અને ગ્રહોનું જોડાણ",
    mr: "कंपन बेरीज आणि ग्रहांचे संरेखन"
  },
  destinyIntroText: {
    en: "Your Destiny Number (Expression Number) represents your natural talents, capabilities, and the outward persona you show to the world. It is calculated by adding the values of all letters in your complete birth name.",
    hi: "आपका नामांक (भाग्य संख्या) आपकी प्राकृतिक प्रतिभाओं, क्षमताओं और बाहरी दुनिया के सामने आपके व्यक्तित्व को दर्शाता है। इसकी गणना आपके पूरे जन्म नाम के सभी अक्षरों के योग से की जाती है।",
    gu: "તમારો નામાંક (ભાગ્ય નંબર) તમારી કુદરતી પ્રતિભા, ક્ષમતા અને બાહ્ય વ્યક્તિત્વને પ્રતિબિંબિત કરે છે. તેની ગણતरी તમારા આખા જન્મ નામના તમામ અક્ષરોના સરવાળા પરથી કરવામાં આવે છે.",
    mr: "तुमचा नामांक (भाग्य क्रमांक) तुमच्या नैसर्गिक प्रतिभा, क्षमता आणि बाह्य व्यक्तिमत्त्वाचे प्रतिनिधित्व करतो. याची गणना तुमच्या संपूर्ण जन्म नावातील सर्व अक्षरांच्या बेरीजेवरून केली जाते."
  },
  destinyOutroText: {
    en: "While Pythagorean system focuses on character strengths, Chaldean system focuses on external events and social status. Aligning both numbers can yield the highest vibration.",
    hi: "जबकि पाइथागोरस प्रणाली चरित्र की शक्तियों पर ध्यान केंद्रित करती है, चाल्डियन प्रणाली बाहरी घटनाओं और सामाजिक स्थिति पर ध्यान केंद्रित करती है। दोनों प्रणालियों का संरेखण आपको उच्चतम ऊर्जा प्रदान कर सकता है।",
    gu: "જ્યારે પાયથાગોરિયન સિસ્ટમ પાત્રની શક્તિઓ પર ધ્યાન કેન્દ્રિત કરે છે, ચેલ્ડિયન સિસ્ટમ બાહ્ય ઘટનાઓ અને સામાજિક દરજ્જા પર ધ્યાન કેન્દ્રિત કરે છે. બંનેનું જોડાણ તમને ઉચ્ચતમ ઉર્જા પ્રદાન કરી શકે છે.",
    mr: "पायथागोरियन प्रणाली चारित्र्य शक्तींवर लक्ष केंद्रित करते, तर चाल्डियन प्रणाली बाह्य घटना आणि सामाजिक स्थितीवर लक्ष केंद्रित करते. दोन्ही प्रणालींचे संरेखन तुम्हाला सर्वोच्च ऊर्जा देऊ शकते."
  },
  nameVibeTitle: {
    en: "08. Name Number Vibration",
    hi: "08. नाम संख्या कंपन",
    gu: "08. નામ સંખ્યા કંપન",
    mr: "08. नाव संख्या कंपन"
  },
  nameValueMeaningLabel: {
    en: "Name Value Vibration Meaning",
    hi: "नाम मान कंपन का अर्थ",
    gu: "નામ મૂલ્ય કંપનનો અર્થ",
    mr: "नाव मूल्य कंपन अर्थ"
  },
  soulUrgeTitle: {
    en: "09. Soul Urge Number",
    hi: "09. आंतरिक इच्छा संख्या",
    gu: "09. આંતરિક ઈચ્છા સંખ્યા",
    mr: "09. आंतरिक इच्छा संख्या"
  },
  soulUrgeDesc: {
    en: "Your Soul Urge Number (Heart's Desire) represents your inner motivation, hidden desires, and what you genuinely want out of life. It is calculated from the vowels of your name (A, E, I, O, U).",
    hi: "आपकी आंतरिक इच्छा संख्या (दिल की इच्छा) आपकी आंतरिक प्रेरणा, छिपी हुई इच्छाओं और आप जीवन से वास्तव में क्या चाहते हैं इसका प्रतिनिधित्व करती है। इसकी गणना आपके नाम के स्वरों (A, E, I, O, U) से की जाती है।",
    gu: "તમારી આંતરિક ઈચ્છા સંખ્યા (હૃદયની ઈચ્છા) તમારી આંતરિક પ્રેરણા, છુપાયેલી ઈચ્છાઓ અને તમે જીવનમાંથી ખરેખર શું ઈચ્છો છો તેનું પ્રતિનિધિત્વ કરે છે. તેની ગણતરી તમારા નામના સ્વરો (A, E, I, O, U) પરથી થાય છે.",
    mr: "तुमची आंतरिक इच्छा संख्या (हृदयाची इच्छा) तुमची आंतरिक प्रेरणा, लपलेल्या इच्छा आणि तुम्हाला जीवनातून खरोखर काय हवे आहे याचे प्रतिनिधित्व करते. याची गणना तुमच्या नावातील स्वरांवरून (A, E, I, O, U) केली जाते."
  },
  vibeDetailsLabel: {
    en: "Vibe Details",
    hi: "कंपन विवरण",
    gu: "કંપન વિગતો",
    mr: "कंपन तपशील"
  },
  soulUrgeVibeDetails: {
    en: "Ruled by {lord}, you are motivated by the deep traits of this planet. This dictates your private life, the things that bring you absolute inner peace, and what you seek when there is no social pressure.",
    hi: "{lord} द्वारा शासित, आप इस ग्रह के गहरे गुणों से प्रेरित हैं। यह आपके निजी जीवन, उन चीजों को निर्देशित करता है जो आपको पूर्ण आंतरिक शांति प्रदान करती करती हैं, और जब कोई सामाजिक दबाव नहीं होता है तो आप क्या तलाशते हैं।",
    gu: "{lord} દ્વારા શાસિત, તમે આ ગ્રહના ઊંડા લક્ષણોથી પ્રેરિત છો. આ તમારા ખાનगी જીવનને, તમને સંપૂર્ણ આંતરિક શાંતિ આપતી બાબતોને અને જ્યારે કોઈ સામાજિક દબાણ ન હોય ત્યારે તમે શું ઈચ્છો છો તે નક્કી કરે છે.",
    mr: "{lord} द्वारे शासित, तुम्ही या ग्रहाच्या खोल वैशिष्ट्यांनी प्रेरित आहात. हे तुमचे खाजगी आयुष्य, तुम्हाला पूर्ण आंतरिक शांतता देणाऱ्या गोष्टी आणि जेव्हा सामाजिक दबाव नसतो तेव्हा तुम्ही काय शोधता हे ठरवते."
  },
  personalityTitle: {
    en: "10. Personality Number",
    hi: "10. व्यक्तित्व संख्या",
    gu: "10. વ્યક્તિત્વ સંખ્યા",
    mr: "10. व्यक्तिमत्त्व संख्या"
  },
  personalityDesc: {
    en: "Your Personality Number is calculated from the consonants in your name. It represents the outer persona, the first impression you make, and how society perceives your energy vibration.",
    hi: "आपकी व्यक्तित्व संख्या की गणना आपके नाम के व्यंजनों से की जाती है। यह बाहरी व्यक्तित्व, आपके द्वारा बनाए जाने वाले पहले प्रभाव और समाज आपके ऊर्जा कंपन को कैसे देखता है, इसका प्रतिनिधित्व करती है।",
    gu: "તમારા વ્યક્તિત્વ નંબરની ગણતરી તમારા નામના વ્યંજનો પરથી કરવામાં આવે છે. તે બાહ્ય વ્યક્તित્વ, તમારી પ્રથમ છાપ અને સમાજ તમારા ઉર્જા કંપનને કેવી રીતે જુએ છે તેનું પ્રતિનિધિત્વ કરે છે.",
    mr: "तुमच्या व्यक्तिमत्त्व क्रमांकाची गणना तुमच्या नावातील व्यंजनांवरून केली जाते. हे बाह्य व्यक्तिमत्त्व, तुमची पहिली छाप आणि समाज तुमच्या उर्जेचे कंपन कसे पाहतो याचे प्रतिनिधित्व करते."
  },
  personalityVibeDetails: {
    en: "Ruling planet {lord} shapes your style, communication, and visual aura. While your Soul Urge is private, your Personality is public. Balance between them is key.",
    hi: "स्वामी ग्रह {lord} आपकी शैली, संचार और दृश्य आभामंडल को आकार देता है। जबकि आपकी आंतरिक इच्छा (सोल अर्ज) निजी है, आपका व्यक्तित्व (पर्सनालिटी) सार्वजनिक है। उनके बीच संतुलन बनाए रखना महत्वपूर्ण है।",
    gu: "શાસક ગ્રહ {lord} તમારી શૈલી, સંચાર અને દ્રશ્ય આભાને આકાર આપે છે. જ્યારે તમારી આંતરિક ઈચ્છા ખાનગી છે, ત્યારે તમારું વ્યક્તિત્વ જાહેર છે. તેમની વચ્ચે સંતુલન ચાવીરૂપ છે.",
    mr: "स्वामी ग्रह {lord} तुमची शैली, संभाषण आणि दृश्य वलय आकारास आणतो. तुमची आंतरिक इच्छा खाजगी असली तरीcompute तुमचे व्यक्तिमत्त्व सार्वजनिक आहे. त्यांच्यात संतुलन असणे महत्त्वाचे आहे."
  },
  nameCorrTitle: {
    en: "11. Name Correction Analysis",
    hi: "11. नाम सुधार विश्लेषण",
    gu: "11. નામ સુધારણા વિશ્લેષણ",
    mr: "11. नाव सुधारणा विश्लेषण"
  },
  nameCorrDescText: {
    en: "A Name Correction is highly beneficial when your current name value is unfriendly to your Moolank or Bhagyank. For instance, name values of 4 or 8 can introduce challenges, delays, and unexpected friction if your birth details do not support them. By modifying the spelling slightly (e.g. adding a vowel), we can align the total sum to a lucky configuration (like 1, 3, 5, or 6).",
    hi: "यदि आपका वर्तमान नामांक आपके मूलांक या भाग्यांक के अनुकूल नहीं है, तो नाम सुधार अत्यंत लाभकारी होता है। उदाहरण के लिए, 4 या 8 नंबर का नामांक जीवन में चुनौतियाँ, देरी और अचानक बाधाएँ ला सकता है यदि आपकी कुंडली इसके अनुकूल न हो। वर्तनी में थोड़ा बदलाव करके (जैसे एक स्वर जोड़ना), हम कुल योग को एक भाग्यशाली संख्या (जैसे 1, 3, 5, या 6) में बदल सकते हैं।",
    gu: "જો તમારો વર્તમાન નામાંક તમારા મૂલાંક કે ભાગ્યાંકને અનુકૂળ ન હોય, તો નામ સુધારણા અત્યંત ફાયદાકારક છે. ઉદાહરણ તરીકે, 4 અથવા 8 નંબરનો નામાંક જીવનમાં પડકારો, વિલંબ અને અચાનક અવરોધો લાવી શકે છે. જોડણીમાં થોડો ફેરફાર કરીને, આપણે કુલ યોગને ભાગ્યશાળી નંબરમાં બદલી શકીએ છીએ.",
    mr: "तुमचा सध्याचा नामांक तुमच्या मूलांक किंवा भाग्यांकाला अनुकूल नसेल, तर नाव सुधारणा करणे अत्यंत फायदेशीर ठरते. उदाहरणार्थ, ४ किंवा ८ क्रमांकाचा नामांक जीवनात आव्हाने, विलंब आणि अनपेक्षित अडथळे आणू शकतो. स्पेलिंगमध्ये थोडा बदल करून, आम्ही एकूण बेरीज भाग्यवान संख्येत बदलू शकतो."
  },
  currentSpellingLabel: {
    en: "Current Spelling Calculation",
    hi: "वर्तमान वर्तनी गणना",
    gu: "વર્તમાન જોડણી ગણતરી",
    mr: "सध्याची स्पेलिंग गणना"
  },
  originalNameLabel: {
    en: "Original Name:",
    hi: "मूल नाम:",
    gu: "મૂળ નામ:",
    mr: "मूळ नाव:"
  },
  pythValueLabel: {
    en: "Pythagorean Value:",
    hi: "पाइथागोरस मान:",
    gu: "પાયથાગોરસ મૂલ્ય:",
    mr: "पायथागोरियन मूल्य:"
  },
  chaldValueLabel: {
    en: "Chaldean Value:",
    hi: "चाल्डियन मान:",
    gu: "ચેલ્ડિયન મૂલ્ય:",
    mr: "चाल्डियन मूल्य:"
  },
  spellingSuggestionsTitle: {
    en: "12. Spelling Correction Suggestions",
    hi: "12. वर्तनी सुधार सुझाव",
    gu: "12. જોડણી સુધારણા સૂચનો",
    mr: "12. स्पेलिंग सुधारणा मार्गदर्शक"
  },
  spellingSuggestionsDesc: {
    en: "Here are spelling recommendations to align your name's Pythagorean sum to the lucky number 5 (ruler Mercury, governing trade and business):",
    hi: "यहाँ आपके नाम के पाइथागोरस योग को भाग्यशाली संख्या 5 (बुध स्वामी, जो व्यापार और व्यवसाय का संचालन करता है) से संरेखित करने के लिए वर्तनी की सिफारिशें दी गई हैं:",
    gu: "અહીં તમારા નામના પાયથાગોરસ સરવાળાને ભાગ્યશાળી નંબર 5 (બુધ ગ્રહ, જે વ્યાપાર અને વ્યવસાયનું સંચાલન કરે છે) સાથે સુસંગત કરવા માટે જોડણીની ભલામણો છે:",
    mr: "येथे तुमच्या नावाचे पायथागोरस बेरीज भाग्यवान क्रमांक 5 (बुध स्वामी, जो व्यापार आणि व्यवसायाचे संचालन करतो) शी जुळण्यासाठी स्पेलिंग शिफारसी आहेत:"
  },
  mobileAnalysisTitle: {
    en: "13. Mobile Number Analysis",
    hi: "13. मोबाइल नंबर विश्लेषण",
    gu: "13. મોબાઇલ નંબર વિશ્લેષણ",
    mr: "13. मोबाईल नंबर विश्लेषण"
  },
  mobileIntroText: {
    en: "Your phone number is your digital signature. Its total sum represents the frequency that governs all your digital conversations, incoming opportunities, and business networking.",
    hi: "आपका फोन नंबर आपका डिजिटल हस्ताक्षर है। इसका कुल योग उस आवृत्ति का प्रतिनिधित्व करता है जो आपकी सभी डिजिटल बातचीत, आने वाले अवसरों और व्यावसायिक नेटवर्किंग को प्रभावित करती है।",
    gu: "તમારો ફોન નંબર તમારી ડિજિટલ સહી છે. તેનો કુલ સરવાળો તે આવર્તનનું પ્રતિનિધિત્વ કરે છે જે તમારી બધી ડિજિટલ વાતચીત, આવનારી તકો અને વ્યવસાયિક નેટવર્કિંગને સંચાલિત કરે છે.",
    mr: "तुमचा फोन नंबर ही तुमची डिजिटल स्वाक्षरी आहे. तिची एकूण बेरीज ही वारंवारता दर्शवते जी तुमच्या सर्व डिजिटल संभाषण, येणाऱ्या संधी आणि व्यावसायिक नेटवर्किंगवर नियंत्रण ठेवते."
  },
  targetPhoneLabel: {
    en: "Target Phone:",
    hi: "लक्षित फोन:",
    gu: "લક્ષિત ફોન:",
    mr: "मोबाईल नंबर:"
  },
  digitSumLabel: {
    en: "Digit Sum:",
    hi: "अंकों का योग:",
    gu: "અંકોનો સરવાળો:",
    mr: "अंकांची बेरीज:"
  },
  reducedValueLabel: {
    en: "Reduced Value:",
    hi: "एकल अंक मान:",
    gu: "ઘટેલ મૂલ્ય:",
    mr: "एकूण अंक मूल्य:"
  },
  planetaryLordLabel: {
    en: "Planetary Lord:",
    hi: "स्वामी ग्रह:",
    gu: "ગ્રહ સ્વામી:",
    mr: "स्वामी ग्रह:"
  },
  mobileCompatibilityTitle: {
    en: "14. Mobile Compatibility Score",
    hi: "14. मोबाइल संगतता स्कोर",
    gu: "14. મોબાઇલ સુસંગતતા સ્કોર",
    mr: "14. मोबाईल सुसंगतता स्कोअर"
  },
  compatibilityStatusLabel: {
    en: "Compatibility Status",
    hi: "संगतता की स्थिति",
    gu: "સુસંગતતા સ્થિતિ",
    mr: "सुसंगतता स्थिती"
  },
  compatibilityDescText: {
    en: "A high compatibility status ensures that notifications, messages, and calls received on this number support your general mental peace, rather than causing stress or constant project delays.",
    hi: "एक उच्च संगतता स्कोर यह सुनिश्चित करता है कि इस नंबर पर प्राप्त होने वाले संदेश और कॉल आपकी मानसिक शांति का समर्थन करें, न कि तनाव या लगातार देरी का कारण बनें।",
    gu: "ઉચ્ચ સુસંગતતા સ્કોર એ સુનિશ્ચિત કરે છે કે આ નંબર પર પ્રાપ્ત સંદેશાઓ અને કોલ્સ તમારી માનસિક શાંતિને ટેકો આપે છે, ન કે તણાવ અથવા સતત વિલંબનું કારણ બને છે.",
    mr: "उच्च सुसंगतता स्थिती हे सुनिश्चित करते की या क्रमांकावर प्राप्त झालेले संदेश आणि कॉल तुमच्या मानसिक शांततेला पाठिंबा देतात, ताण किंवा सतत कामात विलंब होण्याचे कारण बनत नाहीत."
  },
  vipRecommendationsTitle: {
    en: "15. VIP Phone Recommendations",
    hi: "15. वीआईपी फोन अनुशंसाएं",
    gu: "15. વીઆઈપી ફોન ભલામણો",
    mr: "15. व्हीआयपी फोन शिफारसी"
  },
  selectingLuckyDigitsLabel: {
    en: "Selecting Lucky Phone Digits",
    hi: "भाग्यशाली फोन अंकों का चयन",
    gu: "ભાગ્યશાળી ફોન અંકોની પસંદગી",
    mr: "भाग्यवान फोन अंकांचे निवडी"
  },
  selectingLuckyDigitsDesc: {
    en: "If your current phone number compatibility is low, we advise getting a new number. When selecting, verify these traits:",
    hi: "यदि आपकी वर्तमान फोन नंबर संगतता कम है, तो हम एक नया नंबर लेने की सलाह देते हैं। चयन करते समय, इन लक्षणों की पुष्टि करें:",
    gu: "જો તમારા વર્તમાન ફોન નંબરની સુસંગતતા ઓછી હોય, તો અમે નવો નંબર લેવાની સલાહ આપીએ છીએ. પસંદ કરતી વખતે, આ લક્ષણો ચકાસો:",
    mr: "तुमच्या सध्याच्या फोन नंबरची सुसंगतता कमी असल्यास, आम्ही नवीन नंबर घेण्याचा सल्ला देतो. निवडताना, ही वैशिष्ट्ये तपासा:"
  },
  luckyEndingDesc: {
    en: "Lucky Ending Combinations: Choose a mobile number ending in 1339, 3913, or 5555. These codes attract wealth and networking opportunities.",
    hi: "भाग्यशाली अंतिम अंक: ऐसा मोबाइल नंबर चुनें जिसके अंत में 1339, 3913 या 5555 हो। ये अंक धन और नेटवर्किंग के अवसरों को आकर्षित करते हैं।",
    gu: "ભાગ્યશાળી અંતિમ સંયોજનો: 1339, 3913, અથવા 5555 માં સમાપ્ત થતો મોબાઇલ નંબર પસંદ કરો. આ સંયોજનો સંપત્તિ અને તકો આકર્ષે છે.",
    mr: "भाग्यवान शेवटचे संयोजन: १३३९, ३९१३ किंवा ५५५५ ने संपणारा मोबाईल नंबर निवडा. हे कोड संपत्ती आणि संधी आकर्षित करतात."
  },
  avoidEndingDesc: {
    en: "Numbers to Avoid: Minimize the counts of 4, 7, and 8 in your phone digits. Excessive 8s can delay results, while excessive 7s cause overthinking.",
    hi: "बचने योग्य अंक: अपने फोन नंबर में 4, 7 और 8 की संख्या को कम से कम करें। अत्यधिक 8 अंक कार्यों में देरी लाता है, जबकि अत्यधिक 7 अंक अधिक सोचने (overthinking) का कारण बनता है।",
    gu: "ટાળવા જેવા નંબરો: તમારા ફોન નંબરમાં 4, 7 અને 8 ના અંકો ઓછા કરો. અતિશય 8 વિલંબનું કારણ બને છે, જ્યારે 7 વધુ પડતા વિચારો લાવે છે.",
    mr: "टाळण्याचे अंक: तुमच्या फोन नंबरमध्ये ४, ७ आणि ८ चे प्रमाण कमी करा. जास्त ८ मुळे कामात विलंब होऊ शकतो, तर जास्त ७ मुळे अतिविचार वाढतो."
  },
  yearlyPredictionTitle: {
    en: "16. Yearly Prediction 2026",
    hi: "16. वार्षिक भविष्यफल 2026",
    gu: "16. વાર્ષિક ભવિષ્યફળ 2026",
    mr: "16. वार्षिक भविष्यफळ 2026"
  },
  yearlyPredictionSub: {
    en: "Vedic Year Outlook & Career Guidance",
    hi: "वैदिक वर्ष दृष्टिकोण और करियर मार्गदर्शन",
    gu: "વૈદિક વર્ષ આઉટલુક અને કારકિર્દી માર્ગદર્શન",
    mr: "वैदिक वर्ष आऊटलूक आणि करिअर मार्गदर्शन"
  },
  luckyCoordinatesTitle: {
    en: "17. Lucky Coordinates Chart",
    hi: "17. भाग्यशाली निर्देशांक चार्ट",
    gu: "17. ભાગ્યશાળી કોઓર્ડિનેટ્સ ચાર્ટ",
    mr: "17. भाग्यवान निर्देशांक चार्ट"
  },
  luckyColorsLabel: {
    en: "Lucky Colors",
    hi: "भाग्यशाली रंग",
    gu: "ભાગ્યશાળી રંગો",
    mr: "भाग्यवान रंग"
  },
  luckyDatesLabel: {
    en: "Lucky Dates",
    hi: "भाग्यशाली तिथियां",
    gu: "ભાગ્યશાળી તારીખો",
    mr: "भाग्यवान तारखा"
  },
  luckyGemstoneLabel: {
    en: "Lucky Gemstone",
    hi: "भाग्यशाली रत्न",
    gu: "ભાગ્યશાળી રત્ન",
    mr: "भाग्यवान रत्न"
  },
  luckyRudrakshaLabel: {
    en: "Lucky Rudraksha",
    hi: "भाग्यशाली रुद्राक्ष",
    gu: "ભાગ્યશાળી રુદ્રાક્ષ",
    mr: "भाग्यवान रुद्राक्ष"
  },
  remediesMantraTitle: {
    en: "18. Remedies & Special Mantra",
    hi: "18. उपाय और विशेष मंत्र",
    gu: "18. ઉપાયો અને વિશેષ મંત્ર",
    mr: "18. उपाय आणि विशेष मंत्र"
  },
  sacredMantraLabel: {
    en: "Sacred Mantra (विशेष वैदिक मंत्र)",
    hi: "Sacred Mantra (विशेष वैदिक मंत्र)",
    gu: "Sacred Mantra (વિશેષ વૈદિક મંત્ર)",
    mr: "Sacred Mantra (विशेष वैदिक मंत्र)"
  },
  sacredMantraDesc: {
    en: "Chant this mantra 108 times daily in the morning to increase your coordinates' power.",
    hi: "इस मंत्र का प्रतिदिन सुबह 108 बार जाप करें ताकि आपके ग्रहों की शक्ति में वृद्धि हो सके।",
    gu: "તમારા ગ્રહોની શક્તિ વધારવા માટે દરરોજ સવારે આ મંત્રનો 108 વાર જાપ કરો.",
    mr: "तुमच्या ग्रहांची शक्ती वाढवण्यासाठी दररोज सकाळी या मंत्राचा १०८ वेळा जप करा."
  },
  finalGuidanceTitle: {
    en: "Numero Talk's Final Guidance",
    hi: "न्यूमरो टॉक का अंतिम मार्गदर्शन",
    gu: "ન્યૂમરો ટૉકનું અંતિમ માર્ગદર્શન",
    mr: "न्यूमरो टॉकचे अंतिम मार्गदर्शन"
  },
  finalGuidanceText: {
    en: "Life is a beautiful balance of Karma and cosmic timing. Numerology coordinates show your cosmic inclinations, but your actions (Karma) determine final manifestation. Perform remedies on Thursdays and Tuesdays, avoid black colors in wallets, and follow Ganesha worship to smooth your path.",
    hi: "जीवन कर्म और ब्रह्मांडीय समय का एक सुंदर संतुलन है। अंकशास्त्र के निर्देशांक आपकी ब्रह्मांडीय झुकाव को दर्शाते हैं, लेकिन आपके कर्म अंतिम परिणाम तय करते हैं। गुरुवार और मंगलवार को उपाय करें, अपने बटुए में काले रंग से बचें, और बाधाओं को दूर करने के लिए गणेश जी की पूजा करें।",
    gu: "જીવન એ કર્મ અને બ્રહ્માંડ સમયનું એક સુંદર સંતુલન છે. અંકશાસ્ત્રના કોઓર્ડિનેટ્સ તમારી બ્રહ્માંડિય ઝુકાવ દર્શાવે છે, પરંતુ તમારા કર્મો અંતિમ પરિણામ નક્કી કરે છે. ગુરુવાર અને મંગળવારે ઉપાયો કરો, પાકીટમાં કાળો રંગ ટાળો અને ગણેશ પૂજા કરો.",
    mr: "आयुष्य हे कर्म आणि वैश्विक वेळेचा एक सुंदर समतोल आहे. अंकशास्त्राचे निर्देशांक तुमचे वैश्विक झुकणे दर्शवतात, परंतु तुमचे कर्म अंतिम परिणाम ठरवते. गुरुवार आणि मंगळवारी उपाय करा, पाकीटमधील काळा रंग टाळा आणि श्रीगणेशाची उपासना करा."
  }
};

export default function DetailedReportTemplate({ reportData, language = 'en' }) {
  const { firstName, middleName, lastName, dob, email, mobileNumber } = reportData;
  const fullName = [firstName, middleName, lastName].filter(Boolean).join(' ');

  // Calculate numbers
  const moolank = calculateMoolank(dob);
  const bhagyank = calculateBhagyank(dob);
  const destinyPyth = calculateDestiny(fullName, 'pythagorean');
  const destinyChald = calculateDestiny(fullName, 'chaldean');
  const soulUrge = calculateSoulUrge(fullName, 'pythagorean');
  const personality = calculatePersonality(fullName, 'pythagorean');

  const mobileAnalysis = mobileNumber ? analyzeMobileNumber(mobileNumber) : null;
  const mobileComp = mobileAnalysis ? checkMobileCompatibility(mobileAnalysis.reduced, moolank, bhagyank) : null;

  const currentMoolank = moolankData[moolank] || moolankData[1];
  const currentBhagyank = bhagyankData[bhagyank] || bhagyankData[1];
  const currentNameVal = nameNumberData[destinyPyth] || nameNumberData[1];
  const currentMobileVal = mobileAnalysis ? (mobileNumberInterpretations[mobileAnalysis.reduced] || mobileNumberInterpretations[1]) : null;

  const nameSuggestions = suggestNameCorrections(fullName, 'pythagorean', 5); // default target 5

  // Helper function to resolve localized translation objects
  const getTranslation = (fieldObj) => {
    if (!fieldObj) return '';
    if (typeof fieldObj === 'string') return fieldObj;
    // Fallback hierarchy: selected language -> hi -> en
    return fieldObj[language] || fieldObj.hi || fieldObj.en || '';
  };

  // Helper macro for localized static labels
  const t = (key, params = {}) => {
    const textObj = templateTranslations[key];
    if (!textObj) return '';
    let val = textObj[language] || textObj.hi || textObj.en || '';
    
    // Replace parameters
    Object.keys(params).forEach(pKey => {
      val = val.replace(`{${pKey}}`, params[pKey]);
    });
    return val;
  };

  // Helper Ganesha SVG
  const GaneshaSVG = () => (
    <svg className="w-48 h-48 mx-auto text-amber-600" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M50 15c-6 0-11 5-11 11s5 11 11 11 11-5 11-11-5-11-11-11z" />
      <path d="M50 37c-10 0-18 8-18 18 0 15 10 25 18 25s18-10 18-25c0-10-8-18-18-18z" />
      <path d="M45 42c-2 2-3 5-3 8 0 8 5 12 8 12s8-4 8-12c0-3-1-6-3-8" />
      {/* Crown */}
      <path d="M44 15l6-10 6 10M40 14h20M46 9h8" />
      {/* Trunk */}
      <path d="M50 50c3 3 5 8 5 13 0 5-4 7-7 7-4 0-5-3-2-5 3-2 3-5 1-8l-2-2" />
      {/* Ears */}
      <path d="M39 20c-5-3-10-1-12 4s0 11 6 13M61 20c5-3 10-1 12 4s0 11-6 13" />
      {/* Lotus base */}
      <path d="M30 80c5 5 15 5 20 2 5 3 15 3 20-2" />
      <circle cx="50" cy="26" r="1.5" fill="currentColor" />
    </svg>
  );

  // Helper page wrapper
  const renderHeader = (pageNumber) => (
    <div className="pdf-header flex justify-between items-center text-[10px] text-gray-400 border-b border-gray-150 pb-2 mb-8 font-serif">
      <span>{t('shreeGaneshayaNamah')}</span>
      <span className="tracking-widest uppercase text-amber-700 font-semibold">{t('reportHeader')}</span>
      <span>{t('website')}</span>
    </div>
  );

  const renderFooter = (pageNumber) => (
    <div className="pdf-footer absolute bottom-6 left-12 right-12 flex justify-between items-center text-[10px] text-gray-400 border-t border-gray-150 pt-2 font-serif">
      <span>{t('footerText')}</span>
      <span className="font-bold text-amber-700">{language === 'en' ? 'Page' : (language === 'gu' ? 'પાનું' : 'पृष्ठ')} {pageNumber}</span>
    </div>
  );

  const renderWatermark = () => (
    <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden" style={{ zIndex: 0, opacity: 0.10 }}>
      <span className="font-serif font-black text-amber-600 transform -rotate-45 tracking-widest uppercase" style={{ fontSize: '90px', whiteSpace: 'nowrap' }}>
        {t('watermarkText')}
      </span>
    </div>
  );

  // Dynamic Table of Contents items localized
  const getTocItems = () => {
    const isEn = language === 'en';
    return [
      { num: "01", title: isEn ? "Introduction to Esoteric Numerology" : (language === 'gu' ? "ગૂઢ અંકશાસ્ત્ર પરિચય" : "गूढ अंकशास्त्र परिचय"), page: 3 },
      { num: "02", title: isEn ? "Personal Cosmic Grids" : (language === 'gu' ? "વ્યક્તિગત ગ્રીડ વિગતો" : "व्यक्तिगत ग्रिड विवरण"), page: 4 },
      { num: "03", title: isEn ? "Moolank (Birth Number) - Strengths" : (language === 'gu' ? "મૂલાંક સકારાત્મક વિશ્લેષણ" : "मूलांक सकारात्मक विश्लेषण"), page: 5 },
      { num: "04", title: isEn ? "Moolank (Birth Number) - Weaknesses & Health" : (language === 'gu' ? "મૂલાંક પડકારો અને આરોગ्य" : "मूलांक चुनौतियां और स्वास्थ्य"), page: 6 },
      { num: "05", title: isEn ? "Bhagyank (Life Path Number) - Journey" : (language === 'gu' ? "ભાગ્યાંક જીવન યાત્રા" : "भाग्यांक जीवन यात्रा"), page: 7 },
      { num: "06", title: isEn ? "Bhagyank (Life Path Number) - Career" : (language === 'gu' ? "ભાગ્યાંક કારકિર્દી સલાહ" : "भाग्यांक करियर परामर्श"), page: 8 },
      { num: "07", title: isEn ? "Destiny & Expression Number" : (language === 'gu' ? "નામાંક વિશ્લેષણ" : "नामांक विश्लेषण"), page: 9 },
      { num: "08", title: isEn ? "Name Vibration Analysis" : (language === 'gu' ? "નામ કંપન વિશ્લેષણ" : "नाम अंक प्रभाव"), page: 10 },
      { num: "09", title: isEn ? "Soul Urge Number" : (language === 'gu' ? "આંતરિક ઈચ્છા વિગતો" : "आंतरिक इच्छा विवरण"), page: 11 },
      { num: "10", title: isEn ? "Personality Number" : (language === 'gu' ? "બાહ્ય વ્યક્તિત્વ વિશ્લેષણ" : "बाह्य व्यक्तित्व विश्लेषण"), page: 12 },
      { num: "11", title: isEn ? "Name Correction Module" : (language === 'gu' ? "નામ સુધારણા વિશ્લેષણ" : "नाम सुधार विश्लेषण"), page: 13 },
      { num: "12", title: isEn ? "Spelling Correction & Suggestions" : (language === 'gu' ? "જોડણી સુધારણા સૂચનો" : "वर्तनी सुधार सुझाव"), page: 14 },
      { num: "13", title: isEn ? "Mobile Numerology - Sum Analysis" : (language === 'gu' ? "મોબાઇલ નંબર યોગ વિશ્લેષણ" : "मोबाइल नंबर योग विश्लेषण"), page: 15 },
      { num: "14", title: isEn ? "Mobile Compatibility Score" : (language === 'gu' ? "મોબાઇલ સુસંગતતા સ્કોર" : "मोबाइल संगतता स्कोर"), page: 16 },
      { num: "15", title: isEn ? "VIP Number Recommendations" : (language === 'gu' ? "વીઆઈપી નંબર સૂચનો" : "वीआईपी नंबर सुझाव"), page: 17 },
      { num: "16", title: isEn ? "Yearly Prediction 2026" : (language === 'gu' ? "વાર્ષિક ભવિષ્યફળ 2026" : "वार्षिक भविष्यफल 2026"), page: 18 },
      { num: "17", title: isEn ? "Lucky Coordinates Chart" : (language === 'gu' ? "ભાગ્યશાળી રત્ન અને રંગ" : "भाग्यशाली रत्न एवं रंग"), page: 19 },
      { num: "18", title: isEn ? "Remedies, Mantras & Final Conclusion" : (language === 'gu' ? "ઉપાયો અને મંત્રો" : "उपाय एवं मंत्र"), page: 20 },
    ];
  };

  return (
    <div className="pdf-report-container">
      
      {/* PAGE 1: COVER PAGE — all inline styles for reliable html2canvas rendering */}
     <div
  className="pdf-page"
  style={{
    height: '297mm',
    width: '210mm',
    pageBreakAfter: 'always',
    position: 'relative',

    background: '#fff',

    padding: '14mm',

    display: 'flex',
    flexDirection: 'column',

    border: '8px solid rgba(217,119,6,0.3)',
    boxSizing: 'border-box',
  }}
>
  {/* TOP: OM */}
  <div style={{ textAlign: 'center', paddingTop: '8px' }}>
    <span
      style={{
        fontSize: '11px',
        fontWeight: 'bold',
        textTransform: 'uppercase',
        letterSpacing: '0.15em',
        color: '#b45309',
        fontFamily: 'Cinzel, Georgia, serif',
      }}
    >
      {t('omGanesha')}
    </span>

    <div
      style={{
        width: '48px',
        height: '1.5px',
        background: '#d97706',
        margin: '6px auto 0',
      }}
    />
  </div>

  {/* CENTER CONTENT */}
  <div
    style={{
      flex: 1,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    }}
  >
    <div
      style={{
        textAlign: 'center',
        width: '100%',
        maxWidth: '520px',
      }}
    >
      <GaneshaSVG />

      <h1
        style={{
          fontFamily: 'Cinzel, Georgia, serif',
          fontSize: '34px',
          fontWeight: '900',
          color: '#111827',

          textTransform: 'uppercase',

          letterSpacing: '0.05em',

          margin: '16px 0 0',

          lineHeight: '1.3',
        }}
      >
        {t('coverTitle')}
      </h1>

      <p
        style={{
          fontFamily: 'Cinzel, Georgia, serif',

          fontSize: '22px',

          fontWeight: '700',

          color: '#b45309',

          margin: '4px 0 0',
        }}
      >
        {t('coverSubtitle')}
      </p>

      <p
        style={{
          color: '#6b7280',

          fontSize: '12px',

          maxWidth: '340px',

          margin: '12px auto 0',

          lineHeight: '1.7',
        }}
      >
        {t('coverDesc')}
      </p>

      <div
        style={{
          width: '80px',

          height: '1px',

          background: 'rgba(217,119,6,0.3)',

          margin: '16px auto',
        }}
      />

      {/* Client Details Box */}
      <div
        style={{
          maxWidth: '360px',

          margin: '0 auto',

          padding: '18px 24px',

          background: 'rgba(254,243,199,0.25)',

          border: '1px solid rgba(251,191,36,0.35)',

          borderRadius: '14px',

          textAlign: 'left',
        }}
      >
        <div
          style={{
            fontSize: '9px',

            textTransform: 'uppercase',

            fontWeight: 'bold',

            color: '#b45309',

            letterSpacing: '0.12em',

            borderBottom: '1px solid rgba(251,191,36,0.3)',

            paddingBottom: '6px',

            marginBottom: '10px',

            fontFamily: 'Inter, sans-serif',
          }}
        >
          {t('personalCoordinates')}
        </div>

        {[
          {
            label: t('nameLabel'),
            value: fullName,
            color: '#111827',
          },

          {
            label: t('dobLabel'),
            value: dob,
            color: '#111827',
          },

          ...(mobileNumber
            ? [
                {
                  label: t('mobileLabel'),
                  value: mobileNumber,
                  color: '#111827',
                },
              ]
            : []),

          {
            label: t('emailLabel'),
            value: email,
            color: '#111827',
          },

          {
            label: t('preparedBy'),
            value: t('vedicAstrologer'),
            color: '#b45309',
          },
        ].map((row, i) => (
          <div
            key={i}
            style={{
              marginBottom: '7px',

              lineHeight: '1.4',
            }}
          >
            <span
              style={{
                fontSize: '11px',

                color: '#6b7280',

                fontWeight: '500',

                fontFamily: 'Inter, sans-serif',
              }}
            >
              {row.label}{' '}
            </span>

            <span
              style={{
                fontSize: '11px',

                fontWeight: '700',

                color: row.color,

                fontFamily: 'Inter, sans-serif',
              }}
            >
              {row.value}
            </span>
          </div>
        ))}
      </div>
    </div>
  </div>

  {/* BOTTOM: Numerotalk */}
  <div
    style={{
      textAlign: 'center',

      borderTop: '1px solid rgba(251,191,36,0.35)',

      paddingTop: '12px',
    }}
  >
    <span
      style={{
        fontSize: '10px',

        color: 'rgba(180,83,9,0.6)',

        textTransform: 'uppercase',

        letterSpacing: '0.15em',

        fontFamily: 'Cinzel, Georgia, serif',
      }}
    >
      ✦ &nbsp; Numerotalk &nbsp; ✦
    </span>
  </div>
</div>


      {/* PAGE 2: TABLE OF CONTENTS */}
     {/* PAGE 2: TABLE OF CONTENTS */}

<div
  className="pdf-page relative p-12 bg-white flex flex-col justify-between"
  style={{
    height: '297mm',
    width: '210mm',
    pageBreakAfter: 'always',
  }}
>
  {renderWatermark()}

  <div style={{ position: 'relative', zIndex: 1 }}>
    {renderHeader(2)}

    <h2 className="font-serif text-2xl font-bold text-gray-900 mb-6">
      {t('tocTitle')}
    </h2>

    <div className="space-y-3.5 text-xs text-gray-700 leading-relaxed">

      {getTocItems().map((item, idx) => (
        <div
          key={idx}
          className="flex justify-between border-b border-dashed border-gray-200 pb-1.5"
        >
          <span className="font-mono text-amber-700 font-bold mr-2">
            {item.num}
          </span>

          <span className="flex-1 text-left">
            {item.title}
          </span>

          <span className="font-mono text-gray-500">
            Page {item.page}
          </span>
        </div>
      ))}

    </div>
  </div>

  {renderFooter(2)}
</div>


    {/* PAGE 3: INTRODUCTION */}

<div
  className="pdf-page relative p-12 bg-white flex flex-col justify-between"
  style={{
    height: '297mm',
    width: '210mm',
    pageBreakAfter: 'always',
  }}
>
  {renderWatermark()}

  <div style={{ position: 'relative', zIndex: 1 }}>
    {renderHeader(3)}

    <h2 className="font-serif text-2xl font-bold text-gray-900 mb-4">
      {t('introductionTitle')}
    </h2>

    <div className="space-y-4 text-xs text-gray-700 leading-relaxed text-justify">

      <p>
        {t('introductionTextP1')}
      </p>

      <p>
        <strong>
          {language === 'en'
            ? 'Pythagorean System:'
            : language === 'gu'
            ? 'પાયથાગોરિયન પદ્ધતિ:'
            : 'पाइथागोरस प्रणाली:'}
        </strong>{' '}
        {t('introductionTextP2')}
      </p>

      <p>
        <strong>
          {language === 'en'
            ? 'Chaldean System:'
            : language === 'gu'
            ? 'ચેલ્ડિયન પદ્ધતિ:'
            : 'चाल्डियन प्रणाली:'}
        </strong>{' '}
        {t('introductionTextP3')}
      </p>

      <p>
        {t('introductionTextP4')}
      </p>

    </div>
  </div>

  {renderFooter(3)}
</div>  
     {/* PAGE 4: COSMIC GRID */}

<div
  className="pdf-page relative p-12 bg-white flex flex-col justify-between"
  style={{
    height: '297mm',
    width: '210mm',
    pageBreakAfter: 'always',
  }}
>
  {renderWatermark()}

  <div style={{ position: 'relative', zIndex: 1 }}>
    {renderHeader(4)}

    <h2 className="font-serif text-2xl font-bold text-gray-900 mb-6">
      {t('cosmicGridTitle')}
    </h2>

    <div className="space-y-6 text-xs text-gray-700 leading-relaxed text-justify">

      <div className="grid grid-cols-2 gap-4">

        {[
          {
            title: t('moolankBoxTitle'),
            value: moolank,
            desc: `${t('planetLabel')}: ${getTranslation(
              planetaryLords[moolank]
            )}`,
          },

          {
            title: t('bhagyankBoxTitle'),
            value: bhagyank,
            desc: `${t('planetLabel')}: ${getTranslation(
              planetaryLords[bhagyank]
            )}`,
          },

          {
            title: t('destinyPythBoxTitle'),
            value: destinyPyth,
            desc: t('pythDescLabel'),
          },

          {
            title: t('destinyChaldBoxTitle'),
            value: destinyChald,
            desc: t('chaldDescLabel'),
          },

          {
            title: t('soulUrgeBoxTitle'),
            value: soulUrge,
            desc: t('vowelsLabel'),
          },

          {
            title: t('personalityBoxTitle'),
            value: personality,
            desc: t('consonantsLabel'),
          },
        ].map((grid, idx) => (
          <div
            key={idx}
            className="p-4 bg-amber-50/20 border border-amber-100 rounded-xl space-y-1.5"
          >
            <span className="text-[10px] uppercase font-bold text-gray-400">
              {grid.title}
            </span>

            <span className="text-3xl font-black text-amber-700 block">
              {grid.value}
            </span>

            <span className="text-[10px] text-gray-500 font-medium">
              {grid.desc}
            </span>
          </div>
        ))}

      </div>

    </div>
  </div>

  {renderFooter(4)}
</div>

     {/* PAGE 5: MOOLANK POSITIVE ANALYSIS */}

<div
  className="pdf-page relative p-12 bg-white flex flex-col justify-between"
  style={{
    height: '297mm',
    width: '210mm',
    pageBreakAfter: 'always',
  }}
>
  {renderWatermark()}

  <div style={{ position: 'relative', zIndex: 1 }}>
    {renderHeader(5)}

    <h2 className="font-serif text-2xl font-bold text-gray-900 mb-3">
      {t('moolankPositiveTitle')}
    </h2>

    <div className="space-y-3 text-xs text-gray-700 leading-relaxed text-justify">

      <h3 className="font-serif text-lg font-bold text-amber-700">
        {language === 'en' ? 'Moolank' : 'मूलांक'} {moolank}
        &nbsp;—&nbsp;
        {t('rulerLabel')}: {getTranslation(planetaryLords[moolank])}
      </h3>

      <p>{getTranslation(currentMoolank.desc)}</p>

      <div className="p-4 bg-emerald-50/60 border border-emerald-200 rounded-xl space-y-2">
        <strong className="text-emerald-700 uppercase tracking-wider block text-[10px]">
          ✦ {t('positiveVibrationsLabel')}
        </strong>

        <p className="text-gray-700">
          {getTranslation(currentMoolank.strengths)}
        </p>
      </div>

      <div className="p-4 bg-amber-50/50 border border-amber-200 rounded-xl space-y-2">
        <strong className="text-amber-700 uppercase tracking-wider block text-[10px]">
          ✦ {
            language === 'en'
              ? 'Core Personality Traits'
              : language === 'gu'
              ? 'મૂળ વ્યક્તિત્વ ગુણો'
              : 'मूल व्यक्तित्व गुण'
          }
        </strong>

        <ul className="list-disc list-inside space-y-1 text-gray-700">
          {getTranslation(
            currentMoolank.traits || currentMoolank.strengths
          )
            .split('.')
            .filter((s) => s.trim().length > 10)
            .slice(0, 5)
            .map((trait, i) => (
              <li key={i}>{trait.trim()}.</li>
            ))}
        </ul>
      </div>

      <div className="p-4 bg-blue-50/40 border border-blue-100 rounded-xl">
        <strong className="text-blue-700 uppercase tracking-wider block text-[10px] mb-1">
          ✦ {
            language === 'en'
              ? 'Planetary Influence'
              : language === 'gu'
              ? 'ગ્રહ પ્રભાવ'
              : 'ग्रहीय प्रभाव'
          }
        </strong>

        <p className="text-gray-700">
          {language === 'en'
            ? `The ruling planet ${getTranslation(
                planetaryLords[moolank]
              )} governs your fundamental nature. This cosmic energy shapes your instincts, drives your ambitions, and influences how you respond to life's challenges. People born under Moolank ${moolank} naturally embody the qualities of this planetary lord.`
            : language === 'gu'
            ? `ગ્રહ ${getTranslation(
                planetaryLords[moolank]
              )} તમારી મૂળ પ્રકૃતિ પર શાસન કરે છે. આ વૈશ્વિક ઊર્જા તમારી સ્વાભાવિક વૃત્તિઓ, મહત્ત્વાકાંક્ષાઓ અને પ્રતિક્રિયાઓ ઘડે છે.`
            : `स्वामी ग्रह ${getTranslation(
                planetaryLords[moolank]
              )} आपकी मूल प्रकृति को नियंत्रित करता है। यह ब्रह्मांडीय ऊर्जा आपकी प्रवृत्तियों, महत्वाकांक्षाओं और जीवन की चुनौतियों के प्रति आपकी प्रतिक्रियाओं को आकार देती है।`}
        </p>
      </div>

      <div className="p-3 bg-gray-50 border border-gray-200 rounded-xl">
        <strong className="text-gray-600 uppercase tracking-wider block text-[10px] mb-1">
          ✦ {
            language === 'en'
              ? 'Key Strengths Summary'
              : language === 'gu'
              ? 'મુખ્ય શક્તિઓ'
              : 'मुख्य शक्तियां'
          }
        </strong>

        <div className="grid grid-cols-2 gap-1">
          {[
            'Leadership',
            'Creativity',
            'Intuition',
            'Determination',
            'Adaptability',
            'Vision',
          ].map((s, i) => (
            <span
              key={i}
              className="text-[10px] text-gray-600 flex items-center gap-1"
            >
              <span className="text-amber-600">▸</span>

              {s}
            </span>
          ))}
        </div>
      </div>

    </div>
  </div>

  {renderFooter(5)}
</div>

      {/* PAGE 6: MOOLANK CHALLENGES */}
      <div className="pdf-page relative p-12 bg-white flex flex-col justify-between" style={{ height: '297mm', width: '210mm', pageBreakAfter: 'always' }}>
        {renderWatermark()}
        <div style={{ position: 'relative', zIndex: 1 }}>
          {renderHeader(6)}
          <h2 className="font-serif text-2xl font-bold text-gray-900 mb-3">{t('moolankChallengesTitle')}</h2>
          <div className="space-y-3 text-xs text-gray-700 leading-relaxed text-justify">
            <div className="p-4 bg-rose-50/50 border border-rose-200 rounded-xl space-y-2">
              <strong className="text-rose-700 uppercase tracking-wider block text-[10px]">✦ {t('challengesLabel')}</strong>
              <p className="text-gray-700">{getTranslation(currentMoolank.weaknesses)}</p>
            </div>

            <div className="p-4 bg-orange-50/40 border border-orange-200 rounded-xl">
              <strong className="text-orange-700 uppercase tracking-wider block text-[10px] mb-2">✦ {language === 'en' ? 'Areas Requiring Attention' : (language === 'gu' ? 'ધ્યાન જરૂરી ક્ષેત્રો' : 'ध्यान आवश्यक क्षेत्र')}</strong>
              <ul className="list-disc list-inside space-y-1 text-gray-700">
                {getTranslation(currentMoolank.weaknesses).split('.').filter(s => s.trim().length > 10).slice(0, 4).map((w, i) => (
                  <li key={i}>{w.trim()}.</li>
                ))}
              </ul>
            </div>

            <h3 className="font-serif text-base font-bold text-gray-900">{t('healthGuidelineTitle')} {moolank}</h3>
            <p>{t('healthGuidelineText', { num: moolank })}</p>

            <div className="p-4 bg-teal-50/40 border border-teal-200 rounded-xl">
              <strong className="text-teal-700 uppercase tracking-wider block text-[10px] mb-2">✦ {language === 'en' ? 'Health & Wellness Tips' : (language === 'gu' ? 'સ્વાસ્થ્ય સૂચનો' : 'स्वास्थ्य सुझाव')}</strong>
              <div className="grid grid-cols-2 gap-2">
                {[
                  language === 'en' ? 'Avoid excessive stress' : 'अत्यधिक तनाव से बचें',
                  language === 'en' ? 'Practice meditation daily' : 'दैनिक ध्यान करें',
                  language === 'en' ? 'Keep hydrated always' : 'हाइड्रेटेड रहें',
                  language === 'en' ? 'Yoga & breathing exercises' : 'योग और प्राणायाम',
                  language === 'en' ? 'Avoid heavy late-night meals' : 'रात देर से खाने से बचें',
                  language === 'en' ? 'Regular health check-ups' : 'नियमित स्वास्थ्य जांच',
                ].map((tip, i) => (
                  <span key={i} className="text-[10px] text-gray-600 flex items-center gap-1"><span className="text-teal-500">✓</span> {tip}</span>
                ))}
              </div>
            </div>

            <div className="p-3 bg-purple-50/30 border border-purple-100 rounded-xl">
              <strong className="text-purple-700 uppercase tracking-wider block text-[10px] mb-1">✦ {language === 'en' ? 'Emotional Balance' : (language === 'gu' ? 'ભાવનાત્મક સંતુલન' : 'भावनात्मक संतुलन')}</strong>
              <p className="text-gray-700 text-[10px]">
                {language === 'en'
                  ? `People with Moolank ${moolank} tend to be emotionally intense. Channel this energy through creative outlets, journaling, or spiritual practices. Building strong emotional boundaries is key to maintaining inner harmony and lasting relationships.`
                  : `मूलांक ${moolank} वाले लोग भावनात्मक रूप से तीव्र होते हैं। इस ऊर्जा को रचनात्मक अभिव्यक्ति, जर्नलिंग या आध्यात्मिक अभ्यासों के माध्यम से चैनल करें।`
                }
              </p>
            </div>
          </div>
        </div>
        {renderFooter(6)}
      </div>


      {/* PAGE 7: BHAGYANK JOURNEY */}
      <div className="pdf-page relative p-12 bg-white flex flex-col justify-between" style={{ height: '297mm', width: '210mm', pageBreakAfter: 'always' }}>
        {renderWatermark()}
        <div style={{ position: 'relative', zIndex: 1 }}>
          {renderHeader(7)}
          <h2 className="font-serif text-2xl font-bold text-gray-900 mb-3">{t('bhagyankLifePathTitle')}</h2>
          <div className="space-y-3 text-xs text-gray-700 leading-relaxed text-justify">
            <h3 className="font-serif text-lg font-bold text-amber-700">
              {language === 'en' ? 'Bhagyank' : 'भाग्यांक'} {bhagyank} &mdash; {t('rulerLabel')}: {getTranslation(planetaryLords[bhagyank])}
            </h3>

            <div className="p-4 bg-amber-50/50 border border-amber-200 rounded-xl">
              <strong className="text-amber-700 uppercase tracking-wider block text-[10px] mb-1">✦ {t('destinyJourneyLabel')}</strong>
              <p>{getTranslation(currentBhagyank.destiny)}</p>
            </div>

            <div className="p-4 bg-indigo-50/40 border border-indigo-200 rounded-xl">
              <strong className="text-indigo-700 uppercase tracking-wider block text-[10px] mb-2">✦ {language === 'en' ? 'Life Path Milestones' : (language === 'gu' ? 'જીવન પથ સીમાચિહ્નો' : 'जीवन पथ मील के पत्थर')}</strong>
              <div className="space-y-1.5">
                {[
                  { age: language === 'en' ? '1–28 years' : '1–28 वर्ष', desc: language === 'en' ? 'Foundation period — learning, identity formation, early karmic patterns' : 'नींव काल — सीखना, पहचान निर्माण, प्रारंभिक कर्म पैटर्न' },
                  { age: language === 'en' ? '29–45 years' : '29–45 वर्ष', desc: language === 'en' ? 'Growth period — career consolidation, relationships, major life choices' : 'विकास काल — करियर, संबंध, प्रमुख जीवन निर्णय' },
                  { age: language === 'en' ? '46–63 years' : '46–63 वर्ष', desc: language === 'en' ? 'Mastery period — leadership, wisdom, spiritual awakening begins' : 'महारत काल — नेतृत्व, ज्ञान, आध्यात्मिक जागृति' },
                  { age: language === 'en' ? '64+ years' : '64+ वर्ष', desc: language === 'en' ? 'Legacy period — completion, teaching others, cosmic alignment' : 'विरासत काल — पूर्णता, शिक्षण, ब्रह्मांडीय संरेखण' },
                ].map((m, i) => (
                  <div key={i} className="flex gap-3">
                    <span className="font-bold text-amber-600 w-20 shrink-0 text-[10px]">{m.age}</span>
                    <span className="text-[10px] text-gray-600">{m.desc}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="p-4 bg-green-50/40 border border-green-200 rounded-xl">
              <strong className="text-green-700 uppercase tracking-wider block text-[10px] mb-1">✦ {language === 'en' ? 'Natural Talents & Gifts' : (language === 'gu' ? 'કુદરતી પ્રતિભા' : 'प्राकृतिक प्रतिभाएं')}</strong>
              <p className="text-gray-700">
                {language === 'en'
                  ? `Bhagyank ${bhagyank} individuals are naturally gifted with unique abilities that, when cultivated, lead to extraordinary achievements. Your cosmic blueprint reveals talents that should be consciously developed and expressed in the world.`
                  : `भाग्यांक ${bhagyank} वाले व्यक्ति अद्वितीय प्रतिभाओं से संपन्न होते हैं जो, जब विकसित होती हैं, असाधारण उपलब्धियों की ओर ले जाती हैं।`
                }
              </p>
            </div>

            <div className="p-3 bg-gray-50 border border-gray-200 rounded-xl">
              <strong className="text-gray-600 uppercase tracking-wider block text-[10px] mb-2">✦ {language === 'en' ? 'Compatible Life Path Numbers' : (language === 'gu' ? 'સુસંગત ભાગ્યાંક' : 'संगत भाग्यांक')}</strong>
              <div className="flex gap-2 flex-wrap">
                {[1, 3, 5, 6, 9].filter(n => n !== bhagyank).slice(0, 4).map(n => (
                  <span key={n} className="px-3 py-1 rounded-full bg-amber-100 text-amber-700 font-bold text-[10px]">{n}</span>
                ))}
              </div>
            </div>
          </div>
        </div>
        {renderFooter(7)}
      </div>


      {/* PAGE 8: BHAGYANK CAREER */}

{/* PAGE 8: BHAGYANK CAREER */}

<div
  className="pdf-page relative p-12 bg-white flex flex-col justify-between"
  style={{
    height: '297mm',
    width: '210mm',
    pageBreakAfter: 'always',
  }}
>
  {renderWatermark()}

  <div style={{ position: 'relative', zIndex: 1 }}>
    {renderHeader(8)}

    <h2 className="font-serif text-2xl font-bold text-gray-900 mb-3">
      {t('bhagyankCareerTitle')}
    </h2>

    <div className="space-y-3 text-xs text-gray-700 leading-relaxed text-justify">

      <div className="p-4 bg-amber-50/50 border border-amber-200 rounded-xl space-y-1.5">
        <strong className="text-amber-700 uppercase tracking-wider block text-[10px]">
          ✦ {t('professionalChannelsLabel')}
        </strong>

        <p className="text-gray-900 font-semibold">
          {getTranslation(currentBhagyank.career)}
        </p>
      </div>

      <p>{t('bhagyankDescText')}</p>

      <div className="p-4 bg-sky-50/40 border border-sky-200 rounded-xl">
        <strong className="text-sky-700 uppercase tracking-wider block text-[10px] mb-2">
          ✦ {
            language === 'en'
              ? 'Ideal Career Fields'
              : language === 'gu'
              ? 'આદર્શ કારકિર્દી ક્ષેત્રો'
              : 'आदर्श करियर क्षेत्र'
          }
        </strong>

        <div className="grid grid-cols-2 gap-1.5">
          {getTranslation(currentBhagyank.career)
            .split(',')
            .slice(0, 8)
            .map((c, i) => (
              <span
                key={i}
                className="text-[10px] text-gray-600 flex items-center gap-1"
              >
                <span className="text-sky-500">▸</span>

                {c.trim()}
              </span>
            ))}
        </div>
      </div>

      <div className="p-4 bg-violet-50/40 border border-violet-200 rounded-xl">
        <strong className="text-violet-700 uppercase tracking-wider block text-[10px] mb-1">
          ✦ {
            language === 'en'
              ? 'Financial Prosperity Guidance'
              : language === 'gu'
              ? 'આર્થિક સમૃદ્ધિ માર્ગદર્શન'
              : 'आर्थिक समृद्धि मार्गदर्शन'
          }
        </strong>

        <p className="text-gray-700">
          {language === 'en'
            ? `Your Bhagyank ${bhagyank} creates natural financial cycles. Peak earning periods align with years that vibrate with ${bhagyank} or its multiples. Invest wisely in the first half of each year and consolidate gains in the second half. Avoid impulsive financial decisions under Mercury retrograde periods.`
            : `आपका भाग्यांक ${bhagyank} प्राकृतिक वित्तीय चक्र बनाता है। वर्ष की पहली छमाही में निवेश करें और दूसरी में लाभ समेकित करें। आवेगी वित्तीय निर्णयों से बचें।`
          }
        </p>
      </div>

      <div className="p-3 bg-gray-50 border border-gray-200 rounded-xl">
        <strong className="text-gray-600 uppercase tracking-wider block text-[10px] mb-1">
          ✦ {
            language === 'en'
              ? 'Business Partnership Advice'
              : language === 'gu'
              ? 'વ્યાપારિક ભાગીદારી સલાહ'
              : 'व्यापारिक साझेदारी सलाह'
          }
        </strong>

        <p className="text-[10px] text-gray-600">
          {language === 'en'
            ? `Look for partners with Moolank or Bhagyank 1, 3, or 9 for the most harmonious and productive collaborations. Avoid partnerships formed during negative number years (4, 8 heavy periods).`
            : `मूलांक या भाग्यांक 1, 3 या 9 वाले साझेदारों की तलाश करें। नकारात्मक संख्या वर्षों (4, 8 भारी काल) में साझेदारी से बचें।`
          }
        </p>
      </div>

    </div>
  </div>

  {renderFooter(8)}
</div>


      {/* PAGE 9: DESTINY NUMBER */}
      <div className="pdf-page relative p-12 bg-white flex flex-col justify-between" style={{ height: '297mm', width: '210mm', pageBreakAfter: 'always' }}>
        {renderWatermark()}
        <div style={{ position: 'relative', zIndex: 1 }}>
          {renderHeader(9)}
          <h2 className="font-serif text-2xl font-bold text-gray-900 mb-3">{t('destinyTitle')}</h2>
          <div className="space-y-3 text-xs text-gray-700 leading-relaxed text-justify">
            <h3 className="font-serif text-base font-bold text-gray-900">{t('alignmentLabel')}</h3>
            <p>{t('destinyIntroText')}</p>

            <div className="grid grid-cols-2 gap-4 my-2">
              <div className="p-4 bg-gray-50 border border-gray-200 rounded-xl text-center">
                <span className="text-[10px] uppercase font-bold text-gray-400 block">{language === 'en' ? 'Pythagorean Destiny' : 'पाइथागोरस नामांक'}</span>
                <span className="text-3xl font-black text-gray-900 block mt-1">{destinyPyth}</span>
                <span className="text-[10px] text-gray-500 font-medium">{t('rulerLabel')}: {getTranslation(planetaryLords[destinyPyth])}</span>
              </div>
              <div className="p-4 bg-gray-50 border border-gray-200 rounded-xl text-center">
                <span className="text-[10px] uppercase font-bold text-gray-400 block">{language === 'en' ? 'Chaldean Destiny' : 'चाल्डियन नामांक'}</span>
                <span className="text-3xl font-black text-gray-900 block mt-1">{destinyChald}</span>
                <span className="text-[10px] text-gray-500 font-medium">{t('rulerLabel')}: {getTranslation(planetaryLords[destinyChald])}</span>
              </div>
            </div>

            <p>{t('destinyOutroText')}</p>

            <div className="p-4 bg-amber-50/50 border border-amber-200 rounded-xl">
              <strong className="text-amber-700 uppercase tracking-wider block text-[10px] mb-2">✦ {language === 'en' ? 'Name–Destiny Alignment Analysis' : (language === 'gu' ? 'નામ–ભાગ્ય સુસંગતતા' : 'नाम–भाग्य संरेखण विश्लेषण')}</strong>
              <p className="text-gray-700">
                {destinyPyth === destinyChald
                  ? (language === 'en'
                      ? `Your Pythagorean and Chaldean values both resolve to ${destinyPyth}, indicating strong cosmic alignment between your name's sound vibration and its structural frequency. This rare harmony amplifies your name's positive influence significantly.`
                      : `आपके पाइथागोरस और चाल्डियन मान दोनों ${destinyPyth} पर आते हैं, जो आपके नाम की ध्वनि और संरचनात्मक आवृत्ति के बीच मजबूत ब्रह्मांडीय संरेखण दर्शाता है।`)
                  : (language === 'en'
                      ? `Your Pythagorean value (${destinyPyth}) and Chaldean value (${destinyChald}) differ, revealing a dual-layer name vibration. Externally you project the energy of ${destinyPyth}, while your deeper, Chaldean frequency of ${destinyChald} influences your subconscious patterns and hidden tendencies.`
                      : `आपका पाइथागोरस मान (${destinyPyth}) और चाल्डियन मान (${destinyChald}) भिन्न हैं, जो एक द्वि-स्तरीय नाम कंपन प्रकट करते हैं।`)
                }
              </p>
            </div>

            <div className="p-3 bg-purple-50/40 border border-purple-200 rounded-xl">
              <strong className="text-purple-700 uppercase tracking-wider block text-[10px] mb-1">✦ {language === 'en' ? 'Expression & Public Identity' : (language === 'gu' ? 'અભિવ્યક્તિ અને સામાજિક ઓળખ' : 'अभिव्यक्ति और सार्वजनिक पहचान')}</strong>
              <p className="text-[10px] text-gray-600">
                {language === 'en'
                  ? `The Destiny Number represents how you express yourself to the world and the legacy you are destined to create. It governs your public identity, your reputation, and the mark you leave on those around you.`
                  : `नामांक दर्शाता है कि आप दुनिया को खुद को कैसे व्यक्त करते हैं और आप किस विरासत को बनाने के लिए नियत हैं। यह आपकी सार्वजनिक पहचान और प्रतिष्ठा को नियंत्रित करता है।`
                }
              </p>
            </div>
          </div>
        </div>
        {renderFooter(9)}
      </div>


      {/* PAGE 10: NAME VIBRATION */}
      <div className="pdf-page relative p-12 bg-white flex flex-col justify-between" style={{ height: '297mm', width: '210mm', pageBreakAfter: 'always' }}>
        {renderWatermark()}
        <div style={{ position: 'relative', zIndex: 1 }}>
          {renderHeader(10)}
          <h2 className="font-serif text-2xl font-bold text-gray-900 mb-3">{t('nameVibeTitle')}</h2>
          <div className="space-y-3 text-xs text-gray-700 leading-relaxed text-justify">
            <h3 className="font-serif text-lg font-bold text-amber-700">
              {language === 'en' ? 'Name Value' : 'नामांक'} {destinyPyth} &mdash; {t('nameValueMeaningLabel')}
            </h3>

            <div className="p-4 bg-amber-50/50 border border-amber-200 rounded-xl">
              <strong className="text-amber-700 uppercase tracking-wider block text-[10px] mb-1">✦ {language === 'en' ? 'Name Vibration Interpretation' : 'नाम कंपन व्याख्या'}</strong>
              <p>{getTranslation(currentNameVal)}</p>
            </div>

            <div className="p-4 bg-indigo-50/40 border border-indigo-200 rounded-xl">
              <strong className="text-indigo-700 uppercase tracking-wider block text-[10px] mb-2">✦ {language === 'en' ? 'Letter-by-Letter Frequency Breakdown' : (language === 'gu' ? 'અક્ષર-દ-અક્ષર ફ્રિક્વન્સી' : 'अक्षर-दर-अक्षर आवृत्ति')}</strong>
              <div className="flex flex-wrap gap-1.5">
                {fullName.replace(/\s/g, '').toUpperCase().split('').map((char, i) => {
                  const pythVal = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.indexOf(char) % 9 + 1;
                  return (
                    <div key={i} className="text-center">
                      <div className="w-7 h-7 rounded-md bg-amber-100 border border-amber-300 flex items-center justify-center font-bold text-amber-700 text-[11px]">{char}</div>
                      <div className="text-[9px] text-gray-500 mt-0.5">{pythVal}</div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="p-4 bg-emerald-50/40 border border-emerald-200 rounded-xl">
              <strong className="text-emerald-700 uppercase tracking-wider block text-[10px] mb-1">✦ {language === 'en' ? 'Name Power & Aura' : (language === 'gu' ? 'નામ શક્તિ અને ઓરા' : 'नाम शक्ति और आभा')}</strong>
              <p className="text-gray-700">
                {language === 'en'
                  ? `The name "${fullName}" carries a Pythagorean vibration of ${destinyPyth}. This frequency projects a specific aura into the universe — a vibrational calling card that precedes you in every interaction, meeting, and opportunity. Strengthening your name's vibration through correct spelling can amplify your cosmic signal.`
                  : `नाम "${fullName}" का पाइथागोरस कंपन ${destinyPyth} है। यह आवृत्ति ब्रह्मांड में एक विशेष आभा प्रक्षेपित करती है।`
                }
              </p>
            </div>

            <div className="grid grid-cols-3 gap-2">
              <div className="p-3 bg-gray-50 border border-gray-200 rounded-xl text-center">
                <div className="text-[9px] uppercase font-bold text-gray-400 mb-1">{language === 'en' ? 'Total Letters' : 'कुल अक्षर'}</div>
                <div className="text-xl font-black text-gray-800">{fullName.replace(/\s/g, '').length}</div>
              </div>
              <div className="p-3 bg-gray-50 border border-gray-200 rounded-xl text-center">
                <div className="text-[9px] uppercase font-bold text-gray-400 mb-1">{language === 'en' ? 'Vowel Sum' : 'स्वर योग'}</div>
                <div className="text-xl font-black text-amber-700">{soulUrge}</div>
              </div>
              <div className="p-3 bg-gray-50 border border-gray-200 rounded-xl text-center">
                <div className="text-[9px] uppercase font-bold text-gray-400 mb-1">{language === 'en' ? 'Consonant Sum' : 'व्यंजन योग'}</div>
                <div className="text-xl font-black text-gray-800">{personality}</div>
              </div>
            </div>
          </div>
        </div>
        {renderFooter(10)}
      </div>


      {/* PAGE 11: SOUL URGE NUMBER */}
      {/* PAGE 11: SOUL URGE */}

<div
  className="pdf-page relative p-12 bg-white flex flex-col justify-between"
  style={{
    height: '297mm',
    width: '210mm',
    pageBreakAfter: 'always',
  }}
>
  {renderWatermark()}

  <div style={{ position: 'relative', zIndex: 1 }}>
    {renderHeader(11)}

    <h2 className="font-serif text-2xl font-bold text-gray-900 mb-3">
      {t('soulUrgeTitle')}
    </h2>

    <div className="space-y-3 text-xs text-gray-700 leading-relaxed text-justify">

      <h3 className="font-serif text-lg font-bold text-amber-700">
        {language === 'en'
          ? 'Soul Urge Number'
          : 'आंतरिक इच्छा संख्या'}{' '}
        {soulUrge}
        &nbsp;—&nbsp;
        {t('rulerLabel')}: {getTranslation(planetaryLords[soulUrge])}
      </h3>

      <div className="p-4 bg-pink-50/50 border border-pink-200 rounded-xl">

        <strong className="text-pink-700 uppercase tracking-wider block text-[10px] mb-1">
          ✦ {
            language === 'en'
              ? 'What Your Soul Truly Desires'
              : language === 'gu'
              ? 'આત્માની સાચી ઇચ્છા'
              : 'आत्मा की सच्ची इच्छा'
          }
        </strong>

        <p>{t('soulUrgeDesc')}</p>

      </div>

      <div className="p-4 bg-violet-50/40 border border-violet-200 rounded-xl">

        <strong className="text-violet-700 uppercase tracking-wider block text-[10px] mb-1">
          ✦ {t('vibeDetailsLabel')}
        </strong>

        <p>
          {t('soulUrgeVibeDetails', {
            lord: getTranslation(planetaryLords[soulUrge]),
          })}
        </p>

      </div>

      <div className="p-4 bg-sky-50/40 border border-sky-200 rounded-xl">

        <strong className="text-sky-700 uppercase tracking-wider block text-[10px] mb-2">
          ✦ {
            language === 'en'
              ? 'Inner Motivations & Deep Drives'
              : language === 'gu'
              ? 'આંતરિક પ્રેરણાઓ'
              : 'आंतरिक प्रेरणाएं'
          }
        </strong>

        <p className="text-gray-700">

          {language === 'en'

            ? `Your Soul Urge ${soulUrge} reveals the innermost chamber of your heart. This number is calculated from the vowels in your name — the breath, the voice, the life force within each syllable. It speaks of what you crave at the deepest level, what truly fulfills you beyond material achievements.`

            : `आपका सोल अर्ज ${soulUrge} आपके दिल की सबसे गहरी परत प्रकट करता है। यह संख्या आपके नाम के स्वरों से निकाली जाती है।`
          }

        </p>

      </div>

      <div className="p-4 bg-emerald-50/40 border border-emerald-200 rounded-xl">

        <strong className="text-emerald-700 uppercase tracking-wider block text-[10px] mb-2">
          ✦ {
            language === 'en'
              ? 'Relationship Needs & Love Language'
              : language === 'gu'
              ? 'સંબંધ જરૂરિયાત'
              : 'रिश्तों में जरूरतें'
          }
        </strong>

        <p className="text-gray-700">

          {language === 'en'

            ? `In relationships, Soul Urge ${soulUrge} individuals need their core emotional needs to be understood and respected. They thrive when their partners align with their values and support their inner journey. Love, for you, must feel authentic and spiritually connected.`

            : `रिश्तों में, सोल अर्ज ${soulUrge} वाले व्यक्तियों को अपनी मूल भावनात्मक जरूरतों को समझा और सम्मानित किया जाना चाहिए।`
          }

        </p>

      </div>

    </div>
  </div>

  {renderFooter(11)}
</div>


      {/* PAGE 12: PERSONALITY NUMBER */}
      <div className="pdf-page relative p-12 bg-white flex flex-col justify-between" style={{ height: '297mm', width: '210mm', pageBreakAfter: 'always' }}>
        {renderWatermark()}
        <div style={{ position: 'relative', zIndex: 1 }}>
          {renderHeader(12)}
          <h2 className="font-serif text-2xl font-bold text-gray-900 mb-3">{t('personalityTitle')}</h2>
          <div className="space-y-3 text-xs text-gray-700 leading-relaxed text-justify">
            <h3 className="font-serif text-lg font-bold text-amber-700">
              {language === 'en' ? 'Personality Number' : 'व्यक्तित्व संख्या'} {personality} &mdash; {t('rulerLabel')}: {getTranslation(planetaryLords[personality])}
            </h3>

            <div className="p-4 bg-amber-50/50 border border-amber-200 rounded-xl">
              <strong className="text-amber-700 uppercase tracking-wider block text-[10px] mb-1">✦ {language === 'en' ? 'How the World Sees You' : (language === 'gu' ? 'દુનિયા તમને કેવી રીતે જુએ છે' : 'दुनिया आपको कैसे देखती है')}</strong>
              <p>{t('personalityDesc')}</p>
            </div>

            <div className="p-4 bg-orange-50/40 border border-orange-200 rounded-xl">
              <strong className="text-orange-700 uppercase tracking-wider block text-[10px] mb-1">✦ {t('vibeDetailsLabel')}</strong>
              <p>{t('personalityVibeDetails', { lord: getTranslation(planetaryLords[personality]) })}</p>
            </div>

            <div className="p-4 bg-teal-50/40 border border-teal-200 rounded-xl">
              <strong className="text-teal-700 uppercase tracking-wider block text-[10px] mb-2">✦ {language === 'en' ? 'First Impression & Social Presence' : (language === 'gu' ? 'પ્રથમ છાપ અને સામાજિક હાજરી' : 'पहली छाप और सामाजिक उपस्थिति')}</strong>
              <p className="text-gray-700">
                {language === 'en'
                  ? `Your Personality Number ${personality} is derived from the consonants of your name — the outer shell of your vibrational identity. It shapes your first impression, the energy you radiate in new environments, and the persona people encounter before they truly know you. It is your social mask, your public face, your cosmic calling card.`
                  : `आपका व्यक्तित्व संख्या ${personality} आपके नाम के व्यंजनों से निकाली जाती है — आपकी कंपनात्मक पहचान का बाहरी आवरण।`
                }
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="p-3 bg-gray-50 border border-gray-200 rounded-xl">
                <div className="text-[9px] uppercase font-bold text-gray-400 mb-2">{language === 'en' ? 'Outer Strengths' : 'बाह्य शक्तियां'}</div>
                {['Charming presence', 'Natural communicator', 'Reliable & trustworthy', 'Strong first impressions'].map((s, i) => (
                  <div key={i} className="text-[10px] text-gray-600 flex items-center gap-1 mt-0.5"><span className="text-teal-500">+</span> {s}</div>
                ))}
              </div>
              <div className="p-3 bg-gray-50 border border-gray-200 rounded-xl">
                <div className="text-[9px] uppercase font-bold text-gray-400 mb-2">{language === 'en' ? 'Social Patterns' : 'सामाजिक पैटर्न'}</div>
                {['Prefers quality over quantity', 'Loyal to close circle', 'Diplomatic under pressure', 'Values authenticity'].map((s, i) => (
                  <div key={i} className="text-[10px] text-gray-600 flex items-center gap-1 mt-0.5"><span className="text-amber-500">▸</span> {s}</div>
                ))}
              </div>
            </div>
          </div>
        </div>
        {renderFooter(12)}
      </div>


     {/* PAGE 13: NAME CORRECTION MODULE */}

<div
  className="pdf-page relative p-12 bg-white flex flex-col justify-between"
  style={{
    height: '297mm',
    width: '210mm',
    pageBreakAfter: 'always',
  }}
>
  {renderWatermark()}

  <div style={{ position: 'relative', zIndex: 1 }}>
    {renderHeader(13)}

    <h2 className="font-serif text-2xl font-bold text-gray-900 mb-4">
      {t('nameCorrTitle')}
    </h2>

    <div className="space-y-4 text-xs text-gray-700 leading-relaxed text-justify">

      <p>
        {t('nameCorrDescText')}
      </p>

      <div className="p-4 bg-amber-50/20 border border-amber-100 rounded-xl">

        <h4 className="text-[10px] uppercase font-bold text-amber-700 tracking-wider mb-2">
          {t('currentSpellingLabel')}
        </h4>

        <div className="grid grid-cols-2 gap-2">

          <span>{t('originalNameLabel')}</span>

          <span className="font-bold text-gray-950">
            {fullName}
          </span>

          <span>{t('pythValueLabel')}</span>

          <span className="font-bold text-gray-950">
            {destinyPyth}
          </span>

          <span>{t('chaldValueLabel')}</span>

          <span className="font-bold text-gray-950">
            {destinyChald}
          </span>

        </div>

      </div>

    </div>
  </div>

  {renderFooter(13)}
</div>


      {/* PAGE 14: SPELLING SUGGESTIONS */}
      <div className="pdf-page relative p-12 bg-white flex flex-col justify-between" style={{ height: '297mm', width: '210mm', pageBreakAfter: 'always' }}>
        {renderWatermark()}
        <div>
          {renderHeader(14)}
          <h2 className="font-serif text-2xl font-bold text-gray-900 mb-4">{t('spellingSuggestionsTitle')}</h2>
          <div className="space-y-4 text-xs text-gray-700 leading-relaxed text-justify">
            <p>
              {t('spellingSuggestionsDesc')}
            </p>
            <div className="space-y-2">
              {nameSuggestions.map((s, idx) => (
                <div key={idx} className="p-3 bg-gray-50 border border-gray-200 rounded-xl flex justify-between">
                  <div>
                    <span className="font-bold text-gray-950 block">{s.name}</span>
                    <span className="text-[10px] text-gray-500">{s.change}</span>
                  </div>
                  <div className="text-right">
                    <span className="font-bold text-gray-800 font-mono">{language === 'en' ? 'Value' : 'मान'}: {s.reduced}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        {renderFooter(14)}
      </div>


      {/* PAGE 15: MOBILE NUMEROLOGY SUM */}

<div
  className="pdf-page relative p-12 bg-white flex flex-col justify-between"
  style={{
    height: '297mm',
    width: '210mm',
    pageBreakAfter: 'always',
  }}
>
  {renderWatermark()}

  <div style={{ position: 'relative', zIndex: 1 }}>
    {renderHeader(15)}

    <h2 className="font-serif text-2xl font-bold text-gray-900 mb-4">
      {t('mobileAnalysisTitle')}
    </h2>

    <div className="space-y-4 text-xs text-gray-700 leading-relaxed text-justify">

      <p>
        {t('mobileIntroText')}
      </p>

      {mobileAnalysis && (

        <div className="p-4 bg-amber-50/20 border border-amber-100 rounded-xl space-y-3">

          <div className="grid grid-cols-2 gap-2">

            <span>{t('targetPhoneLabel')}</span>

            <span className="font-bold text-gray-950">
              {mobileNumber}
            </span>

            <span>{t('digitSumLabel')}</span>

            <span className="font-bold text-gray-950">
              {mobileAnalysis.sum}
            </span>

            <span>{t('reducedValueLabel')}</span>

            <span className="font-bold text-gray-950">
              {mobileAnalysis.reduced}
            </span>

            <span>{t('planetaryLordLabel')}</span>

            <span className="font-bold text-gray-950">
              {getTranslation(
                planetaryLords[mobileAnalysis.reduced]
              )}
            </span>

          </div>

          {currentMobileVal && (

            <div className="border-t border-amber-200/50 pt-2 text-[11px] text-gray-600 leading-relaxed">

              <p>
                {getTranslation(currentMobileVal)}
              </p>

            </div>

          )}

        </div>

      )}

    </div>
  </div>

  {renderFooter(15)}
</div>

{/* PAGE 16: MOBILE COMPATIBILITY */}

<div
  className="pdf-page relative p-12 bg-white flex flex-col justify-between"
  style={{
    height: '297mm',
    width: '210mm',
    pageBreakAfter: 'always',
  }}
>
  {renderWatermark()}

  <div style={{ position: 'relative', zIndex: 1 }}>
    {renderHeader(16)}

    <h2 className="font-serif text-2xl font-bold text-gray-900 mb-4">
      {t('mobileCompatibilityTitle')}
    </h2>

    <div className="space-y-4 text-xs text-gray-700 leading-relaxed text-justify">

      {mobileComp && (
        <div className="p-6 bg-gray-50 border border-gray-200 rounded-2xl space-y-4">

          <div className="text-center space-y-1">

            <span className="text-[10px] uppercase font-bold text-gray-400">
              {t('compatibilityStatusLabel')}
            </span>

            <h3 className="text-3xl font-black text-amber-700">
              {mobileComp.percentage}%
            </h3>

            <strong className="text-sm font-bold text-gray-800 uppercase block">
              {language === 'en'
                ? mobileComp.status
                : mobileComp.status === 'Friendly'
                ? 'मैत्रीपूर्ण'
                : mobileComp.status === 'Neutral'
                ? 'तटस्थ'
                : 'शत्रुतापूर्ण'}
            </strong>

          </div>

          <p className="text-xs text-gray-600 leading-relaxed pt-2 border-t border-gray-200">
            {t('compatibilityDescText')}
          </p>

        </div>
      )}

    </div>
  </div>

  {renderFooter(16)}
</div>


      {/* PAGE 17: VIP NUMBER RECOMMENDATIONS */}
      <div className="pdf-page relative p-12 bg-white flex flex-col justify-between" style={{ height: '297mm', width: '210mm', pageBreakAfter: 'always' }}>
        {renderWatermark()}
        <div>
          {renderHeader(17)}
          <h2 className="font-serif text-2xl font-bold text-gray-900 mb-4">{t('vipRecommendationsTitle')}</h2>
          <div className="space-y-4 text-xs text-gray-700 leading-relaxed text-justify">
            <h3 className="font-serif text-base font-bold text-gray-900">{t('selectingLuckyDigitsLabel')}</h3>
            <p>
              {t('selectingLuckyDigitsDesc')}
            </p>
            <div className="space-y-3">
              <div className="p-3 bg-amber-50/20 border border-amber-100 rounded-xl">
                {t('luckyEndingDesc')}
              </div>
              <div className="p-3 bg-gray-50 border border-gray-200 rounded-xl">
                {t('avoidEndingDesc')}
              </div>
            </div>
          </div>
        </div>
        {renderFooter(17)}
      </div>


      {/* PAGE 18: YEARLY PREDICTIONS 2026 */}
      <div className="pdf-page relative p-12 bg-white flex flex-col justify-between" style={{ height: '297mm', width: '210mm', pageBreakAfter: 'always' }}>
        {renderWatermark()}
        <div>
          {renderHeader(18)}
          <h2 className="font-serif text-2xl font-bold text-gray-900 mb-4">{t('yearlyPredictionTitle')}</h2>
          <div className="space-y-4 text-xs text-gray-700 leading-relaxed text-justify">
            <h3 className="font-serif text-lg font-bold text-amber-700">
              {t('yearlyPredictionSub')} (Bhagyank {bhagyank})
            </h3>
            <p>{getTranslation(currentBhagyank.prediction2026)}</p>
          </div>
        </div>
        {renderFooter(18)}
      </div>


      {/* PAGE 19: LUCKY COORDINATES */}
      <div className="pdf-page relative p-12 bg-white flex flex-col justify-between" style={{ height: '297mm', width: '210mm', pageBreakAfter: 'always' }}>
        {renderWatermark()}
        <div>
          {renderHeader(19)}
          <h2 className="font-serif text-2xl font-bold text-gray-900 mb-4">{t('luckyCoordinatesTitle')}</h2>
          <div className="space-y-4 text-xs text-gray-700">
            <div className="grid grid-cols-2 gap-4">
              <div className="p-3.5 bg-gray-50 border border-gray-200 rounded-xl">
                <span className="text-[10px] uppercase font-bold text-gray-400 block">{t('luckyColorsLabel')}</span>
                <span className="font-semibold text-gray-950 mt-1 block">{getTranslation(luckyColors[moolank]) || 'White'}</span>
              </div>
              <div className="p-3.5 bg-gray-50 border border-gray-200 rounded-xl">
                <span className="text-[10px] uppercase font-bold text-gray-400 block">{t('luckyDatesLabel')}</span>
                <span className="font-bold text-amber-700 mt-1 block">{luckyDates[moolank] || '5, 14, 23'}</span>
              </div>
              <div className="p-3.5 bg-gray-50 border border-gray-200 rounded-xl">
                <span className="text-[10px] uppercase font-bold text-gray-400 block">{t('luckyGemstoneLabel')}</span>
                <span className="font-semibold text-gray-950 mt-1 block">{getTranslation(luckyGemstones[moolank]) || 'Pearl'}</span>
              </div>
              <div className="p-3.5 bg-gray-50 border border-gray-200 rounded-xl">
                <span className="text-[10px] uppercase font-bold text-gray-400 block">{t('luckyRudrakshaLabel')}</span>
                <span className="font-semibold text-gray-950 mt-1 block">{getTranslation(luckyRudrakshas[moolank]) || '5 Mukhi'}</span>
              </div>
            </div>
          </div>
        </div>
        {renderFooter(19)}
      </div>


      {/* PAGE 20: REMEDIES & CONCLUSION */}
      <div className="pdf-page relative p-12 bg-white flex flex-col justify-between" style={{ height: '297mm', width: '210mm', pageBreakAfter: 'always' }}>
        {renderWatermark()}
        <div>
          {renderHeader(20)}
          <h2 className="font-serif text-2xl font-bold text-gray-900 mb-4">{t('remediesMantraTitle')}</h2>
          <div className="space-y-4 text-xs text-gray-700 leading-relaxed text-justify">
            <div className="p-4 bg-amber-50/20 border border-amber-100 rounded-xl">
              <strong className="text-amber-700 uppercase tracking-wider block text-[10px] mb-2">{t('sacredMantraLabel')}</strong>
              <span className="text-sm font-bold text-gray-950 font-serif block">{specialMantras[moolank] || 'ॐ गुरवे नमः'}</span>
              <p className="text-[10px] text-gray-500 mt-1">{t('sacredMantraDesc')}</p>
            </div>
            <h3 className="font-serif text-base font-bold text-gray-900 mt-6">{t('finalGuidanceTitle')}</h3>
            <p>
              {t('finalGuidanceText')}
            </p>
          </div>
        </div>
        {renderFooter(20)}
      </div>

    </div>
  );
}
