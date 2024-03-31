import { useEffect, useState } from "react";
import TransactionForm from "./TransactionForm";
function Transaction(){
    const[transactions,seTransactions]=useState([])
    const addTransaction=(newTransaction)=>{
        seTransactions([...transactions, newTransaction])
    }
useEffect(()=>{
    async function fetchData(){
        try{
            const response = await fetch('http://localhost:3000/transactions')
            if(!response.ok){
                throw new Error('failed')
            }
            const data = await response.json()
          
            seTransactions(data)

        }catch(error){
            console.error('failed',error)
        }
    }fetchData()
},[])
const deleteTransaction =async(id)=>{
    try{
        const response = await fetch(`http://localhost:3000/transactions/${id}`,{
            method:"DELETE"  
        })
        if(!response.ok){
            throw new Error('failed to delete')
        }
        seTransactions(transactions.filter(transactions =>transactions.id !==id))

    }catch(error){
        console.error('failed',error)
    }
}


return(
    <div className="container-fluid">
    
        <div className="table-responsive">
        <TransactionForm addTransaction={addTransaction}/>
            <table className="table table-striped">
                <thead>
                    <tr>
                        <td>Date</td>
                        <td>description</td>
                        <td>category</td>
                        <td>amount</td>
                    </tr>
                </thead>
                <tbody>
                    {transactions.map((item, index)=>(
                        <tr key={index}>
                            <td>{item.date}</td>
                            <td>{item.description}</td>
                            <td>{item.category}</td>
                            <td>{item.amount}</td>
                            <td> 
                            <button onClick ={()=>deleteTransaction(item.id)}>Delete</button>
                           

                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    </div>
)



}export default Transaction