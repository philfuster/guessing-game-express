$(document).ready(function () {
  /*
    === Function Defintions ===
  */
  /**
   * Handle Guess Click
   */
  async function guessInputHandler() {
    const guess = $(this).siblings('input').val();
    $(this).siblings('input').val('');
    console.log(`user guess: ${guess}`);
    if (guess.trim() === '') return;
    try {
      const response = await fetch('/guess', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          guess,
        }),
      });
      const result = await response.json();
      const li = $('<li/>');
      console.table(result);
      // if (result.result === 'success') {
      if (result.result === 'success') {
        window.location.replace('/success');
      } else if (result.result === 'too high') {
        li.addClass('highGuess').text(`${guess} too high`).appendTo('ul');
      } else if (result.result === 'too low') {
        li.addClass('lowGuess').text(`${guess} too low`).appendTo('ul');
      }
      const ul = $('ul');
      ul[0].scrollTop = ul[0].scrollHeight;
    } catch (error) {
      console.log(error.stack);
    }
  }
  /**
   * Show Instructions
   */
  function toggleInstructions() {
    $('.instructions').toggle();
    $('#showInstructions').toggle();
  }
  /*
    === Main Logic ===
  */
  $('#guess_input').on('click', guessInputHandler);
  $('#showInstructions').on('click', toggleInstructions);
  $('.instructions').on('click', toggleInstructions);
});
