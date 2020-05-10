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
  const para = document.querySelector(".header p .mode-change");
  if (para.innerHTML.includes("Dark")) {
    para.innerText = "Light Mode";
  } else {
    para.innerText = "Dark Mode";
  }
});
// took data /update browser
const updateUi = (upData) => {
  // destructure properties
  // in our case countryDetails is constant  we got data.countryDetails
  //constant must be same name as getting from object .
  // it's mean i want to store data.countryDeatil properties in constant call countryDetail.
  const { countryDetail } = upData;
  const arrData = countryDetail.borders;
  // console.log(cData)
  // function getborder() {
  //   arrData.map((borders) => {
  //     data.getCountryname(borders).then((data) => showResult(data));
  //   });
  // }
  // const showResult = (result) => {
  //   console.log(result) 
  // };
  // getborder()
  
  
  
  

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
         <p><span class='bold-text'>Border Countries: </span>${arrData}</p>
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
//get all data
data.getAllCData().then((data) => {
  //pass to function
  updateHome(data);
});
//accept array list countries change to one country
const updateHome = (countries) => {
  countries.map((country) => {
    // pass to update ui function
    displayCountry(country);
  });
};
//update data on Dom
const displayCountry = (country) => {
  //create element
  const home = document.createElement("div");
  let classToAdd = [
    "col-12",
    "sm-col-12",
    "md-col-12",
    "lg-col-3",
    "xl-col-3",
    "home",
  ];
  // set multiple class to element
  home.classList.add(...classToAdd);

  const imgSrc = `${country.flag}`;
  // update on DOM
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
  // add child element
  display.append(row);
  // add child element
  row.appendChild(home);
  // addeventlistener  on card  / each time can click /take to relate page for more detail
  home.addEventListener("click", () => {
    // show home page button
    document.querySelector(".container button").classList.toggle("show");
    // when click on card / return value
    const dataCo = country.name.toLowerCase();
    // return value pass to function and fetch / promise return
    data.updateCountry(dataCo).then((data) => {
      // pass data to update function which will update on DOM
      updateUi(data);
    });
  });
};
// add eventlistener on selectBox
selectBox.addEventListener("change", (e) => {
  // empty DOM
  row.innerHTML = "";
  // assign event value to variable
  const region = e.target.value;
  // pass data and fetch / return promises
  data.getAllCData().then((data) => {
    // return as array / filter out array with event return value
    const filterData = data.filter((country) => {
      //filter out array list to  element list with condition
      if (country.region.includes(region)) {
        // return filter list
        return country;
      }
    });
    //passed to update UI function which will update data on DOM
    updateHome(filterData);
  });
});
// create button which will take back to home
const homeBtn = document.querySelector(".btn .btn-home");
// add event listener on button
homeBtn.addEventListener("click", () => {
  // set show class  button after event click
  document.querySelector(".container button").classList.toggle("show");
  // clean out DOM
  display.innerHTML = "";
  // get fetch data / return promises
  data.getAllCData().then((data) => {
    // passed to update function.
    updateHome(data);
  });
});
