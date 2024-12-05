const groupLabel = document.getElementById('group-label');
const weekLabel = document.getElementById('week-label');
const dayLabel = document.getElementById('day-label');
const scheduleContainer = document.getElementById('schedule');


let week = 1; // Текущая неделя
let day = 1;  // Текущий день
let group = 1; // Текущая группа

// Максимальные значения
const maxWeek = 52;
const minWeek = 1;
const maxDay = 7;
const minDay = 1;
const maxGroup = 3;
const minGroup = 1;

// Расписание (структура: Неделя -> День -> Группа -> Занятия)
const schedules = {
    1: { // Неделя 1
        1: { // День 1 (Пн)
            1: [ // Группа 1
                { time: '9:10-10:40', subject: 'Мдк 04.01', teacher: 'Иванов И.И.' },
                { time: '10:50-12:20', subject: 'Мдк 04.02', teacher: 'Петрова Е.А.' },
                { time: '12:50-14:20', subject: 'Мдк 04.03', teacher: 'Сидоров С.С.' },
                { time: '14:30-16:00', subject: 'Химия', teacher: 'Васильев А.А.' },
                { time: '16:10-17:40', subject: 'Физика', teacher: 'Кузнецов В.В.' },
                { time: '17:50-19:20', subject: 'Литература', teacher: 'Новикова Н.Н.' },
            ],
            2: [
                { time: '9:10-10:40', subject: 'Физика', teacher: 'Кузнецов В.В.' },
                { time: '10:50-12:20', subject: 'Математика', teacher: 'Лебедев А.А.' },
                { time: '12:50-14:20', subject: 'Информатика', teacher: 'Новикова Н.Н.' },
                { time: '14:30-16:00', subject: 'Философия', teacher: 'Смирнова Л.Л.' },
                { time: '16:10-17:40', subject: 'Иностранный язык', teacher: 'Павлова М.М.' },
                { time: '17:50-19:20', subject: 'Астрономия', teacher: 'Орлова И.И.' },
            ],
            3: [
                { time: '9:10-10:40', subject: 'История', teacher: 'Смирнов О.О.' },
                { time: '10:50-12:20', subject: 'География', teacher: 'Федоров Д.Д.' },
                { time: '12:50-14:20', subject: 'Литература', teacher: 'Алексеева И.И.' },
                { time: '14:30-16:00', subject: 'Биология', teacher: 'Громов Р.Р.' },
                { time: '16:10-17:40', subject: 'Экономика', teacher: 'Захаров А.А.' },
                { time: '17:50-19:20', subject: 'Право', teacher: 'Тихонов В.В.' },
            ],
        },
        2: { // День 2 (Вт)
            1: [
                { time: '9:10-10:40', subject: 'Программирование', teacher: 'Тихонов П.П.' },
                { time: '10:50-12:20', subject: 'Английский язык', teacher: 'Соколова В.В.' },
                { time: '12:50-14:20', subject: 'Мдк 04.04', teacher: 'Гришина А.А.' },
                { time: '14:30-16:00', subject: 'Философия', teacher: 'Орлова В.В.' },
                { time: '16:10-17:40', subject: 'Физкультура', teacher: 'Лебедев С.С.' },
                { time: '17:50-19:20', subject: 'Алгебра', teacher: 'Сергеев К.К.' },
            ],
            // Другие группы...
        },
        // Добавьте аналогичные пары для других дней недели...
    },
    // Другие недели...
};
// Обновление меток
function updateLabels() {
    weekLabel.textContent = `Неделя: ${week}`;
    dayLabel.textContent = `День недели: ${day} (${['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'][(day - 1) % 7]})`;
    groupLabel.textContent = `Группа: ${group}`;
}

// Обновление расписания
function updateSchedule() {
    scheduleContainer.innerHTML = ''; // Очистка контейнера
    const currentSchedule = schedules[week]?.[day]?.[group] || [];
    currentSchedule.forEach((slot, index) => {
        const listItem = document.createElement('div');
        listItem.className = 'list-group-item d-flex justify-content-between align-items-center';
        listItem.setAttribute('data-slot', index + 1); // Указываем номер пары
        listItem.innerHTML = `
      <div>
        <span class="fw-bold">${index + 1} Пара</span> <!-- Добавляем нумерацию -->
        <span class="fw-bold ms-2">${slot.time}</span>
        <span class="d-block">${slot.subject}</span>
        <span class="text-muted">Преподаватель: ${slot.teacher}</span>
      </div>
      <button class="btn btn-light edit">⋮</button>
    `;
        scheduleContainer.appendChild(listItem);

        // Добавляем обработчик редактирования
        listItem.querySelector('.edit').addEventListener('click', () => {
            const newSubject = prompt('Введите новое название предмета:', slot.subject);
            const newTeacher = prompt('Введите имя нового преподавателя:', slot.teacher);
            if (newSubject) slot.subject = newSubject;
            if (newTeacher) slot.teacher = newTeacher;
            updateSchedule(); // Перерисовываем расписание
        });
    });
}
// Функция для получения расписания преподавателя

