import axios from '../utils/axios';
import React, { useEffect, useRef, useState } from 'react'


const Layout = () => {

    const API_URL = import.meta.env.VITE_API_URL;
    const IMAGE_PER_PAGE = 24;

    const searchInput = useRef(null) //isme pura jis component ko ref diya hoga vho aa jaega

    const [images, setimages] = useState([])
    const [pg, setpg] = useState(1)
    const [page, setpage] = useState(0)
    const [ErrMsg, setErrMsg] = useState("")

    // user se input wala search handler
    const searchHandler = (e)=>{
        e.preventDefault();
        pageReset();
    }
    
    // default filter search handler
    const handleFilter = (f)=>{
        searchInput.current.value = f;
        console.log(searchInput.current.value);
        pageReset();
    }

    const pageReset = ()=>{
        fetchImages();
        setpg(1);
    }

    const fetchImages = async()=>{
        try {

            setErrMsg('');
            const query = searchInput.current.value || 'random';
            const { data } = await axios.get(`/?query=${query}&page=${pg}&per_page=${IMAGE_PER_PAGE}&client_id=${import.meta.env.VITE_API_KEY}`)
            setimages(data.results);
            setpage(data.total_pages)               

        } catch (error) {
            setErrMsg("Something went wrong, Try again later.");
        }
    }
    
    useEffect(() => {
      fetchImages();  
      
    }, [pg])
    

  return (
    <>
    {/*----------------------------------------------- nav---------------------------------------------------- */}

    <div className='main bg-[#283618] w-full text-center h-[43vh] py-[10vh]'>

    <h1 className="text-4xl font-bold text-[#FEFAE0]  ">
    Cool Stock Image Gallery
    </h1>

    <form action="" method="get"
    onSubmit={searchHandler}>
    <input type="Search"
    placeholder='Type something to search.....' 
    className='search mt-10 px-8 text-[15px] text-white placeholder:text-[#FEFAE0]/90  outline-none bg-[#606C38] rounded-md border-[#DDA15E] border-[1px] py-1 w-[60vh]'
    ref={searchInput}        
    />
    </form>

    <div className="filters flex gap-5 mt-10 w-full justify-center items-center">
    <div onClick={()=> handleFilter("Nature")}  className=' bg-[#DDA15E] px-2 rounded-md cursor-pointer text-[15px] text-[#606C38] font-semibold '>Nature</div>
    <div onClick={()=> handleFilter("Shoes")}  className=' bg-[#FEFAE0] px-2 rounded-md cursor-pointer text-[15px] text-[#BC6C25] font-semibold'>Shoes</div>
    <div onClick={()=> handleFilter("People")}  className=' bg-[#BC6C25] px-2 rounded-md cursor-pointer text-[15px] text-[#FEFAE0] font-semibold'>People</div>
    <div onClick={()=> handleFilter("Aesthetic")}  className=' bg-[#606C38] px-2 rounded-md cursor-pointer text-[15px] text-[#FEFAE0] font-semibold'>Aesthetic</div>
    </div>

    <div className="errmsg">
        <h1 className='error text-red-500 mt-[15vh] font-semibold'>{ErrMsg}</h1>
    </div>
    </div>




    {/*------------------------------------ layout-------------------------------------------------- */}
    <div 
    className='w-full h-full min-h-[46vh] bg-[#FEFAE0] flex flex-wrap justify-center gap-y-[3vh] gap-x-[2vh] py-[10vh] px-[5vh]'>

        {images.map((i)=>{
            return(
                
                <img key={i.id} src={i.urls.small} alt={i.alt_description}
                className='min-w-[35vh] max-w-[70vh] min-h[30vh] max-h-[50vh] border-[2px] border-transparent hover:border-[#DDA15E] object-cover rounded-xl scale-[1] hover:scale-[1.03] duration-100 transition-all ease-linear'/>
            )
        })}


        
    </div>
        <div className="buttons w-full flex gap-5 items-center justify-center bg-[#FEFAE0] pb-[10vh]">
        {pg > 1 && <button
        onClick={()=> setpg(pg-1)}
        className='bg-[#BC6C25] w-[13vh] h-[4vh] flex items-center justify-center text-[#FEFAE0] rounded-lg'>Previous</button>}

        {pg < page && <button 
        onClick={()=> setpg(pg+1)}
        className='bg-[#BC6C25] w-[13vh] h-[4vh] flex items-center justify-center text-[#FEFAE0] rounded-lg'>Next</button>}    
        </div>        
    </>
  )
}

export default Layout