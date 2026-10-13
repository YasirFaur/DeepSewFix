let rate_of_speach = 0.7;

const T = {
  en: {
    intro1: 'Board-level repair for industrial sewing machine controllers: <strong>Zoje, Siruba, Sunsir, Brother, Baoyu, Jack, Yuki and more</strong>.',
    intro2: 'Every diagnosis is supported by reference measurements from healthy boards, so faults are found faster and fixed right, even on boards with no public documentation.',
    note: 'Repair reports are delivered in English.'
  },
  ar: {
    intro1: 'إصلاح على مستوى العناصر الإلكترونية للوحات تحكم ماكينات الخياطة الصناعية: <strong>Zoje, Siruba, Sunsir, Brother, Baoyu, Jack, Yuki وغيرها</strong>.',
    intro2: 'كل تشخيص مدعوم بقياسات مرجعية من لوحات سليمة، لتسريع عمليتي التشخيص والمعالجة، حتى في اللوحات التي لا توجد لها وثائق فنية متاحة.',
    note: 'تُسلَّم تقارير الإصلاح باللغة الإنجليزية.'
  },
  tr: {
    intro1: 'Endüstriyel dikiş makinesi kontrol kartları için komponent seviyesinde onarım: <strong>Zoje, Siruba, Sunsir, Brother, Baoyu, Jack, Yuki ve diğerleri</strong>.',
    intro2: 'Her teşhis, sağlam kartlardan alınan referans ölçümlerle desteklenir; böylece arızalar daha hızlı bulunur ve doğru şekilde giderilir, kamuya açık dokümantasyonu olmayan kartlarda bile.',
    note: 'Onarım raporları İngilizce olarak teslim edilir.'
  }
};

function setLang(lang) {
  if (!T[lang]) lang = 'en';

  document.querySelectorAll('.site-intro [data-i18n]').forEach(el => {
    el.innerHTML = T[lang][el.dataset.i18n];
    el.lang = lang;
    el.dir = lang === 'ar' ? 'rtl' : 'ltr';
  });

  document.querySelectorAll('.lang-switch button').forEach(b =>
    b.classList.toggle('active', b.dataset.lang === lang));

  try { localStorage.setItem('lang', lang); } catch (e) {}
}

document.querySelectorAll('.lang-switch button').forEach(b =>
  b.addEventListener('click', () => setLang(b.dataset.lang)));

let saved = 'en';
try { saved = localStorage.getItem('lang') || 'en'; } catch (e) {}
setLang(saved);

// Function to sort the terms list alphabetically
function initTermsListSorting() {
    const termsList = document.getElementById("terms-list");
    if (!termsList) return;

    const items = Array.from(termsList.getElementsByTagName("li"));
    items.sort((a, b) => a.textContent.trim().localeCompare(b.textContent.trim()));

    termsList.innerHTML = "";
    items.forEach(item => termsList.appendChild(item));
}

// Function to handle index page search input in real-time
function initSearchLogic() {
    const searchInput = document.getElementById("search-input");
    if (!searchInput) return;

    // Trigger search on every input change (typing or deleting)
    searchInput.addEventListener("input", () => {
        const query = searchInput.value.toLowerCase().trim();
        const items = document.querySelectorAll("#terms-list li");

        items.forEach(item => {
            const text = item.textContent.toLowerCase();
            item.style.display = text.includes(query) ? "" : "none";
        });
    });
}

// Function to update the total count of terms
function initTermCounter() {
    const totalTerms = document.querySelectorAll('ol li').length;
    const countElement = document.getElementById('term-count');
    
    if (countElement) {
        countElement.textContent = `[ ${totalTerms} ]`;
    }
}

// Function to handle global text-to-speech button
function initSpeechSynthesis() {
    const speakBtn = document.getElementById('speak-btn');
    const overviewText = document.querySelector('.term-overview');

    if (speakBtn && overviewText && 'speechSynthesis' in window) {
        let utterance = new SpeechSynthesisUtterance();
        utterance.lang = 'en-US';
        

        speakBtn.addEventListener('click', () => {
            if (window.speechSynthesis.speaking) {
                window.speechSynthesis.cancel();
                speakBtn.innerText = '[ 🔊 Listen ]';
            } else {
                utterance.text = overviewText.innerText;
                
                utterance.onend = () => { speakBtn.innerText = '[ 🔊 Listen ]'; };
                utterance.onerror = () => { speakBtn.innerText = '[ 🔊 Listen ]'; };

                utterance.rate = rate_of_speach;
                window.speechSynthesis.speak(utterance);
                speakBtn.innerText = '[ ⏹️ Stop ]';
            }
        });
    }
}

// Function to setup global search shortcuts
function initSearchShortcuts() {
    document.addEventListener('keydown', (event) => {
        const searchInput = document.getElementById('search-input');
        if (!searchInput) return;

        // Focus search input on '/' key press
        if (event.key === '/' && document.activeElement !== searchInput) {
            event.preventDefault(); // Prevent typing '/' inside input
            searchInput.focus();
        }

        // Focus search input on Ctrl+K or Cmd+K key press
        if ((event.ctrlKey || event.metaKey) && event.code === 'KeyK') {
            event.preventDefault(); 
            searchInput.focus();
            searchInput.select();   
        }
    });
}



