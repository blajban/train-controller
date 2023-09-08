function OldTickets({oldTickets}) {
  if (!oldTickets) return "Loading reason codes...";

  return (
    <div>
      <h2>Befintliga ärenden</h2>
      {oldTickets.map((ticket, index) => (
        <div key={index}>{ticket.id} - {ticket.code} - {ticket.trainnumber} - {ticket.traindate}</div>
      ))}
    </div>
  )
  
}

export default OldTickets;


