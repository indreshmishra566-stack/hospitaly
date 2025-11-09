import { useEffect, useState } from "react";
import axios from "axios";
const API = import.meta.env.VITE_API_URL || "http://localhost:5000";

export default function Dashboard(){
  const [rows, setRows] = useState([]);
  const [user, setUser] = useState(null);

  function logout(){ localStorage.clear(); window.location.href = "/login"; }

  useEffect(()=>{
    const u = localStorage.getItem("user"); if(u) setUser(JSON.parse(u));
    const token = localStorage.getItem("token");
    axios.get(`${API}/api/vitals`, { headers: { Authorization: `Bearer ${token}` } })
      .then(res=> setRows(res.data.data))
      .catch(()=> setRows([]));
  },[]);

  return (
    <div className="container">
      <div style={{display:'flex', justifyContent:'space-between', alignItems:'center'}}>
        <h1>Smart Hospital Dashboard</h1>
        <button className="btn" onClick={logout}>Logout</button>
      </div>
      <div className="card" style={{marginTop:8}}>
        {user ? <b>Welcome, {user.name} ({user.role})</b> : null}
        <div>Backend: <code>{API}</code></div>
      </div>

      <table className="table">
        <thead><tr><th>Patient</th><th>Heart Rate</th><th>SpO₂</th><th>Temp (°F)</th><th>Recorded</th></tr></thead>
        <tbody>
          {rows.map(r=>(
            <tr key={r._id}>
              <td>{r.patientName}</td>
              <td>{r.heartRate}</td>
              <td>{r.spo2}</td>
              <td>{r.temperature.toFixed ? r.temperature.toFixed(1) : r.temperature}</td>
              <td>{new Date(r.recordedAt).toLocaleString()}</td>
            </tr>
          ))}
          {rows.length===0 && <tr><td colSpan="5">No data yet. Make sure seed ran & VITE_API_URL points to backend.</td></tr>}
        </tbody>
      </table>
    </div>
  );
}
