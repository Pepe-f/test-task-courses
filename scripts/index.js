const categories = [
  { id: 'all', label: 'All' },
  { id: 'marketing', label: 'Marketing' },
  { id: 'management', label: 'Management' },
  { id: 'hr', label: 'HR & Recruiting' },
  { id: 'design', label: 'Design' },
  { id: 'development', label: 'Development' },
];

const courses = [
  {
    title: 'The Ultimate Google Ads Training Course',
    category: 'marketing',
    price: 100,
    author: 'Jerome Bell',
    img: './assets/course-1.png',
  },
  {
    title: 'Product Management Fundamentals',
    category: 'management',
    price: 480,
    author: 'Marvin McKinney',
    img: './assets/course-2.png',
  },
  {
    title: 'HR Management and Analytics',
    category: 'hr',
    price: 200,
    author: 'Leslie Alexander Li',
    img: './assets/course-3.png',
  },
  {
    title: 'Brand Management & PR Communications',
    category: 'marketing',
    price: 530,
    author: 'Kristin Watson',
    img: './assets/course-4.png',
  },
  {
    title: 'Graphic Design Basic',
    category: 'design',
    price: 500,
    author: 'Guy Hawkins',
    img: './assets/course-5.png',
  },
  {
    title: 'Business Development Management',
    category: 'management',
    price: 400,
    author: 'Dianne Russell',
    img: './assets/course-6.png',
  },
  {
    title: 'Highload Software Architecture',
    category: 'development',
    price: 600,
    author: 'Brooklyn Simmons',
    img: './assets/course-7.png',
  },
  {
    title: 'Human Resources – Selection and Recruitment',
    category: 'hr',
    price: 150,
    author: 'Kathryn Murphy',
    img: './assets/course-8.png',
  },
  {
    title: 'User Experience. Human-centered Design',
    category: 'design',
    price: 240,
    author: 'Cody Fisher',
    img: './assets/course-9.png',
  },
];

const mapCategoryToColor = {
  marketing: 'green',
  management: 'blue',
  hr: 'orange',
  design: 'pink',
  development: 'blue2',
};

const searchInput = document.getElementById('search');
const filtersNav = document.getElementById('filters');
const coursesGrid = document.getElementById('courses');

function renderFilters() {
  let filters = '';

  categories.forEach((category) => {
    filters += `
      <button
        class="filters__btn ${
          category.id === 'all' ? 'filters__btn--active' : ''
        }" 
        data-category="${category.id}"
      >
        ${category.label}
        <span>
          ${
            category.id === 'all'
              ? courses.length
              : courses.reduce(
                  (acc, item) =>
                    item.category === category.id ? acc + 1 : acc,
                  0
                )
          }
        </span>
      </button>
    `;
  });

  filtersNav.innerHTML = filters;
}

function renderCourses(list) {
  let cards = '';

  list.forEach((item) => {
    cards += `
      <article class="course-card">
        <img
          class="course-card__img"
          src="${item.img}"
          alt="Course ${item.title} image"
          data-category="${item.category}"
        />
        <div class="course-card__body">
          <span class="course-card__tag course-card__tag--${
            mapCategoryToColor[item.category]
          }">
            ${
              categories.find((category) => category.id === item.category)
                ?.label
            }
          </span>
          <h3 class="course-card__title">
            ${item.title}
          </h3>
          <div class="course-card__content">
            <p class="course-card__price">$${item.price}</p>
            <div class="course-card__divider"></div>
            <p class="course-card__author">by ${item.author}</p>
          </div>
        </div>
      </article>
    `;
  });

  coursesGrid.innerHTML = cards;
}

function applyFilters() {
  const query = searchInput.value.trim().toLowerCase();
  const activeBtn = document.querySelector('.filters__btn--active');
  const activeCategory = activeBtn.dataset.category;

  const filtered = courses.filter((course) => {
    const matchesSearch = course.title.toLowerCase().includes(query);
    const matchesCategory =
      activeCategory === 'all' || course.category === activeCategory;

    return matchesSearch && matchesCategory;
  });

  renderCourses(filtered);
}

function initEvents() {
  filtersNav.addEventListener('click', (e) => {
    if (!e.target.classList.contains('filters__btn')) return;

    document
      .querySelectorAll('.filters__btn')
      .forEach((btn) => btn.classList.remove('filters__btn--active'));

    e.target.classList.add('filters__btn--active');

    applyFilters();
  });

  searchInput.addEventListener('input', applyFilters);
}

function app() {
  renderFilters();
  renderCourses(courses);
  initEvents();
}

app();
