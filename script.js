document.addEventListener('DOMContentLoaded', () => {
    const offersSection = document.querySelector('.offers-section');

    if (offersSection) {
        const sliderContainer = offersSection.querySelector('.slider-container');
        const dotsContainer = offersSection.querySelector('.slider-dots');
        const items = offersSection.querySelectorAll('.slider-item');
        const dots = offersSection.querySelectorAll('.dot');
        
        if (items.length > 0 && dots.length > 0) {
            let currentIndex = 1; // Активный элемент изначально второй (индекс 1)

            // Функция для обновления классов и точек
            function updateSlider(newIndex) {
                // Корректировка индекса, чтобы он был в пределах массива
                newIndex = (newIndex % items.length + items.length) % items.length;
                
                // Сброс всех классов
                items.forEach(item => {
                    item.classList.remove('slider-active', 'slider-prev', 'slider-next');
                });
                dots.forEach(dot => {
                    dot.classList.remove('active');
                });

                // Определяем индексы для соседних элементов
                const prevIndex = (newIndex - 1 + items.length) % items.length;
                const nextIndex = (newIndex + 1) % items.length;

                // Присваиваем новые классы
                items[prevIndex].classList.add('slider-prev');
                items[newIndex].classList.add('slider-active');
                items[nextIndex].classList.add('slider-next');
                
                // Активируем точку
                dots[newIndex].classList.add('active');
                currentIndex = newIndex;
            }

            // Добавляем обработчики для точек
            dots.forEach((dot, index) => {
                dot.addEventListener('click', () => {
                    updateSlider(index);
                });
            });

            // Инициализация слайдера
            updateSlider(currentIndex);
            
            // Опционально: Автоматическое переключение слайдов каждые 5 секунд
            // setInterval(() => {
            //     updateSlider(currentIndex + 1);
            // }, 5000);
        }
    }
    
    // =================================================================
    // 2. Логика для Мобильного Меню (заглушка)
    // =================================================================
    const menuToggle = document.querySelector('.menu-toggle');
    const navMenu = document.querySelector('.main-nav-top');

    if (menuToggle && navMenu) {
        menuToggle.addEventListener('click', () => {
            navMenu.classList.toggle('is-open');
            menuToggle.classList.toggle('is-open');
            document.body.classList.toggle('no-scroll'); // Для блокировки прокрутки
        });
    }
});

// Файл: /script.js

document.addEventListener('DOMContentLoaded', () => {
    const sliderContainer = document.querySelector('.slider-container');
    const prevButton = document.querySelector('.slider-control.prev');
    const nextButton = document.querySelector('.slider-control.next');
    const dotsContainer = document.querySelector('.slider-dots');
    
    if (!sliderContainer || !prevButton || !nextButton || !dotsContainer) {
        return; 
    }

    const items = Array.from(sliderContainer.querySelectorAll('.slider-item'));
    const totalItems = items.length;
    let currentIndex = 1; // Устанавливаем индекс 1 (второй элемент) как начальный активный ("Обед с коллегами")

    // =========================================================================
    // ФУНКЦИЯ ОБНОВЛЕНИЯ СЛАЙДЕРА (Логика без циклической прокрутки)
    // =========================================================================
    function updateSlider(newIndex) {
        // Проверка границ: Если индекс выходит за пределы, останавливаемся и выходим
        if (newIndex >= totalItems || newIndex < 0) {
            return;
        }
        
        currentIndex = newIndex;

        items.forEach((item, index) => {
            item.classList.remove('slider-active', 'slider-prev', 'slider-next');

            // 1. Активный элемент (Центр)
            if (index === currentIndex) {
                item.classList.add('slider-active');
            } 
            // 2. Предыдущий элемент (Слева), если он существует
            else if (index === currentIndex - 1) {
                item.classList.add('slider-prev');
            } 
            // 3. Следующий элемент (Справа), если он существует
            else if (index === currentIndex + 1) {
                item.classList.add('slider-next');
            }
            
            // АГРЕССИВНО СКРЫВАЕМ НЕВИДИМЫЕ ЭЛЕМЕНТЫ (4-й и далее)
            if (!item.classList.contains('slider-active') && !item.classList.contains('slider-prev') && !item.classList.contains('slider-next')) {
                item.style.opacity = '0';
                item.style.transform = 'scale(0.5)';
                // Дополнительное скрытие: смещаем невидимый элемент за пределы видимости
                item.style.position = 'absolute'; 
                item.style.visibility = 'hidden'; 
            } else {
                 // Возвращаем стили для видимых элементов
                item.style.opacity = '';
                item.style.transform = '';
                item.style.position = '';
                item.style.visibility = '';
            }
        });

        // Обновляем индикаторы (точки)
        updateDots();
        
        // ОБНОВЛЕНИЕ СОСТОЯНИЯ КНОПОК
        prevButton.disabled = currentIndex === 0; // Отключаем Prev на первом элементе
        nextButton.disabled = currentIndex === totalItems - 1; // Отключаем Next на последнем элементе
    }
    
    function updateDots() {
        dotsContainer.innerHTML = '';
        items.forEach((_, index) => {
            // Создаем span для точки
            const dot = document.createElement('span');
            dot.classList.add('dot');
            if (index === currentIndex) {
                dot.classList.add('active');
            }
            dotsContainer.appendChild(dot);
        });
    }
    function copyAssets() {
    return gulp.src('src/images/**/*')
        .pipe(gulp.dest('dist/assets/images'));
    }
    prevButton.addEventListener('click', () => {
        updateSlider(currentIndex - 1);
    });

    nextButton.addEventListener('click', () => {
        updateSlider(currentIndex + 1);
    });

    updateSlider(currentIndex); 
});