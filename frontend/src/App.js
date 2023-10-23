
import React, { useState } from 'react';
import styled, { ThemeProvider as StyledThemeProvider} from "styled-components";
import { useTheme } from './style/ThemeProvider';
import { lightTheme, darkTheme } from './style/themes';

import UserContext from './contexts/UserContext';
import Style from './style/Style';
import DelayedTrains from "./components/Delayed/DelayedTrains";
import TrainMap from "./components/Map/TrainMap";
import UserConsole from "./components/User/UserConsole";
import DelayedContext from './contexts/DelayedContext';

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
  background-color: ${({theme}) => theme.background};
`;

const MapContainer = styled.nav`
  height: 100vh;
  width: 60vw;
`;


function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userInfo, setUserInfo] = useState(null);

  const [delayedTrains, setDelayedTrains] = useState([]);
  const [selectedTrain, setSelectedTrain] = useState(null);
  const [trainsWithPosition, setTrainsWithPosition] = useState([]);

  const { theme } = useTheme();

  return (
    <>
      <StyledThemeProvider theme={theme === 'light' ? lightTheme : darkTheme}>
      <Style />
        <UserContext.Provider value={{ isLoggedIn, setIsLoggedIn, userInfo, setUserInfo }}>
          <DelayedContext.Provider value={{ delayedTrains, setDelayedTrains, selectedTrain, setSelectedTrain, trainsWithPosition, setTrainsWithPosition }}>
            <AppContainer>
              <DelayedContainer>
                  <UserConsole />
              <DelayedTrains />
              </DelayedContainer>
              <MapContainer>
                <TrainMap />
              </MapContainer>
            </AppContainer>
          </DelayedContext.Provider>
        </UserContext.Provider>
      </StyledThemeProvider>
    </>
      
  );
}

export default App;
