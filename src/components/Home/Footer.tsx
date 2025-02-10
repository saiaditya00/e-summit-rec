
function Footer(){
    return(
        <footer>
            <div className="footer border-b border-gray-300 flex flex-col items-center p-4">
                <div className="footer-content">
                    <img src="logo.jpg" alt="logo" className='mb-4 text-white' />
                    <div className="flex space-x-4 mb-4">
                        <a href="https://www.facebook.com/"><img src="facebook.png" alt="facebook" className='mr-4 text-white' /></a>
                        <a href="https://www.instagram.com/"><img src="instagram.png" alt="instagram" className='mr-4 text-white' /></a>
                        <a href="https://www.twitter.com/"><img src="twitter.png" alt="twitter" className='mr-4 text-white' /></a>  
                        <a href="https://www.linkedin.com/"><img src="linkedin.png" alt="linkedin" className='mr-4 text-white' /></a>  
                    </div>
                    

                </div>       
            </div>
            <div className="footer-bottom  p-4 ">
                <p className="text-center">© 2025 E-Summit. All Rights Reserved.</p>
            </div>
        </footer>
    )
}

export { Footer };