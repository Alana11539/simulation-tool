import { motion } from "framer-motion";

 function BlockchainView({ chain }) {
  return (
    <motion.div className="panel">
      <h3>⛓ Blockchain</h3>
      <div style={{ display: "flex" }}>
        {chain.map(block => (
          <motion.div
            key={block.index}
            style={{
              border: "1px solid #00f7ff",
              padding: "10px",
              marginRight: "10px"
            }}
            animate={{ scale: [1, 1.1, 1] }}
          >
            <p>Block #{block.index}</p>
            <p>{block.hash}</p>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
export default BlockchainView;