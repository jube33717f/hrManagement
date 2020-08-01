import "./allEmployees.scss";
import Axios from "axios";
import { useMediaQuery } from 'react-responsive'
import React, { useState,useEffect } from "react";
import AddNew from "./AddNew";
import TrItem from "./TrItem";
import TrHead from "./TrHead";
import EmployeeCard from "./employeeCard";
import PageTop from  '../../../../../components/pageTop/pageTop'
import {postEmployee,changeEmployee,getSortedEmployee,deleteEmployee,} from '../../../../../api/api'


const AllEmployees = ()=>{
    const headerList = ["#","Name","Employee ID","Phone","Join Date","Role","Action"];
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
    const sortTagList = ["#","Name","Employee ID","Phone","Join Date","Role"];
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
        const res = await getSortedEmployee(currentPage, interNum, tag);
        console.log(res);
        if(res.status === 200){
            setTotalNum(res.data.total);
            setShowData(res.data.result.map((item)=>{
                return({
                    _id : item._id,
                    number : item.employeeID,
                    firstname : item.firstname,
                    lastname : item.lastname,
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
    async function postMethod(newEmployee){
        console.log(newEmployee);
        const res = await postEmployee({
            "firstname":newEmployee.firstname,
            "lastname":newEmployee.lastname,
            "account":newEmployee.account,
            "gender":newEmployee.gender,
            "address":newEmployee.address,
            "taxFileNumber":newEmployee.taxFileNumber,
            "department":newEmployee.department,
            "mobile":newEmployee.mobile,
            "startDate":mapDate(newEmployee.startDate.toString()),
            "role":newEmployee.role,
            "photo":newEmployee.photo
        });
        return res.status;
    }
    async function deleteMethod(id){
        console.log(id);
        const res = await deleteEmployee(id);
        return res.status;
    }
    async function putMethod(editEmployee){
        const res = await changeEmployee(editEmployee._id, {
            "firstname":editEmployee.firstname,
            "lastname":editEmployee.lastname,
            "mobile":editEmployee.mobile,
            "startDate":mapDate(editEmployee.startDate.toString()),
            "role":editEmployee.role,
        });
        const temp = changeCount+1;
        setCount(temp);
        return res.status;
    }
    //map frontend index to backend index
    function mapSortTag(tag) {
        switch(tag){
            case headerList[0]:return "photo";
            case headerList[1]:return "firstname";
            case headerList[2]:return "employeeID";
            case headerList[3]:return "mobile";
            case headerList[4]:return "startDate";
            case headerList[5]:return "role";
            default:break;
        }
    }
    function mapDate(date) {
        var arr = date.split("-");
        let month = null;
        switch(arr[1]){
            case "01":month="Jan";break;
            case "02":month="Feb";break;
            case "03":month="Mar";break;
            case "04":month="Apr";break;
            case "05":month="May";break;
            case "06":month="Jun";break;
            case "07":month="Jul";break;
            case "08":month="Aug";break;
            case "09":month="Sep";break;
            case "10":month="Oct";break;
            case "11":month="Nov";break;
            case "12":month="Dec";break;
        }
        return `${arr[2]} ${month},${arr[0]}`;
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
    async function addData (item){
        const status = await postMethod(item);
        console.log(status);
        if (status === 201){
            getMethod();
        }
    }
    function changeItem (item){
        putMethod(item);
        getMethod();
    }
    function cardSort (event){
        var {value} = event.target;
        sortData(value);
    }
    function sortData (tag){
        if (sortTag !== tag && sortTag !== "Action"){
            setSort(tag);
        }
    }
    return(
        <><PageTop currentPage='All Employees' currentPath='/ Employees / All Employees'/>
    <div className="blockStyle">
        <div className="upperHeader">
            <b >Employee List </b>
            <AddNew 
                onChecked = {addData}
            />
        </div>
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
                        (item)=>{
                            return (<TrItem 
                                key = {item._id}
                                keyID = {item._id}
                                img = {item.photo}
                                name = {item.name}
                                id = {item.number}
                                phone = {item.phone}
                                join = {item.join}
                                role = {item.role}
                                firstname = {item.firstname}
                                lastname = {item.lastname}
                                onChanged = {changeItem}
                                onChecked = {deleteItem}/>);})}
                </tbody>
            </table>
        </div>}
        {isTabletOrMobile &&
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
                            return (<EmployeeCard 
                                key = {item._id}
                                keyID = {item._id}
                                img = {item.photo}
                                name = {item.name}
                                id = {item.number}
                                phone = {item.phone}
                                join = {item.join}
                                role = {item.role}
                                firstname = {item.firstname}
                                lastname = {item.lastname}
                                onChanged = {changeItem}
                                onChecked = {deleteItem}/>);})}
        </div>}
        
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

export default AllEmployees;