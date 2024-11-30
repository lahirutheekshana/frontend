import React from "react";
import axios from "axios";
import { useEffect, useState } from "react";
import "./Create.css";
import { Link, useNavigate } from "react-router-dom";

export default function Create() {
  const [plans, setPlans] = useState([]);


  const [name, setName] = useState("");
  const [accStart, setStart] = useState("");
  const [risk, setRisk] = useState("");
  const [riskReward, setReward] = useState("");
  const [winLoss, setWinLoss] = useState("");
  const [email, setEmail] = useState("");

  const fetchData = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3000/app/trading/viewPlans",
        {
          params: {
            user_email: email,
          },
        }
      );
      setPlans(response.data.plans);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };



  const PostData = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:3000/app/trading/createPlan", {
        p_name: name,
        p_accstart: accStart,
        p_typicalrisk: risk,
        p_riskreward: riskReward,
        p_winloss: winLoss,
        user_email: email
      })
      .then((response) => {
        fetchData();
        alert("Plan Created Successfully");
      })
      .catch((error) => {
        console.error("Error creating plan:", error);
      });
  };
  
  

  const handleUpdate = (p_name) => {
    axios
      .put("http://localhost:3000/app/trading/updatePlan", {
        p_name: p_name,
        p_accstart: accStart,
        p_typicalrisk: risk,
        p_riskreward: riskReward,
        p_winloss: winLoss
      })
      .then((response) => {
        alert("Plan Updated Successfully");
        fetchData();
      })
      .catch((error) => console.log(error));
  };


  const handleDelete = async (p_name) => {
    try {
      const response = await axios.delete("http://localhost:3000/app/trading/deletePlan", {
        params: {
           p_name,
        },
      }
      );
      alert("Plan Deleted Successfully")
      fetchData();
      console.log("Deleted:", response.data);
    } catch (error) {
      console.error("Error deleting:", error);
    }
  };

  return (
    <>
      <div className="leftBar1">
        <div>
          <h2>CREATE PLAN</h2>
          <div />
          <form action="">
            <label htmlFor="Email">Email:</label>
            <br />
            <input
              type="email"
              id="Email"
              name="Email"
              class="field"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <br />

            <label htmlFor="name">Name:</label>
            <br />
            <input
              type="text"
              id="name"
              name="name"
              class="field"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
            <br />

            <label htmlFor="Start">Account Start:</label>
            <br />
            <input
              type="text"
              id="Start"
              name="Start"
              class="field"
              value={accStart}
              onChange={(e) => setStart(e.target.value)}
              required
            />
            <br />

            <label htmlFor="Risk">Risk:</label>
            <br />
            <input
              type="text"
              id="Risk"
              name="Risk"
              class="field"
              value={risk}
              onChange={(e) => setRisk(e.target.value)}
              required
            />
            <br />

            <label htmlFor="Reward">Risk Reward:</label>
            <br />
            <input
              type="text"
              id="Reward"
              name="Reward"
              class="field"
              value={riskReward}
              onChange={(e) => setReward(e.target.value)}
              required
            />
            <br />

            <label htmlFor="Win">Win/Loss:</label>
            <br />
            <input
              type="text"
              id="Win"
              name="Win"
              class="field"
              value={winLoss}
              onChange={(e) => setWinLoss(e.target.value)}
              required
            />
            <br />

            <input
              type="submit"
              onClick={PostData}
              value="Create"
              class="btn"
            />
            <input type="button" onClick={fetchData} value="View" class="btn" />
          </form>
        </div>

        <div className="asiri">
          <div className="container1">
            <div className="header">
              <h2>MANAGE PLANS</h2>
            </div>
            <div className="tables">
              <div class="upperBar"></div>
              <div class="Header">
                <h1>Manage Plans</h1>
              </div>
              <div class="table-container">
                <table class="responsive-table">
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>Name</th>
                      <th>Date</th>
                      <th>Start</th>
                      <th> Risk</th>
                      <th> Reward </th>
                      <th> Win/Loss </th>
                      <th> User Id </th>
                      <th> Action </th>
                    </tr>
                  </thead>
                  <tbody>
                    {plans.map((plan) => (
                      <tr key={plan.p_id}>
                        <td>{plan.p_id}</td>
                        <td>{plan.p_name}</td>
                        <td>{plan.p_date}</td>
                        <td>{plan.p_accstart}</td>
                        <td>{plan.p_typicalrisk}</td>
                        <td>{plan.p_riskreward}</td>
                        <td>{plan.p_winloss}</td>
                        <td>{plan.p_userid}</td>
                        <td>
                          <button
                            className="update-btn"
                            onClick={() => handleUpdate(plan.p_name)}
                          >
                            Update
                          </button>
                          <button
                            className="delete-btn"
                            onClick={() => handleDelete(plan.p_name)}
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div class="lowerBar"></div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}


