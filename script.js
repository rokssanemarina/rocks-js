const main = document.getElementById("main-content");
const input = document.querySelector(".search-input");
const button = document.querySelector(".search-button");

button.addEventListener("click", (event) => {
  event.preventDefault();
  const username = input.value.trim();
  username ? getGitHubUser(username) : arlet("Digite uma usuária válida!");
  input.value = "";
});

// leitura da API para consumo e jogar informações


// ela já está sendo chamada dentro a assincrona e por conta disso ela não será assincrona
getGitHubUser = async (user) => {
  try {
    const response = await fetch(`https://api.github.com/users/${user}`);
    const userData = await response.json();
    if ((response.status = 404)) {
      renderUserNotFound();
    } else if ((response.status = 200)) {
      createCard(userData);
    }
  } catch (err) {
    console.log("Capturei um erro:", err);
  }
};

createCard = (user) => {
    const { avatar_url, name, login, bio, followers, public_repos } = user;
    main.innerHTML = `
    <div class='card'>
      <img class = 'profile-img' src=${avatar_url} alt="foto da usuario no github"/>
      <h2 class='profile-title'>${name}</h2>
      <h4 class='profile-subtitle'>${login}</h4>
      <p class ='profile-description'>${bio ? bio : ""}</p>
      <div class='profile-infos'>
      <div class='info-box'>
         <img src='../projetinho-rocks/assets/people_outline.png' class='box-icon'>
         <p class='box-text'>${followers}</p>
         <div/>
      <a class='link-repositories'>
    <div class='info-box'>
    <img src='../projetinho-rocks/assets/Vector.png' class = 'box-icon' >
         <p class='box-text'>${public_repos}</p>
         <div/>
         </a>
        </div>
     </div>

     `
     const linkRepositories = document.querySelector('.link-repositories')
     
     linkRepositories.addEventListener('click',(event)=>{
         event.preventDefault()
         getRepositories (login)
        })
        
    };
    
    getRepositories = async (username) => {
        try {
          const response = await fetch(`https://api.github.com/users/${username}`);
          const repositories = response.json()
          if (repositories.lenght> 0 ){
                console.log (repositories) 
                createRepositoriesCards (repositories)
            } 
            else {
                renderNotFoundRepositories(username)
            }
        }
        catch (err) {
          console.log("Capturei um erro:", err);
        }
      }
      
renderUserNotFound = () => {
  return (main.innerHTML = `
     <div class = 'not-found-box'>
         <h2 class ='not-found-title'> usurária não encontrada </h2>
         <h4 class='not-found-subtitle'> Pesquise novamente </h4>
         <img class='not-found-image' src='../projetinho-rocks/assets/notfound.png'
     <div/>
    `);
};

createRepositoriesCards = (repositories) => {
    const repositoriesList = document.createElement('div')
    repositoriesList.setAttribute ('class','repositories-list')
    main.appendChild (repositoriesList)

    repositories.forEach ((repository)=>{
        const {name, description,language,stargazes_count} = repository
        return repositoriesList = `
        <div class = repository'>
         <h2 class ='repository-title'> ${name}</h2>
         <p class='repository-description'> ${description}</p>
         <div class='repository-details'>
         <p class='repository-text'> ${language}</p>
         <p class='repository-icon'> 
         <img src='../projetinho-rocks/assets/star.png'
         
         ${stargazes_count}</p>
         </div>
     <div/>
        `
    })

}

renderNotFoundRepositories = (username) => main.innerHTML += ` <h2 class='not-found-subtitle'>${username} não possui nenhum repositorio público</h2> `
