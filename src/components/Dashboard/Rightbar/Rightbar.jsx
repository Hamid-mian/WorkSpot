import React from 'react'

function Rightbar({postData}) {
  return (
    <>
    
            <div className="card mb-4" style={{width: "85%"}}>
              <div className="card text-center">
                <div className="card-header">
                  Featured
                </div>
                <div className="card-body">
                  <h5 className="card-title">Special title treatment</h5>
                  <p className="card-text">With supporting text below as a natural lead-in to additional content.</p>
                  <a href="/" className="btn btn-primary">Go somewhere</a>
                </div>
                <div className="card-footer text-muted">
                  2 days ago
                </div>
              </div>
            </div>

            <div className="card mb-2" style={{width: "75%"}}>
              <div className="card text-center">
                <div className="card-header">
                  Featured
                </div>
                <div className="card-body">
                  <h5 className="card-title">Special title treatment</h5>
                  <p className="card-text">With supporting text below as a natural lead-in to additional content.</p>
                  <a href="/" className="btn btn-primary">Go somewhere</a>
                </div>
                <div className="card-footer text-muted">
                  2 days ago
                </div>
              </div>
            </div>
      
    </>
  )
}

export default Rightbar
