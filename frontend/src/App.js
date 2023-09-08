
import styled from "styled-components";

import Style from './Style';
import ExampleComponent from './components/ExampleComponent';
import DelayedTrains from "./components/DelayedTrains";

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
          Här ska kartan in
        </MapContainer>
        
      </AppContainer>
    </>
      
  );
}

export default App;
