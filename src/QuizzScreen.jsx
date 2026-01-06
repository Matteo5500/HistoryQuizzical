import React from "react"
import he from 'he'

export default function QuizScreen(){
    const [dati, setDati] = React.useState()
    const [scelte, setScelte] = React.useState({})
    const [bottone, setBottone] = React.useState(false)
    const [count, setCount] = React.useState(0)

    React.useEffect(()=>{
        fetch(`https://opentdb.com/api.php?amount=5&category=23&type=multiple&nocache=${Date.now()}`)
        .then(res => res.json())
        .then(data => {
            const rawQuestions = data.results
            const formattedQuestions = rawQuestions.map(item =>{
                const decodedQuestion = he.decode(item.question)
                const decodedCorrect = he.decode(item.correct_answer)
                const decodedIncorrects = item.incorrect_answers.map(ans => he.decode(ans))
                const allAnswers = [decodedCorrect, ...decodedIncorrects]
                allAnswers.sort(()=> Math.random() - 0.5)
                return {
                    question: decodedQuestion,
                    correctAnswer: decodedCorrect,
                    incorrectAnswers: decodedIncorrects,
                    allAnswers : allAnswers
                }
            })
            setDati(formattedQuestions)
            })
    },[count])
    console.log(dati)

function getClassName(answer, correct, selected, isEnded) {
    if (!isEnded) {
        return answer === selected ? "selected" : "";
    }
    if (answer === correct) {
        return "green";
    }
    if (answer === selected && answer !== correct) {
        return "red";
    }
    return "dimmed";
}

const risposteCorrette = dati ? dati.filter((item, index) => item.correctAnswer === scelte[index]).length : 0
const punteggio = dati ? dati.length : 0

function handleClick(){
    if(!bottone){
        setBottone(true)
    }else {
        setCount(count + 1)
        setScelte({})
        setBottone(false)
    }
}


    return (
        <>
        {!dati ? <h2>Loading...</h2> : dati.map((item, qindex)=>{
            return(
            <div key={qindex} >
                <h3>{item.question}</h3>  
                {item.allAnswers.map((answer, aindex) => {
                    return <button key={aindex} 
                            onClick={() => setScelte(prevScelte => {
                        return {
                            ...prevScelte,  
                            [qindex]: answer  
                        }
                    })}
                    className={getClassName(answer, item.correctAnswer, scelte[qindex], bottone)}
                    >{answer}</button> 
                })}
            </div>
            )
        })}
        <button className="check-button" onClick={handleClick}>{bottone ? "Play Again" : "Check answers"}</button>
        {bottone && <h3>You scored {risposteCorrette}/{punteggio} correct answers</h3> }
        </>
    )
}
