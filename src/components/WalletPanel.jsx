import { motion } from "framer-motion";

function WalletPanel({ wallets }) {
  return (
    <motion.div
      className="panel"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <h3>💼 Wallets</h3>
      {Object.keys(wallets).map(key => (
        <p key={key}>
          {key.toUpperCase()} : {wallets[key].balance}
        </p>
      ))}
    </motion.div>
  );
}
export default WalletPanel;