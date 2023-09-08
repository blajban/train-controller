import { useState, useEffect } from 'react'

import styled from "styled-components";



function OldTickets({oldTickets}) {
  if (!oldTickets) return "Loading reason codes...";

  return (
      <div class="old-tickets">
        <h2>Befintliga ärenden</h2>
        {oldTickets.map(ticket => (
          <div>{ticket.id} - {ticket.code} - {ticket.trainnumber} - {ticket.traindate}</div>
        ))}
      </div>
  )
  
}

export default OldTickets;


