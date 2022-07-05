import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCircleXmark } from "@fortawesome/free-solid-svg-icons"

import "./reserve.css"

const Reserve = ({setOpen, hotelId}) => {
  return (
    
    <div className="reserve">
        <div className="rContainer">
            <FontAwesomeIcon icon={faCircleXmark} className="rClose" onClick={()=>setOpen(false)}/>
        </div>
    </div>
  
  )
}

export default  Reserve

