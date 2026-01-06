import React from "react"

export default function StartScreen(props){
    return (
        <div class="startScreen">
            <h1> HistoryQuizzical </h1>
            <p>My friend if you're ready to play click the botton below👇🏻👇🏻👇🏻 </p>
            <button class="startButton" onClick={props.start}>Start quiz</button>
        </div>
    )
}