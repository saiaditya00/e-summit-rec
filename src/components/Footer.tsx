import NavLogo from '../assets/navlogo-dark.png';
import facebook from '../assets/logos/facebook.png';
import instagram from '../assets/logos/instagram.png';
import linkedin from '../assets/logos/linkedin.png';
import twitter from '../assets/logos/twitter.png';

function Footer() {
    return (
        <footer className='bg-gray-900 text-white w-11/12 mx-auto p-4'>
            <div className="border-b border-gray-300 flex flex-col items-center p-4 text-center">
                <img src={NavLogo} alt="logo" className='mb-4' />
                <div className="flex flex-wrap justify-center space-x-4 mb-4 items-center">
                    <a href="https://www.facebook.com/" className='flex items-center hover:text-purple-500 space-x-2'>
                        <img src={facebook} width={30} height={30} alt="facebook" />
                        <span>Facebook</span>
                    </a>
                    <a href="https://www.instagram.com/" className='flex items-center hover:text-purple-500 space-x-2'>
                        <img src={instagram} width={30} height={30} alt="instagram" />
                        <span>Instagram</span>
                    </a>
                    <a href="https://www.twitter.com/" className='flex items-center hover:text-purple-500 space-x-2'>
                        <img src={twitter} width={30} height={30} alt="twitter" />
                        <span>Twitter</span>
                    </a>
                    <a href="https://www.linkedin.com/" className='flex items-center hover:text-purple-500 space-x-2'>
                        <img src={linkedin} width={30} height={30} alt="linkedin" />
                        <span>LinkedIn</span>
                    </a>
                </div>
            </div>
            <div className="flex flex-col md:flex-row justify-between items-center p-4 text-center md:text-left">
                <p className="mb-2 md:mb-0">© 2025 E-Summit. All Rights Reserved.</p>
                <div className='flex flex-col md:flex-row gap-2 md:gap-5'>
                    <a href='#' className='underline hover:text-purple-500'>Privacy Policies</a>
                    <a href='#' className='underline hover:text-purple-500'>Terms of Service</a>
                    <a href='#' className='underline hover:text-purple-500'>Cookies Settings</a>
                </div>
            </div>
        </footer>
    );
}

export default Footer;
