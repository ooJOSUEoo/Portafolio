import React from 'react'
import { Link } from 'react-router-dom'
export const Pagination = ({data, num}) => {

    //dividir el data en cada 5 elementos
    const numPag = 1 + Math.floor(data.length > 10 ? data.length/10 : 0)

    let array = []

    for (let i = 0; i < numPag; i++) {
        array.push(i)
    }

  return (
    numPag > 1 ?
    <div className='w-100 mt-3'>
        <nav aria-label="Page navigation example" className='d-flex justify-content-end me-5'>
            <ul className="pagination">
                <li className={
                    num === 0 ? 'page-item disabled' : 'page-item'
                }>
                    {
                        num === 0 ?
                        <div className="page-link" aria-label="Previous">
                            <span aria-hidden="true">
                                <i className="fas fa-angle-left"></i>
                            </span>
                            <span className="sr-only">Previous</span>
                        </div>
                        :
                        <Link className="page-link" to={`./#/${num-1}`} aria-label="Previous">
                            <span aria-hidden="true">
                                <i className="fas fa-angle-left"></i>
                            </span>
                            <span className="sr-only">Previous</span>
                        </Link>
                    }
                </li>
                {
                    array.map((item, i) => (
                        <li key={i} className={
                            num === i ? 'page-item active' : 'page-item'
                        }>
                            {
                                num === i ?
                                <div className="page-link" aria-label="Previous">
                                    {i+1}
                                </div>
                                :
                                <Link className="page-link" to={`./#/${i}`} aria-label="Previous">
                                    {i+1}
                                </Link>
                            }
                        </li>
                    ))
                }
                <li className={
                    num === array.length-1 ? 'page-item disabled' : 'page-item'
                }>
                    {
                        num === array.length-1 ?
                        <div className="page-link" aria-label="Previous">
                            <span aria-hidden="true">
                                <i className="fas fa-angle-right"></i>
                            </span>
                            <span className="sr-only">Next</span>
                        </div>
                        :
                        <Link className="page-link" to={`./#/${num+1}`} aria-label="Previous">
                            <span aria-hidden="true">
                                <i className="fas fa-angle-right"></i>
                            </span>
                            <span className="sr-only">Next</span>
                        </Link>
                    }
                </li>
            </ul>
        </nav>       
    </div>
    : null
  )
}
