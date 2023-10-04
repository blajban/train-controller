
import React, { useState } from 'react';
import styled from "styled-components";

import UserContext from './contexts/UserContext';
import Style from './Style';
import DelayedTrains from "./components/Delayed/DelayedTrains";
import TrainMap from "./components/Map/TrainMap";
import UserConsole from "./components/Auth/UserConsole";

const AppContainer = styled.nav`
  height: 100vh;
  width: 100vw;
  display: flex;
`;


const DelayedContainer = styled.nav`
  height: 100vh;
  width: 40vw;
  padding: 2rem;
  overflow: scroll;
  background-color: white;
`;

const MapContainer = styled.nav`
  height: 100vh;
  width: 60vw;
`;


function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <>
      <Style />
      <UserContext.Provider value={{ isLoggedIn, setIsLoggedIn }}>
        <AppContainer>
          <DelayedContainer>
              <UserConsole />
          <DelayedTrains />
          </DelayedContainer>
          <MapContainer>
            <TrainMap />
          </MapContainer>
          
        </AppContainer>
      </UserContext.Provider>
    </>
      
  );
}

export default App;
