// Get main language section elements
// Retrieve all language containers
const arContent = document.getElementById('content-ar');
const enContent = document.getElementById('content-en');
const trContent = document.getElementById('content-tr');

// Get language switcher button elements
// Retrieve button elements from DOM
const btnAr = document.getElementById('btn-ar');
const btnEn = document.getElementById('btn-en');
const btnTr = document.getElementById('btn-tr');

// Handle Arabic button click event
// Show Arabic content and hide others
btnAr.onclick = function () {
arContent.style.display = 'block';
enContent.style.display = 'none';
trContent.style.display = 'none';
};

// Handle English button click event
// Show English content and hide others
btnEn.onclick = function () {
arContent.style.display = 'none';
enContent.style.display = 'block';
trContent.style.display = 'none';
};

// Handle Turkish button click event
// Show Turkish content and hide others
btnTr.onclick = function () {
arContent.style.display = 'none';
enContent.style.display = 'none';
trContent.style.display = 'block';
};

// Toggle content visibility using class switching
// Switch active class on click
document.querySelectorAll('.toggle-title').forEach(title => {
  title.style.cursor = 'pointer';

  title.onclick = function () {
    const content = this.nextElementSibling;
    
    // Toggle the 'active' class on the content box
    content.classList.toggle('active');
  };
});