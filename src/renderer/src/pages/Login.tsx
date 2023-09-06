import { useReducer, ChangeEvent, MouseEvent, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import styles from '../assets/login.module.scss'

type TAction =
  | { type: 'tinkoffApiToken'; payload: string }
  | { type: 'botToken'; payload: string }
  | { type: 'dbUri'; payload: string }
  | { type: 'chatID'; payload: string }

const initialForm = {
  tinkoffApiToken: '',
  botToken: '',
  dbUri: '',
  chatID: ''
}

const reducer = (state: typeof initialForm, action: TAction) => {
  switch (action.type) {
    case 'tinkoffApiToken':
      return { ...state, tinkoffApiToken: action.payload }
    case 'botToken':
      return { ...state, botToken: action.payload }
    case 'dbUri':
      return { ...state, dbUri: action.payload }
    case 'chatID':
      return { ...state, chatID: Number(action.payload) }
    default:
      return state
  }
}

export default function Login() {
  const [form, dispatch] = useReducer(reducer, initialForm)
  const navigate = useNavigate()

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const type = e.target.name as keyof typeof initialForm
    dispatch({ type, payload: e.target.value })
  }

  const handleSubmit = (e: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>) => {
    e.preventDefault()
    window.api.login(form)
  }

  const logError = (error: Error) => {
    console.error(error)
  }

  const logSuccess = (credentials: typeof initialForm) => {
    localStorage.setItem('credentials', JSON.stringify(credentials))
    navigate('/main', { replace: true })
  }

  useEffect(() => {
    window.api.on('login-error', logError)
    window.api.on('login-success', logSuccess)

    return () => {
      window.api.removeAllListeners('login-error')
      window.api.removeAllListeners('login-success')
    }
  }, [])

  return (
    <>
      <form action="" className={styles.form}>
        <label htmlFor="t-api-token">
          Tinkoff API token
          <input
            type="text"
            name="tinkoffApiToken"
            id="t-api-token"
            onChange={handleChange}
            value={form.tinkoffApiToken}
          />
        </label>
        <label htmlFor="bot-token">
          Bot API token
          <input
            type="text"
            name="botToken"
            id="bot-token"
            onChange={handleChange}
            value={form.botToken}
          />
        </label>
        <label htmlFor="db-url">
          Database URI
          <input type="text" name="dbUri" id="db-url" onChange={handleChange} value={form.dbUri} />
        </label>
        <label htmlFor="chat-id">
          Chat ID
          <input
            type="text"
            name="chatID"
            id="chat-id"
            onChange={handleChange}
            value={form.chatID}
          />
        </label>
        <button type="submit" onClick={handleSubmit}>
          Login
        </button>
      </form>
    </>
  )
}
