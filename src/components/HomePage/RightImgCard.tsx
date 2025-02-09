import React from 'react';

const LeftImageCard: React.FC = () => {
  return (
    <div className="cardSec bg-[#252424] h-screen w-screen flex justify-center items-center">
      <div className="cardBox flex w-[100%] h-[80%] items-center justify-between">
        <div className="left w-[50%] h-[100%] flex-col p-[20px] content-center ml-7">
          <h2 className='text-white w-[80%] text-4xl font-bold mb-5'>Describe feature one</h2>
          <p className='text-white mb-6'>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
          </p>
          <ul className='text-white w-[80%]'>
            <li className='list-image-[url(/assets/list-icon.png)] ml-4.5 mb-1.5'><p>benefit one</p></li>
            <li className='list-image-[url(/assets/list-icon.png)] ml-4.5 mb-1.5'><p>benefit two</p></li>
            <li className='list-image-[url(/assets/list-icon.png)] ml-4.5 mb-1.5'><p>benefit three</p></li>
          </ul>
        </div>
        <div className="right w-[35%] h-[90%] mr-20">
          <img className='w-[100%] h-[100%]' src="/assets/imageplaceholder.png" alt="Feature" />
        </div>
      </div>
    </div>
  );
};

export default LeftImageCard;
