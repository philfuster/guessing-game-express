$(document).ready(function () {
  /**
   * Handle Guess Click
   */
  function guessInputHandler() {
    const guess = $(this).siblings('input').val();
    $(this).siblings('input').val('');
    console.log(`user guess: ${guess}`);
  }
  $('#guess_input').on('click', guessInputHandler);
});
