class CountryData {
  constructor() {
    this.allCountryData = "https://restcountries.eu/rest/v2/all";
    this.countryURL = "https://restcountries.eu/rest/v2/name/";
    this.regionURL = "https://restcountries.eu/rest/v2/regionalbloc/";
    this.codeURL ="https://restcountries.eu/rest/v2/alpha/"
  }
  // 
  async updateCountry(country) {
    //async function to get country
    const countryDetail = await this.getCountry(country);
// return object value and object key same 
// object shorthand notation 
    return { countryDetail };
  }
  async updateCountryName(code){
    const countryName = await this.getCountryname(code)
    return {countryName}
  }
  
  // get all data fetch 
  async getAllCData() {

    const response = await fetch(this.allCountryData);
    const data = await response.json();
    
    return data;
  }
  // pass country name and fetch 
  async getCountry(country) {
    const query = `${country}`;
    const response = await fetch(this.countryURL + query);
    const data = await response.json();
    
    return data[0];
  }

  
  async getCountryname(code){
    const query = `${code}`
    const response = await fetch(this.codeURL +query)
    const data = await response .json();
    
    return data.name
  }
}
 