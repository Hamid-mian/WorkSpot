import React from 'react'
import PostArea from './PostArea'
import { useState, useEffect } from 'react';
  
const ScrollNav = ({ postData }) => {
    const [page, setPage] = useState(1);
    const [displayedData, setDisplayedData] = useState([]);
    const [loading, setLoading] = useState(false);

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
            <PostArea postData={displayedData} />
            {loading && <div>Loading...</div>}
        </>
    );
};

export default ScrollNav;
    

