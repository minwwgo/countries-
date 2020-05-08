

class CountryData{
  constructor(){
    this.allCountryData='https://restcountries.eu/rest/v2/all'
    this.countryURL='https://restcountries.eu/rest/v2/name/'
    this.regionURL='https://restcountries.eu/rest/v2/regionalbloc/'
  } 
  async updateCountry(country){
    const countryDetail = await this.getCountry(country)
    
    return {countryDetail}
    

  }
 async getAllCData(){
    const response = await fetch(this.allCountryData)
    const data = await response .json()
    console.log(data)
    return data
  }
  async getCountry(country){
    const query =`${country}`
    const response = await fetch(this.countryURL+query)
    const data   = await response .json()
    console.log(data[0])
    return data[0]
   }
  async getRegion(region){
    const query =`${region}`
    const response = await fetch(this.regionURL+query)
    const data = await response.json()
    console.log(data)
    return data[0]

  }
}



