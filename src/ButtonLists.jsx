import Button from './Button'
const ButtonLists =  ({ start, stop, reset }) => {

    return (
        <div className='watch-buttons'>
            <Button action={start} name='Start' />
            <Button action={stop} name='Stop' />
            <Button action={reset} name='Reset' />
        </div>
    )
}

export default ButtonLists;