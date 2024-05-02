

let cl = console.log;


$('#bannerSlider').owlCarousel({
    loop: true,
    margin: 10,
    autoplay: true,
    dots: true,
    nav: false,
    autoplayTimeout: 5000,
    responsive: {
        0: {
            items: 1
        },
        600: {
            items: 2
        },
        1000: {
            items: 2
        }
    }
})

$('#brandSlider').owlCarousel({
    loop: true,
    margin: 10,
    nav: false,
    dots: false,
    autoplay: true,
    autoplayTimeout: 5000,
    responsive: {
        0: {
            items: 1
        },
        600: {
            items: 2
        },
        1000: {
            items: 3
        }
    }
})



const navCollapseBtn = document.getElementById("navCollapseBtn");
const navOpenBtn = document.getElementById("navOpenBtn");
const allRecipeContainer = document.getElementById("allRecipeContainer");
const bannerSlider = document.getElementById("bannerSlider");

const snackBarMsg = (msg, icon, timer) => {
    swal.fire({
        title: msg,
        icon: icon,
        timer: timer
    })
}
const objToArr = (obj) => {
    let recipeArr = [];
    for (let key in obj) {
        // obj[key].id = key;
        recipeArr.push({ ...obj[key], id: key });
    }
    return recipeArr
}

let baseUrl = 'https://braise-attempt-01-default-rtdb.asia-southeast1.firebasedatabase.app';
let recipeUrl = `${baseUrl}/recipeArr.json`;
let trendingRecipeUrl = `${baseUrl}/trendingRecipe.json`;

const makeApiCall = async (apiUrl, methodName, msgBody = null) => {
    try {
        msgBody = msgBody ? JSON.stringify(msgBody) : null;
        let res = await fetch(apiUrl, {
            method: methodName,
            body: msgBody
        })
        return res.json();
    }
    catch (err) {
        cl(err)
        snackBarMsg("Something went wrong while fetching data!!", "error", 1500)
    }
}

const fetchCards = async () => {
    try {
        let res = await makeApiCall(recipeUrl, "GET", null);
        let data = objToArr(res);
        cl(data)
        allRecipeCardsTemplating(data)
    }
    catch (err) {
        cl(err)
    }
}
fetchCards();

const fetchTrendingcards = async () => {
    try {
        let res = await makeApiCall(trendingRecipeUrl, "GET", null);
        let data = objToArr(res);
        trendingRecipeTemplating(data)
    }
    catch (err) {
        cl(err)
    }
}
const allRecipeCardsTemplating = (obj) => {
    allRecipeContainer.innerHTML = obj.map(ele => {
        return `<div class="col-md-4 col-sm-6 mt-4">
                    <div class="card dishCard mb-4">
                        <div class="dishImg">
                            <img src="${ele.imageUrl}" alt="${ele.title}" title="${ele.title}">
                        </div>
                        <div class="card-body">
                            <div class="dishType">
                                <p>Braise Special</p>
                            </div>
                            <div class="dishName">
                                <h4>
                                ${ele.title}
                                </h4>
                            </div>
                            <div class="dishTime">
                                <p class="mb-0"><i class="fa-regular fa-clock"></i> ${ele.time} <p>
                                <p class="mb-0"><i class="fa-regular fa-thumbs-up"></i> ${ele.level}</p>
                            </div>
                        </div>
                    </div>
                </div>`
    }).join("");
}
const trendingRecipeTemplating = (obj) => {
    bannerSlider.innerHTML = obj.map(ele => {
        return `<div class="item">
                    <figure class="bannerCard">
                        <div class="bannerImg">
                            <img src="${ele.imageUrl}" alt="${ele.title}" title="${ele.title}">
                        </div>
                        <figcaption>
                            <div class="bannerDetails">
                                <p>Most Popular</p>
                                <h3>
                                ${ele.title}
                                </h3>
                            </div>
                        </figcaption>
                    </figure>
                </div>`
    }).join("");
}






const toggleCollapse = () => {
    navCollapseBtn.classList.toggle("d-none");
    navOpenBtn.classList.toggle("d-none");
}


navCollapseBtn.addEventListener("click", toggleCollapse);
navOpenBtn.addEventListener("click", toggleCollapse);

