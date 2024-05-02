'use strict';

document.addEventListener('DOMContentLoaded', function () {
    const items = document.querySelectorAll('.js--item');
    const prevBtn = document.querySelector('.js--slider__prev');
    const nextBtn = document.querySelector('.js--slider__next');
    const dotsContainer = document.querySelector('.dots-container');
    let index = 0;

    function updateDots() {
        dotsContainer.innerHTML = '';
        items.forEach((element, i) => {
            const dot = document.createElement('li');
            dot.classList.add('dot');
            dot.addEventListener('click', () => {
                showSlide(i);
            });
            dotsContainer.appendChild(dot);
            if (i === index) {
                dot.classList.add('active');
            }
        });
    }

    function showSlide(n) {
        items.forEach(item => item.classList.remove('active'));
        items[n].classList.add('active');
        index = n;
        updateDots();
        if (index === 0) {
            prevBtn.style.display = 'none';
            nextBtn.style.display = 'flex';
        } else if (index === items.length - 1) {
            prevBtn.style.display = 'flex';
            nextBtn.style.display = 'none';
        } else {
            prevBtn.style.display = 'flex';
            nextBtn.style.display = 'flex';
        }
    }

    nextBtn.addEventListener('click', function () {
        if (index < items.length - 1) {
            showSlide(index + 1);
        }
    });

    prevBtn.addEventListener('click', function () {
        if (index > 0) {
            showSlide(index - 1);
        }
    });

    showSlide(0);
    updateDots();
});