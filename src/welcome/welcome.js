import { useEffect, useState } from "react";

function Welcome(){
    /* 
         A Hook is a special function that lets you “hook into” React features.
         For example, useState is a Hook that lets you add React state to function components.
    */
    const [count, setCount] = useState(0);
    const [array, setArray] = useState([]);
    const [count1, setOtherCount] = useState(0);
    // const [array, setArray] = useState('');
    const handleClick =()=>{
        setCount(count + 1);
        // setArray(array + count);   //for string 
        setArray([...array, count]);  // for array
        // const arr = array.push(count);
        // setArray(array);  //for array 
    }
    // function handleClick(){
    //     setCount(count + 1);
    //     setArray([...array, count]);
    // }
    const handleOtherClick = ()=>{
        setOtherCount(count1 + 1);
    }

    /* useEffect hook is a combination of componentDidMount componentDidUpdate and 
       componentWillUnmount lifecycle methods
       Multiple useEffect's will be executed in the order they are specified 
       Cleanup:  It cleans up the previous effects before applying the next effects. */
    useEffect(()=>{
        console.log('Use effect Fired');
        //clean-up function is executed after every re-render
        return function (){console.log('Clean-up in order')}
    });
    useEffect(()=>{
        console.log('Second use effect');
    });
    useEffect(()=>{
        console.log('Third use effect');
    });
    /* pass a second parameter to useEffect to conditionally execute the effect
       the variables specified in the array will be compared with their previous 
       values and if they have changed then the effect will be executed
       In the dependencies array include all the props and state var that change over time
       and are used by the effect*/
    useEffect(()=>{
        console.log('This effect runs only when the count var is different ');
    },[count]);
    /* Passing an empty array will execute this effect only once on mounting and 
       once after unmounting */
    useEffect(()=>{
        console.log('Effect with an empty array');
    },[]);
    return(
        <>
            <h1>Hello World!</h1>
            {typeof(array) }
            {
                array.map((ele,index)=>` index ${index}: ${ele} `)
            }
            <div>{array}</div>
            <div>{count}</div>
            <button onClick={handleClick}>Click me</button>
            {count1}
            <button onClick={handleOtherClick}>Other me</button>
        </>
    );
}

export default Welcome;