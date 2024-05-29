import { createContext } from 'react'
import { IAuthContext, IPlayerContext } from '../interfaces/context'

export const AuthContext = createContext<IAuthContext>({} as IAuthContext)
export const PlayerContext = createContext<IPlayerContext>({} as IPlayerContext)
