import React from 'react'

const Footer = () => (
    <div className="footer">
        <p className="footer-item">&copy; Idea Fusion, Inc.</p>
        <p className="footer-item">Version: {chrome.runtime.getManifest().version}</p>
    </div>
)

export default Footer