'use client'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';

const minesweeper = () => {
const {value} = useSelector(state=>state.counter) //reducer part
 
const [mineGrid,setMineGrid] = useState([
    [
        { item: "0", displayed: false },
        { item: "1", displayed: false },
        { item: "2", displayed: false },
        { item: "1", displayed: false },
        { item: "3", displayed: false },
        { item: "💣", displayed: false },
        { item: "💣", displayed: false },
        { item: "1", displayed: false },
        { item: "💣", displayed: false },
        { item: "💣", displayed: false }
        
    ],
    [
        { item: "💣", displayed: false },
        { item: "2", displayed: false },
        { item: "1", displayed: false },
        { item: "1", displayed: false },
        { item: "2", displayed: false },
        { item: "💣", displayed: false },
        { item: "2", displayed: false },
        { item: "1", displayed: false },
        { item: "💣", displayed: false },
        { item: "1", displayed: false }
    ],
    [
        { item: "💣", displayed: false },
        { item: "💣", displayed: false },
        { item: "2", displayed: false },
        { item: "1", displayed: false },
        { item: "2", displayed: false },
        { item: "💣", displayed: false },
        { item: "1", displayed: false },
        { item: "2", displayed: false },
        { item: "1", displayed: false },
        { item: "1", displayed: false }
    ],
    [
        { item: "2", displayed: false },
        { item: "2", displayed: false },
        { item: "💣", displayed: false },
        { item: "💣", displayed: false },
        { item: "3", displayed: false },
        { item: "💣", displayed: false },
        { item: "1", displayed: false },
        { item: "1", displayed: false },
        { item: "1", displayed: false },
        { item: "3", displayed: false }
    ]
]);
const[time,setTime]=useState(10)
useEffect(()=>{
    if(time>0){
       setTimeout(()=>{
        setTime(time-1)
       },1000)
    }},[time])

const [gameOver,setGame]=useState(false)
const [score,setScore]=useState(0)

const handleMineClick=(row,col)=>{
    debugger;
    if (gameOver) {
        return
    }
    const newGrid= [...mineGrid]
    newGrid[row][col].displayed=true
    if (newGrid[row][col].item!=='💣'){
        setScore(score+Number(newGrid[row][col].item))
    
    }
    else if(newGrid[row][col].item==='💣'){
        handleGameOver(newGrid)
    }
 
    

}

const handleGameOver = (grid) => {
    const revealedGrid = grid.map(row =>
        row.map(cell => ({
            ...cell,
            displayed: cell.displayed || cell.item === '💣'
        }))
    );
    setMineGrid(revealedGrid);
    setGame(true);
};

const handleRestart = () => {
    
    setMineGrid(...mineGrid);
    setGame(false);
    setTime(10);
    setScore(0);
};

  return (
    <div className='bg-blue-50'>

        <div className='text-black'><p>MINESWEEPER {value}</p></div>
        <div className='flex text-black'>
            <div className='text-black'>Score: {score}</div>
            <div>Time: {time}</div>
        </div>
        {
            gameOver &&    
            <p className='text-red-500'>You have lost the game...</p>
}
        <div>
        {mineGrid.map((item,id)=>{
            return(
                <div key={id} className='flex text-white'>
                    {item.map((val,idx)=>{
                        return (
                            <div key={idx}  onClick={()=>handleMineClick(id,idx)}
                            className={`w-10 h-10 text-black border border-black 
                            ${val.displayed?'bg-white':'bg-amber-200'}`}>
                                {val.displayed?val.item:""}
                            </div>
                        )
                    })}
                </div>
            )
        })}
        </div>
         {gameOver && (
                <button
                    onClick={handleRestart}
                    className='mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600'
                >
                    Restart Game
                </button>
            )}
    </div>
  )
}

export default minesweeper