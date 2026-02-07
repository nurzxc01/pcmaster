// 1. Инициализация иконок Lucide
lucide.createIcons();

// 2. Слайдер "До и После"
function moveSlider(e) {
    const sliderValue = e.value;
    const container = e.parentElement;
    const afterImg = container.querySelector('.after-img');
    const sliderLine = container.querySelector('.slider-line');
    const sliderBtn = container.querySelector('.slider-button');

    afterImg.style.clipPath = `inset(0 ${100 - sliderValue}% 0 0)`;
    sliderLine.style.left = `${sliderValue}%`;
    sliderBtn.style.left = `${sliderValue}%`;
}

// 3. Переключение вкладок Прайс-листа
function openTab(evt, tabName) {
    const tabContents = document.querySelectorAll(".tab-content");
    tabContents.forEach(content => content.classList.remove("active"));

    const tabButtons = document.querySelectorAll(".tab-btn");
    tabButtons.forEach(btn => btn.classList.remove("active"));

    document.getElementById(tabName).classList.add("active");
    evt.currentTarget.classList.add("active");
}

// 4. Умный калькулятор сборки
function calculate() {
    const typePrice = parseInt(document.getElementById('type').value);
    const rgbPrice = document.getElementById('rgb').checked ? 5000 : 0;
    const coolingPrice = document.getElementById('cooling').checked ? 10000 : 0;
    const urgencyLevel = parseInt(document.getElementById('urgency').value);

    // Коэффициент за срочность
    const urgencyMultiplier = [1, 1, 1.25, 1.6][urgencyLevel];

    const finalTotal = Math.floor((typePrice + rgbPrice + coolingPrice) * urgencyMultiplier);

    // Анимированная смена числа
    animateNumber('res-price', finalTotal);
}

function animateNumber(id, target) {
    const element = document.getElementById(id);
    let current = parseInt(element.innerText.replace(/\s/g, '')) || 0;
    const step = Math.ceil(Math.abs(target - current) / 20);
    
    const update = () => {
        if (current < target) {
            current += step;
            if (current > target) current = target;
        } else if (current > target) {
            current -= step;
            if (current < target) current = target;
        }
        
        element.innerText = current.toLocaleString();
        
        if (current !== target) {
            requestAnimationFrame(update);
        }
    };
    update();
}

// 5. Анимация появления при скролле (Intersection Observer)
const observerOptions = { threshold: 0.2 };
const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
        }
    });
}, observerOptions);

document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

// Запуск начального расчета
calculate();