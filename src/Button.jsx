
const Button = ({ action, name }) => 
<button onClick={action} className={name}>{name}</button>;

export default Button;