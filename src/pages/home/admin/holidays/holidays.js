import React, { Component,useState,useEffect } from "react";
import './holidays.scss'
import Blink from './blink.jsx'
import PageTop from  '../../../../components/pageTop/pageTop'
import {getHoliday} from '../../../../api/api'
// if no data shows, go https://calendarific.com and sign up for a new api_key
export default function Holidays(props){

    const year = new Date().getFullYear()
    const day = new Date().getDate()
    const month = new Date().getMonth() + 1
    var [showDatas,setShowDatas]= useState([]);
    var [flags,setFlags]= useState(true);

    useEffect( ()=>{
        getHolidays();
        setInterval(()=>{
            changeColor();
        },180)
        
    },[showDatas, flags]);

    async function getHolidays() {
        if (showDatas.length === 0){
            const result = (await getHoliday('holiday'))
            if (result.meta.code === 200) {
                var final_result = []
                for (let i = 0; i<result.response.holidays.length; i++) {
                    // final_result.push(result.response.holidays[i])
                    if (result.response.holidays[i].type[0] === "National holiday"){
                        final_result.push(result.response.holidays[i])
                    }
                }
                for (let i = 0; i< final_result.length;i++){
                    if (Number(month) === Number(12) && Number(day) > Number(25)){
                        setShowDatas({name: final_result[0].name, description: final_result[0].description, date:`${Number(year) + 1}`+'-01-01'})
                        break
                    }
                    if (Number(month) === Number(final_result[i].date.datetime.month) && Number(day) === Number(final_result[i].date.datetime.day)){
                        setFlags(false)
                        setShowDatas({name: final_result[i].name, description: final_result[i].description, date:final_result[i].date.iso})
                        break
                    }
                    if (Number(month) === Number(final_result[i].date.datetime.month) && Number(day) < Number(final_result[i].date.datetime.day)){
                        setShowDatas({name: final_result[i].name, description: final_result[i].description, date:final_result[i].date.iso})
                        break
                    }
                    if (Number(month) < Number(final_result[i].date.datetime.month)){
                        setShowDatas({name: final_result[i].name, description: final_result[i].description, date:final_result[i].date.iso})
                        break
                    }
                }
            }
        }
    }

    function dateEx() {
        if (flags === true) {
            return <h1 className='holidays__title'>Next Holiday is :</h1>
        } else {
            return <h1 className='holidays__title'>Today is  :</h1>
        }
    }

    function changeColor(){
        var color="yellow|baigreen|blue|gray|pink|red|black|green";
        color=color.split("|");
        try{ var x = document.getElementsByClassName("holidays__color")[0].style.color=color[parseInt
            (Math.random() * color.length)];}       
        catch{
        }
    }
        
    return(       
        <><PageTop currentPage='Holidays' currentPath='/ Holidays'/>
        <div className='holidays'>
            <div className='holidays__whole'>
                <div>{dateEx()} </div>
                <div className='holidays__color' style={{color:'#3cb371'}}><h1>{showDatas.name} </h1> </div>
                <h3 className='holidays__text--1'>{<Blink text={showDatas.date}/>}</h3>
                <h1 className='holidays__text--2'>{showDatas.description}</h1>         
            </div>
        </div>
        </>
    ) 
}
