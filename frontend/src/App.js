
import styled from "styled-components";

import Style from './Style';
import DelayedTrains from "./components/Delayed/DelayedTrains";
import TrainMap from "./components/Map/TrainMap";

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
  return (
    <>
      <Style />
      <AppContainer>
        <DelayedContainer>
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
