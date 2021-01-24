import React from 'react'

const UserContext = React.createContext({role: undefined})
export const UserProvider = UserContext.Provider
export default UserContext