import "./App.css";
import IdCard from "./components/IdCard";
import Random from "./components/Random";

function App() {
  return (
    <div className="App">
      <h1>LAB | React Training</h1>

      <IdCard
        firstName="John"
        lastName="Doe"
        gender="male"
        height={176}
        birth={new Date("1992-07-14")}
        picture="https://randomuser.me/api/portraits/men/44.jpg"
      />

      <IdCard
        firstName="Delores"
        lastName="Obrien"
        gender="female"
        height={174}
        birth={new Date("1988-05-11")}
        picture="https://randomuser.me/api/portraits/women/44.jpg"
      />

      <Random min={1} max={6} />
      <Random min={1} max={100} />
    </div>
  );
}

export default App;



