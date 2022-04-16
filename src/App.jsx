import React,{ useState,useEffect } from 'react';
import './App.css';
import Header from './components/Header';
import AddressBar from './components/AddressBar';
import Balance from './components/Balance';
import DaiInput from './components/DaiInput';
import TransactionLogs from './components/TransactionLogs';

function App() {

  const tarr = [
    {
      type: 'stake',
      amount: 400
    },
    {
      type: 'unstake',
      amount: 130
    },
    {
      type: 'stake',
      amount: 90
    },
    {
      type: 'earn',
      amount: 70
    }
  ]

  return (
    <div className="container App">
      <Header/>
      <AddressBar/>
      <Balance/>
      <DaiInput/>
      <TransactionLogs transactions={tarr.reverse()}/>
      <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Fugit ducimus cumque quibusdam vel dolorem voluptas ipsam officiis laudantium dicta deserunt? Sequi tempore saepe magnam incidunt similique, unde atque quo dignissimos?</p>
    </div>
  );
}

export default App;
