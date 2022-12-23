import '../styles/globals.css'
import type { AppProps } from 'next/app'
import Login from './login'
import { useAuthState } from 'react-firebase-hooks/auth'
import { auth, db } from '../config/firebase'
import Loading from '../components/Atoms/Loading/Loading'
import { useEffect } from 'react'
import { doc, serverTimestamp, setDoc } from 'firebase/firestore'

export default function App({ Component, pageProps }: AppProps) {
  const [loggerInUser, loading, _error] = useAuthState(auth);

  useEffect(() => {
    const setUserInDb = async () => {
      try {
        await setDoc(
          doc(db, 'users', loggerInUser?.email as string),{
            email: loggerInUser?.email,
            lastSeen: serverTimestamp(),
            photoURL: loggerInUser?.photoURL 
          },
          {merge: true} //just update what us changed
        )
      } catch (error) {
        console.log('ERROR SETTING USER INFO IN DB: ', error)
      }
    }

    if(loggerInUser) {
      setUserInDb()
    }
  }, [loggerInUser])

  if(loading) return <Loading />

  if(!loggerInUser) return <Login />

  return <Component {...pageProps} />
}
