// Функционал для слайдера
const slides = document.querySelectorAll('.slide');
const prevBtn = document.querySelector('.slider-btn.prev');
const nextBtn = document.querySelector('.slider-btn.next');
let currentSlide = 0;

function showSlide(index) {
    slides.forEach((slide, i) => {
        slide.classList.remove('active');
        if (i === index) {
            slide.classList.add('active');
        }
    });
}

function nextSlide() {
    currentSlide = (currentSlide + 1) % slides.length;
    showSlide(currentSlide);
}

function prevSlide() {
    currentSlide = (currentSlide - 1 + slides.length) % slides.length;
    showSlide(currentSlide);
}

nextBtn.addEventListener('click', nextSlide);
prevBtn.addEventListener('click', prevSlide);

// Автоматическое переключение слайдов (опционально)
setInterval(nextSlide, 5000);


function redirectToMoreProducts() {
    window.location.href = '/html/catalog.html';
}

function redirectToHome() {
    window.location.href = 'index.html';
}


  // Функция для проверки значения с помощью регулярного выражения
  function validateInput(value, regex) {
    return regex.test(value); // Возвращает true, если значение соответствует регулярному выражению
}

// Функция для защиты от инъекций: экранирует специальные символы
function sanitizeInput(value) {
    const element = document.createElement('div'); // Создаем временный элемент
    element.innerText = value; // Устанавливаем текстовое значение
    return element.innerHTML; // Возвращаем безопасный HTML
}

// Главная функция отправки формы
function submitForm() {
    // Получаем значения полей формы
    const name = document.getElementById('name');
    const email = document.getElementById('email');
    const phone = document.getElementById('phone');
    const message = document.getElementById('message');

    // Получаем элементы для отображения ошибок
    const nameError = document.getElementById('nameError');
    const emailError = document.getElementById('emailError');
    const phoneError = document.getElementById('phoneError');
    const messageError = document.getElementById('messageError');

    let isValid = true; // Флаг, показывающий, что форма валидна

    // Сбрасываем предыдущие сообщения об ошибках
    nameError.textContent = '';
    emailError.textContent = '';
    phoneError.textContent = '';
    messageError.textContent = '';

    // Проверка имени: поле не должно быть пустым
    if (!name.value.trim()) {
        nameError.textContent = 'Поле имя обязательно для заполнения.';
        isValid = false; // Устанавливаем флаг, что форма невалидна
    } else {
        name.value = sanitizeInput(name.value); // Очищаем ввод
    }

    // Проверка email: используется регулярное выражение
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Регулярное выражение для проверки email
    if (!validateInput(email.value, emailRegex)) {
        emailError.textContent = 'Введите корректный email.';
        isValid = false;
    } else {
        email.value = sanitizeInput(email.value);
    }

    // Проверка телефона: допустимы только цифры и знак "+"
    const phoneRegex = /^\+?\d{10,15}$/; // Регулярное выражение для проверки телефона
    if (!validateInput(phone.value, phoneRegex)) {
        phoneError.textContent = 'Введите корректный номер телефона.';
        isValid = false;
    } else {
        phone.value = sanitizeInput(phone.value);
    }

    // Проверка сообщения: поле не должно быть пустым
    if (!message.value.trim()) {
        messageError.textContent = 'Поле сообщение обязательно для заполнения.';
        isValid = false;
    } else {
        message.value = sanitizeInput(message.value);
    }

    // Если форма валидна, отправляем данные
    if (isValid) {
        const formData = {
            name: name.value, // Имя пользователя
            email: email.value, // Email пользователя
            phone: phone.value, // Телефон пользователя
            message: message.value // Сообщение пользователя
        };

        console.log('Отправка данных на сервер:', formData); // Выводим данные в консоль

        // Имитируем отправку данных на сервер
        alert('Ваше сообщение отправлено!');

        // Сбрасываем форму после отправки
        document.getElementById('contactForm').reset();
    }
}