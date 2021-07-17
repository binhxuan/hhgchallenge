import React from 'react'

interface IProps {
    name?:string;
}

const Login:React.FC<IProps> = (props:IProps) => {
    return (
        <div>
            <span>Hello, {props.name}</span>
        </div>
    )
}

Login.defaultProps = {
    name:'World'
}

export default Login