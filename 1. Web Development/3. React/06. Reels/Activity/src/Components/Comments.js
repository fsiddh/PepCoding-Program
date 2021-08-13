import React,{useState,useEffect} from 'react'
import {database} from '../firebase';
import { makeStyles } from '@material-ui/core/styles';
import { CircularProgress } from '@material-ui/core';
import { Avatar } from '@material-ui/core';
import './Comments.css';
const useStyles = makeStyles({
  da:{
      marginRight:'2%',
      marginTop:'2%'
  }
 })
function Comments(props) {
    const classes = useStyles();
    const [comments,setComments] =useState(null);
    useEffect(async() => {
        let arr=[];
        for(let i=0;i<props.postData.comments.length;i++)
        {
            let cid = props.postData.comments[i];
            let data = await database.comments.doc(cid).get();
            arr.push(data.data());
        }
        setComments(arr)
        
    }, [props.postData])
    return (
        <>
        {
            comments==null?<CircularProgress/>:
            comments.map((comment,index)=>(
                <div key={index} className='comment-div'>
                    <Avatar src={comment.uUrl} className={classes.da}/>
                    <p><span style={{fontWeight:'bold',display:'inline-block'}} >{comment.uName}</span>&nbsp;&nbsp;{comment.text}</p>
                </div>
            ))
        }
        </>
    )
}

export default Comments
