import React from 'react'

function MainDashboard() {
    const OrdType="Active Jobs";
  return (
    <>
      <div className="main d-flex flex-column">
            <div className="DashNav bg-white border m-3 d-flex justify-content-between p-3">
                <p className="fw-bold fs-4 m-1 text-muted">
                    {OrdType}     
                </p>

                <div className="dropdown">
                    <button className="btn btn-outline-secondary dropdown-toggle h-75 pt-1" type="button" id="dropdownMenu2" data-bs-toggle="dropdown" aria-expanded="false">
                        {OrdType}
                    </button>
                    <ul className="dropdown-menu" aria-labelledby="dropdownMenu2">
                        <li><button className="dropdown-item" type="button">All Orders</button></li>
                        <li><button className="dropdown-item" type="button">Active Orders</button></li>
                        <li><button className="dropdown-item" type="button">Completed Orders</button></li>
                    </ul>
                </div>
            </div>

            <div className="orderDetail bg-white border m-3 d-flex flex-column p-3">
                <div className="row">
                    <div className="col">1</div>
                    <div className="col">2</div>
                    <div className="col">3</div>
                </div>
                <div className="d-flex justify-content-between p-1">
                    <div className="p-1">tee</div>
                    <div className="p-1">button</div>
                </div>
            </div>

      </div>
    </>
  )
}

export default MainDashboard
