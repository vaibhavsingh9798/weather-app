import { useEffect, useState } from "react";

const Weather = () =>{
  
    const [cityList,setCityList] = useState([{name:'cityList 1' , cityWeather: []}])
    const [cityName,setCityName] = useState('')
    const [activeCityList,setActiveCityList] = useState('')
    const [activeCityListCode,setActiveCityListCode] = useState(0)


    const API_KEY = '537e6051c563f91736440dbf264b012e'

    const handleSerach = async () =>{
        if(cityName.trim().length){
            try{
          let response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${API_KEY}`)
          let result = await response.json()
           if(result){
               let temp = result.main.temp - 273.15
               temp = temp.toFixed(2)
               let city = result.name
               let numOfCity = parseInt(activeCityList.split(' ')[1])-1
               setActiveCityListCode(numOfCity)
                cityList[numOfCity].cityWeather.push({temp,city})
           }
            }catch(err){
                alert('Something wrong while api call')
            }
        }else{
            alert('City Name is Invalid')
        }

        setCityName('')
    }

    const handleAddNewCityList = async (e)=>{
        e.preventDefault();
        setCityList([...cityList,{name:`cityList ${cityList.length+1}`,cityWeather:[]}])
      setActiveCityList(`cityList ${cityList.length+1}`)
      setTimeout(()=>{
        setActiveCityListCode(cityList.length+1)
      },1000)
       
    }

    const handleActiveList = (e) =>{
        e.preventDefault();
      setActiveCityList(e.target.name);     
      let numOfCity = parseInt(e.target.name.split(' ')[1])-1
      setActiveCityListCode(numOfCity) 
    }

    useEffect(()=>{
          if(cityList.length == 1){
           setActiveCityList('cityList 1')
          }
    },[])

   

    return(
        <>
        <div className="  w-1/3 mx-auto">
         <div className="font-mono font-bold  text-5xl  my-10">
              <h1>Weather App</h1>
           </div> 

           <div className=" flex flex-row mb-4">
              {/* print cityList */}
              { cityList.map((item) =>(
                    <div key={item.name}>
                    <button className={`${activeCityList == item.name ? `bg-blue-500` : `bg-gray-500`}  text-slate-200 p-2 rounded ml-5`} name={item.name} onClick={handleActiveList}>{item.name}</button>
                    </div>
                )
              )}
              <button className=" bg-green-500 p-2 ml-3" onClick={handleAddNewCityList}>New CityList</button>
           </div>

           <div className=" flex flex-row ">
            {/* serach item */}
            <input type="text" value={cityName}  placeholder="Enter City Name"
             className=" border border-gray-500 rounded-md p-2 w-96 bg-slate-200 text-slate-700"
             onChange={(e) => setCityName(e.target.value)} />
             <button className="bg-blue-500  text-slate-200 p-2 rounded ml-5" onClick={handleSerach}>Search</button>
           </div>
           <div className=" my-6 w-full">
            {/* print city with weather */}
          
            <table class="table-auto">
  <tbody>
      
      {!cityList[activeCityListCode]?.cityWeather.length ? <div className=" font-bold text-lg">No Weather yet</div> : cityList[activeCityListCode]?.cityWeather.map((item) =>(
           
          
        <tr key={item.city}> 
        <div className="   w-80 flex flex-row justify-between my-2">
        <div>  <td> {item.city}</td></div>
        <div>  <td>{item.temp} °C</td></div>
        </div>
        </tr>
      
    ))}
    </tbody>
    </table>
           </div>
        </div>
        </>
    )
}

export default Weather;