// Функция для отображения расписания преподавателя
// Функция для получения расписания преподавателя с учётом фильтров
function getTeacherSchedule(teacherName, weekFilter = [], dayFilter = []) {
    const teacherSchedule = [];

    // Проход по неделям
    for (const week in schedules) {
        if (weekFilter.length > 0 && !weekFilter.includes(parseInt(week))) {
            continue; // Пропускаем недели, не входящие в фильтр
        }

        for (const day in schedules[week]) {
            if (dayFilter.length > 0 && !dayFilter.includes(parseInt(day))) {
                continue; // Пропускаем дни, не входящие в фильтр
            }

            for (const group in schedules[week][day]) {
                schedules[week][day][group].forEach((pair, index) => {
                    if (pair.teacher.toLowerCase() === teacherName.toLowerCase()) {
                        teacherSchedule.push({
                            week: parseInt(week),
                            day: parseInt(day),
                            group: parseInt(group),
                            pairNumber: index + 1,
                            time: pair.time,
                            subject: pair.subject,
                        });
                    }
                });
            }
        }
    }

    return teacherSchedule;
}


// Функция для отображения расписания преподавателя
function displayTeacherSchedule(teacherName) {
    const weekInput = document.getElementById('week-filter').value.trim();
    const dayInput = document.getElementById('day-filter').value.trim();

    const weekFilter = weekInput
        ? weekInput.split(',').map((num) => parseInt(num.trim()))
        : [];
    const dayFilter = dayInput
        ? dayInput.split(',').map((num) => parseInt(num.trim()))
        : [];

    const scheduleForTeacher = getTeacherSchedule(teacherName, weekFilter, dayFilter);
    const scheduleContainer = document.getElementById('teacher-schedule');
    scheduleContainer.innerHTML = ''; // Очищаем старые результаты

    if (scheduleForTeacher.length === 0) {
        scheduleContainer.innerHTML = `<div class="alert alert-warning">Для преподавателя ${teacherName} расписание не найдено.</div>`;
        return;
    }

    const resultList = document.createElement('div');
    resultList.classList.add('list-group');

    scheduleForTeacher.forEach((entry) => {
        const listItem = document.createElement('div');
        listItem.className = 'list-group-item';
        listItem.innerHTML = `
            <div>
                <strong>Неделя:</strong> ${entry.week} | 
                <strong>День:</strong> ${entry.day} (${['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'][(entry.day - 1) % 7]}) | 
                <strong>Группа:</strong> ${entry.group} | 
                <strong>Пара:</strong> ${entry.pairNumber} | 
                <strong>Время:</strong> ${entry.time} | 
                <strong>Предмет:</strong> ${entry.subject}
            </div>
        `;
        resultList.appendChild(listItem);
    });

    scheduleContainer.appendChild(resultList);
}

// Обработчик для кнопки "Найти расписание"
document.getElementById('search-teacher').addEventListener('click', () => {
    const teacherName = document.getElementById('teacher-name').value.trim();
    if (teacherName === '') {
        alert('Введите фамилию преподавателя.');
        return;
    }
    displayTeacherSchedule(teacherName);
});


document.getElementById("customEventForm").addEventListener("submit", function(event) {
    event.preventDefault();

    const week = parseInt(document.getElementById("eventWeek").value);
    const day = parseInt(document.getElementById("eventDay").value);
    const group = parseInt(document.getElementById("eventGroup").value);
    const startTime = document.getElementById("eventStartTime").value;
    const endTime = document.getElementById("eventEndTime").value;
    const type = document.getElementById("eventType").value;

    addCustomEvent(week, day, startTime, endTime, group, type);

    alert("Событие добавлено!");
});


// Обработчики переключения недель
document.getElementById('prev-week').addEventListener('click', () => {
    if (week > minWeek) {
        week--;
        updateLabels();
        updateSchedule();
    }
});

document.getElementById('next-week').addEventListener('click', () => {
    if (week < maxWeek) {
        week++;
        updateLabels();
        updateSchedule();
    }
});

// Обработчики переключения дней
document.getElementById('prev-day').addEventListener('click', () => {
    if (day > minDay) {
        day--;
        updateLabels();
        updateSchedule();
    }
});

document.getElementById('next-day').addEventListener('click', () => {
    if (day < maxDay) {
        day++;
        updateLabels();
        updateSchedule();
    }
});

// Обработчики переключения групп
document.getElementById('prev-group').addEventListener('click', () => {
    if (group > minGroup) {
        group--;
        updateLabels();
        updateSchedule();
    }
});

document.getElementById('next-group').addEventListener('click', () => {
    if (group < maxGroup) {
        group++;
        updateLabels();
        updateSchedule();
    }
});

// Инициализация
updateLabels();
updateSchedule();