//Function to disable right click, shortcuts, copy, selection, and paste
function preventInspection() {
    // Disable right click globally
    document.addEventListener("contextmenu", (e) => e.preventDefault());

    // Disable copy, cut, and drop globally
    document.addEventListener("copy", (e) => e.preventDefault());
    document.addEventListener("cut", (e) => e.preventDefault());
    document.addEventListener("drop", (e) => e.preventDefault());

    // Block paste globally in the capture phase (works for dynamic/hidden inputs)
    document.addEventListener("paste", (e) => {
        e.preventDefault();
        return false;
    }, true);

    // Disable text selection outside inputs
    document.addEventListener("selectstart", (e) => {
        if (e.target.tagName !== "INPUT" && e.target.tagName !== "TEXTAREA") {
            e.preventDefault();
        }
    });

    // Block keyboard shortcuts (Ctrl+V, Ctrl+U, F12)
    document.addEventListener("keydown", (e) => {
        const key = e.key.toLowerCase();
        if (
            key === "f12" ||
            (e.ctrlKey && e.shiftKey && (key === "i" || key === "j" || key === "c")) ||
            (e.ctrlKey && (key === "u" || key === "v" || key === "p"))
        ) {
            e.preventDefault();
        }
    });
}



// Function to append copyright and verify author name
function initApp() {
    // Create and attach copyright notice
    const copyrightParagraph = document.createElement("p");
    copyrightParagraph.className = "copyright";
    copyrightParagraph.innerHTML = 'Created by <span class="designer-name">Yasir Faur</span>, all rights reserved © 2026';

    const footer = document.querySelector("footer");
    if (footer) {
        footer.insertAdjacentElement("afterend", copyrightParagraph);
    } else {
        document.body.appendChild(copyrightParagraph);
    }

    // Check if element or author name is removed/modified
    setInterval(() => {
        const copyrightElem = document.querySelector(".copyright");
        const designerNameElem = document.querySelector(".designer-name");

        // Verify both element existence and exact designer name text
        if (!copyrightElem || !designerNameElem || designerNameElem.textContent.trim() !== "Yasir Faur") {
            // Break page functionality if copyright or name is deleted/altered
            document.body.innerHTML = "";
            alert("Unauthorized copy detected.");
        }
    }, 3000);
}

//Function to disable context menu, shortcuts, copying, and selection
function preventInspection() {
    // Disable right click
    document.addEventListener("contextmenu", (e) => e.preventDefault());

    // Disable selection and copy events
    document.addEventListener("copy", (e) => e.preventDefault());
    document.addEventListener("cut", (e) => e.preventDefault());
    document.addEventListener("selectstart", (e) => {
        // Allow selection inside input elements only
        if (e.target.tagName !== "INPUT" && e.target.tagName !== "TEXTAREA") {
            e.preventDefault();
        }
    });

    // Disable F12 and inspect key combinations
    document.addEventListener("keydown", (e) => {
        if (
            e.key === "F12" ||
            (e.ctrlKey && e.shiftKey && (e.key === "I" || e.key === "J" || e.key === "C")) ||
            (e.ctrlKey && e.key === "U")
        ) {
            e.preventDefault();
        }
    });
}

// Function to handle terms list auto scroll
function initTermsListAutoScroll() {
    // Get list element
    const termsList = document.getElementById('terms-list');
    if (!termsList) return;

    let scrollInterval = null;

    // Start auto scroll logic
    const startAutoScroll = () => {
        if (scrollInterval) return;
        scrollInterval = setInterval(() => {
            // Check scroll reach end point accurately
            const isAtBottom = Math.ceil(termsList.scrollTop + termsList.clientHeight) >= termsList.scrollHeight;
            
            if (isAtBottom) {
                // Reset smoothly to top
                termsList.scrollTop = 0;
            } else {
                // Increment scroll position
                termsList.scrollTop += 1;
            }
        }, 40);
    };

    // Stop auto scroll logic
    const stopAutoScroll = () => {
        clearInterval(scrollInterval);
        scrollInterval = null;
    };

    // Begin scrolling
    startAutoScroll();

    // Event listeners for user interaction
    termsList.addEventListener('mouseenter', stopAutoScroll);
    termsList.addEventListener('mouseleave', startAutoScroll);
    termsList.addEventListener('touchstart', stopAutoScroll, { passive: true });
    termsList.addEventListener('touchend', startAutoScroll, { passive: true });
}



// Main event handler to initialize all functions
document.addEventListener("DOMContentLoaded", () => {
    // 1. Initialize core feature systems
    //try { initSpeechRateControl(); } catch (e) { console.error(e); }
    try { initTermsListSorting(); } catch (e) { console.error(e); }
    try { initSearchLogic(); } catch (e) { console.error(e); }
    try { initTermCounter(); } catch (e) { console.error(e); }
    try { initSpeechSynthesis(); } catch (e) { console.error(e); }
    try { initSearchShortcuts(); } catch (e) { console.error(e); }

    // 2. Initialize copyright & integrity checks
    try { initApp(); } catch (e) { console.error(e); }

    // 3. Apply inspection protection last
    //try { preventInspection(); } catch (e) { console.error(e); }

    try { initTermsListAutoScroll(); } catch (e) { console.error(e); }


});