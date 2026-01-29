import { useState } from 'react' 



export default function App(){
  const [num, setNum] = useState(0);

  function handleIncrement(){
    setNum(num + 1);
  }

  return (
    <>
      <DisplayNumber number = {num} />
      <DisplayNumber number = {num} />
      <br></br>
      <IncrementButton onIncrement = {handleIncrement} />
    </>
  );
}

function DisplayNumber({number})
{
  return (
    <h2>{number}</h2>
  );
}

function IncrementButton({onIncrement})
{
  return (
    
    <button onClick = {onIncrement}
    style = {{fontSize: '24px',
      padding: '12px 24px',
      backgroundColor: '#4CAF50',
      color: 'white',
      border: 'solid',
      borderRadius: '4px',
      cursor: 'pointer'
    }}
    >
      +
    </button>
  );
}