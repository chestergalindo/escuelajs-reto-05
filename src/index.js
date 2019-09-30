const $app = document.getElementById('app');
const $observe = document.getElementById('observe');
const API = 'https://rickandmortyapi.com/api/character/';
const storage = window.localStorage

const getData = api => {
  fetch(api)
    .then(response => response.json())
    .then(response => {
      const characters = response.results;
      let output = characters.map(character => {
        return `
      <article class="Card">
        <img src="${character.image}" />
        <h2>${character.name}<span>${character.species}</span></h2>
      </article>
    `
      }).join('');
      let newItem = document.createElement('section');
      newItem.classList.add('Items');
      newItem.innerHTML = output;
      $app.appendChild(newItem);
      let next = response.info.next
      console.log(next)
    })
    .catch(error => console.log(error));
}

const next_fetch = api => {
  fetch(api)
    .then(response => response.json())
    .then(response => {
      localStorage.setItem('next_fetch', response.info.next)
      if (storage.getItem('next_fetch')) {
        console.log(storage.getItem('next_fetch'))
      }
    })
    .catch (error => console.log(error))
  }

const loadData = async () => {
    if (storage.getItem('next_fetch')){
      await getData(API)
    }
}

const intersectionObserver = new IntersectionObserver(entries => {
  if (entries[0].isIntersecting) {
    loadData();
  }
}, {
  rootMargin: '0px 0px 100% 0px',
});

intersectionObserver.observe($observe);