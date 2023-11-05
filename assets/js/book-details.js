const languageCodeToName = {
    af: 'Afrikaans',
    sq: 'Albanian',
    am: 'Amharic',
    ar: 'Arabic',
    hy: 'Armenian',
    az: 'Azerbaijani',
    eu: 'Basque',
    be: 'Belarusian',
    bn: 'Bengali',
    bs: 'Bosnian',
    bg: 'Bulgarian',
    ca: 'Catalan',
    ceb: 'Cebuano',
    ny: 'Chichewa',
    zh: 'Chinese',
    co: 'Corsican',
    hr: 'Croatian',
    cs: 'Czech',
    da: 'Danish',
    nl: 'Dutch',
    en: 'English',
    eo: 'Esperanto',
    et: 'Estonian',
    tl: 'Filipino',
    fi: 'Finnish',
    fr: 'French',
    fy: 'Frisian',
    gl: 'Galician',
    ka: 'Georgian',
    de: 'German',
    el: 'Greek',
    gu: 'Gujarati',
    ht: 'Haitian Creole',
    ha: 'Hausa',
    haw: 'Hawaiian',
    iw: 'Hebrew',
    hi: 'Hindi',
    hmn: 'Hmong',
    hu: 'Hungarian',
    is: 'Icelandic',
    ig: 'Igbo',
    id: 'Indonesian',
    ga: 'Irish',
    it: 'Italian',
    ja: 'Japanese',
    jw: 'Javanese',
    kn: 'Kannada',
    kk: 'Kazakh',
    km: 'Khmer',
    rw: 'Kinyarwanda',
    ko: 'Korean',
    ku: 'Kurdish',
    ky: 'Kyrgyz',
    lo: 'Lao',
    la: 'Latin',
    lv: 'Latvian',
    lt: 'Lithuanian',
    lb: 'Luxembourgish',
    mk: 'Macedonian',
    mg: 'Malagasy',
    ms: 'Malay',
    ml: 'Malayalam',
    mt: 'Maltese',
    mi: 'Maori',
    mr: 'Marathi',
    mn: 'Mongolian',
    my: 'Burmese',
    ne: 'Nepali',
    no: 'Norwegian',
    ps: 'Pashto',
    fa: 'Persian',
    pl: 'Polish',
    pt: 'Portuguese',
    pa: 'Punjabi',
    ro: 'Romanian',
    ru: 'Russian',
    sm: 'Samoan',
    gd: 'Scots Gaelic',
    sr: 'Serbian',
    st: 'Sesotho',
    sn: 'Shona',
    sd: 'Sindhi',
    si: 'Sinhala',
    sk: 'Slovak',
    sl: 'Slovenian',
    so: 'Somali',
    es: 'Spanish',
    su: 'Sundanese',
    sw: 'Swahili',
    sv: 'Swedish',
    tg: 'Tajik',
    ta: 'Tamil',
    te: 'Telugu',
    th: 'Thai',
    tr: 'Turkish',
    uk: 'Ukrainian',
    ur: 'Urdu',
    ug: 'Uyghur',
    uz: 'Uzbek',
    vi: 'Vietnamese',
    cy: 'Welsh',
    xh: 'Xhosa',
    yi: 'Yiddish',
    yo: 'Yoruba',
    zu: 'Zulu',
};

function onlyUnique(value, index, array) {
    return array.indexOf(value) === index;
}
  
function uniqueArray(array) {
    return array.filter(onlyUnique);
}

async function fetchApi(url) {
   const data = await fetch(url);
   return data.json();
}

async function getBook() {
    const userSignIn = sessionStorage.getItem("user-name");
    console.log('userSignIn', userSignIn);
    if (!userSignIn) history.go(-1);
    const searchParams = new URLSearchParams(window.location.search);
    const bookId = searchParams.get('book_id');

    const book = await fetchApi(`https://gutendex.com/books/${bookId}`);
    if (book) {
        document.querySelector('.loading-books').style.display = 'none';
        document.querySelector('#book-detail-content-1').style.display = 'block';
        document.querySelector('#book-detail-content-2').style.display = 'block';
    } 
    console.log('book', book);
    console.log('book.title', book.title);

    const languages = book?.languages?.map(language => languageCodeToName[language]).join(', ');
    const bookshelves = book?.bookshelves?.map(bookshelve => bookshelve).join(', ');
    const genres = book.subjects.map((subject) => {
        if (!subject.includes('--')) {
            return subject.trim();
        }
        if (subject.includes('--')) {
            return subject.split('--')[1].trim();
        }
    });
    document.querySelector('#book-detail-img').src = book.formats['image/jpeg'];;
    document.querySelector('#book-detail-title').textContent = book.title;
    document.querySelector('#book-detail-authors').textContent = book.authors[0]?.name?.trim();
    document.querySelector('#book-detail-languages').textContent = languages;
    document.querySelector('#book-detail-bookshelves').textContent = bookshelves;
    document.querySelector('#book-detail-genres').textContent = uniqueArray(genres).join(', ');
    document.querySelector('#book-detail-btn-read').addEventListener('click', (e) => {
        e.preventDefault();
        window.open(book.formats['text/html'], '_blank');
    });
    document.querySelector('#book-detail-btn-zip').addEventListener('click', (e) => {
        e.preventDefault();
        window.open(book.formats['application/octet-stream']);
    });
    document.querySelector('#book-detail-btn-epub').addEventListener('click', (e) => {
        e.preventDefault();
        window.open(book.formats['application/epub+zip']);
    });
 }

window.onload = getBook;
