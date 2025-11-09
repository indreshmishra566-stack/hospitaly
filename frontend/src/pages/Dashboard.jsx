import React, { useEffect, useState } from "react";
import axios from "axios";

const API = import.meta.env.VITE_API_URL || "http://localhost:10000";

export default function Dashboard() {
  const [vitals, setVitals] = useState([]);
  const [error, setError] = useState("");

  const token = localStorage.getItem("token");

  useEffect(() => {
    (async () => {
      try {
        const { data } = await axios.get(`${API}/api/vitals`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setVitals(data.vitals || []);
      } catch (e) {
        setError(e?.response?.data?.error || "Failed to fetch vitals");
      }
    })();
  }, [token]);

  const logout = () => {
    localStorage.removeItem("token");
    window.location.href = "/";
  };

  return (
    <div className="wrapper">
      <div className="card">
        <div className="row">
          <h2>Patient Vitals</h2>
          <button className="link" onClick={logout}>Logout</button>
        </div>
        {error && <div className="error">{error}</div>}
        <div className="table">
          <div className="tr head">
            <div>Patient</div>
            <div>HR</div>
            <div>BP</div>
            <div>SPO₂</div>
            <div>Temp (°F)</div>
            <div>Time</div>
          </div>
          {vitals.map((v) => (
            <div key={v._id} className="tr">
              <div>{v.patientName}</div>
              <div>{v.heartRate}</div>
              <div>{v.bpSystolic}/{v.bpDiastolic}</div>
              <div>{v.spo2}</div>
              <div>{v.temperature.toFixed(1)}</div>
              <div>{new Date(v.createdAt).toLocaleString()}</div>
            </div>
          ))}
          {!vitals.length && <div className="muted">No data yet</div>}
        </div>
      </div>
    </div>
  );
}
