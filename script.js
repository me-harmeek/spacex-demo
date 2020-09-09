//  API PARA
let limit = 10;
let launchSuccess = true;
let landSuccess = true;
let launchYear = 2020;

// Fitlers EL
const launchYearEl = document.querySelectorAll('.launch-year ul li a')
const launchSuccessEl = document.querySelectorAll('.launch-success ul li a')
const landSuccessEl = document.querySelectorAll('.land-success ul li a')

const noResultEl =  document.querySelector('.no-result')
const loadingEl =  document.querySelector('.loading')
// RENDER EL
const dataWrapper = document.querySelector('#data')

const loadAPI = (_limit, _launchSuccess, _landSuccess, _launchYear) => {
    dataWrapper.innerHTML = ''
    let html = '';
    noResultEl.style.display = 'none'
   
    fetch(`https://api.spacexdata.com/v3/launches?limit=${_limit}&launch_success=${_launchSuccess}&land_success=${_landSuccess}&launch_year=${_launchYear}`)
    .then(response => response.text())
    .then(data => {
        data = JSON.parse(data)

        data.length ?  noResultEl.style.display = 'none' : noResultEl.style.display = 'inline'
        
        data.map(mission =>{
            let htmlData = `<div class="card">
                                <div class="image">
                                    <img src="${mission.links.mission_patch_small? mission.links.mission_patch_small : 'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcRDnN-2wp5YV40IXQQU0cHoW2_O9b_Xzy01hQ&usqp=CAU'}" alt="">
                                </div>
                                <div class="data">
                                    <span class="name"> ${mission.mission_name} #${mission.flight_number}</span>
                                    <span><b>Mission Ids :</b>${mission.mission_id.join(', ')}</span>
                                    <span class="year"><b>Launch Year</b>:  ${mission.launch_year}</span>
                                    <span><b>Successful Launch</b>   ${mission.launch_success}</span>
                                    <span><b>Successful Landing</b>   ${mission.rocket.first_stage.cores[0].land_success}</span>
                                </div>
                            </div>`

            html += htmlData
        })
    

        dataWrapper.innerHTML = html

        document.querySelector('.loading').style.display = 'none'
    });
}


// PRELOAD SPACEX DATA
loadAPI(limit, launchSuccess, landSuccess, launchYear)

launchYearEl.forEach(el=>{
    el.addEventListener('click',  () =>{
        launchYear = el.text
        toggleEl(launchYearEl, el)
        loadAPI(limit, launchSuccess, landSuccess, launchYear)
    })
})
launchSuccessEl.forEach(el=>{
    el.addEventListener('click',  () =>{
        launchSuccess = el.dataset.success
        toggleEl(launchSuccessEl, el)
        loadAPI(limit, launchSuccess, landSuccess, launchYear)
    })
})
landSuccessEl.forEach(el=>{
    el.addEventListener('click',  () =>{
        landSuccess = el.dataset.success
        toggleEl(landSuccessEl, el)
        loadAPI(limit, launchSuccess, landSuccess, launchYear)
    })
})


// Toggle Buttons 
const toggleEl = (element, el) => {
    element.forEach(_el=>{
        _el.parentElement.classList.remove('active')
    })
    if(el.parentElement.classList.contains('active')){
        el.parentElement.classList.remove('active')
    }else{
        el.parentElement.classList.add('active')
    }
}