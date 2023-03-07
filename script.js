const searchBtn = document.getElementById('search-btn');
const mealList = document.getElementById('meal');
const userFav = document.querySelector('.fav');

// Event Listners
searchBtn.addEventListener('click', getMealList);
mealList.addEventListener('click', addList);
userFav.addEventListener('click', displayFav);

// getMealListFunction
function getMealList() {
    let searchInutText = document.getElementById('search-input').value.trim();
    fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${searchInutText}`)
        .then(response => response.json())
        .then(data => {
            let html = ''
            if (data.meals) {
                data.meals.forEach(meal => {
                    html += `
                 <div class="meal-item" data-id='${meal.idMeal}'>
                     <div class="meal-img">
                     <img src="${meal.strMealThumb}" alt="pic">
                     </div>
                       <div class="meal-name">
                        <h3>${meal.strMeal}</h3>
                        <a href="#" class="add-btn">Add</a>
                       </div>
                 </div>
                   `;
                })
                mealList.classList.remove('notFound');
            } else {
                html = "Sorry We didn't find any meal";
                mealList.classList.add('notFound');
            }
            mealList.innerHTML = html
        });
}


// Making list
let favorites = [];
let finalList = []
function addList(e) {
    e.preventDefault();
    if (e.target.classList.contains('add-btn')) {
        let mealItem = e.target.parentElement.parentElement.getAttribute('data-id');
        favorites.push(mealItem);
        alert("Added to favorites");
        let List = [... new Set(favorites)];
        finalList = List;
    }
    // console.log(finalList);
}

//displaying Favorites
function displayFav() {
    let html = ''
    if (finalList.length <= 0) {
        html = "Nothing in Favorites";
        mealList.classList.add('notFound');
    }
    else {
        mealList.classList.remove('notFound');
       let heading =document.getElementById('head-title');
       heading.innerText="Your Favorites :"
       console.log(heading);
        finalList.forEach(x => {
            fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${x}`)
                .then(response => response.json())
                .then(data => {
                    data.meals.forEach(meal => {
                        console.log(meal.idMeal);
                        html += `
                        <div class="meal-item" data-id='${meal.idMeal}'>
                        <div class="meal-img">
                        <img src="${meal.strMealThumb}" alt="pic">
                        </div>
                        <div class="meal-name">
                        <h3>${meal.strMeal}</h3>
                        <a href="#" class="add-btn">Add</a>
                        </div>
                        </div>
                        `;
                    })
                    mealList.innerHTML = html
                })
        })
    }
    mealList.innerHTML = html
}