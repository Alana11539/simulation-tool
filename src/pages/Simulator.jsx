import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import {
  FaUserSecret,
  FaNetworkWired,
  FaUsers,
  FaWallet,
  FaServer,
  FaExclamationTriangle,
  FaEthereum
} from "react-icons/fa";
import { MdAccountBalanceWallet, MdRefresh } from "react-icons/md";
import FiftyOneAttackView from "../components/FiftyOneAttackView";
import '../styles/animation.css'


 function Simulation() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [msg, setMsg] = useState("");
  const [notification, setNotification] = useState("");
  const [isRunning, setIsRunning] = useState(false);

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

  // Hot wallet specific states
  const [dAppConnected, setDAppConnected] = useState(false);
  const [approvalGranted, setApprovalGranted] = useState(false);
  const [drainingTransactions, setDrainingTransactions] = useState([]);
  const [processingIndex, setProcessingIndex] = useState(-1);

  // Refs for transaction items
  const txRefs = useRef([]);

  // Exchange-specific states
  const [exchangeStats, setExchangeStats] = useState({
    totalAssets: 2500000,
    activeUsers: 125000,
    dailyVolume: 450000,
    hotWalletBalance: 150000,
    securityAlerts: 0,
    breachDetected: false
  });

  const [transactions, setTransactions] = useState([
    { id: 'tx1', amount: 25000, status: 'completed', suspicious: false },
    { id: 'tx2', amount: 18500, status: 'completed', suspicious: false },
    { id: 'tx3', amount: 42000, status: 'completed', suspicious: false },
    { id: 'tx4', amount: 31000, status: 'completed', suspicious: false },
    { id: 'tx5', amount: 67500, status: 'completed', suspicious: false }
  ]);

  const [securityLogs, setSecurityLogs] = useState([
    { time: '10:23', event: 'User login from new IP', level: 'info' },
    { time: '10:15', event: 'API rate limit exceeded', level: 'warning' },
    { time: '10:08', event: 'Database backup completed', level: 'info' }
  ]);

  const notify = (text) => setNotification(text);
  const attackImages = {
  phishing: [
    "/phishing1.jpg",
    "/phishing2.jpg",
  ],
  fiftyone: [
    "/51-1.png",
    "/51-3.jpg",
  ],
  '51': [
    "/51-1.png",
     "/51-3.jpg",
  ],
  sybil: [
    "/sybil1.jpg",
    "/sybil3.png",

  ],
  hotwallet: [
    "/hot1.jpg",
    "/hot3.jpg",

  ],
  exchange: [
    "/e1.jpg",
    "/e3.jpg",
  ],
};
const [slide, setSlide] = useState(0);
const attackKey = id === "51" ? "fiftyone" : id;
const images = attackImages[attackKey] || [];

