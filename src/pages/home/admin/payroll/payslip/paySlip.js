import React, { useState,useEffect } from "react";

import PageTop from  '../../../../../components/pageTop/pageTop'
import "./paySlip.scss";
import TrHead from "./TrHead";
import TrItem from "./TrItem";
import {getEmployees,getEmployeeID} from '../../../../../api/api'
const PaySlip = (pros)=>{
    const earingHeader = ["#","Earnings","Total"];
    const deductionHeader = ["#","Deductions","Total"];
    const [earning,setEarning] = useState([])
    const [deduction,setDeduct] = useState([])
    useEffect( ()=>{
        getMethod();
    },[earning,deduction]);
    const [photo,setPhoto] = useState();
    const [name,setName] = useState();
    const [role,setRole] = useState();
    const [id,setId] = useState();
    async function getMethod(){
        if(pros.history.location.pathname == "/home/payslip"){
          
            const res = await getEmployees(1, 1);
            if(res.status === 200){
                setPhoto(res.data.results[0].photo)
                setName(`${res.data.results[0].firstname} ${res.data.results[0].lastname}`)
                setRole(res.data.results[0].role)
                setId(res.data.results[0].employeeID)
                setEarning(
                    [
                        {
                            item: "Basic Salary",
                            amount: res.data.results[0].salary
                        },
                        {
                            item: "Bonus",
                            amount: res.data.results[0].bonus
                        },
                        {
                            item: "Total Earnings",
                            amount: res.data.results[0].earnings
                        }
                    ]);
                    setDeduct(
                        [
                            {
                                item: "Tax",
                                amount: res.data.results[0].tax
                            },
                            {
                                item: "UnpaidLeave",
                                amount: res.data.results[0].unpaidLeave
                            },
                            {
                                item: "Total Deductions",
                                amount: res.data.results[0].deduction
                            }
                        ])
            }

        }else{
            const res1 = await getEmployeeID(pros.history.location.pathname.replace('/home/payslip/',''));
            console.log(res1);
            setPhoto(res1.data.photo)
            setName(`${res1.data.firstname} ${res1.data.lastname}`)
            setRole(res1.data.role)
            setId(res1.data.employeeID)
            setEarning(
                [
                    {
                        item: "Basic Salary",
                        amount: res1.data.salary
                    },
                    {
                        item: "Bonus",
                        amount: res1.data.bonus
                    },
                    {
                        item: "Total Earnings",
                        amount: res1.data.earnings
                    }
                ]
            );
            setDeduct(
                [
                    {
                        item: "Tax",
                        amount: res1.data.tax
                    },
                    {
                        item: "UnpaidLeave",
                        amount: res1.data.unpaidLeave
                    },
                    {
                        item: "Total Deductions",
                        amount: res1.data.deduction
                    }
                ]
            );
        }
    }

    return(
    <><PageTop currentPage='PaySlip' currentPath='/ Payroll / PaySlip'/>
    <div className="slipPage">
        <div className="slipPage_header">
            <div className="slipPage_header_company" id="companyHeader">
                <img 
                src="data:image/png;base64,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" />
                <div>
                    <h3>Lucid Infoweb LLC.</h3>
                    <p>8117 Rosevelt St.</p>
                    <p>New Rochellt,Ny 10801</p>
                </div>
            </div>
            <div className="slipPage_header_invoice" id="invoiceHeader">
                <h1>
                    Invoice #1069
                </h1>
                <p>
                    Salary Month:July,2020
                </p>
            </div>
        </div>
        <div className="bodySlip">
            <div className="bodySlip_details" id="employeeDetails">
                <img src={photo}
                id="employeeImg" alt="protrait"/>
                <div>
                    <h3>{name}</h3>
                    <p>{role}</p>
                    <p>Employee ID: {id}</p>
                </div>
            </div>
            <div className="bodySlip_tableList" id="tableList">
                <table className="bodySlip_tableList_earn" id="earningTable">
                    <TrHead 
                        firCol = {earingHeader[0]}
                        secCol = {earingHeader[1]}
                        thiCol = {earingHeader[2]}
                    />
                    {earning.map((item,index)=>{
                        return (
                        <TrItem 
                            key = {index}
                            num = {index}
                            item = {item}
                        />);
                    })}

                </table>
                <table className="bodySlip_tableList_deduction" id="deductionTable">
                    <TrHead 
                        firCol = {deductionHeader[0]}
                        secCol = {deductionHeader[1]}
                        thiCol = {deductionHeader[2]}
                    />
                    {deduction.map((item,index)=>{
                        return (
                        <TrItem 
                            key = {index}
                            num = {index}
                            item = {item}
                        />);
                    })}
                </table>
            </div>
        </div>
    </div>
        
    </>
    )
    
}

export default PaySlip;