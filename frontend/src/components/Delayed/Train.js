import styled from "styled-components";

import Delay from "./Delay";

const TrainNumber = styled.div`
    font-size: 2rem;
    font-weight: bold;
    width: 30%;
`;

const CurrentStation = styled.div`
    width: 30%;
`;

function TrainItem({ train, isSelected, onCheckboxChange, ...restProps }) {
  return (
    <div {...restProps}>
      <input
        type="checkbox"
        checked={isSelected}
        onChange={() => onCheckboxChange(train)}
      />
      <TrainNumber>{train.OperationalTrainNumber}</TrainNumber>
      <CurrentStation>
                <div>{train.LocationSignature}</div>
                <div>{train.FromLocation ? train.FromLocation[0].LocationName + " -> " : ""} {train.ToLocation ? train.ToLocation[0].LocationName : ""}</div>
      </CurrentStation>
    <Delay train={train} />
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
