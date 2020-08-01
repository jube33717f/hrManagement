
import React from 'react'
import './companymap.scss'

const CompanyMap =props=>{

    return(
        <div className='companymap'>
            <div className='companymap-head'>
                Company Location
            
            </div>
            <div>
                <iframe src="https://www.google.com/maps/embed?pb=!1m19!1m8!1m3!1d6625.451273801616!2d151.206639!3d-33.870961!3m2!1i1024!2i768!4f13.1!4m8!3e2!4m0!4m5!1s0x6b12ae3c36fc2c21%3A0xbf6ac40e233d3415!2sQueen%20Victoria%20Building%2C%20455%20George%20St%2C%20Sydney%20NSW%202000!3m2!1d-33.871722!2d151.2067078!5e0!3m2!1sen!2sau!4v1590823396004!5m2!1sen!2sau" width="100%" height="250" frameBorder="0" style={{border:'0'}} allowFullScreen="" aria-hidden="false" tabIndex="0"></iframe>
            </div>
        </div>
    )
}
export default CompanyMap;