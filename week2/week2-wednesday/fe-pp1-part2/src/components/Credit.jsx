import "./CreditCard.css";
import visa from "../assets/images/visa.png"
function CreditCard(props) {
  const last4 = String(props.number).slice(-4);
  const mm = String(props.expirationMonth).padStart(2, "0");
  const yy = String(props.expirationYear).slice(-2);
  return (
    <div className="main-div">

      <div className="th-div">
        
        <img src={visa} /><p>{props.type}</p>
        <p> •••• •••• •••• {last4} </p>
        <strong>expiration <p>{mm}/{yy}</p></strong> 
        <p>{props.bank} </p>
        <p>{props.owner} </p>
      </div>
    </div>
  )
}

export default CreditCard