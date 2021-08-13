import React,{useState,useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import ChatBubbleIcon from '@material-ui/icons/ChatBubble';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import IconButton from '@material-ui/core/IconButton';
// import Ticker from 'react-ticker';
import MusicNoteIcon from '@material-ui/icons/MusicNote';
import './Posts.css'
import CircularProgress from '@material-ui/core/CircularProgress';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogContent from '@material-ui/core/DialogContent';
import Video from './Video';
import { database } from '../firebase';
import Likes from './Likes';
import AddComment from './AddComment';
import Comments from './Comments';
const useStyles = makeStyles({
    root: {
      width: '100%',
      padding: '0px'
    },
    loader: {
      position: 'absolute',
      left: '50%',
      top: '50%'
    },
    typo: {
      marginLeft: '2%'
    },
    vac: {
      marginLeft: '3.5%',
      color: '#8e8e8e',
      cursor:'pointer'
    },
    dp: {
      marginLeft: '2%'
    },
    cc: {
      height: '50vh',
      overflowY: 'auto'
    },
    seeComments:{
      height:'54vh',
      overflowY:'auto'
    },
    ci:{
    
      color: 'white',
      left:'9%',
      cursor:'pointer'
    },
    mn:{
      color:'white',
      
     
    },
    tmn:{
      color:'white'
    }
  
  });
function Posts({userData=null}) {
  const classes = useStyles();
  const[posts,setPosts] = useState(null);
  const [openId, setOpenId] = useState(null);
  const handleClickOpen = (id) => {
    setOpenId(id);
  };
  const handleClose = () => {
    setOpenId(null);
  };
      const callback = entries=>{
        entries.forEach(element => {
            console.log(element);
            let el = element.target.childNodes[1];
            el.play().then(()=>{
                //if this video is not in viewport then pause it
                if(!el.paused && !element.isIntersecting)
                {
                    el.pause();                
                }
            })

        });
    }
    const observer = new IntersectionObserver(callback,{ threshold:0.85 });
    useEffect(()=>{
      let parr=[];
      const unsub = database.posts.orderBy('createdAt','desc').onSnapshot(querySnapshot=>{
        parr=[];
        querySnapshot.forEach((doc)=>{
          console.log(doc.data(),+"  "+doc.id);
          let data = {...doc.data(),postId:doc.id}
          parr.push(data)
        })
        setPosts(parr);

      })
      return unsub;
    }
    ,[])
    useEffect(()=>{
      let elements = document.querySelectorAll('.videos');
      elements.forEach(el=>{
        observer.observe(el);
      })
      return ()=>{
        observer.disconnect();
      }
    },[posts])
    return (
      <>
        <div className='place'>
        </div>
        {posts==null?<CircularProgress className={classes.loader} color="secondary" />:
        <div className='video-container' id='video-container'>
          {
            posts.map((post)=>(
              <React.Fragment key={post.postId}>
                <div className='videos'>
                  <div className='fa' style={{display:'flex'}}>
                    <Avatar src={post.uProfile}></Avatar>
                    <h4>{post.uName}</h4>
                  </div>
                  <Video source={post.pUrl} id={post.pId}/>

                  <Likes userData={userData} postData={post}/>
                  <ChatBubbleIcon onClick={() => handleClickOpen(post.pId)} className={`${classes.ci} icon-styling`} />
                      <Dialog maxWidth="md" onClose={handleClose} aria-labelledby="customized-dialog-title" open={openId === post.pId}>
                        <MuiDialogContent>
                          <div className='dcontainer'>
                            <div className='video-part'>
                              <video  autoPlay={true} className='video-styles2' controls id={post.id} muted="muted" type="video/mp4" >
                                <source src={post.pUrl} type="video/webm" />
                              </video>
                            </div>
                            <div className='info-part'>
                              <Card>
                                <CardHeader
                                  avatar={
                                    <Avatar src={post?.uProfile} aria-label="recipe" className={classes.avatar}>
                                    </Avatar>
                                  }
                                  action={
                                    <IconButton aria-label="settings">
                                      <MoreVertIcon />
                                    </IconButton>
                                  }
                                  title={post?.uName}

                                />
                                
                                <hr style={{ border: "none", height: "1px", color: "#dfe6e9", backgroundColor: "#dfe6e9" }} />
                                <CardContent className={classes.seeComments}>
                                  
                                <Comments userData={userData} postData={post} />
                                </CardContent>
                                
                              </Card>
                              <div className='extra'>
                              <div className='likes'>
                                <Typography className={classes.typo} variant='body2'>Liked By {post.likes.length == 0 ? 'nobody' : ` others`}</Typography>
                                </div>
                                <AddComment  userData={userData} postData={post}/> 
                                </div>
                            </div>
                          </div>
                        </MuiDialogContent>
                      </Dialog>
                </div>

                <div className='place'></div>
              </React.Fragment>
            ))
          }

        </div>
        }
        </>
    )
}

export default Posts
