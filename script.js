const input = document.querySelector('.container__input');
const searched = document.querySelector('.container__searched');
const saved = document.querySelector('.container__saved');

async function getRepo(event) {
    try {
        const response = await fetch(`https://api.github.com/search/repositories?q=${event.target.value}&per_page=5`);

        const json = await response.json()
        const items = json.items

        deleteSearched()

        items.forEach(item => {
            addSearched(item)
        })

        console.log(items);

    } catch(error) {
        console.log(error);
    }
}

function addSearched(element) {
    const item = document.createElement('li');
    item.classList.add('container__searched-item');
    item.textContent = element.name;
    searched.appendChild(item);

    item.addEventListener('click', function(event) {
        addSaved(element);
        input.value = '';
        deleteSearched();
    })
}

function addSaved(item) {
    const repo = document.createElement('li')
    repo.classList.add('container__select')

    const nameRepo = document.createElement('p')
    nameRepo.textContent = `Name: ${item.name}`

    const ownerRepo = document.createElement("p");
    ownerRepo.textContent = `Owner: ${item.owner.login}`

    const starsRepo = document.createElement("p")
    starsRepo.textContent = `Stars: ${item.stargazers_count}`

    const textContent = document.createElement('div')
    textContent.appendChild(nameRepo)
    textContent.appendChild(ownerRepo)
    textContent.appendChild(starsRepo)

    const deleteRepo = document.createElement('button')
    deleteRepo.classList.add('container__close')
    deleteRepo.addEventListener('click', function (event) {
        console.log('burger')
        repo.remove()
    })
    repo.appendChild(textContent)
    repo.appendChild(deleteRepo)
    saved.appendChild(repo)
}

function deleteSearched() {
    while (searched.firstChild) {
        searched.removeChild(searched.firstChild);
    }
}

function debounce(fn, delay) {
    let timeout;
    return function(...args) {
        if (timeout) {
            clearTimeout(timeout);
        }
        timeout = setTimeout(() => {
            fn.apply(this, args)
        }, delay)
    }
}

const getRepoDebounce = debounce(getRepo, 500);

input.addEventListener('input', getRepoDebounce)