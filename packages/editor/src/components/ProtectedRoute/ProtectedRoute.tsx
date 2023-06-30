import { Navigate } from "react-router-dom"
import { useUser } from "~/hooks/useUser"

import { useUser as useSupaUser, useSessionContext, User } from "@supabase/auth-helpers-react"

const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
  const { session, isLoading: isLoadingUser } = useSessionContext()

  if (!isLoadingUser && !session) {
    // user is not authenticated
    return <Navigate to="/" />
  }

  if (isLoadingUser) {
    return <div>Carregando...</div>
  }

  return children
}

export default ProtectedRoute
