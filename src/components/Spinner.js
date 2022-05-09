import React from 'react'
import loaderimage from '../loaderimage.gif'

 const Spinner =()=> {
  
    return (
      <div className='text-center' >
          <img src={loaderimage} alt="loading..." style={{width: "15rem"}} />
      </div>
    )
  
}
export default Spinner