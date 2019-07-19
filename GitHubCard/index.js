
// myInfo stores the promise from axios.get
const myInfo = axios.get('https://api.github.com/users/MicahJank');

// card container is used to store the component that carCreator creates
const cardsContainer = document.querySelector('.cards');
console.log(myInfo);

// myInfo = the promise
myInfo
// was axios was able to retrieve the data from the API? if so then
  .then(gitHubData => {
    // in order to show the data on screen i run the cardCreator function which returns an element
    // that element is then appended to the cardsContainer
    const userCard = cardCreator(gitHubData.data);
    cardsContainer.appendChild(userCard);

    return gitHubData.data['followers_url'];
  })

  .then(followersURL => {
    const followers = axios.get(followersURL);

    followers
      .then(followerData => {
        const followerDataArray = followerData.data; // the array of follower OBJECTS

        const followerUrlArray = followerDataArray.map(follower => { // returns an array of follower URLs
          return follower.url;
        });

        return followerUrlArray;
      })
      .then(followersUrlArray => {
        followersUrlArray.forEach(followerURL => {
         const followerInfoObj = axios.get(followerURL);

         followerInfoObj
          .then(followerObj => {
            const followerCard = cardCreator(followerObj.data);
            cardsContainer.appendChild(followerCard);
          });
        });
      });
  })
  .catch(err => {
    console.log('ERROR: ', err);
  });

/* 
<div class="card">
  <img src={image url of user} />
  <div class="card-info">
    <h3 class="name">{users name}</h3>
    <p class="username">{users user name}</p>
    <p>Location: {users location}</p>
    <p>Profile:  
      <a href={address to users github page}>{address to users github page}</a>
    </p>
    <p>Followers: {users followers count}</p>
    <p>Following: {users following count}</p>
    <p>Bio: {users bio}</p>
  </div>
</div>
*/

const cardCreator = cardObj => {
  const cardDiv = document.createElement('div');
  cardDiv.classList.add('card');

  const cardImg = document.createElement('img');
  cardImg.src = cardObj['avatar_url'];
  cardImg.classList.add('profile-image');
  cardDiv.appendChild(cardImg);

  const infoDiv = document.createElement('div');
  infoDiv.classList.add('card-info');
  cardDiv.appendChild(infoDiv);

  // persons name p tag
  const infoName = document.createElement('h3');
  infoName.classList.add('name');
  infoName.textContent = cardObj.name;
  infoDiv.appendChild(infoName);

  // user name p tag
  const infoUserName = document.createElement('p');
  infoUserName.classList.add('username');
  infoUserName.textContent = cardObj.login;
  infoDiv.appendChild(infoUserName);

  // location p tag
  const infoLocation = document.createElement('p');
  infoLocation.textContent = `Location: ${cardObj.location}`;
  infoDiv.appendChild(infoLocation);

  // profile p tag
  const infoProfile = document.createElement('p');
  infoProfile.textContent = 'Profile: ';
  infoDiv.appendChild(infoProfile);
  // a link github user address
  const profileLink = document.createElement('a');
  profileLink.href = cardObj['html_url'];
  profileLink.textContent = cardObj['html_url'];
  infoProfile.appendChild(profileLink);

  // followers p tag
  const infoFollowers = document.createElement('p');
  infoFollowers.textContent = `Followers: ${cardObj.followers}`;
  infoDiv.appendChild(infoFollowers);

  // following p tag
  const infoFollowing = document.createElement('p');
  infoFollowing.textContent = `Following: ${cardObj.following}`;
  infoDiv.appendChild(infoFollowing);

  // bio p tag
  const infoBio = document.createElement('p');
  infoBio.textContent = `Bio: ${cardObj.bio}`;
  infoDiv.appendChild(infoBio);

 // Call createRepoCards

  return cardDiv;
}

 // function that creates the users repo cards
 const createRepoCards(repoObj => {
  
 });