
import React from 'react'
import { getSessionObject } from '../../../library/session/authenticate'


export const session = getSessionObject();
  
export const SessionContext = React.createContext(  session);
  