import { useEffect } from 'react'
import { useNavigate, Navigate, Link } from 'react-router-dom'

export default function Home() {
  const navigate = useNavigate()

  useEffect(() => {
    const credentials = localStorage.getItem('credentials')

    if (!credentials) navigate('/login', { replace: true })
    else navigate('/main', { replace: true })
  }, [])

  return (
    <div>
      Home
      <Link to={'/login'}>Log</Link>
    </div>
  )
}
