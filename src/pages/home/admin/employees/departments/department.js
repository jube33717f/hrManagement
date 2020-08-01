import React, { useState,useEffect } from "react";
import { useMediaQuery } from 'react-responsive'
import Card from "./Card";
import TrItem from "./TrItem";
import AddNew from "./AddNew";
import TrHead from "./TrHeadDepart";
import "./department.scss";
import PageTop from  '../../../../../components/pageTop/pageTop';
import Axios from "axios";
import {getSortedDepartment,postDepartment,deleteDepartment,changeDepartment} from '../../../../../api/api'

Axios.defaults.baseURL = "http://127.0.0.1:5001/department";
// Axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;

export default function Department(pros){
    const headerList = ["#","Department Name","Department Head","Total Employee","Action"];
    const sortTagList = ["#","Department Name","Department Head","Total Employee"];
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
    var [showData,setShowData]= useState([]);
    useEffect( ()=>{
        getMethod();
        console.log('1')
    },[interNum,showNum,currentPage,
        sortTag,totalNum,startIndex,
        endIndex,changeCount]);
    async function getMethod(){
        const tag = mapSortTag(sortTag);
        console.log('11')
        const res = await getSortedDepartment(currentPage,interNum,tag);
        
        console.log(res);
        if(res.status === 200){
            setTotalNum(res.data.total);
            setShowData(res.data.result.map((item)=>{
                return({
                    _id : item._id,
                    number : item.departmentID,
                    name : item.departmentName,
                    head : item.departmentHead,
                    total : item.employeeAmount
                });
            }))
            updateStat();
        }
    }
    async function postMethod(newDepart){
        const res = await postDepartment({
            "departmentName": newDepart.name,
            "departmentHead": newDepart.head,
            "employeeAmount": parseInt(newDepart.total)
        })
        return res.status;
    }
    async function deleteMethod(id){
        const res = await deleteDepartment(id);
        return res.status;
    }
    async function putMethod(newDepart){
        const res = await changeDepartment(newDepart._id,{
            "departmentName": newDepart.name,
            "departmentHead": newDepart.head,
            "employeeAmount": parseInt(newDepart.total)
        })
        
        const temp = changeCount+1;
        setCount(temp);
        return res.status;
    }
    function mapSortTag(tag) {
        switch(tag){
            case headerList[0]:return "departmentID";
            case headerList[1]:return "departmentName";
            case headerList[2]:return "departmentHead";
            case headerList[3]:return "employeeAmount";
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
    <><PageTop currentPage='Department' currentPath='/ Employees / Department'/>
    <div className="blockStyle">
        <div className="upperHeader">
            <b >Department List </b>
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
                                _id = {item._id}
                                id = {item.number}
                                name = {item.name}
                                head = {item.head}
                                total = {item.total}
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
                            return (<Card 
                                key = {item._id}
                                _id = {item._id}
                                id = {item.number}
                                name = {item.name}
                                head = {item.head}
                                total = {item.total}
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