import "./employeeSalary.scss";
import Axios from "axios";
import React, { useState,useEffect } from "react";
import TrItem from "./TrItem";
import TrHead from "./TrHead";
import { useMediaQuery } from 'react-responsive'
import { useHistory } from 'react-router-dom';
import PageTop from  '../../../../../components/pageTop/pageTop'
import {getEmployees,getSortedEmployee,changeEmployee,deleteEmployee,calculateSalary} from '../../../../../api/api'

const EmployeeSalary = ()=>{
    const headerList = ["#","Name","Employee ID","Phone","Join Date","Role","Salary","Action"];
    const [showData,setShowData] = useState([
        {
            img:"https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500",
            name:"Susie Willis",
            email:"sussie-w@gmail.com",
            employeeId:"LA-0216",
            phone:"+264-625-2583",
            joinDate:"24 Jun,2015",
            role:"Web Developer",
            salary:996
        },
        {
            img:"https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500",
            name:"Susie Willis",
            email:"sussie-w@gmail.com",
            employeeId:"LA-0216",
            phone:"+264-625-2583",
            joinDate:"24 Jun,2015",
            role:"Web Developer",
            salary:996
        },
        {
            img:"https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500",
            name:"Susie Willis",
            email:"sussie-w@gmail.com",
            employeeId:"LA-0216",
            phone:"+264-625-2583",
            joinDate:"24 Jun,2015",
            role:"Web Developer",
            salary:996
        },
        {
            img:"https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500",
            name:"Susie Willis",
            email:"sussie-w@gmail.com",
            employeeId:"LA-0216",
            phone:"+264-625-2583",
            joinDate:"24 Jun,2015",
            role:"Web Developer",
            salary:996
        },
        {
            img:"https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500",
            name:"Susie Willis",
            email:"sussie-w@gmail.com",
            employeeId:"LA-0216",
            phone:"+264-625-2583",
            joinDate:"24 Jun,2015",
            role:"Web Developer",
            salary:996
        },
        {
            img:"https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500",
            name:"Susie Willis",
            email:"sussie-w@gmail.com",
            employeeId:"LA-0216",
            phone:"+264-625-2583",
            joinDate:"24 Jun,2015",
            role:"Web Developer",
            salary:996
        },

    ])
    let path = "/home/paySlip";
    let history = useHistory();
    const isTabletOrMobile = useMediaQuery({ query: '(max-width: 800px)' });
    var [totalNum,setTotalNum] = useState(null);
    var [showNum,setShowNum] =useState(6);
    var [interNum,setInter] =useState(6);
    var [currentPage,setCurr] =useState(1);
    var [totalPage,setTotalPage] =useState(null);
    var [startIndex,setStart] =useState(null);
    var [endIndex,setEnd] =useState(null);
    var [changeCount,setCount] = useState(0);
    var [searchString,setSearch] =useState("");
    var [sortTag,setSort]=useState("#");

    useEffect( ()=>{
        getMethod();
    },[interNum,showNum,currentPage,
        sortTag,totalNum,startIndex,
        endIndex,changeCount]);
    async function getMethod(){
        const tag = mapSortTag(sortTag);
        const res = await getSortedEmployee(currentPage, interNum,tag);
        console.log(res);
        if(res.status === 200){
            setTotalNum(res.data.total);
            setShowData(res.data.result.map((item)=>{
                return({
                    _id : item._id,
                    number : item.employeeID,
                    name : `${item.firstname} ${item.lastname}`,
                    phone : item.mobile,
                    join : item.startDate,
                    role : item.role,
                    salary : item.salary,
                    bonus : item.bonus,
                    earnings : item.earnings,
                    tax : item.tax,
                    unpaidLeave : item.unpaidLeave,
                    deduction : item.deduction,
                    email : item.account,
                    photo : item.photo
                });
            }))
            updateStat();
        }
    }
    async function deleteMethod(id){
        const res = await deleteEmployee(id);
        return res.status;
    }
    async function putMethod(editEmployee){
        console.log(editEmployee);
        // console.log(2);
        
        const res = await changeEmployee(editEmployee._id, {
            "salary" : editEmployee.salary
        });
        const temp = changeCount+1;
        setCount(temp);
        return res.status;
        // console.log(editEmployee.salary);
        
    }
    function mapSortTag(tag) {
        switch(tag){
            case headerList[0]:return "photo";
            case headerList[1]:return "firstname";
            case headerList[2]:return "employeeID";
            case headerList[3]:return "mobile";
            case headerList[4]:return "startDate";
            case headerList[5]:return "role";
            case headerList[6]:return "salary";
            default:break;
        }
    }
    async function deleteItem (id) {
        const status = await deleteMethod(id);
        if (status === 200){
            if(totalNum!==0 && (totalNum-1)===((currentPage-1)*interNum)){
                const tempCurr = currentPage-1;
                setCurr(tempCurr);
            }
            getMethod();
        }      
    }
    async function calculateS (){
        const status = await calculateSalary();
        return status;
    }
    async function handleDisplay (event){
        let indexNum = parseInt(event.target.value);
        console.log(indexNum);
        setShowNum(indexNum);
        if (indexNum != null){
            setInter(indexNum);
            getMethod();
        }
    }
    async function updateStat(){
        setTotalPage(totalNum===0?1:Math.ceil(totalNum/ interNum));
        setStart(totalNum===0?0:((currentPage-1)*interNum+1));
        setEnd(((currentPage*interNum)<=totalNum)?(currentPage*interNum):totalNum);
    }
    async function previousChange (){
        if (currentPage > 1){
            const tempCurr = currentPage-1;
            setCurr(tempCurr);
            setEnd(startIndex);
            setStart(startIndex-interNum);
            getMethod();
            updateStat();
        }
    }
    async function nextChange (){
        if (currentPage < totalPage){
            setStart(endIndex);
            if((currentPage+1) === totalPage){
                setEnd(totalNum);
            }else{
                setEnd(endIndex+interNum);
            }
            const tempCurr = currentPage+1;
            setCurr(tempCurr);
            getMethod();
            updateStat();
            
        }
    }
    function searchChange (event){
        console.log("search");
        setSearch(event.target.value);
        // var string = event.target.value;
        // setSearch(string);
        // if (string == ""){
            
        // }else{
        //     let tempData = data;
        //     let searchData = tempData.filter((item)=>{
        //         return (item.number.includes(string) || item.name.includes(string) || 
        //         item.head.includes(string) || item.total.includes(string));
        //     })
            
        // }
    }
    function changeItem (item){
        putMethod(item);
        calculateS();
        getMethod();
    }
    function cardSort (event){
        var {value} = event.target;
        sortData(value);
    }
    function sortData (tag){
        if (sortTag !== tag && tag !== "Action"){
            setSort(tag);
        }
    }
    const openItem = (item) =>{
        console.log(item);
        // history.push({pathname:path,state:item});
        history.push(`/home/payslip/${item._id}`);
    }
    return(
    <><PageTop currentPage='EmployeeSalary' currentPath='/ Payroll / EmployeeSalary'/>
    <div className="blockStyle">
        <div className="lowerHeader">
            <label>
                Show
                <input 
                type="number" value={showNum} 
                onChange={handleDisplay} min="1" max="20"
                />
                entries
            </label>
            
            <div id="searchStyle">
                <button onClick={calculateS}>
                    Calculate
                </button>
                Search:
                <input 
                // disabled = "true"
                type="text" value={searchString} 
                onChange={searchChange} 
                />
            </div>

        </div>
        {!isTabletOrMobile &&
        <div className="departBody">
            <table>
                <thead>
                    <tr>
                        {headerList.map(
                            (item,index)=>{
                                return(
                                    <TrHead 
                                        key = {index}
                                        name = {item}
                                        tag = {sortTag}
                                        onChanged = {sortData}/>)})}
                    </tr>
                </thead>
                <tbody>
                    {showData.map(
                        (item,index)=>{
                            return (<TrItem 
                                _id = {item._id}
                                key = {index}
                                img = {item.photo}
                                name = {item.name}
                                email = {item.email}
                                id = {item.number}
                                phone = {item.phone}
                                join = {item.join}
                                role = {item.role}
                                salary = {item.salary}
                                bonus = {item.bonus}
                                earnings = {item.earnings}
                                tax = {item.tax}
                                unpaidLeave = {item.unpaidLeave}
                                deduction = {item.deduction}
                                onClicked = {openItem}
                                onChanged = {changeItem}
                                onChecked = {deleteItem}
                            />);})}
                </tbody>
            </table>
        </div>}
        {/* {isTabletOrMobile &&
            <section className="sortSection">
                Sort By{" "}
                <select onChange={cardSort}>
                    {sortTagList.map(
                        (item)=>{
                        return (<option selected={item===sortTag?"selected":null}>{item}</option>)
                        }
                    )}
                </select>
            </section>
        }
        {isTabletOrMobile &&
        <div className="phoneCards">
            {showData.map(
                        (item)=>{
                            return (<Card 
                                key = {item._id}
                                _id = {item._id}
                                id = {item.number}
                                name = {item.name}
                                head = {item.head}
                                total = {item.total}
                                onChanged = {changeItem}
                                onChecked = {deleteItem}/>);})}
        </div>} */}
        
        <div className="departFooter">
            <label>
                showing{" "}
                {startIndex}
                {" "}to{" "}
                {endIndex}
                {" "}of{" "}
                {totalNum}
                {" "}entries
            </label>
            <div className="pageButton" id="pageButton">
                <button className="changePage" onClick={()=>previousChange()}>Previous</button>
                <button className="currentPage" disabled="true">{currentPage}</button>
                <button className="changePage" onClick={()=>nextChange()}>Next</button>
            </div>
        </div>
    </div>
    </>
    )
}
export default EmployeeSalary;

                        