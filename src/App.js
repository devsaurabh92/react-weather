import React from 'react';
import Titles from './component/Titles';
import Form from './component/Form';
import Weather from  './component/Weather';

const API_KEY = "a03f91e12efd6df5589235cdaff7086b";
class App extends React.Component{
   state = {
     temperature:undefined,
     city:undefined,
     country:undefined,
     humidity:undefined,
     description:undefined,
     error:undefined
     

   }
  getWeather = async (event) => {
   //   e.preventdefault();
    event.preventDefault()
    const city = event.target.elements.city.value;
    const country = event.target.elements.country.value;
    //const city = "london";
    //const country = "uk";
     const api_call = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=${API_KEY}&units=metric`);
     const data = await api_call.json();
     if(city && country){
     console.log(data);
     this.setState({
       temperature:data.main.temp,
       city:data.name,
       country:data.sys.country,
       humidity:data.main.humidity,
       description:data.weather[0].description,
       error:""

     })
    }else{
      this.setState({
        temperature: undefined,
        city: undefined,
        country: undefined,
        humidity: undefined,
        description: undefined,
        error:"Please enter the value."
 
      })
    }
  }

  render(){
   return(
     <div>
  <Titles />
  <Form getWeather={this.getWeather}/>
  <Weather
  temperature={this.state.temperature}
  city={this.state.city}
  country = {this.state.country}
  humidity = {this.state.humidity}
  description = {this.state.description}
  error = {this.state.error}
  />
     </div>
   ) 

  }

}
export default App;
