// src/components/NFTViewer.js
import React, { useState } from 'react';
import axios from 'axios';

const NFTViewer = () => {
  const [walletAddress, setWalletAddress] = useState('');
  const [nfts, setNfts] = useState([]);
  const [loading, setLoading] = useState(false);

  // Function to handle fetching NFTs
  const fetchNFTs = async () => {
    setLoading(true);
    try {
      // Call the actual Multichain API to fetch NFTs
      const response = await axios.get(
        `https://api.multichain.org/v1/nfts/${walletAddress}`,
        {
          headers: {
            'Authorization': `Bearer YOUR_API_KEY`,  // Replace with your actual API key
          }
        }
      );
      setNfts(response.data.nfts);  // Adjust based on the actual API response structure
    } catch (error) {
      console.error('Error fetching NFTs:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="nft-viewer">
      <h2>Cross-Chain NFT Viewer</h2>
      <input
        type="text"
        placeholder="Enter Wallet Address"
        value={walletAddress}
        onChange={(e) => setWalletAddress(e.target.value)}
      />
      <button onClick={fetchNFTs} disabled={!walletAddress || loading}>
        {loading ? 'Fetching NFTs...' : 'View NFTs'}
          </button>

          {/* NFT Display */}
          <div className="nft-grid">
              {nfts.length > 0 ? (
                  nfts.map((nft, index) => (
                      <div key={index} className="nft-item">
                          <img src={nft.image_url} alt={nft.name} />
                          <h3>{nft.name}</h3>
                          <p>{nft.description}</p>
                      </div>
                  ))
              ) : (
                  <p>No NFTs found for this wallet.</p>
              )}
          </div>
      </div>
  );
};

export default NFTViewer;
