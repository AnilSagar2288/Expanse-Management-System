import { Progress } from 'antd'
import React from 'react'

const Analytics = ({allTarnsaction}) => {
    const categories = ['salary','tip','project','food','movie','bills','medical','fee','tax']


    //Total Transaction
    const totalTransaction = allTarnsaction.length    
    const totalIncomeTransactions = allTarnsaction.filter(transaction => transaction.type === 'income')
    const totalExpanseTransactions = allTarnsaction.filter(transaction => transaction.type === 'expense')    
    const totalIncomePercent = (totalIncomeTransactions.length / totalTransaction ) * 100
    const totalExpansePercent = (totalExpanseTransactions.length / totalTransaction ) * 100

    //Total turnover
    const totalTurnover = allTarnsaction.reduce((acc, transaction) => acc + transaction.amount,0)
    const totalIncomeTurnover = allTarnsaction.filter(transaction => transaction.type === 'income').reduce((acc,transaction) => acc + transaction.amount, 0)
    const totalExpanceTurnover = allTarnsaction.filter(transaction => transaction.type === 'expense').reduce((acc,transaction) => acc + transaction.amount, 0)
    const totalIncomeTurnoverPercent = (totalIncomeTurnover / totalTurnover ) * 100
    const totalExpanseTurnoverPercent = (totalExpanceTurnover / totalTurnover ) * 100
  return (
    <>
    <div className='row m-3'>
        <div className="col-md-6">
            <div className="card">
                <div className="card-header">
                    Total Transaction: {totalTransaction}    
                </div>  
                <div className="card-body">
                    <h5 className='text-success'>Income: {totalIncomeTransactions.length}</h5>
                    <h5 className='text-danger'>Expanse: {totalExpanseTransactions.length}</h5>    
                    <div>
                        <Progress type='circle' strokeColor={'green'} className='mx-2' percent={totalIncomePercent.toFixed(0)} />
                        <Progress type='circle' strokeColor={'red'} className='mx-2' percent={totalExpansePercent.toFixed(0)} />
                    </div>
                </div>  
            </div>    
        </div>
        <div className="col-md-6">
            <div className="card">
                <div className="card-header">
                    Total Turnover: {totalTurnover}    
                </div>  
                <div className="card-body">
                    <h5 className='text-success'>Income Turnover: {totalIncomeTurnover}</h5>
                    <h5 className='text-danger'>Expanse Turnover: {totalExpanceTurnover}</h5>    
                    <div>
                        <Progress type='circle' strokeColor={'green'} className='mx-2' percent={totalIncomeTurnoverPercent.toFixed(0)} />
                        <Progress type='circle' strokeColor={'red'} className='mx-2' percent={totalExpanseTurnoverPercent.toFixed(0)} />
                    </div>
                </div>  
            </div>    
        </div>    
    </div> 
    <div className='row m-3'>
        <div className="col-md-6">
            <h4>Categorywise Income</h4>
            {
                categories.map((category) =>{
                    const amount = allTarnsaction.filter(transaction => transaction.type === 'income' && transaction.category === category).reduce((acc, transaction) => acc + transaction.amount, 0)
                    return (
                        amount > 0 &&
                        <div className="card mb-2">
                            <div className="card-body">
                                <h5>{category}</h5>
                                <Progress percent={((amount / totalIncomeTurnover) * 100).toFixed(0)}/>
                            </div>
                        </div>
                    )
                })
                
            }
        </div>
        <div className="col-md-6">
            <h4>Categorywise Expense</h4>
            {
                categories.map((category) =>{
                    const amount = allTarnsaction.filter(transaction => transaction.type === 'expense' && transaction.category === category).reduce((acc, transaction) => acc + transaction.amount, 0)
                    return (
                        amount > 0 &&
                        <div className="card mb-2">
                            <div className="card-body">
                                <h5>{category}</h5>
                                <Progress percent={((amount / totalExpanceTurnover) * 100).toFixed(0)}/>
                            </div>
                        </div>
                    )
                })                
            }
        </div>
    </div>
    </>
  )
}

export default Analytics
