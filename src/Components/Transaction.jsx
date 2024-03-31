import { useEffect,useState } from "react";
function Transaction(){
    const[transactions, setTransactions]=useState([])
    useEffect(()=>{
        async function fetchData(){
            try{
                const response = await fetch('http://localhost:3000/transactions');
                if(!response.ok){
                    throw new Error('failed')
                }
                const data = await response.json()
                setTransactions(data)

            }catch(error){
                console.error('failed',error)
            }
        }
    },[])
    return(
        <div className="container-fluid">
        <div className="table-responsive">
            <table className="table table-stripped">
            <thead>
                <tr>
                <th scope="col">Date</th>
                <th scope="col">Description</th>
                <th scope="col">Category</th>
                <th scope="col">Amount</th>

                </tr>
            </thead>
            <tbody>
                {transactions.map((item,index)=>(
                    <tr key={index}>
                        <td>{item.date}</td>
                        <td>{item.description}</td>
                        <td>{item.category}</td>
                        <td>{item.amount}</td>
                    </tr>
                ))}
            </tbody>

            </table>
        </div>

        </div>
    )

}export default Transaction