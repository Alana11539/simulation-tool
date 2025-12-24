import { useState, useEffect } from 'react';
import { FaExclamationTriangle } from "react-icons/fa";
import { MdRefresh } from "react-icons/md";

function FiftyOneAttackView({ attackData, onAddMiner, onCreateTransaction, msg, notification, onStart, isRunning }) {
  const [networkStats, setNetworkStats] = useState({
    honestHashRate: 50,
    attackerHashRate: 0,
    attackerPercentage: 0,
    honestPercentage: 100
  });

  const [blocks, setBlocks] = useState([]);
  const [pendingTransaction, setPendingTransaction] = useState(null);
  const [attackPhase, setAttackPhase] = useState('preparing');

  // Mock data for demonstration
  const honestMiners = [
    { id: 'h1', hashRate: 15, name: 'MiningPool A', x: 50, y: 100 },
    { id: 'h2', hashRate: 12, name: 'MiningPool B', x: 150, y: 80 },
    { id: 'h3', hashRate: 10, name: 'Solo Miner 1', x: 250, y: 120 },
    { id: 'h4', hashRate: 8, name: 'MiningPool C', x: 350, y: 90 },
    { id: 'h5', hashRate: 5, name: 'Solo Miner 2', x: 450, y: 110 }
  ];

  const [attackerMiners, setAttackerMiners] = useState([]);

  useEffect(() => {
    // Simulate real-time block creation
    const interval = setInterval(() => {
      if (Math.random() > 0.7) { // 30% chance every 2 seconds
        const isAttackerBlock = Math.random() < (networkStats.attackerPercentage / 100);
        const newBlock = {
          index: blocks.length,
          hash: `block_${blocks.length}_${Math.random().toString(36).substr(2, 6)}`,
          miner: isAttackerBlock ? 'attacker' : 'honest',
          timestamp: Date.now(),
          transactions: []
        };
        setBlocks(prev => [...prev, newBlock]);
      }
    }, 2000);

    return () => clearInterval(interval);
  }, [blocks.length, networkStats.attackerPercentage]);

  const addAttackerMiner = () => {
    const hashRates = [8, 10, 12, 15];
    const names = ['Botnet Farm', 'ASIC Rig', 'Cloud Mining', 'Mining Pool'];
    const hashRate = hashRates[Math.floor(Math.random() * hashRates.length)];
    const name = names[Math.floor(Math.random() * names.length)];

    const newMiner = {
      id: `attacker-${attackerMiners.length + 1}`,
      hashRate,
      name,
      x: Math.random() * 500 + 50,
      y: Math.random() * 150 + 50
    };

    setAttackerMiners(prev => [...prev, newMiner]);
    setNetworkStats(prev => {
      const newAttackerHash = prev.attackerHashRate + hashRate;
      const total = prev.honestHashRate + newAttackerHash;
      return {
        ...prev,
        attackerHashRate: newAttackerHash,
        attackerPercentage: (newAttackerHash / total) * 100,
        honestPercentage: (prev.honestHashRate / total) * 100
      };
    });

    if (onAddMiner) onAddMiner(hashRate, name);
  };

  const createTransaction = () => {
    const transaction = {
      id: `tx_${Date.now()}`,
      amount: 10,
      from: 'user_wallet',
      to: 'merchant_wallet',
      status: 'pending'
    };
    setPendingTransaction(transaction);
  };

  const attemptDoubleSpend = () => {
    if (networkStats.attackerPercentage >= 51 && pendingTransaction) {
      // Simulate double spend by creating competing chain
      setAttackPhase('attacking');
      setTimeout(() => {
        setPendingTransaction(prev => ({ ...prev, status: 'reversed' }));
      }, 3000);
    }
  };

  return (
    <div className="fifty-one-attack-container">
      {/* Network Visualization */}
      <div className="network-visualization">
        <div className="network-header">
          <h3>⛓ Network Mining Pools</h3>
          <div className="network-stats">
            <span className="honest-hash">🔵 Honest: {networkStats.honestHashRate} TH/s ({networkStats.honestPercentage.toFixed(1)}%)</span>
            <span className="attacker-hash">🔴 Attacker: {networkStats.attackerHashRate} TH/s ({networkStats.attackerPercentage.toFixed(1)}%)</span>
          </div>
        </div>

        <div className="network-graph">
          <svg width="600" height="200" viewBox="0 0 600 200">
            {/* Honest miners */}
            {honestMiners.map((miner, index) => (
              <g key={miner.id}>
                <circle
                  cx={miner.x}
                  cy={miner.y}
                  r={Math.sqrt(miner.hashRate) * 2}
                  fill="#2563eb"
                  stroke="#1d4ed8"
                  strokeWidth="2"
                  opacity="0.8"
                />
                <text x={miner.x} y={miner.y - 15} textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">
                  {miner.name}
                </text>
                <text x={miner.x} y={miner.y + 25} textAnchor="middle" fill="#94a3b8" fontSize="9">
                  {miner.hashRate} TH/s
                </text>
              </g>
            ))}

            {/* Attacker miners */}
            {attackerMiners.map((miner, index) => (
              <g key={miner.id}>
                <circle
                  cx={miner.x}
                  cy={miner.y}
                  r={Math.sqrt(miner.hashRate) * 2}
                  fill="#dc2626"
                  stroke="#b91c1c"
                  strokeWidth="2"
                  opacity="0.8"
                  className="attacker-miner"
                  style={{
                    animation: 'minerDeploy 0.8s ease-out'
                  }}
                />
                <text x={miner.x} y={miner.y - 15} textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">
                  {miner.name}
                </text>
                <text x={miner.x} y={miner.y + 25} textAnchor="middle" fill="#fca5a5" fontSize="9">
                  {miner.hashRate} TH/s
                </text>
              </g>
            ))}
          </svg>
        </div>

        {/* Hash Power Distribution */}
        <div className="hash-distribution">
          <div className="distribution-bar">
            <div
              className="honest-fill"
              style={{ width: `${networkStats.honestPercentage}%` }}
            />
            <div
              className="attacker-fill"
              style={{ width: `${networkStats.attackerPercentage}%` }}
            />
          </div>
          <div className="distribution-labels">
            <span>Network Control Distribution</span>
            {networkStats.attackerPercentage >= 51 && (
              <span className="control-alert">⚠️ ATTACKER CONTROLS MAJORITY</span>
            )}
          </div>
        </div>
      </div>

      {/* Blockchain Visualization */}
      <div className="blockchain-view">
        <h3>📦 Recent Blocks</h3>
        <div className="block-chain">
          {blocks.slice(-6).map((block, index) => (
            <div
              key={block.hash}
              className={`block-item ${block.miner === 'attacker' ? 'attacker-block' : 'honest-block'}`}
            >
              <div className="block-header">
                <span className="block-index">#{block.index}</span>
                <span className={`block-miner ${block.miner}`}>{block.miner}</span>
              </div>
              <div className="block-hash">{block.hash.slice(0, 12)}...</div>
              <div className="block-time">{new Date(block.timestamp).toLocaleTimeString()}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Attack Controls */}
      <div className="attack-controls">
        {networkStats.attackerPercentage < 51 && (
          <button className="btn add-miner-btn" onClick={addAttackerMiner}>
            ⚡ Deploy Mining Rig
          </button>
        )}

        {networkStats.attackerPercentage >= 30 && networkStats.attackerPercentage < 51 && (
          <div className="phase-indicator">
            <span className="phase-text">📈 Gaining Network Control...</span>
          </div>
        )}

        {networkStats.attackerPercentage >= 51 && !pendingTransaction && (
          <div className="control-actions">
            <button className="btn transaction-btn" onClick={createTransaction}>
              💸 Make Transaction
            </button>
            <div className="control-message">
              🎯 <strong>ATTACKER CONTROLS THE NETWORK</strong>
              <p>You can now perform double-spend attacks and prevent confirmations</p>
            </div>
          </div>
        )}

        {pendingTransaction && (
          <div className="transaction-panel">
            <div className="pending-transaction">
              <h4>Pending Transaction</h4>
              <div className="tx-details">
                <span>Amount: {pendingTransaction.amount} BTC</span>
                <span>Status: <span className={`status-${pendingTransaction.status}`}>{pendingTransaction.status}</span></span>
              </div>
              {networkStats.attackerPercentage >= 51 && pendingTransaction.status === 'pending' && (
                <button className="btn danger-btn" onClick={attemptDoubleSpend}>
                  🔄 Attempt Double-Spend
                </button>
              )}
            </div>
          </div>
        )}

        {attackPhase === 'attacking' && (
          <div className="attack-result">
            <div className="success-alert">
              🚨 <strong>DOUBLE-SPEND ATTACK SUCCESSFUL</strong>
              <p>Attacker created longer chain, reversing the transaction</p>
            </div>
          </div>
        )}
      </div>

      <div className="status-display">
        <h4>Status:</h4>
        <div className="status-message">{msg || "Ready to start simulation"}</div>
        {notification && <div className="notify status-notify">🔔 {notification}</div>}
        <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', alignItems: 'center' }}>
          <button className="btn" onClick={onStart} disabled={isRunning}>
            {isRunning ? 'Running...' : <><FaExclamationTriangle /> Start Attack</>}
          </button>
          {isRunning && (
            <button className="btn" onClick={onStart} style={{ padding: '12px 16px' }}>
              <MdRefresh /> Restart
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default FiftyOneAttackView;
