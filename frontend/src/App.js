
import styled from "styled-components";

import Style from './Style';
import DelayedTrains from "./components/Delayed/DelayedTrains";
import TrainMap from "./components/Map/TrainMap";
import UserConsole from "./components/Auth/UserConsole";

const AppContainer = styled.nav`
  height: 100vh;
  width: 100vw;
  display: flex;
`;

const UserContainer = styled.nav`
  height: 10vh;
  margin-bottom: 1rem;
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
  return (
    <>
      <Style />
      <AppContainer>
        <DelayedContainer>
          <UserContainer>
            <UserConsole />
          </UserContainer>
        <DelayedTrains />
        </DelayedContainer>
        <MapContainer>
          <TrainMap />
        </MapContainer>
        
      </AppContainer>
    </>
      
  );
}

export default App;
