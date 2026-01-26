
import Credit from "./components/Credit.jsx";
function App() {
  return (
    <div className="App">
      <h1> LAB | React Training</h1>
      <Credit
  type="Visa"
  number="0123456789018875"
  expirationMonth={3}
  expirationYear={2021}
  bank="BNP"
  owner="Maxence Bouret"
  bgColor="#11aa99"
  color="white" 
/>
    
<Credit
  type="Master Card"
  number="0123456789010993"
  expirationMonth={3}
  expirationYear={2021}
  bank="N26"
  owner="Maxence Bouret"
  bgColor="#eeeeee"
  color="#222222"
/>
    
<Credit
  type="Visa"
  number="0123456789016982"
  expirationMonth={12}
  expirationYear={2019}
  bank="Name of the Bank"
  owner="Firstname Lastname"
  bgColor="#ddbb55"
  color="white" 
/>
    </div>
  );
}

export default App;
