


const FAQ = () => {
    const faqs = [
      {
        question: "What is the purpose of this project?",
        answer: "This project is a demonstration of how to set up a React project with Vite, TypeScript, and Tailwind CSS."
      },
      {
        question: "How do I install dependencies?",
        answer: "You can install dependencies by running `npm install` in the project directory."
      },
      {
        question: "How do I start the development server?",
        answer: "You can start the development server by running `npm run dev`."
      },
      {
          question: "How do I build the project for production?",
          answer: "You can build the project for production by running `npm run build`."
      },
      {
          question: "How do I serve the production build?",
          answer: "You can serve the production build by running `npm run serve`."
      }
      // Add more FAQs as needed
    ];
  
    return (
      <div className="faq-section w-170 p-4   flex flex-col h-auto my-auto items-center  ">
        <h2 className="text-2xl font-bold text-white mb-4">Frequently Asked Questions</h2>
        <h4 className="text-[10px] text-white">Frequently asked questions ordered by popularity. Remember that if the visitor has not committed to the call to action,<br></br> they may still have questions (doubts) that can be answered.</h4>
        <ul className="space-y-4  py-12 ">
          {faqs.map((faq, index) => (
            <li key={index} className="w-150 h-20 mb-4 p-4 border border-violet-500 shadow-sm  text-white" >
              <h3 className="text-l font-semibold text-white">{faq.question}</h3>
              <p className="text-[11px] text-white">{faq.answer}</p>
            </li>
          ))}
        </ul>
  
        <h2 className="text-[15px] text-white font-bold mb-2">Still have questions?</h2>
        <p className="text-[11px] text-white mb-2">Support details to capture customers that mighht to be on the fence.</p>
        <button className="bg-blue-500 text-white  px-4 py-2 rounded-lg">Contact Us</button>
        
      </div>
    );
  };
  
  
  
  export { FAQ };