import React,{useState,useEffect,useContext} from 'react'
import { AuthContext } from '../Context/AuthProvider'
import { storage,database } from '../firebase';
import { useHistory } from 'react-router-dom';
import { Grid,Paper, Avatar, TextField, Button} from '@material-ui/core'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';


function Signup() {
    const [email,setEmail] =useState('');
    const[password,setPassword] = useState('');
    const [name,setName] =useState('');
    const[error,setError] = useState('');
    const[loading,setLoading] = useState(false);
    const history = useHistory();
    const [file,setFile] = useState(null)
    const { signup, currentUser } = useContext(AuthContext);
    
    const handleSignup = async (e) => {
        // prevents default action of button
        e.preventDefault();
        try{                                         
            // loader chlega, signup,uid lelenge for future use
            setLoading(true);
            let res = await signup(email, password);
            let uid = res.user.uid; 
            console.log(uid);
            const uploadTaskListener = storage.ref(`/users/${uid}/profileImage`).put(file);
            // Register three observers:
            // 1. 'state_changed' observer, called any time the state changes
            // 2. Error observer, called on failure
            // 3. Completion observer, called on successful completion
                    // fn 1 -> progress tracking
                    // fn2 -> error
                    // fn3 -> success
            uploadTaskListener.on('state_changed',fn1,fn2,fn3);
            function fn1(snapshot) {
                var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                console.log('Upload is ' + progress + '% done');         
            }
            function fn2(error){
                setError(error);
                setTimeout(()=>{
                    setError('')
                },2000);
                setLoading(false);
            }
            async function fn3(){
                let downloadUrl = await uploadTaskListener.snapshot.ref.getDownloadURL();
                console.log(downloadUrl);
                // users k collection k andr doc bnaya uid name se
                await database.users.doc(uid).set({
                    email:email,
                    userId:uid,
                    username:name,
                    createdAt:database.getCurrentTimeStamp(),
                    profileUrl:downloadUrl,
                    postIds:[]
                })
                setLoading(false);
                console.log('User has Signed up');
                history.push('/')
            }
        }
        catch(err){
            setError(err)
            setTimeout(()=>setError(''),2000);
            setLoading(false)
        }
    }

    const handleFileSubmit=(e)=>{
        let file = e.target.files[0];
        console.log(file);
        if(file!=null)
        {
            setFile(file)
        }
    }

    // Agr user logged in h to usko signup vala page nhi dikhana
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
                <h2>Sign Up</h2>
            </Grid>
        <form onSubmit={handleSignup} >
            <TextField label='username' placeholder='Enter username' type="text" value={name} onChange={(e) => setName(e.target.value)} fullWidth required />
            <TextField label='email' placeholder='Enter email' type="email" value={email} onChange={(e)=>setEmail(e.target.value)} fullWidth required  />
            <TextField label='password' placeholder='Enter password' type="password" value={password} onChange={(e) =>setPassword(e.target.value)}  fullWidth required />
            <TextField label='Profile Image' type="file" accept='image/*' onChange={handleFileSubmit}  fullWidth required />
            <Button type='submit' color='primary' variant="contained" style={btnstyle} fullWidth disabled={loading}>SignUp</Button>
        </form>
        </Paper>
     </Grid>
    )
}

export default Signup




