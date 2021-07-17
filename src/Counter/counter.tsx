import React, {useState} from 'react'

import { Button } from 'rsuite';

import './counter.scss'

interface IProps {
    
}

const CounterCon:React.FC<IProps> = (props:IProps) => {

    const [count, setCount] = useState<number>(0)

    const add = () => {
        setCount(count + 1)
    }

    const reset = () => {
        setCount(0)
    }

    return (
        <div className="countercon">
            <div id="countval">{count}</div>
            <div id="btncount">
                <Button appearance="primary" onClick={(e) => {add()}}>Increase</Button>
            </div>
            <div id="btnreset">
                <Button onClick={(e) => {reset()}}>Reset</Button>
            </div>
        </div>
    )
}

export default CounterCon