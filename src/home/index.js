import 'swiper/css';

import gsap from 'gsap';
import Flip from 'gsap/Flip';
import Swiper from 'swiper';
import { Autoplay, Navigation } from 'swiper/modules';

import createLenis from '$utils/createLenis';

function animateExperiences() {
  const experienceElements = document.querySelectorAll('[data-element="experience"]');

  experienceElements.forEach((el) => {
    el.addEventListener('mouseenter', (event) => {
      // First, remove 'is-active' from all elements
      experienceElements.forEach((sibling) => sibling.classList.remove('is-active'));
      // Then, add 'is-active' to the current element
      el.classList.add('is-active');
    });
  });
}

function animateExperienceEls() {
  const experiences = gsap.utils.toArray('.experience_item');
  console.log('🚀 ~ animateExperienceEls ~ experiences:', experiences);

  // Get the width of the open card (the second card in your case).
  //   const openCard = document.querySelector('.method-card_item.is-open');
  //   const openCardWidth = openCard.offsetWidth; // This returns the width in pixels

  // Subtract the total horizontal padding from the open card's width.
  //   const computedStyle = getComputedStyle(openCard);
  //   const paddingLeft = parseFloat(computedStyle.paddingLeft);
  //   const paddingRight = parseFloat(computedStyle.paddingRight);
  //   const totalHorizontalPadding = paddingLeft + paddingRight;

  //   const newWidth = openCardWidth - totalHorizontalPadding;

  // Apply the resulting width to each card's .method-card_content div.
  //   methodsCards.forEach((card) => {
  // const contentDiv = card.querySelector('.method-card_content');
  // contentDiv.style.width = `${newWidth}px`;
  //   });

  experiences.forEach((experience) => {
    const hoverInHandler = () => {
      const content = experience.querySelector('.experience_content');
      const state = Flip.getState('.experiences_component, .experience_item', {
        props: 'opacity, color',
      });

      if (experience.classList.contains('is-active')) {
        console.log('do nothing');
      } else {
        experiences.forEach((exp) => {
          const cont = exp.querySelector('.experience_content');
          exp.classList.remove('is-active');
          cont.classList.remove('is-active');
        });
        experience.classList.add('is-active');
        content.classList.add('is-active');
        console.log('adding');
      }

      Flip.from(
        state,
        {
          duration: 0.5,
          nested: true,
          absolute: '.experience_item',
          //   absolute: true,
          ease: 'power2.out',
        },
        'start'
      );
    };

    const hoverOutHandler = () => {
      const content = experience.querySelector('.experience_content');
      // record the current state
      const state = Flip.getState(
        '.experiences_component, .experience_item, .experience_img, .experience_content'
      );

      // make changes to the classes
      experience.classList.remove('is-active');
      content.classList.remove('show-text');

      // animate back to the recorded state
      const flipTl = Flip.from(state, {
        duration: 0.65,
        nested: true,
        absolute: '.experience_item',
        ease: 'power2.out',
      });
    };

    experience.addEventListener('mouseenter', hoverInHandler);
    // experience.addEventListener('mouseleave', hoverOutHandler);
  });

  //   const container = document.querySelector('.methods_layout');

  //   container.addEventListener('mouseleave', () => {
  //     // Check if any card is being hovered
  //     const hoveredCard = experiences.find((card) => card.classList.contains('is-open'));

  //     if (!hoveredCard) {
  //       // Reset the initial state
  //       // First, record the current state
  //       const state = Flip.getState(
  //         '.layout_grid-4col.is-methods, .methods_layout, .method-card_item, .method-card_content, .method-card_text-wrap'
  //       );

  //       // Remove classes from all cards
  //       experiences.forEach((card) => {
  //         card.classList.remove('is-open');
  //         card.querySelector('.method-card_text-wrap').classList.remove('show-text');
  //         card.querySelector('.card_arrow2').classList.remove('hide-arrow'); // Ensure arrow is visible for all cards
  //       });

  //       // Add classes to the second card
  //       experiences[1].classList.add('is-open');
  //       experiences[1].querySelector('.method-card_text-wrap').classList.add('show-text');

  //       // If you want the arrow on the second card to be hidden by default, add this line
  //       // Otherwise, remove it
  //       experiences[1].querySelector('.card_arrow2').classList.add('hide-arrow');

  //       // Animate back to the recorded state using the Flip plugin
  //       const flipTl = Flip.from(state, {
  //         duration: 0.65,
  //         nested: true,
  //         absolute: '.method-card_item',
  //         ease: 'power1.inOut',
  //       });
  //     }
  //   });
}
function createRoomsSlider() {
  return new Swiper('.rooms_slider', {
    modules: [Navigation, Autoplay],
    slidesPerView: 1,
    slidesPerGroup: 1,
    spaceBetween: 16,
    slideToClickedSlide: true,
    keyboard: true,
    // centeredSlides: true,
    // loop: true,
    grabCursor: true,
    allowTouchMove: true,
    navigation: {
      nextEl: '.is-slider-next',
      prevEl: '.is-slider-prev',
      disabledClass: 'is-disabled',
    },
    speed: 500,
  });
}

window.addEventListener('DOMContentLoaded', () => {
  gsap.registerPlugin(Flip);

  createRoomsSlider();
  createLenis();
  animateExperienceEls();
});
