import React from 'react'
import {Route,Redirect} from 'react-router-dom';
import {isLoaded,isEmpty} from 'react-redux-firebase';
import {useSelector} from 'react-redux'
// similar to mapStateToProps
function PrivateRoute({component:Component,...remainingProps}) {
const authFirebase = useSelector(state=>state.firebase.auth)
    return (
       <Route {...remainingProps} 
       render={({props})=>
       isLoaded(authFirebase) && !isEmpty(authFirebase) ?
       (<Component {...props}/>):(<Redirect to='/'/>)
    }
    />
    )
}

export default PrivateRoute