useEffect(() => {
  if (images.length === 0) return;

  const interval = setInterval(() => {
    setSlide(prev => (prev + 1) % images.length);
  }, 3000); // 3 sec

  return () => clearInterval(interval);
}, [images]);

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

    // Hide email completely and focus on wallet draining animation
    setEmailArrived(false);

    setTimeout(() => {
      setBalance(6);
      setMsg("🔄 Transferring funds...");
      notify("Large withdrawal detected");
    }, 2500);

    setTimeout(() => {
      setBalance(2);
      setMsg("⚠️ Unusual activity detected!");
      notify("Security alert triggered");
    }, 5000);

    setTimeout(() => {
      setBalance(0);
      setLoading(false);
      setMsg("💸 PHISHING ATTACK: Wallet completely drained!");
      notify("All funds stolen - Account compromised");
      setIsRunning(false);
    }, 7500);
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

  const [sybilStep, setSybilStep] = useState(0);
  const [honestNodes, setHonestNodes] = useState(5);
  const [sybilNodes, setSybilNodes] = useState(0);
  const [attackerInfluence, setAttackerInfluence] = useState(0);
  const [networkNodes, setNetworkNodes] = useState([]);

  const startSybilAttack = () => {
    setSybilStep(1);
    setHonestNodes(5);
    setSybilNodes(0);
    setAttackerInfluence(0);
    setMsg("Network operating normally with 5 honest nodes");
    notify("Distributed network established");

    // Initialize network with honest nodes
    const initialNodes = Array.from({ length: 5 }, (_, i) => ({
      id: `honest-${i}`,
      type: 'honest',
      x: Math.random() * 300 + 50,
      y: Math.random() * 150 + 50
    }));
    setNetworkNodes(initialNodes);
  };

  const createSybilNodes = (count) => {
    const newSybilNodes = Array.from({ length: count }, (_, i) => ({
      id: `sybil-${sybilNodes + i}`,
      type: 'sybil',
      x: Math.random() * 300 + 50,
      y: Math.random() * 150 + 50
    }));

    setNetworkNodes(prev => [...prev, ...newSybilNodes]);
    setSybilNodes(prev => prev + count);
    setAttackerInfluence(Math.round(((sybilNodes + count) / (honestNodes + sybilNodes + count)) * 100));

    return count;
  };

  const addFewSybilNodes = () => {
    const added = createSybilNodes(3);
    setSybilStep(2);
    setMsg(`Added ${added} fake nodes. Attacker influence: ${Math.round((sybilNodes + added) / (honestNodes + sybilNodes + added) * 100)}%`);
    notify("Suspicious nodes detected in network");
  };

  const floodNetwork = () => {
    const added = createSybilNodes(20);
    setSybilStep(3);
    const newInfluence = Math.round((sybilNodes + added) / (honestNodes + sybilNodes + added) * 100);
    setAttackerInfluence(newInfluence);
    setMsg(`Network flooded with ${added} additional fake nodes! Attacker influence: ${newInfluence}%`);
    notify("Massive node creation detected");
  };

  const achieveMajority = () => {
    const targetInfluence = 55;
    const currentTotal = honestNodes + sybilNodes;
    const neededSybil = Math.ceil((targetInfluence / 100 * currentTotal - sybilNodes) / (1 - targetInfluence / 100));
    const added = createSybilNodes(neededSybil);
    setSybilStep(4);
    setAttackerInfluence(Math.max(attackerInfluence, targetInfluence));
    setMsg(`🚨 SYBIL ATTACK COMPLETE: Attacker achieved ${Math.max(attackerInfluence, targetInfluence)}% consensus control!`);
    notify("Network governance compromised - attacker controls voting");
  };

  /* ================= HOT WALLET ================= */

  const connectToDApp = () => {
    setDAppConnected(true);
    setStep(1);
    setMsg("Connected to YieldFarm DeFi platform");
    notify("Wallet connected to dApp");
  };

  const showApprovalDialog = () => {
    setStep(2);
    setMsg("Review token approval request");
    notify("Approval dialog opened");
  };

  const grantApproval = () => {
    setApprovalGranted(true);
    setStep(3);
    setMsg("⚠️ Unlimited approval granted to malicious contract!");
    notify("Dangerous approval confirmed - unlimited spend allowed");

    // Start draining process
    const drainingTxs = [
      { hash: "0xabc123def456...", amount: 4.5, gas: 0.01, to: "0x7f8e9a0b1c2d...", status: "pending" },
      { hash: "0xdef456ghi789...", amount: 3.2, gas: 0.008, to: "0x3e4f5a6b7c8d...", status: "pending" },
      { hash: "0xghi789jkl012...", amount: 4.3, gas: 0.009, to: "0x7f8e9a0b1c2d...", status: "pending" }
    ];

    setDrainingTransactions(drainingTxs);

    // Animate draining over time
    let currentBalance = 12;
    drainingTxs.forEach((tx, index) => {
      setTimeout(() => {
        setDrainingTransactions(prev =>
          prev.map((t, i) => i === index ? { ...t, status: "completed" } : t)
        );
        setProcessingIndex(index);
        currentBalance -= tx.amount;
        setBalance(Math.max(0, currentBalance));
        setMsg(`💸 Transaction ${index + 1} completed - ${tx.amount} ETH drained!`);
        notify(`Funds sent to ${tx.to.slice(0, 10)}...`);

        // Scroll to center the currently processing transaction
        setTimeout(() => {
          if (txRefs.current[index]) {
            txRefs.current[index].scrollIntoView({
              behavior: 'smooth',
              block: 'center'
            });
          }
        }, 100);
      }, (index + 1) * 2000);
    });

    setTimeout(() => {
      setStep(4);
      setProcessingIndex(-1);
      setMsg("🚨 HOT WALLET ATTACK COMPLETE: All funds drained via malicious approval!");
      notify("Wallet completely compromised");
    }, drainingTxs.length * 2000 + 1000);
  };

  /* ================= EXCHANGE ================= */

  const triggerSuspicious = () => {
    setStatus("DEGRADED");
    setExchangeStats(prev => ({
      ...prev,
      securityAlerts: prev.securityAlerts + 3
    }));

    setSecurityLogs(prev => [{
      time: new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}),
      event: 'Large withdrawal pattern detected',
      level: 'warning'
    }, ...prev.slice(0, 4)]);

    setMsg("🔍 Suspicious withdrawal patterns detected");
    notify("Security systems analyzing anomalies");

    setTimeout(() => {
      setSecurityLogs(prev => [{
        time: new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}),
        event: 'API endpoint vulnerability exploited',
        level: 'critical'
      }, ...prev.slice(0, 4)]);
      setMsg("🚨 API vulnerability exploited!");
      notify("Intrusion detected - escalating response");
    }, 2000);
  };

  const triggerBreach = () => {
    setStatus("BREACHED");
    setExchangeStats(prev => ({
      ...prev,
      breachDetected: true,
      securityAlerts: prev.securityAlerts + 5,
      hotWalletBalance: Math.max(0, prev.hotWalletBalance - 75000)
    }));

    // Add large suspicious transactions
    const newTransactions = [
      { id: 'tx6', amount: 50000, status: 'pending', suspicious: true },
      { id: 'tx7', amount: 25000, status: 'completed', suspicious: true },
      { id: 'tx8', amount: 150000, status: 'completed', suspicious: true }
    ];

    setTransactions(prev => [...newTransactions, ...prev.slice(0, 2)]);

    setSecurityLogs(prev => [{
      time: new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}),
      event: 'HOT WALLET BREACH - Large fund transfer initiated',
      level: 'critical'
    }, {
      time: new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}),
      event: 'Emergency withdrawal freeze activated',
      level: 'alert'
    }, ...prev.slice(0, 3)]);

    setMsg("🚨 CRITICAL BREACH: Hot wallet compromised!");
    notify("All withdrawals frozen - investigating breach");

    // Animate fund draining
    setTimeout(() => {
      setExchangeStats(prev => ({
        ...prev,
        hotWalletBalance: Math.max(0, prev.hotWalletBalance - 35000)
      }));
      setMsg("💸 Massive fund transfers detected!");
      notify("$350K transferred to unknown addresses");
    }, 1500);

    setTimeout(() => {
      setExchangeStats(prev => ({
        ...prev,
        hotWalletBalance: Math.max(0, prev.hotWalletBalance - 25000)
      }));
      setMsg("⚠️ EXCHANGE UNDER ATTACK: Security team mobilized!");
      notify("Law enforcement notified - forensic analysis underway");
    }, 3000);
  };

  /* ================= START ================= */

  const start = async () => {
    setIsRunning(true);
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
      setSybilStep(0);
      setHonestNodes(5);
      setSybilNodes(0);
      setAttackerInfluence(0);
      setNetworkNodes([]);
      setNodes(5);
      setMsg("Network stable…");
    }

    if (id === "hotwallet") {
      setBalance(12);
      setStep(0);
      setDAppConnected(false);
      setApprovalGranted(false);
      setDrainingTransactions([]);
      setMsg("Wallet ready to connect…");
    }

    if (id === "exchange") {
      setStatus("ONLINE");
      setMsg("Exchange operating normally…");
    }
  };

  /* ================= UI ================= */

  return (
    <div className="sim" style={{ position: 'relative' }}>
      <button
        onClick={() => navigate('/')}
        style={{
          position: 'absolute',
          top: '20px',
          left: '20px',
          width: '50px',
          height: '50px',
          borderRadius: '50%',
          border: '2px solid #374151',
          background: '#111827',
          color: '#e5e7eb',
          fontSize: '20px',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          transition: 'background 0.2s ease',
        }}
        onMouseEnter={(e) => e.target.style.background = '#1f2937'}
        onMouseLeave={(e) => e.target.style.background = '#111827'}
      >
        ←
      </button>
      <h1>⚔️ Attack Simulation</h1>
          <img
      src={images[slide]}
      alt="attack visual"
      className="carousel-img"
    />

      {/* PHISHING */}
      {id === "phishing" && (
        <div className={`card ${msg === "💸 PHISHING ATTACK: Wallet completely drained!" ? "card-danger" : ""}`}>
          <FaUserSecret size={42} />

          {!showLogin && emailArrived && (
            <div className="email-card">
              <div className="email-header">
                <div className="email-sender-info">
                  <div className="sender-avatar">B</div>
                  <div className="sender-details">
                    <div className="sender-name">Binance Security</div>
                    <div className="sender-email">security@binance.com</div>
                  </div>
                  <div className="email-date">2:30 PM</div>
                </div>
                <div className="email-subject-line">
                  <span className="email-subject">🚨 URGENT: Wallet Security Alert</span>
                </div>
              </div>

              <div className="email-body">
                <p>Dear Valued Customer,</p>

                <p>We have detected unusual activity on your Binance account. To ensure the security of your funds, we require immediate verification of your wallet credentials.</p>

                <p><strong>Failure to verify within 24 hours may result in temporary account suspension.</strong></p>

                <p>Please click the button below to securely verify your wallet:</p>

                <div className="email-actions">
                  <button onClick={() => setShowLogin(true)} className="email-button">
                    🔐 Verify Wallet Security
                  </button>
                  <div className="button-warning">
                    ⚠ This link will take you to binance.com
                  </div>
                </div>

                <p className="email-footer">
                  This is an automated security notification from Binance.<br/>
                  If you did not request this verification, please ignore this email.
                </p>
              </div>
            </div>
          )}

          {showLogin && (
            <div className="login-card">
              <h3>Binance Account Verification</h3>
              <p className="login-header">Please verify your identity to secure your account</p>
              <input placeholder="Email Address" />
              <input type="password" placeholder="Password" />
              <button onClick={submitPhish}>Verify Account</button>
            </div>
          )}

          {loading && <p>🔄 Processing…</p>}

          <p className={`wallet-line ${loading ? 'draining' : ''}`}>
            <MdAccountBalanceWallet /> Wallet:
            <span className={`coin ${loading ? 'draining' : balance === 0 ? 'empty' : ''}`}>
              <FaEthereum /> {balance} ETH
            </span>
          </p>

          <div className="status-display">
            <h4>Status:</h4>
            <div className="status-message">{msg || "Ready to start simulation"}</div>
            {notification && <div className="notify status-notify">🔔 {notification}</div>}
            <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', alignItems: 'center' }}>
              {!isRunning && msg !== "💸 PHISHING ATTACK: Wallet completely drained!" && (
                <button onClick={start}>Start Attack</button>
              )}
              {msg === "💸 PHISHING ATTACK: Wallet completely drained!" && (
                <button className="btn primary" onClick={start}>
                  Restart Attack
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* 51% */}
      {(id === "fiftyone" || id === "51") && (
        <FiftyOneAttackView
          attackData={{}}
          onAddMiner={(hashRate, name) => {
            // Update backend when miner is added
            console.log(`Added miner: ${name} with ${hashRate} TH/s`);
          }}
          onCreateTransaction={() => {
            console.log('Transaction created');
          }}
          msg={msg}
          notification={notification}
          onStart={start}
          isRunning={isRunning}
        />
      )}

      {/* SYBIL */}
      {id === "sybil" && (
        <div className="sybil-attack-container">
          {/* Network Visualization */}
          <div className="network-visualization">
            <div className="network-header">
              <FaUsers size={32} />
              <div className="network-info">
                <h3>Network Topology</h3>
                <div className="node-stats">
                  <span className="honest-nodes">🔵 Honest: {honestNodes}</span>
                  <span className="sybil-nodes">🔴 Sybil: {sybilNodes}</span>
                  <span className="total-nodes">Total: {honestNodes + sybilNodes}</span>
                </div>
              </div>
            </div>

            <div className="network-graph">
              <svg width="400" height="250" viewBox="0 0 400 250">
                {/* Attacker node in center */}
                {sybilStep >= 2 && (
                  <g>
                    <circle cx="200" cy="125" r="15" fill="#dc2626" stroke="#991b1b" strokeWidth="3" />
                    <text x="200" y="130" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">ATTACKER</text>
                  </g>
                )}

                {/* Network nodes */}
                {networkNodes.map((node, index) => (
                  <g key={node.id}>
                    <circle
                      cx={node.x}
                      cy={node.y}
                      r="8"
                      fill={node.type === 'honest' ? '#2563eb' : '#dc2626'}
                      stroke={node.type === 'honest' ? '#1d4ed8' : '#991b1b'}
                      strokeWidth="2"
                      className={node.type === 'sybil' ? 'sybil-node' : 'honest-node'}
                      style={{
                        animation: node.type === 'sybil' ? 'nodeAppear 0.5s ease-out' : 'none'
                      }}
                    />
                    {/* Connection lines from sybil nodes to attacker */}
                    {node.type === 'sybil' && sybilStep >= 2 && (
                      <line
                        x1={node.x}
                        y1={node.y}
                        x2="200"
                        y2="125"
                        stroke="#dc2626"
                        strokeWidth="2"
                        strokeDasharray="5,5"
                        opacity="0.7"
                        className="connection-line"
                      />
                    )}
                  </g>
                ))}
              </svg>
            </div>

            {/* Influence Meter */}
            <div className="influence-meter">
              <div className="meter-label">
                Attacker Consensus Control
              </div>
              <div className="meter-bar">
                <div
                  className="meter-fill"
                  style={{
                    width: `${Math.min(attackerInfluence, 100)}%`,
                    background: attackerInfluence >= 51 ? 'linear-gradient(90deg, #dc2626, #991b1b)' : 'linear-gradient(90deg, #f59e0b, #d97706)'
                  }}
                />
              </div>
              <div className="meter-value">{attackerInfluence}%</div>
            </div>
          </div>

          {/* Attack Controls */}
          <div className="sybil-controls">
            {sybilStep === 0 && (
              <button className="btn" onClick={startSybilAttack}>
                🌐 Initialize Network
              </button>
            )}

            {sybilStep === 1 && (
              <button className="btn" onClick={addFewSybilNodes}>
                ➕ Add Few Fake Nodes
              </button>
            )}

            {sybilStep === 2 && (
              <button className="btn" onClick={floodNetwork}>
                🌊 Flood Network
              </button>
            )}

            {sybilStep === 3 && attackerInfluence < 51 && (
              <button className="btn danger-btn" onClick={achieveMajority}>
                🎯 Achieve Majority Control
              </button>
            )}

            {sybilStep === 4 && (
              <div className="attack-success">
                <div className="success-message">
                  🚨 <strong>SYBIL ATTACK SUCCESSFUL</strong>
                  <p>Attacker now controls network consensus and governance</p>
                </div>
              </div>
            )}
          </div>

          <div className="status-display">
            <h4>Status:</h4>
            <div className="status-message">{msg || "Ready to start simulation"}</div>
            {notification && <div className="notify status-notify">🔔 {notification}</div>}
            <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', alignItems: 'center' }}>
              <button className="btn" onClick={start} disabled={isRunning}>
                {isRunning ? 'Running...' : <><FaExclamationTriangle /> Start Attack</>}
              </button>
              {isRunning && (
                <button className="btn" onClick={start} style={{ padding: '12px 16px' }}>
                  <MdRefresh /> Restart
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* HOT WALLET */}
      {id === "hotwallet" && (
        <div className={`hot-wallet-container ${step >= 3 ? 'under-attack' : ''}`}>
          {/* DeFi dApp Interface */}
          {step === 0 && (
            <div className="defi-dapp">
              <div className="dapp-header">
                <div className="dapp-logo">🌾</div>
                <div className="dapp-info">
                  <h3>YieldFarm DeFi</h3>
                  <p>High-yield farming protocol</p>
                  <div className="dapp-stats">
                    <span>TVL: $2.4M</span>
                    <span>APY: 127%</span>
                  </div>
                </div>
              </div>
              <div className="dapp-content">
                <p>Connect your wallet to start earning rewards on your crypto assets!</p>
                <button className="connect-btn" onClick={connectToDApp}>
                  🔗 Connect Wallet
                </button>
              </div>
            </div>
          )}

          {/* Connected State */}
          {dAppConnected && step === 1 && (
            <div className="defi-dapp connected">
              <div className="dapp-header">
                <div className="dapp-logo">🌾</div>
                <div className="dapp-info">
                  <h3>YieldFarm DeFi</h3>
                  <p className="connected-status">✅ Wallet Connected</p>
                </div>
              </div>
              <div className="dapp-content">
                <p>To participate in yield farming, you need to approve the protocol to spend your tokens.</p>
                <button className="approve-btn" onClick={showApprovalDialog}>
                  ⚠️ Approve Token Spend
                </button>
              </div>
            </div>
          )}

          {/* Approval Dialog */}
          {step === 2 && (
            <div className="approval-dialog">
              <div className="dialog-header">
                <h3>🔐 Token Approval Request</h3>
                <p>YieldFarm DeFi wants permission to spend your tokens</p>
              </div>
              <div className="approval-details">
                <div className="contract-info">
                  <strong>Contract:</strong> 0x7f8e9a0b1c2d3e4f5a6b7c8d9e0f1a2b3c4d5e6f
                  <span className="warning-badge">⚠️ Unlimited</span>
                </div>
                <div className="spend-amount">
                  <strong>Spend Limit:</strong> Unlimited ETH
                </div>
                <div className="risk-warning">
                  <p>⚠️ <strong>Danger:</strong> Granting unlimited approval allows the contract to spend all your tokens without further permission.</p>
                  <p>This is extremely risky in DeFi!</p>
                </div>
              </div>
              <div className="dialog-actions">
                <button className="cancel-btn" onClick={() => setStep(1)}>
                  Cancel
                </button>
                <button className="danger-btn" onClick={grantApproval}>
                  ⚠️ Approve Unlimited
                </button>
              </div>
            </div>
          )}

          {/* Draining in Progress */}
          {step >= 3 && step < 4 && (
            <div className="draining-progress">
              <div className="attack-alert">
                🚨 <strong>MALICIOUS CONTRACT ACTIVATED!</strong>
              </div>
              <div className="transaction-history">
                <h4>Recent Transactions</h4>
                <div className="tx-list">
                  {drainingTransactions.map((tx, index) => (
                    <div
                      key={index}
                      ref={(el) => (txRefs.current[index] = el)}
                      className={`tx-item ${tx.status === 'completed' ? 'completed' : 'pending'} ${processingIndex === index ? 'processing' : ''}`}
                    >
                      <div className="tx-hash">{tx.hash.slice(0, 20)}...</div>
                      <div className="tx-details">
                        <span className="tx-amount">-{tx.amount} ETH</span>
                        <span className="tx-gas">Gas: {tx.gas} ETH</span>
                        <span className={`tx-status ${tx.status}`}>{tx.status}</span>
                      </div>
                      <div className="tx-to">To: {tx.to.slice(0, 15)}...</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Attack Complete */}
          {step === 4 && (
            <div className="attack-complete">
              <div className="final-alert">
                💀 <strong>WALLET DESTROYED</strong>
                <p>All funds drained through malicious token approval</p>
              </div>
            </div>
          )}

          <div className="status-display">
            <h4>Status:</h4>
            <div className="status-message">{msg || "Ready to start simulation"}</div>
            {notification && <div className="notify status-notify">🔔 {notification}</div>}
            <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', alignItems: 'center' }}>
              <button className="btn" onClick={start} disabled={isRunning}>
                {isRunning ? 'Running...' : <><FaExclamationTriangle /> Start Attack</>}
              </button>
              {isRunning && (
                <button className="btn" onClick={start} style={{ padding: '12px 16px' }}>
                  <MdRefresh /> Restart
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Wallet Balance - Outside and positioned at right middle */}
      {id === "hotwallet" && (
        <div className={`wallet-balance ${balance <= 0 ? 'drained' : step >= 3 ? 'draining' : ''}`}>
          <MdAccountBalanceWallet size={24} />
          <span className="balance-amount">
            <FaEthereum /> {balance.toFixed(2)} ETH
          </span>
        </div>
      )}

      {/* EXCHANGE */}
      {id === "exchange" && (
        <div className="exchange-dashboard">
          {/* Exchange Header */}
          <div className="exchange-header">
            <FaServer size={32} />
            <div className="exchange-title">
              <h3>CryptoExchange Pro</h3>
              <span className={`status-badge status-${status.toLowerCase()}`}>
                {status}
              </span>
            </div>
          </div>

          {/* Key Metrics */}
          <div className="exchange-metrics">
            <div className="metric-card">
              <div className="metric-label">Total Assets</div>
              <div className="metric-value">${exchangeStats.totalAssets.toLocaleString()}</div>
            </div>
            <div className="metric-card">
              <div className="metric-label">Active Users</div>
              <div className="metric-value">{exchangeStats.activeUsers.toLocaleString()}</div>
            </div>
            <div className="metric-card">
              <div className="metric-label">24h Volume</div>
              <div className="metric-value">${exchangeStats.dailyVolume.toLocaleString()}</div>
            </div>
            <div className="metric-card">
              <div className="metric-label">Hot Wallet</div>
              <div className={`metric-value ${exchangeStats.breachDetected ? 'breached' : ''}`}>
                ${exchangeStats.hotWalletBalance.toLocaleString()}
              </div>
            </div>
          </div>

          {/* Security Monitoring */}
          <div className="security-panel">
            <div className="panel-header">
              <h4>🔒 Security Monitoring</h4>
              <span className="alert-count">
                {exchangeStats.securityAlerts} alerts
              </span>
            </div>

            <div className="security-logs">
              {securityLogs.map((log, index) => (
                <div key={index} className={`log-entry log-${log.level}`}>
                  <span className="log-time">{log.time}</span>
                  <span className="log-message">{log.event}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Transaction Monitor */}
          <div className="transaction-panel">
            <div className="panel-header">
              <h4>💸 Recent Transactions</h4>
            </div>

            <div className="transaction-list">
              {transactions.map((tx) => (
                <div key={tx.id} className={`transaction-item ${tx.suspicious ? 'suspicious' : ''}`}>
                  <div className="tx-info">
                    <span className="tx-id">{tx.id.toUpperCase()}</span>
                    <span className={`tx-status status-${tx.status}`}>
                      {tx.status}
                    </span>
                  </div>
                  <div className="tx-amount">
                    ${tx.amount.toLocaleString()}
                    {tx.suspicious && <span className="suspicious-flag">⚠️</span>}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="exchange-actions">
            {status === "ONLINE" && (
              <button className="action-btn suspicious-btn" onClick={triggerSuspicious}>
                🔍 Trigger Suspicious Activity
              </button>
            )}

            {status === "DEGRADED" && (
              <button className="action-btn breach-btn" onClick={triggerBreach}>
                🚨 Trigger Full Breach
              </button>
            )}

            {status === "BREACHED" && (
              <div className="breach-notice">
                <div className="breach-alert">
                  🚨 EMERGENCY: Exchange operations suspended. All withdrawals frozen.
                </div>
                <div className="breach-details">
                  Security team investigating • Law enforcement notified • User funds secured
                </div>
              </div>
            )}
          </div>

          <div className="status-display">
            <h4>Status:</h4>
            <div className="status-message">{msg || "Ready to start simulation"}</div>
            {notification && <div className="notify status-notify">🔔 {notification}</div>}
            <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', alignItems: 'center' }}>
              <button className="btn" onClick={start} disabled={isRunning}>
                {isRunning ? 'Running...' : <><FaExclamationTriangle /> Start Attack</>}
              </button>
              {isRunning && (
                <button className="btn" onClick={start} style={{ padding: '12px 16px' }}>
                  <MdRefresh /> Restart
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      <small className="disc">Educational simulation only</small>
       {images.length > 0 && (
  <div className="carousel">
    <button onClick={() => setSlide((slide === 0 ? images.length - 1 : slide - 1))}>⟨</button>

  </div>
)}
    </div>

  );
}

export default Simulation;
