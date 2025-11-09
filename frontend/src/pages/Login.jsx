import { useState } from "react";
import axios from "axios";
const API = import.meta.env.VITE_API_URL || "http://localhost:5000";

export default function Login(){
  const [email, setEmail] = useState("doctor@demo.com");
  const [password, setPassword] = useState("Demo@123");
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");

  const submit = async (e)=>{
    e.preventDefault(); setErr(""); setLoading(true);
    try{
      const { data } = await axios.post(`${API}/api/auth/login`, { email, password });
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));
      window.location.href = "/";
    }catch(e){
      setErr(e?.response?.data?.message || "Login failed");
    }finally{ setLoading(false); }
  }

  return (
    <div className="container">
      <h1>Smart Hospital — Login</h1>
      <form onSubmit={submit}>
        <div className="row">
          <input placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)} style={{flex:1}} />
          <input placeholder="Password" type="password" value={password} onChange={e=>setPassword(e.target.value)} style={{flex:1}} />
        </div>
        <div style={{marginTop:12}}>
          <button className="btn" disabled={loading}>{loading ? "Logging in..." : "Login"}</button>
        </div>
        {err && <p style={{color:'crimson'}}>{err}</p>}
        <p style={{opacity:.7, marginTop:8}}>Demo: doctor@demo.com / Demo@123</p>
      </form>
    </div>
  );
}
