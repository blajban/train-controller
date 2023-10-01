import styled from "styled-components";

import Delay from "./Delay";

const TrainNumber = styled.div`
    font-size: 1.5rem;
    font-weight: bold;
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;

const CurrentStation = styled.div`
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;

const Checkbox = styled.input`
    flex: 1;
    display: block;
    margin: auto;
    align-self: center;
`;



function TrainItem({ train, isSelected, onCheckboxChange, ...restProps }) {
  return (
    <div {...restProps}>
      {
        (!train.AdvertisedTrainIdent || train.OperationalTrainNumber === train.AdvertisedTrainIdent) ? (
          <TrainNumber>{train.OperationalTrainNumber}</TrainNumber>
        ) : (
          <TrainNumber>
            <div>{train.OperationalTrainNumber}</div>
            <div>({train.AdvertisedTrainIdent})</div>
          </TrainNumber>
        )
      }
      <CurrentStation>
                <div>{train.LocationSignature}</div>
                <div>{train.FromLocation ? train.FromLocation[0].LocationName + " -> " : ""} {train.ToLocation ? train.ToLocation[0].LocationName : ""}</div>
      </CurrentStation>
    <Delay train={train} />
    <Checkbox
        type="checkbox"
        checked={isSelected}
        onChange={() => onCheckboxChange(train)}
      />
    </div>
    );
}

const StyledTrain = styled(TrainItem)`
  display: flex;
  flex-direction: row;
  border-top: 1px solid #ccc;
  padding: 0.2rem 0.8rem;
  align-items: center;
  cursor: pointer;
  transition: background-color 0.3s ease;  // Add a smooth transition

  &:hover {
    background-color: #f2f2f2;  // A gentle hover effect
  }

  &:nth-of-type(2n) {
    background-color: #eee;
  }
`;

function Train({ train, onClick, onCheckboxChange, isSelected }) {
  return (
    <StyledTrain 
        onClick={onClick}
        train={train}
        onCheckboxChange={onCheckboxChange}
        isSelected={isSelected}
    />
  );
}

export default Train;
