var projects = [
  {
    id: 0,
    title: 'Альтерра',
    link: 'http://tg-alterra.ru',
    rate: -32
  },{
    id: 1,
    title: 'Проект',
    link: '/',
    rate: 1
  },{
    id: 2,
    title: 'Проект',
    link: '/',
    rate: -16
  },{
    id: 3,
    title: 'Проект',
    link: '/',
    rate: 9
  },{
    id: 4,
    title: 'Проект',
    link: '/',
    rate: 17
  }
];



Vue.component('project', {
  props: ['title', 'link', 'rate', 'id'],
  computed: {
    rateClass: function() {
      if (this.rate < 0) {
        return 'project_bad'
      } else if (this.rate > 0) {
        return 'project_good'
      };
    }
  },
  methods: {
    changeRate: function(e) {
      var id = this.id,
          project = app.projects.find(function(p) {
            return p.id === id
          });

      if (e.target.classList.contains('arrow_up')) {
        project.rate++;
      } else {
        project.rate--;
      }

    }
  },
  template:
  `
    <li class="project" :class=rateClass>
      <a :href="link" class="project__link" target="_blank"></a>
      <span class="project__title">{{ title }}</span>
      <span class="project__rate">{{ rate }}</span>
      <div class="project__change">
        <button @click="changeRate" class="arrow arrow_up"></button>
        <button @click="changeRate" class="arrow arrow_down"></button>
      </div>
    </li>
  `
})

var app = new Vue({
  el: '#app',

  data: {
    projects: projects,
    formTitle: '',
    formLink: ''
  },

  computed: {
    sortedProjects () {
      return this.projects.sort(function(a, b) {
        return b.rate - a.rate
      })
    },
  },

  methods: {
    addProject () {
      var isError = false,
          fieldErrors = document.querySelectorAll('.form__field_error');

      if (fieldErrors.length > 0) {
        fieldErrors.forEach(function(field) {
          field.classList.remove("form__field_error");
        })
      }

      if (!app.formTitle) {
        document.getElementById('form-title').parentNode.classList.add('form__field_error');
        isError = true;
      }

      if (!app.formLink) {
        document.getElementById('form-link').parentNode.classList.add('form__field_error');
        isError = true;
      }

      if (isError === true) return;

      document.getElementById('form').reset();
      this.projects.push({
        id: this.projects.length,
        title: this.formTitle,
        link: this.formLink,
        rate: 0
      })

      app.formTitle = '';
      app.formLink = '';
    }
  }

});
