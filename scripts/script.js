const input = document.querySelector(".input-search");
const form = document.querySelector("form");
const data = new CountryData();
const display = document.querySelector(".display");
const row = document.createElement("div");
row.classList.add("row");
const selectBox = document.querySelector(".select-box");

const change = document.querySelector(".change-body");
// dark mode background and element add class with toggle 
change.addEventListener("click", () => {
  document.body.classList.toggle("dark-body");
  document.querySelector(".header").classList.toggle("dark-body");
  document.querySelector(".header h2").classList.toggle("dark-body");
  document.querySelector(".header p").classList.toggle("dark-body");
  // p span change text to light mode and dark mode 
  const para = document.querySelector('.header p .mode-change')
  if(para.innerHTML.includes('Dark')){
    para.innerText= "Light Mode"
  }else{
    para.innerText= "Dark Mode"
  }
  
});
// took data /update browser
const updateUi = (data) => {
  console.log(data)
  // destructure properties 
  // in our case countryDetails is constant  we got data.countryDetails  
  //constant must be same name as getting from object .
  // it's mean i want to store data.countryDeatil properties in constant call countryDetail.
  const  {countryDetail}  = data;

// update detail template 
  const imgSrc = `${countryDetail.flag}`;

  display.innerHTML = `
  
  <div class="row">
  <div class='b-card'>
  <div class="row">
    <div class='lg-col-6 image'>
      <img src=${imgSrc} alt="">
    </div>

    <div class="col-12 lg-col-6 details">
      <div class="row">
        <div class='col-12 lg-col-6 content-one'>
          <h3> ${countryDetail.name}</h3>
          <P><span class='bold-text'>Native Name: </span>${
            countryDetail.nativeName
          }</P>
          <P><span class='bold-text'>Population: </span>${
            countryDetail.population
          }</P>
          <P><span class='bold-text'>Region: </span>${countryDetail.region}</P>
          <P><span class='bold-text'>Sub Region: </span>${
            countryDetail.subregion
          }</P>
          <P><span class='bold-text'>Capital: </span>${
            countryDetail.capital
          }</P>
          <P><span class='bold-text'>Top Level Domain: </span>${
            countryDetail.topLevelDomain
          }</P>
          <P><span class='bold-text'>Currencies: </span>${countryDetail.currencies.map(
            (currency) => currency.code
          )}</P>
          <P><span class='bold-text'>Languages:</span>${countryDetail.languages.map(
            (language) => language.name
          )} </P>
        </div>
        <div class='col-12 lg-col-12 content-three'>
         <p><span class='bold-text'>Border Countries: </span>${
           countryDetail.borders
         }</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>

`;
};
// add addeventListener to form 
form.addEventListener("submit", (e) => {
  // prevent default action
  e.preventDefault();
  document.querySelector(".container button").classList.toggle("show");

  // get country value 
  const country = form.input.value.trim();
  // clear the form after entry 
  form.reset();
// update the ui with new country 
// make request /get data back 
  data
    .updateCountry(country)
    
    .then((data) => {
      //pass data to update function
      //this function will update data to Dom 
      updateUi(data);
    })

    .catch((err) => console.log(err));
});

data.getAllCData().then((data) => {
  updateHome(data);
});
const updateHome = (countries) => {
  countries.map((country) => {
    displayCountry(country);
  });
};
const displayCountry = (country) => {
  const home = document.createElement("div");
  let classToAdd = [
    "col-12",
    "sm-col-12",
    "md-col-12",
    "lg-col-3",
    "xl-col-3",
    "home",
  ];
  home.classList.add(...classToAdd);

  const imgSrc = `${country.flag}`;
  home.innerHTML = `
    <div class="card">
    <div class='card-flag'>
    <img src=${imgSrc}>
    </div>
    
    <div class ="card-text">
    <p class="bold-text"><span class="bold-text"> ${country.name}</span><p>
    <p><span class="bold-text">Population: </span>${country.population} </p>
    <p><span class="bold-text">Region: </span>${country.region}</p>
    <p><span class="bold-text">Capital: </span>${country.capital}</p>
    </div>
    </div>
    
    `;
  display.append(row);
  row.appendChild(home);
  home.addEventListener("click", () => {
    document.querySelector(".container button").classList.toggle("show");
    
    const dataCo = country.name.toLowerCase();
    
    data.updateCountry(dataCo).then((data) => {
      updateUi(data);
    });
  });
};

selectBox.addEventListener("change", (e) => {
  row.innerHTML = "";
  const region = e.target.value;

  data.getAllCData().then((data) => {
    const filterData = data.filter((country) => {
      if (country.region.includes(region)) {
        return country;
      }
    });

    updateHome(filterData);
  });
});
const homeBtn= document.querySelector('.btn .btn-home')

homeBtn.addEventListener('click',()=>{
  
  document.querySelector(".container button").classList.toggle("show");

  display.innerHTML = "";

  data.getAllCData().then((data) => {

    updateHome(data);
  });
  
})