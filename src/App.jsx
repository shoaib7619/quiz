import './App.css'
import React from 'react';
import questions from './data/question.json'
import Header from './components/header';
import Footer from './components/footer';


function App() {
  const [allQuestions, setAllQuestions] = React.useState(questions);
  const [index, setIndex] = React.useState(0);
  const [clickCount, setClickCount] = React.useState(0);

  const q = allQuestions[index];
  const imgSrc = `../src/data/img/${q.img}`;

  const onSelectOption = (qimg,op) => {
    const copyQuestions = [...allQuestions];
    const question = copyQuestions.find(q => q.img === qimg);
    question.selectedOption = op;
    setAllQuestions(copyQuestions);
    setClickCount(clickCount+1)
  }


   const getOptionStyle = (q, op) => {
    const style = "list-group-item";
     if(op !== q.selectedOption)
         return style;
     // you are rendering selected option
     if(op === q.correctOption)
      return style + " bg-success";
     else
       return style + " bg-danger";
   }


   const calculateScore = () => {
    const correctAnswers = allQuestions.filter((q) => q.selectedOption === q.correctOption);
    return correctAnswers.length;
  };


  const calculatePercentage = () => {
    const attemptedQuestions = allQuestions.filter((q) => q.selectedOption !== undefined);
    return (attemptedQuestions.length / allQuestions.length) * 100;
  };


  return (
    <>
  
     <div className="container">
        <Header/>
     <div className="text-center bg-white">
          <h3>Question {index+1}/{allQuestions.length}</h3>
          </div>
         <div className="card my-2" key={q.id}>
         <div className="text-center">
          <img src={imgSrc} alt="" height="200px" width="400px" />
        </div>
           <ul className="list-group list-group-flush">
             {q.options.map((op) => (
              <li
                 key={op}
                className={getOptionStyle(q, op)}
                onClick={() => onSelectOption(q.img, op)}
              >
                 {op}
               </li>
            ))}
          </ul>
         </div>
         <button 
                className="btn btn-primary m-3" 
                onClick={() => setIndex(index - 1)}
                disabled={index === 0}>Pervious</button>

                <button 
                className="btn btn-primary m-3" 
                onClick={() => setIndex(index + 1)}
                disabled={index === allQuestions.length - 1}>Next</button>

 
     <div className="d-flex justify-content-around ">
            <h4 >Total Clicks: {clickCount}</h4>
            <h4>Percentage Attempted: {calculatePercentage().toFixed(2)}%</h4>
            <h4>Your Score: {calculateScore()}</h4>
            </div>

       <Footer/> 
      </div>
    </>
  )
}

export default App
