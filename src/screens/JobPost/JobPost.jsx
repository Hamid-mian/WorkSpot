import React, {useRef, useState} from 'react'
import Select from 'react-select'
import "./JobPost.css"
import Navbar from '../../components/Navbar/Navbar'

function JobPost() {
    const ref = useRef()
    const ref1 = useRef()
    const time1Ref = useRef()
    const time2Ref = useRef()

    const ColourOption = [
        { value: 'waiter', label: 'Waiter', isFixed: true },
        { value: 'cashier', label: 'Cashier', isDisabled: true },
        { value: 'sweeper', label: 'Sweeper',},]

    const handleSubmit = (e)=>{
        e.preventDefault();
    }

    const [selectedOptions, setSelectedOption] = useState([]);

    const handleTagsChange = (selectedOption) => {
    // console.log(selectedOption);
    setSelectedOption(selectedOption);
    // console.log("final opt",selectedOptions);
  };


  return (
    <>
        <Navbar isEmployer/>
      <div className='jobPostMain bg-white mx-auto p-5 pb-3 mb-5'>
        <h3 className='text-center my-auto jp-heading'>Post Your Job</h3>

        <form onSubmit={handleSubmit} className="jp-inputFields mt-4 p-3">
            <div className='text-center my-auto'>
                <input type="text" placeholder='Title' className='jp-title my-3 p-2 w-50 inpt' />
                {/* <div className='d-flex justify-content-between'>
                    <input type="text" placeholder='Title' className='jp-title my-3 p-2 w-50 inpt' />
                    <input type="text" placeholder='Offer in PKR' className='jp-title my-3 p-2 w-50 inpt' />
                </div> */}
                <Select placeholder = 'Tags' onChange={handleTagsChange}
                    // defaultValue={"Tags"}
                    isMulti
                    name="colors"
                    options={ColourOption}
                    className="basic-multi-select"
                    classNamePrefix="select"
                />
            </div>

            <div className='d-flex justify-content-between'>
                <input type="text" placeholder='Location' className='jp-location my-3 me-3 p-2 w-50 inpt'/>
                <input type="text" placeholder='Duration in days' className='jp-duration my-3 p-2 w-50 inpt' />
            </div>

            <div className='d-flex justify-content-between'>
                <input type='text' placeholder='Start Date' ref={ref}
                        onFocus={() => (ref.current.type = "date")}
                        onBlur={() => (ref.current.type = "date")}
                        className='jp-sdate my-3 me-3 p-2 inpt w-50' 
                />
                <input type="text" placeholder='End Date' ref={ref1}
                    onFocus={()=>{ref1.current.type = "date"}}
                    onBlur={()=>{ref1.current.type = "date"}}
                    className='jp-edate my-3 p-2 inpt w-50'
                />
            </div>

            <div className='d-flex justify-content-between'>
                <input type="text" placeholder='Start Time'
                    ref={time1Ref}
                    onFocus={()=>{time1Ref.current.type = "time"}}
                    onBlur={()=>{time1Ref.current.type = "time"} }
                    className='jp-stime my-3 me-3 p-2 inpt w-50' 
                />
                <input type="text" placeholder='End Time'
                    ref={time2Ref}
                    onFocus={()=>{time2Ref.current.type = "time"}}
                    onBlur={()=>{time2Ref.current.type = "time"} } 
                    className='jp-etime my-3 p-2 inpt w-50'
                />
            </div>
            <div>
                <textarea placeholder='Description' name="" cols="10" rows="10" 
                    className='jp-description my-3 p-3 inptText'>
                </textarea>
            </div> 
            <div className='text-center my-auto'>
                <button type='submit' className='jp-btn p-1 py-2 my-3 w-50'> Post </button>
            </div>
        </form>
      </div>
    </>
  )
}

export default JobPost
