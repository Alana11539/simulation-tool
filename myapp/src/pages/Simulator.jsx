import { useParams } from "react-router-dom";
import { useState } from "react";
import {
  FaUserSecret,
  FaNetworkWired,
  FaUsers,
  FaWallet,
  FaServer,
  FaExclamationTriangle,
  FaEthereum
} from "react-icons/fa";
import { MdAccountBalanceWallet } from "react-icons/md";
import '../styles/animation.css'

 function Simulation() {
  const { id } = useParams();

  const [msg, setMsg] = useState("");
  const [notification, setNotification] = useState("");

  const [balance, setBalance] = useState(10);
  const [power, setPower] = useState(30);
  const [nodes, setNodes] = useState(5);
  const [status, setStatus] = useState("ONLINE");

  // phishing states
  const [emailArrived, setEmailArrived] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [loading, setLoading] = useState(false);

  // steps
  const [step, setStep] = useState(0);

  const notify = (text) => setNotification(text);

  /* ================= BACKEND CALL ================= */

  const callBackend = async () => {
    try {
      const res = await fetch(
        `http://localhost:5000/api/simulate/${id}`,
        { method: "POST" }
      );
      return await res.json();
    } catch (err) {
      console.error("Backend error", err);
      return null;
    }
  };

  /* ================= PHISHING ================= */

  const phishing = () => {
    setBalance(10);
    setMsg("Wallet operating normally…");
    setEmailArrived(false);
    setShowLogin(false);

    notify("New login detected from unknown IP");

    setTimeout(() => {
      setEmailArrived(true);
      setMsg("📧 Email received: Urgent wallet verification required!");
    }, 3000);
  };

  const submitPhish = () => {
    setShowLogin(false);
    setLoading(true);
    setMsg("Verifying credentials…");

    setTimeout(() => setBalance(6), 1200);
    setTimeout(() => setBalance(2), 2200);
    setTimeout(() => {
      setBalance(0);
      setLoading(false);
      setMsg("⚠️ PHISHING ATTACK: Fake website. Wallet drained!");
      notify("Funds transferred to unknown address");
    }, 3200);
  };

  /* ================= 51% ATTACK ================= */

  const addFakeMiner = () => {
    setPower(p => {
      const next = p + 7;

      if (next >= 51) {
        setMsg("⚠️ 51% ATTACK: Attacker controls the blockchain!");
        notify("Block reorganization detected!");
        return 51;
      }

      setMsg("Fake miner joined the network");
      notify("Hash rate increasing");
      return next;
    });
  };

  /* ================= SYBIL ================= */

  const connectFakeNode = () => {
    setNodes(n => {
      const next = n + 10;

      if (next >= 50) {
        setMsg("⚠️ SYBIL ATTACK: Fake identities hijacked voting!");
        notify("Network governance compromised");
        return next;
      }

      setMsg("Fake node connected");
      notify("Suspicious peer detected");
      return next;
    });
  };

  /* ================= HOT WALLET ================= */

  const approveDapp = () => {
    setStep(1);
    setMsg("Unlimited approval granted to dApp");
    notify("Approval confirmed");
  };

  const confirmDrain = () => {
    setBalance(0);
    setStep(2);
    setMsg("⚠️ HOT WALLET ATTACK: Malicious approval drained funds!");
    notify("Assets moved to attacker wallet");
  };

  /* ================= EXCHANGE ================= */

  const triggerSuspicious = () => {
    setStatus("DEGRADED");
    setMsg("Unusual withdrawal activity detected");
    notify("Risk systems flagged anomaly");
  };

  const triggerBreach = () => {
    setStatus("BREACHED");
    setMsg("⚠️ EXCHANGE HACK: Withdrawals frozen!");
    notify("Emergency maintenance enabled");
  };

  /* ================= START ================= */

  const start = async () => {
    setMsg("");
    setNotification("");
    setStep(0);

    const data = await callBackend(); // 🔥 BACKEND HIT

    if (id === "phishing") phishing();

    if (id === "fiftyone" || id === "51") {
      setPower(30);
      setMsg("Blockchain running normally…");
      notify("Network stable");
    }

    if (id === "sybil") {
      setNodes(5);
      setMsg("Network stable…");
    }

    if (id === "hotwallet") {
      setBalance(12);
      setMsg("Wallet ready to connect…");
    }

    if (id === "exchange") {
      setStatus("ONLINE");
      setMsg("Exchange operating normally…");
    }
  };

  /* ================= UI ================= */

  return (
    <div className="sim">
      <h1>⚔️ Attack Simulation</h1>

      {notification && <div className="notify">🔔 {notification}</div>}

      {/* PHISHING */}
      {id === "phishing" && (
        <div className="card">
          <FaUserSecret size={42} />

          {!showLogin && emailArrived && (
            <div className="email-card">
              <p><b>From:</b> security@fake-binance.com</p>
              <p>Urgent: Verify your wallet immediately.</p>
              <button onClick={() => setShowLogin(true)}>
                Verify Wallet
              </button>
            </div>
          )}

          {showLogin && (
            <div className="login-card">
              <input placeholder="Email" />
              <input type="password" placeholder="Password" />
              <button onClick={submitPhish}>Submit</button>
            </div>
          )}

          {loading && <p>🔄 Processing…</p>}

          <p className="wallet-line">
            <MdAccountBalanceWallet /> Wallet:
            <span className="coin">
              <FaEthereum /> {balance} ETH
            </span>
          </p>
        </div>
      )}

      {/* 51% */}
      {(id === "fiftyone" || id === "51") && (
        <div className="card">
          <FaNetworkWired size={42} />
          <div className="bar">
            <div className="fill" style={{ width: `${power}%` }} />
          </div>
          <p>Attacker Power: {power}%</p>

          {power < 51 && (
            <button onClick={addFakeMiner}>
              Add Fake Miner
            </button>
          )}
        </div>
      )}

      {/* SYBIL */}
      {id === "sybil" && (
        <div className="card">
          <FaUsers size={42} />
          <p>Network Nodes: {nodes}</p>
          <button onClick={connectFakeNode}>
            Connect Fake Node
          </button>
        </div>
      )}

      {/* HOT WALLET */}
      {id === "hotwallet" && (
        <div className="card">
          <FaWallet size={42} />

          {step === 0 && (
            <button onClick={approveDapp}>
              Approve dApp
            </button>
          )}

          {step === 1 && (
            <button onClick={confirmDrain}>
              Confirm Transaction
            </button>
          )}

          <p className="wallet-line">
            <MdAccountBalanceWallet /> Wallet:
            <span className="coin">
              <FaEthereum /> {balance} ETH
            </span>
          </p>
        </div>
      )}

      {/* EXCHANGE */}
      {id === "exchange" && (
        <div className="card">
          <FaServer size={42} />
          <p>Status: <b>{status}</b></p>

          {status === "ONLINE" && (
            <button onClick={triggerSuspicious}>
              Trigger Suspicious Activity
            </button>
          )}

          {status === "DEGRADED" && (
            <button onClick={triggerBreach}>
              Trigger Breach
            </button>
          )}
        </div>
      )}

      <button className="btn" onClick={start}>
        <FaExclamationTriangle /> Start Attack
      </button>

      <p className="alert">{msg}</p>
      <small className="disc">Educational simulation only</small>
    </div>
  );
}

export default Simulation;