(function ($, Drupal) {
  Drupal.behaviors.openaiStuffHelper = {
    attach: function (context) {
      once(
        "openai-stuff-helper",
        '[data-drupal-selector="edit-body-wrapper"]',
        context
      ).forEach((el) => {
        const showThrobber = () => {
          const throbber = document.createElement("div");
          const wrapper = document.querySelector(
            `[data-drupal-selector="edit-body-wrapper"]`
          );
          throbber.classList.add("ajax-progress", "ajax-progress--throbber");
          throbber.innerHTML = `
          <div class="ajax-progress__throbber">
          </div>
          <div class="ajax-progress__message">
          Please wait...</div>`;
          wrapper.parentElement.appendChild(throbber);
        };

        const simulateClick = (element) => {
          const event = new MouseEvent("click", {
            bubbles: true,
            cancelable: true,
            view: window,
          });
          element.dispatchEvent(event);
          showThrobber();
        };

        const buttonElement = document.querySelector(".openai-btn");
        const submitBtn = document.querySelector("#edit-fill-summary");
        submitBtn.classList.add("visually-hidden");
        buttonElement.addEventListener("click", () => {
          simulateClick(submitBtn);
        });

        $(document).ajaxError(function () {
          const throbber = document.querySelector(".ajax-progress");
          throbber.remove();
        });

        $(document).ajaxComplete(function () {
          const throbber = document.querySelector(".ajax-progress");
          throbber.remove();
          const buttonElement = document.querySelector(".openai-btn");
          buttonElement.addEventListener("click", () => {
            simulateClick(submitBtn);
          });
        });
      });
    },
  };
})(jQuery, Drupal);
