import { useRef, useState, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'

import { useDispatch } from 'react-redux'
import { setCredentials } from './authSlice'
import { useLoginMutation } from './authApiSlice'
import { ROLES } from "../../config/roles";

//import useAuth from '../../hooks/useAuth'
import usePersist from '../../hooks/usePersist'

const Login = () => {
    const userRef = useRef()
    const errRef = useRef()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [role, setRole] = useState('')
    const [errMsg, setErrMsg] = useState('')
    const [persist, setPersist] = usePersist()

    const navigate = useNavigate()
    const dispatch = useDispatch()

    //const { status } = useAuth() // eslint-disable-next-line

    const [login, { isLoading }] = useLoginMutation()

    useEffect(() => {
        userRef.current?.focus();
    }, []);
    
    
    useEffect(() => {
        setErrMsg('');
    }, [email, password, role])


    // const handleSubmit = async (e) => {
    //     e.preventDefault()
    //     try {
    //         const { accessToken } = await login({ username, password }).unwrap()
    //         dispatch(setCredentials({ accessToken }))
            
    //         setUsername('')
    //         setPassword('')
    //         setRole('')
    //         navigate('/dash')
    //     } catch (err) {
    //         if (!err.status) {
    //             setErrMsg('No Server Response');
    //         } else if (err.status === 400) {
    //             setErrMsg('Missing Username or Password');
    //         } else if (err.status === 401) {
    //             setErrMsg('Unauthorized');
    //         } else {
    //             setErrMsg(err.data?.message);
    //         }
    //         errRef.current.focus();
    //     }
    // }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const { accessToken } = await login({ email, password }).unwrap();
            dispatch(setCredentials({ accessToken }));
            
            setEmail('');
            setPassword('');
            setRole('');
            navigate('/dash');
        } catch (err) {
            if (err.error?.status === 401) {
                setErrMsg('Unauthorized: Incorrect username or password');
            } else if (err.error?.status === 400) {
                setErrMsg('Bad Request: Missing username or password');
            } else {
                setErrMsg('An error occurred');
            }
            if (err.error) {
                setErrMsg('Unauthorized: Incorrect username or password');
            }
            if (errRef.current) {
                errRef.current.focus();
            }
        }
    }
    
    
    
    

    

    const handleUserInput = (e) => setEmail(e.target.value)
    const handlePwdInput = (e) => setPassword(e.target.value)
    const handleRoleChange = (e) => setRole(e.target.value)
    const handleToggle = () => setPersist(prev => !prev)

    const errClass = errMsg ? "errmsg" : "offscreen"

    if (isLoading) return <p>Loading...</p>

    const content = (
        <section className="public">
            <header>
                <h1>Login</h1>
            </header>
            <main className="login">
                <p ref={errRef} className={errClass} aria-live="assertive">{errMsg}</p>

                <form className="form" onSubmit={handleSubmit}>
                    <label htmlFor="email">Email:</label>
                    <input
                        className="form__input"
                        type="text"
                        id="email"
                        ref={userRef}
                        value={email}
                        onChange={handleUserInput}
                        autoComplete="off"
                        required
                        autoFocus
                    />

                    <label htmlFor="password">Password:</label>
                    <input
                        className="form__input"
                        type="password"
                        id="password"
                        onChange={handlePwdInput}
                        value={password}
                        required
                    />
                    <button className="form__submit-button">Sign In</button>

                    <label htmlFor="role">Role:</label>
                    <select
                        id="role"
                        value={role}
                        onChange={handleRoleChange}
                        required
                    >
                        <option value="">Select Role</option>
                        {Object.values(ROLES).map(role => (
                            <option key={role} value={role}>{role}</option>
                        ))}
                    </select>


                    <label htmlFor="persist" className="form__persist">
                        <input
                            type="checkbox"
                            className="form__checkbox"
                            id="persist"
                            onChange={handleToggle}
                            checked={persist}
                        />
                        Trust This Device
                    </label>
                </form>
            </main>
            <footer>
                <Link to="/">Back to Home</Link>
            </footer>
        </section>
    )

    return content
}
export default Login