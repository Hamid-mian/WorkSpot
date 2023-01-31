import React from 'react'

export default function PostArea({postData}) {
  
  // const {Title, body, id} = postData
  const styles = {
    moreButton: {
        textDecoration: "none",
        color: "blue",
        fontWeight: "bold",
        marginLeft: "5px"
    }
  }
  return (
    <>
    {postData.map((curElem)=>{
        return(
          <>
          <div className="card mb-2" style={{width: "100%"}} key={curElem.id}>
                    <div className="card-body">
                        <h5 className="card-title text-muted">Title: {curElem.Title}</h5>
                        <h6 className="card-subtitle mb-2 text-muted">Catag:  {curElem.catageory}</h6>
                        <p className="card-text " style={{ width:"95%"}}>
                          Lorem ipsum dolor sit amet consectetur adipisicing elit. Repudiandae, 
                          earum nam nobis quibusdam harum vel dolores mollitia minima voluptate. 
                          Voluptate aperiam minus harum. A nostrum nulla eum rerum culpa maiores.
                          Voluptates facilis, quas fugiat corporis unde eligendi tempora atque pariatur 
                          nostrum consequuntur corrupti sequi explicabo velit dolorem quam provident, 
                          neque necessitatibus amet voluptatibus porro magnam ipsum quae sapiente 
                          exercitationem? Minima.
                          Quas repudiandae molestias, ipsum quae consequuntur officiis ullam saepe, 
                          autem enim nam commodi tempora rem, quaerat perferendis explicabo at velit 
                          veritatis sed facere ea reprehenderit quisquam. Soluta at molestias cumque. 
                          Lorem ipsum dolor sit amet consectetur adipisicing elit. 
                          {curElem.Decription}
                        </p>
                        
                        <span className="btn btn-outline-secondary">Offer: {curElem.price}</span>
                        <a href="/" className="btn btn-primary btn-sm offset-sm-6 offset-md-7 offset-lg-6 offset-xl-9" style={{styles}}>More</a>
                        
                    </div>
                </div>
          </>
        );
      }
      )} 
    </>
  )
}
