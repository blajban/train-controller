import { useContext } from "react";

import styled from "styled-components";

import Delay from "./Delay";
import SmallButton from "../ui/SmallButton";
import UserContext from "../../contexts/UserContext";

const TrainNumber = styled.div`
  font-size: 2rem;
  font-weight: bold;
  width: 30%;
`;

const CurrentStation = styled.div`
    width: 30%;
`;

const StyledSmallButton = styled(SmallButton)`
  margin-left: auto;
`;

function TrainItem({ train, onClick, ...restProps }) {
  const { isLoggedIn, setIsLoggedIn } = useContext(UserContext);
  return (
    <div {...restProps}>
      <TrainNumber>{train.OperationalTrainNumber}</TrainNumber>
      <CurrentStation>
          <div>{train.LocationSignature}</div>
          <div>{train.FromLocation ? train.FromLocation[0].LocationName + " -> " : ""} {train.ToLocation ? train.ToLocation[0].LocationName : ""}</div>
      </CurrentStation>

    <Delay train={train} />

    {isLoggedIn && <StyledSmallButton onClick={onClick}>+</StyledSmallButton>}
    </div>
    );
}

const StyledTrain = styled(TrainItem)`
  display: flex;
  flex-direction: row;
  border-top: 1px solid ${({theme}) => theme.secondary};
  padding: 0.2rem 0.8rem;
  align-items: center;

  &:nth-of-type(2n) {
    background-color: ${({theme}) => theme.tableNthRow};
  }
`;

function Train({ train, onClick }) {
  return (
    <StyledTrain 
        onClick={onClick}
        train={train}
    />
  );
}

export default Train;
