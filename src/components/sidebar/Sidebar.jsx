import React from 'react'
import './Sidebar.css'
import Logo from '../../imgs/logo.png';
import { BsFillHouseDoorFill } from "react-icons/bs";
import { FaHandHoldingHeart } from "react-icons/fa";
import { FaHandHolding } from "react-icons/fa";
import { MdFoodBank } from "react-icons/md";
import { IoPersonSharp } from "react-icons/io5";




const Sidebar = ({ onButtonClick }) => { // Accept onButtonClick as a prop
  return (
    <div className='Sidebar'>
        <div className='logo'>
            <img src={Logo} alt='logo'/>
        </div>

        {/* menu */}
        <div className='menu'>
            <div className="menuItem">

                {/*sidebar elements template
                <div>
                    icon
                </div>
                <span>element</span>*/}
                
            
                <button className='Welcome-class'>
                <BsFillHouseDoorFill style={{ fontSize: '5rem' }} onClick={() => onButtonClick('1')}/>
                </button>

                <button className='Donate-class'>
                <FaHandHoldingHeart style={{ fontSize: '5rem' }} onClick={() => onButtonClick('2')}/>
                </button>

                <button className='Recieve-class'>
                <FaHandHolding style={{ fontSize: '5rem' }} onClick={() => onButtonClick('3')}/>
                </button>
            
                

                <button className='Foodbank-class'>
                <MdFoodBank style={{ fontSize: '5rem' }} onClick={() => onButtonClick('4')}/>
                </button>

                <button className='Profile-class'>
                <IoPersonSharp style={{ fontSize: '5rem' }} onClick={() => onButtonClick('5')}/>
                </button>
                
            </div>

        </div>

    </div>
  )
}

export default Sidebar
