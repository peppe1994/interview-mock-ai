import { Input } from '@/components/ui/input';
import { useContext, useEffect, useState } from 'react';
import { ResumeInfoContext } from '../../context/ResumeInfoContext';

function PersonalDetail({enabledNext}) {

    const {resumeInfo,setResumeInfo}=useContext(ResumeInfoContext)

    const [formData,setFormData]=useState();
    useEffect(()=>{
        console.log("---",resumeInfo)
    },[])

    const handleInputChange=(e)=>{
        enabledNext(true)
        const {name,value}=e.target;

        setFormData({
            ...formData,
            [name]:value
        })
        setResumeInfo({
            ...resumeInfo,
            [name]:value
        })
    }

  return (
    <div className='p-5 shadow-lg rounded-lg border-t-primary border-t-4 mt-10'>
        <h2 className='font-bold text-lg'>Personal Detail</h2>
        <p>Get Started with the basic information</p>

        <form>
            <div className='mt-5 gap-3'>
                <div className='mb-3'>
                    <label className='text-sm'>First Name</label>
                    <Input name="firstName" defaultValue={resumeInfo?.firstName} required onChange={handleInputChange}  />
                </div>
                <div className='mb-3'>
                    <label className='text-sm'>Last Name</label>
                    <Input name="lastName" required onChange={handleInputChange} 
                    defaultValue={resumeInfo?.lastName} />
                </div>
                <div className='col-span-2 mb-3'>
                    <label className='text-sm'>Job Title</label>
                    <Input name="jobTitle" required 
                    defaultValue={resumeInfo?.jobTitle}
                    onChange={handleInputChange}  />
                </div>
                <div className='col-span-2 mb-3'>
                    <label className='text-sm'>Address</label>
                    <Input name="address" required 
                    defaultValue={resumeInfo?.address}
                    onChange={handleInputChange}  />
                </div>
                <div className='mb-3'>
                    <label className='text-sm'>Phone</label>
                    <Input name="phone" required 
                    defaultValue={resumeInfo?.phone}
                    onChange={handleInputChange}  />
                </div>
                <div className='mb-3'>
                    <label className='text-sm'>Email</label>
                    <Input name="email" required 
                    defaultValue={resumeInfo?.email}
                    onChange={handleInputChange}  />
                </div>
            </div>

        </form>
    </div>
  )
}

export default PersonalDetail