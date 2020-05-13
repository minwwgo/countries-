let countryName = [];
let countryCode = [];

const input = document.querySelector(".input-search");
const form = document.querySelector("form");
const data = new CountryData();
const display = document.querySelector(".display");
const row = document.createElement("div");
row.classList.add("row");
const selectBox = document.getElementById("select-box");

const change = document.querySelector(".change-body");
// dark mode background and element add class with toggle
change.addEventListener("click", () => {
  document.body.classList.toggle("dark-body");
  document.querySelector(".header").classList.toggle("dark-body");
  document.querySelector(".header h2").classList.toggle("dark-body");
  document.querySelector(".header p").classList.toggle("dark-body");
  document.querySelector(".card").classList.toggle("dark-body");
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
  // console.log(countryDetail);
  if (!countryDetail.borders) {
    console.log("there is no border");
  } else {
    const arrData = countryDetail.borders;
    const newArr = arrData.slice(0, 3);
    newArr.map((borders) => {
      data
        .getCountryname(borders)
        .then((data) => {
          showResult(data);
        })
        .catch((err) => console.log(err));
    });

    let showB = "";

    const showResult = (result) => {
      //console.log(result, " line 46");
      result.split(",").map((e) => {
        // console.log(e);
        document.getElementById(
          "border"
        ).innerHTML = ` <button class="border-country">${e}</button> `;
      });
      showB += ` <button class="border-country"> ${result}</button> `;
      document.getElementById("border").innerHTML = showB;

      const allBtnBorder = document.querySelectorAll(".border-country");
      allBtnBorder.forEach((btn) => {
        btn.addEventListener("click", (e) => {
          // console.log(e)
          const cName = e.target.innerText;
          console.log(cName);
          let start = cName.indexOf("(");
          const newCut = cName.trim().slice(0, start);
          console.log(newCut);
          countryName.filter((el, i) => {
            if (el == cName) {
              countryCode[i];
            }
          });
          data
            .updateCountry(newCut)
            .then((data) => {
              // console.log(data);
              updateUi(data);
            })
            .catch((err) => console.log(err));
        });
      });
    };
  }

  // update detail template
  const imgSrc = `${countryDetail.flag}`;

  display.innerHTML = `
  <div class="row  b-card">
          <div class='lg-col-6 image'>
              <img class="img-card-flag" src=${imgSrc} alt="">
            </div>
        
            <div class="col-12 lg-col-6 ">
              <div class="row">
                <div class='col-12 lg-col-12 '>
                  <h3> ${countryDetail.name}</h3>
                </div>
            
                <div class="row content-one">
                
                <div class='col-12 lg-col-6'>
                    
                    <p><strong>Native Name: </strong>
                      ${countryDetail.nativeName}
                    </p>
                    <p><strong>Population: </strong>
                      ${new Intl.NumberFormat().format(
                        countryDetail.population
                      )}
                    </p>
                    <p><strong>Region: </strong>${countryDetail.region}</p>
                    <p><strong>Sub Region: </strong>
                      ${countryDetail.subregion}
                    </p>
                    <p><strong>Capital: </strong>
                      ${countryDetail.capital}
                    </p>
                  </div>
                  <div class='col-12 lg-col-6'>
                    
                    <p><strong>Top Level Domain: </strong>
                      ${countryDetail.topLevelDomain}
                    </p>
                    <p><strong>Currencies: </strong>${countryDetail.currencies.map(
                      (currency) => currency.code
                    )}
                      
                    </p>
                    <p><strong>Languages:</strong>${countryDetail.languages.map(
                      (language) => language.name
                    )} 
                      
                    </p>
                  </div>
                    
                  
                </div>
                  
                  
                </div>
                
                
                <div class='col-12 lg-col-12 content-three'>
                 <article><strong>Border Countries: </strong><p id='border'>  </p></article>
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
  document.querySelector(".search-title-bar").classList.toggle("hide");

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
    "md-col-6",
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
        <h3> ${country.name}</h3>
        <p><strong>Population: </strong>${new Intl.NumberFormat().format(
          country.population
        )}</p>
        <p><strong>Region: </strong>${country.region}</p>
        <p><strong>Capital: </strong>${country.capital}</p>
      </div>
    </div>
    
  `;
  // add child element
  display.append(row);
  // add child element
  row.appendChild(home);
  // addeventlistener  on card  / each time can click /take to relate page for more detail
  home.addEventListener("click", () => {
    document.querySelector(".search-title-bar").classList.toggle("hide");
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
  document.querySelector(".search-title-bar").classList.toggle("hide");
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

data.getAllCData().then((allCountries) => {
  // console.log(allCountries,'line 282')
  checkAllData(allCountries);
});

const checkAllData = (allCountries) => {
  allCountries.map((country) => {
    // console.log(country.name)
    countryName.push(country.name);
    countryCode.push(country.alpha3Code);
  });
};

// console.log(countryName)
//  console.log(countryCode)
function showDD(data) {
  console.log(data);
}
function matchCode(data) {
  let newArr = countryCode;

  newArr.forEach((code, i) => {
    if (data == code) {
      console.log(countryName);
      showDD(countryName[i]);
    }
  });
}
