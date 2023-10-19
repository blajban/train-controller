import { useContext, useEffect, useState } from "react";

import styled from "styled-components";

import Delay from "./Delay";
import SmallButton from "../ui/SmallButton";
import UserContext from "../../contexts/UserContext";

import { useDelayed } from "../../contexts/DelayedContext";

const TrainNumber = styled.div`
  font-size: 2rem;
  font-weight: bold;
  width: 30%;
`;

const CurrentStation = styled.div`
    width: 30%;
`;

const StyledSmallButtonRight = styled(SmallButton)`
  margin-left: auto;
`;

const StyledSmallButtonLeft = styled(SmallButton)`
  margin-right: auto;
`;

function TrainItem({ train, onClick, ...restProps }) {
  const { isLoggedIn, setIsLoggedIn } = useContext(UserContext);
  const { selectedTrain, setSelectedTrain } = useDelayed();

  const isFocused = selectedTrain === train;

  const handleClick = (e) => {
    if (selectedTrain) {
      setSelectedTrain(null);
      return;
    }
    setSelectedTrain(train);
    
  };

  return (
    <div {...restProps}>
      {isFocused ? (
        <StyledSmallButtonLeft onClick={handleClick}>Visa alla</StyledSmallButtonLeft>
      ) : (
        <StyledSmallButtonLeft onClick={handleClick}>Visa på karta</StyledSmallButtonLeft>
      )}
      <TrainNumber>{train.OperationalTrainNumber}</TrainNumber>
      <CurrentStation>
          <div>{train.LocationSignature}</div>
          <div>{train.FromLocation ? train.FromLocation[0].LocationName + " -> " : ""} {train.ToLocation ? train.ToLocation[0].LocationName : ""}</div>
      </CurrentStation>

    <Delay train={train} />


    
    {isLoggedIn && <StyledSmallButtonRight onClick={onClick}>+</StyledSmallButtonRight>}
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
