
import React from 'react';
import { BrowserRouter as Router, 
Switch,
Route,
Link,
} from 'react-router-dom';

function App() {
  return (
    <>
    <h1>Roadtrip</h1>
    <hr/>
    <Router>
      <p>
      <Link  to='/newtrip'>New Trip</Link>
      </p>
    <p>
    <Link to='/'>Home</Link>
    </p>
    
    <Switch>
        <Route path="/newtrip">
            <NewTrip/>
        </Route>
        <Route path="/">
        <Home/>
        </Route>
    </Switch>
    </Router>
    </>
  );
}

function Home(){
  return(
      <div>
  
  <p>Welcome to Roadtrip, the quick and helpful travel guide!</p>

  <h2>How it works</h2>
  <p>
    To give you the best roadtrip experience, we utilize the radar api and
    <br />
    other web technologies to deliver a customized, optimized, and fun route
    <br />
    in almost any locale.
  </p>
  <img
    src="https://radar.io/static/image/homepage-api-illustration.png"
    alt="location_data_example"
  />
      </div>
  )
}

function generateAttractions(){
const userCoordinates = '25.8, -80.2';
const setLimit = '10';
const setCategory = 'hotel-lodging';
const setRadius = '1000';

const reverseSearchUrl = 'https://api.radar.io/v1/search/places?';

const apiData = {
    url: reverseSearchUrl,
    category: setCategory,
    coordinates: userCoordinates,
    radius: setRadius,
    limit : setLimit
}
const {url, coordinates, category, radius, limit} = apiData;
const apiUrl = `${url}categories=${category}&near=${coordinates}&radius=${radius}&limit=${limit}`;
console.log(apiUrl);

fetch(apiUrl,{
    headers: {
        'Content-Type': 'application/json',
        'Authorization': 'prj_test_pk_eed7735e65e965000d80dae22ead89df050b7f55'
    }
})
.then((data) => data.json())
.then((places) => {
  console.log(places);
    let output = '';
    places.places.forEach(function(place){
        output += `
        <ul>
            <li>Name: ${place.name}</li>
        </ul>
        `
    }) 
    document.getElementById('detour').innerHTML = output;
})
  return(
    <div>
      
    </div>
  )
}

function NewTrip(){
  return(
      <div>
          
  <form id='coordinates_form'>
    <label for="coordinates">
      Enter destination coordinates (latitude, longitude): 
    </label>
    <input type='text' name='coordinates' id='coordinates'/>
    <button>Submit</button>
</form>
  
  <form action="">
    <p>Select what you're interested in</p>
    <label for="cafe">Cafe</label>
    <input type="checkbox" name="selected_attraction" id="cafe" />
    <label for="park">Park</label>
    <input type="checkbox" name="selected_attraction" id="park" />
    <label for="restaurant">Restaurant</label>
    <input type="checkbox" name="selected_attraction" id="restaurant"/>
    <label for="museum">Museum</label>
    <input type="checkbox" name="selected_attraction" id="museum" />
    <label for="landmarks">Landmark</label>
    <input type="checkbox" name="selected_attraction" id="landmarks" />
    <label for="beach">Beach</label>
    <input type="checkbox" name="selected_attraction" id="beach" />
    <label for="night_life">Night Life</label>
    <input type="checkbox" name="selected_attraction" id="night_life" />
    <label for="skiing/snowboarding">Skiing/Snowboarding</label>
    <input
      type="checkbox"
      name="selected_attraction"
      id="skiing/snowboarding"
    />
    <label for="sports">Sports Venues</label>
    <input type="checkbox" name="selected_attraction" id="sports" />
    <label for="misc">Miscellaneous</label>
    <input type="checkbox" name="selected_attraction" id="misc" />
  </form>
  {generateAttractions()}
  <h2>Detours to Consider</h2> 
  <ul>
  <li id="detour"></li>
  </ul>

  <div className="attraction_map">
    <h2>Scenic Route</h2>
    <img
      src="https://di-uploads-pod4.dealerinspire.com/sunrisechevy/uploads/2018/03/Chevrolet-American-Family-Road-Trip-Map.jpg"
      alt="U.S. Roadtrip Map>"
    />
  </div>
      </div>
  )
}

export default App;
