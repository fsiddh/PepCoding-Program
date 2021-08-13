import React,{useState,useEffect,useContext} from 'react'
import { AuthContext } from '../Context/AuthProvider'
import { useHistory } from 'react-router-dom';
import { Grid,Paper, Avatar, TextField, Button,Typography} from '@material-ui/core'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import { Link } from 'react-router-dom';

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('')
    const [error, setError] = useState("")
    const [loading, setLoading] = useState(false);
    const {login,currentUser} =useContext(AuthContext);
    const history = useHistory();

    const handleLogin = async(e)=>{
        e.preventDefault()
        try {
            console.log('Logging in user')
            setLoading(true)
            await login(email, password)
            setLoading(false)
            history.push('/')
        } catch{
            setError("Failed to Log in");
            setTimeout(() => setError(''), 2000)
            setEmail("");
            setPassword("");
            setLoading(false)
        }
    }

    // Agr user logged in h to usko lgin vala page nhi dikhana
    useEffect(()=>{
        if(currentUser)
        {
            history.push('/')
        }
    },[])

    const paperStyle={padding :20,width:280, margin:"20px auto"}
    const avatarStyle={backgroundColor:'#1bbd7e'}
    const btnstyle = { margin: '40px 0 0 0' }
    return (
        <Grid>
        <Paper elevation={10} style={paperStyle}>
            <Grid align='center'>
                <Avatar style={avatarStyle}><LockOutlinedIcon/></Avatar>
                <h2>Login</h2>
            </Grid>
        <form  >
            <TextField label='email' placeholder='Enter email' type="email" value={email} onChange={(e) => setEmail(e.target.value)} fullWidth required />
            <TextField label='password' placeholder='Enter password' type="password" value={password} onChange={(e) =>setPassword(e.target.value)}  fullWidth required />
            <Button type='submit' color='primary' variant="contained" style={btnstyle} onClick={handleLogin} fullWidth disabled={loading}>Login</Button>
            <Typography style={{ textAlign: "center", fontStyle: "italic" }} >Or</Typography>
            <Link to="/signup" style={{ textDecoration:"none"}}>
            <Button type='submit' color='primary' variant="contained" style={btnstyle} fullWidth >Sign Up</Button>
            </Link>
                    {error ? <h1>{error}</h1> : <></>}
        </form>
        </Paper>
     </Grid>
    )
}

export default Login




