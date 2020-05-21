
import React from 'react'

export const user = {
    authenticated: false,
    user: {}
};
  
export const UserContext = React.createContext(user);
  