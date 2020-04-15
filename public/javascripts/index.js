$(document).ready(function () {
  // Function Definitions
  function toggleSection() {
    $('li').toggleClass('section-selected');
    $('section').toggleClass('hidden');
  }
  $('#section-nav ul li').on('click', toggleSection);
});
