import React from 'react'
import Navbar from '../../../components/layout/Navbar'
import Stepper from "./Stepper"
import Footer from '../../../components/layout/Footer'
import Navigation from '../../../components/layout/Navigation/Index'

function RegisterSmallScreen() {
    return (
        <div className='flex flex-col justify-center items-center'>
            <Navbar />
            <div className="w-full">
                <Navigation label={"Sign Up"} heading={"Sign Up"} />
            </div>
            <div className="w-[70%] max-tablet:w-full max-tablet:pl-0 pl-3 pt-16">
                <Stepper />
            </div>
            <Footer />
        </div>
    )
}

export default RegisterSmallScreen
