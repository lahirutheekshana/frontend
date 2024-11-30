import React from 'react';
import axios from "axios";
import { useEffect, useState } from "react";
import './Dashboard.css'

const Dashboard = () => {
    const userEmail = sessionStorage.getItem('userEmail');
    const [finalTrades, setFinalTrade] = useState([]);
    const [finalPlans, setFinalPlan] = useState([]);
    const [userName, setUserName] = useState([]);

    const fetchData = async () => {
        try {
          const response = await axios.get(
            "http://localhost:8085/trading-app/tradesx",
            {
              params: {
                email: userEmail,
              },
            }
          );
          setFinalTrade(response.data);
        } catch (error) {
          console.error("Error fetching data:", error);
        }
    };

    const FetchPlan = async () => {
        try {
          const response = await axios.get(
            "http://localhost:8083/trading-app/plansz",
            {
              params: {
                email: userEmail,
              },
            }
          );
          setFinalPlan(response.data);
        } catch (error) {
          console.error("Error fetching data:", error);
        }
    };

    const getUserByEmail = async () => {
        try {
          const response = await axios.get(
            "http://localhost:8081/trading-app/usersx",
            {
              params: {
                email: userEmail,
              },
            }
          );
          setUserName(response.data);
        } catch (error) {
          console.error("Error fetching data:", error);
        }
    };


    useEffect(() => {
        fetchData(); 
        FetchPlan();
        getUserByEmail();
    }, []);

    return (
        <body>
            <div class="container">
                <nav>
                    <ul>
                        <li><a href="#" class="logo">
                            <img src="/Assets/logo TPlan.png" alt="" />
                            <span class="nav-item">TPLAN</span>
                        </a></li>

                        <li><a href="/Dashboard" id="btnDash" onclick="openDashboard()">
                            <i class="fa-solid fa-laptop"></i>
                            <span class="nav-item">DashBoard</span>
                        </a></li>

                        <li><a href="/Create" id="btnCustomer">
                            <i class="fa-solid fa-user"></i>
                            <span class="nav-item">Create Plan</span>
                        </a></li>

                        <li><a href="/Calculate" id="btnManager" onclick="openManager()">
                            <i class="fa-solid fa-list-check"></i>
                            <span class="nav-item">Calculate income</span>
                        </a></li>

                        <li><a href="/Track" id="btnDelivery" onclick="openDelivery()">
                            <i class="fa-solid fa-truck"></i>
                            <span class="nav-item">Track Trade</span>
                        </a></li>

                        <li class="logout"><a href="#" id="btnLogOut">
                            <i class="fa-solid fa-power-off"></i>
                            <span class="nav-item">Log Out</span>
                        </a>
                        </li>
                    </ul>
                </nav>

                <section class="main" id="main">
                    <div className="middle-up">
                        <div className="MiddleUpText">
                           <h1> WELCOME , {userName.firstName} </h1>
                           <p> Exporer You Trading Journey With Valueble Money Management Strategies</p>
                        </div>    
                    </div>
                    <div className="middle">
                        <div class="main-top">
                            <h1>Trade Details</h1>
                        </div>
                        <div class="upperContainer">
                            <div class="cardItem">
                                <div class="item" id="item1">
                                    <i class="fa-solid fa-spinner"></i>
                                    <h3>Last Added</h3>
                                    <h4><label class="amountPen">{finalTrades.name}</label></h4><br />
                                </div>
                                <div class="item" id="item2">
                                    <i class="fa-solid fa-spinner"></i>
                                    <h3>Start</h3>
                                    <h4><label class="amountPen">{finalTrades.capital}</label></h4><br />
                                </div>
                                <div class="item" id="item3">
                                    <i class="fa-solid fa-spinner"></i>
                                    <h3>Typical Risk</h3>
                                    <h4><label class="amountPen">{finalTrades.riskAmount}</label></h4><br />
                                </div>
                                <div class="item" id="item4">
                                    <i class="fa-solid fa-spinner"></i>
                                    <h3>Status</h3>
                                    <h4><label class="amountPen">{finalTrades.winLoss}</label></h4><br />
                                </div>
                            </div>
                        </div>

                        <div class="main-top">
                            <h1>Plan Details</h1>
                        </div>
                        <div class="main-skills">
                            <div class="card">
                                <i class="fa-solid fa-spinner"></i>
                                <h3>Last Added</h3>
                                <h4><label class="amountPen">{finalPlans.name}</label></h4><br />
                                <p>Recently Added Plan</p>
                            </div>
                            <div class="card">
                                <i class="fa-solid fa-thumbs-up"></i>
                                <h3>Capital</h3>
                                <h4><label class="amountCom">{finalPlans.accStart}</label></h4><br />
                                <p>Account Entry Price</p>
                            </div>
                            <div class="card">
                                <i class="fa-regular fa-circle-stop"></i>
                                <h3>Risk(%)</h3>
                                <h4><label class="amount">{finalPlans.risk}</label></h4><br />
                                <p>Percentage From Capital</p>
                            </div>
                            <div class="card">
                                <i class="fa-regular fa-circle-stop"></i>
                                <h3>Risk Reward (1:X)</h3>
                                <h4><label class="amount">{finalPlans.riskReward}</label></h4><br />
                                <p>Willing to Risk</p>
                            </div>
                            <div class="card">
                                <i class="fa-regular fa-circle-stop"></i>
                                <h3>Win/Loss(%)</h3>
                                <h4><label class="amount">{finalPlans.winLoss}</label></h4><br />
                                <p>Willing Win or Loss</p>
                            </div>
                        </div><br />
                    </div>
                </section>


                              {/*Side Bar Menus*/}


                <section class="customer_dash" id="customer_dash" >
                      
                </section>

                <section class="manager_dash" id="manager_dash">
                      
                </section>

                <section class="delivery_dash" id="delivery_dash">

                </section>

                <section class="menu_dash" id="menu_dash">

                </section>

            </div>

    
        </body>

    );
}

export default Dashboard;



