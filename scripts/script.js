const input = document.querySelector(".input-search");
const form = document.querySelector("form");
const data = new CountryData();
const display = document.querySelector(".display");
const row = document.createElement("div");
row.classList.add("row");
const selectBox = document.querySelector("select-box");

const updateUi = (data) => {
  const { countryDetail } = data;

  const imgSrc = `${countryDetail.flag}`;

  display.innerHTML = `<div class="row">
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

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const country = form.input.value.trim();
  form.reset();

  data
    .updateCountry(country)
    .then((data) => {
      updateUi(data);
    })

    .catch((err) => console.log(err));
});

data.getAllCData().then((data) => {
  data
    .forEach((country) => {
      updatehomepage(country);
    })
    .catch((err) => console.log(err));
});
const updatehomepage = (country) => {
  const home = document.createElement("div");
  let classToAdd = ["col-12", "sm-col-12", "md-col-12", "lg-col-3", "card"];
  home.classList.add(...classToAdd);
  const imgSrc = `${country.flag}`;
  home.innerHTML = `
    <img src=${imgSrc}>
    <p><span class="bold-text">Population: </span>${country.population} </p>
    <p><span class="bold-text">Region: </span>${country.region}</p>
    <p><span class="bold-text">Capital: </span>${country.capital}</p>
    `;
  display.append(row);
  row.append(home);
};

data.getRegion().then((data) => {
  data.forEach((region) => {
    const option = document.createElement("option");
    option.innerHTML = `${region}`;
    selectBox.append(option);
  });
});
