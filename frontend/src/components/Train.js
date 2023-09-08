import styled from "styled-components";

function Delay({ train }) {
    const advertised = new Date(train.AdvertisedTimeAtLocation);
    const estimated = new Date(train.EstimatedTimeAtLocation);

    const diff = Math.abs(estimated - advertised);

    const delay = Math.floor(diff / (1000 * 60));
    return (
        <div>
            {delay} minuter
        </div>
    )
}

const TrainNumber = styled.div`
    font-size: 2rem;
    font-weight: bold;
    width: 30%;
`;

const CurrentStation = styled.div`
    width: 30%;
`;

function TrainItem({ train, ...restProps }) {
  return (
    <div {...restProps}>
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

function Train({ train }) {
  return (
    <StyledTrain 
        train={train}
    />
  );
}

export default Train;
