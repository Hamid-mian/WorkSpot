import React from 'react'
import 'animate.css'
import PostArea from './PostArea'
import { useState, useEffect } from 'react'
import './ScollNav.css'
// import Loading from './Loading'
import { BsSliders2 } from "react-icons/bs"
import { NavLink } from 'react-router-dom';
  
const ScrollNav = ({ postData }) => {
    const [page, setPage] = useState(1);
    const [displayedData, setDisplayedData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [isFilter, setIsFilter] = useState(false)

    useEffect(() => {
        
    }, [isFilter])

    const filters = (e)=>{
        setIsFilter(true)
    }

    useEffect(() => {
        setDisplayedData(postData.slice(0, 10));
    }, [postData]);

    const handleScroll = () => {
        const scrollHeight = document.documentElement.scrollHeight;
        const screenHeight = window.innerHeight;
        const scrollTop = document.documentElement.scrollTop;

        if (scrollTop + screenHeight + 1 >= scrollHeight) {
            setLoading(true);
            setPage(page+1)
            setTimeout(() => {
                setDisplayedData((prevData) => [
                    ...prevData,
                    ...postData.slice(prevData.length, prevData.length + 10),
                ]);
                setLoading(false);
            }, 1000);
        }
    };

    useEffect(() => {
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, [displayedData]);

    
    return (
        <>
            <div className='mb-3 border rounded h-shadow'>
                <div className='d-flex bg-white justify-content-between align-items-center p-3 px-4 mb- rounded' >
                    <div className='rounded-circle'>
                        <img
                            src={require("../../../Assets/images/profilepicture.jpeg")}
                            alt='PP'
                            className='rounded-circle'
                            width='40'
                            height='40'
                        /> 
                    </div>
                    <span className='sn-status d-flex align-items-center'>
                        <div className='s-circle mx-1'></div> 
                        Active
                    </span>
                    <div className='sn-filters'>
                        <NavLink id='sn-filters' onClick={filters} onBlur={()=>{setIsFilter(false)}} style={{textDecoration: 'none'}}>
                            <BsSliders2/>
                            <span className='m-2'>Filters</span>
                        </NavLink>
                    </div>
                    
                </div>
                <div id='filters-div' className={isFilter? 'd-box' : 'd-none'}>
                <div className='filtersBox d-flex bg-white mt-0 p-3 border-top rounded-bottom'>filters will show here</div>
            </div></div>

            <PostArea postData={displayedData} apply = {false}/>
            {loading && <div>Loading...</div>}
        </>
    );
};

export default ScrollNav;
    

