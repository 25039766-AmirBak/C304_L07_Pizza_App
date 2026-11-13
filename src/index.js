import React, {useState} from 'react';
import ReactDOM from 'react-dom/client';
import pizzaData from './data.js';
import Order from './components/Order.js';
import './index.css';

function Header (props) {
  return (
    <header className= "header">
      <h1>Andy's Pizza Co.</h1>
      {props.isOpen && (<p>Authentic Italian cuisine, all from our stone oven</p>)}
    </header>
  )
}

function Pizza (props) {
  return (
    <div className= {`pizza ${props.soldOut ? "sold-out" : ""}`}>
      <img src= {props.photoName} alt= {props.name} />
      <h3>{props.name}</h3>
      <p>{props.ingredients}</p>
      <span>{props.soldOut ? "Sold Out" : `$${props.price.toFixed(2)}`}</span>
      {props.isPopular && (<span className= "badge">Chef's pick</span>)}
    </div>
  )
}

function Menu () {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredPizzas = pizzaData.filter((pizza) =>
    pizza.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return(
  <div className= "menu">
    <h2>Our Menu</h2>
          <input
        type="text"
        className="search-input"
        placeholder="Search for a pizza..."
        value={searchTerm}
        onChange={(event) => setSearchTerm(event.target.value)}
      />

    <ul className= 'pizzas'>
      {filteredPizzas.length>0 ? (
        filteredPizzas.map((pizza) => (
          <Pizza 
           name= {pizza.name}
           ingredients= {pizza.ingredients}
           price= {pizza.price}
           photoName= {pizza.photoName}
           soldOut={pizza.soldOut}
           isPopular={pizza.isPopular}
        />
      ))
    ) : (
      <p className="no-results">Pizza not found</p>
    )}
    </ul>
  </div>
  );
}

function Footer (props) {
  return (
      <footer className= "footer">
        {props.isOpen ? (
          <Order />
        ) : (
          <p>We're currently closed</p>
        )}
      </footer>
  )
}

function App() {
  const currentTime= new Date().getHours();
  const isOpen= currentTime >= 10 && currentTime< 22;
  // const isOpen= true;
  return (
  <div className= "container">
   <Header isOpen={isOpen} />
   <Menu />
   <Footer isOpen={isOpen} />
  </div>  
   )
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);

