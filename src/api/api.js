import '../config'
import axios from "axios";

const { BASE } = global.constants;

export const userLogin = async (account,password)=>
    axios.post(`${BASE}/login`,{'account': account, 'password': password});
    
export const changePassword = async (account,oldPassword,newPassword)=>
    axios.put(`${BASE}/change-password`,{'account': account,'old_password':oldPassword,'new_password':newPassword})

export const getEmployees = async (page,pageSIze)=>
    axios.get(`${BASE}/employee/${page}/${pageSIze}`,{headers: {'x-access-token' :sessionStorage.getItem('token')}})

export const getSortedEmployee = async (page,pageSIze,tag)=>
    axios.get(`${BASE}/employee/${page}/${pageSIze}/${tag}`,{headers: {'x-access-token' :sessionStorage.getItem('token')}})

export const getEmployeeName = async (name)=>
    axios.get(`${BASE}/employeename/${name}`,{headers: {'x-access-token' :sessionStorage.getItem('token')}})

export const getEmployeeID = async (id)=>
    axios.get(`${BASE}/employee/${id}`,{headers: {'x-access-token' :sessionStorage.getItem('token')}})

export const changeEmployee = async (id,body)=>
    axios.put(`${BASE}/employee/${id}`,body,{headers: {'x-access-token' :sessionStorage.getItem('token')}})

export const deleteEmployee = async (id)=>
    axios.delete(`${BASE}/employee/${id}`,{headers: {'x-access-token' :sessionStorage.getItem('token')}})

export const postEmployee = async (body)=>
    axios.post(`${BASE}/new-employee`,{headers: {'x-access-token' :sessionStorage.getItem('token')},body})

export const calculateSalary = async ()=>
    axios.put(`${BASE}/payroll/update`,{headers: {'x-access-token' :sessionStorage.getItem('token')}})

export const getSortedDepartment = async (page,pageSIze,tag)=>
    axios.get(`${BASE}/department/${page}/${pageSIze}/${tag}`,{headers: {'x-access-token' :sessionStorage.getItem('token')}})

export const postDepartment = async (body)=>
    axios.post(`${BASE}/department`,{headers: {'x-access-token' :sessionStorage.getItem('token')},body})

export const deleteDepartment = async (id)=>
    axios.delete(`${BASE}/department/${id}`,{headers: {'x-access-token' :sessionStorage.getItem('token')}})

export const changeDepartment = async (id,body)=>
    axios.put(`${BASE}/department/${id}`,{headers: {'x-access-token' :sessionStorage.getItem('token')},body})

export const getHoliday = async (holiday)=>
    await (await fetch(`https://calendarific.com/api/v2/holidays?&api_key=${'6b3e806892de7f86458688a89ab791361f754e3e'}&country=${'AU'}&year=${new Date().getFullYear()}`)).json();
    // if no data shows, go https://calendarific.com and sign up for a new api_key
    
export const getLeave = async (page,pageSIze)=>
    axios.get(`${BASE}/leave/${page}/${pageSIze}`,{headers: {'x-access-token' :sessionStorage.getItem('token')}})

export const getLeaveName = async (name)=>
    axios.get(`${BASE}/leave/${name}`,{headers: {'x-access-token' :sessionStorage.getItem('token')}})

export const deleteLeave = async (id, dateStart,dateEnd,leaveType, flag)=>
    axios.delete(`${BASE}/leave/${id}/${dateStart}/${dateEnd}/${leaveType}/${flag}`,{headers: {'x-access-token' :sessionStorage.getItem('token')}})

export const postLeave = async (name, employeeID, leaveType, dateStart, dateEnd, reason)=>
    axios.post(`${BASE}/leave`,
    {"name": name,"employeeID": employeeID,"leaveType": leaveType,"dateStart": dateStart,"dateEnd": dateEnd,"reason": reason},
    {headers: {'x-access-token' :sessionStorage.getItem('token')}})

export const getEmployee = async ()=>
    axios.get(`${BASE}/employee/${sessionStorage.getItem('userid')}`,{headers: {'x-access-token' :sessionStorage.getItem('token')}})

export const getAdmin = async ()=>
    axios.get(`${BASE}/admin/${sessionStorage.getItem('userid')}`,{headers: {'x-access-token' :sessionStorage.getItem('token')}})

export const putAdmin = async (body)=>
    axios.put(`${BASE}/admin/${sessionStorage.getItem('userid')}`,body,{headers: {'x-access-token' :sessionStorage.getItem('token')}})
    
export const getDepartments = async ()=>
    axios.get(`${BASE}/department/all`,{headers: {'x-access-token' :sessionStorage.getItem('token')}})

export const getEmployeeAmount = async ()=>
    axios.get(`${BASE}/employee/1/1`,{headers: {'x-access-token' :sessionStorage.getItem('token')}})

export const punchIn = async () =>
    axios.put(`${BASE}/employee/${sessionStorage.getItem('userid')}`,
    {'punchIn':new Date().getTime(),'punchOut':0},
    {headers: {'x-access-token' :sessionStorage.getItem('token')}}
)

export const punchOut = async () =>
    axios.put(`${BASE}/employee/${sessionStorage.getItem('userid')}`,
    {'punchOut':new Date().getTime(),'punchIn':0}
    ,{headers: {'x-access-token' :sessionStorage.getItem('token'),"Authorization":"Bearer "+sessionStorage.getItem('token')}
})

export const updateLeaveRecord = async(arr)=>
    axios.put(`${BASE}/employee/${sessionStorage.getItem('userid')}`,{'leaveRecord':arr}
 ,{headers: {'x-access-token' :sessionStorage.getItem('token'),"Authorization":"Bearer "+sessionStorage.getItem('token')}
})

export const attendance = async()=>
    axios.get(`${BASE}/dashboard/attendance`)

export const newEmployee = async()=>
    axios.get(`${BASE}/dashboard/newEmployee`)

export const departmentHeadInfo = async()=>
    axios.get(`${BASE}/dashboard/departmentHeadInfo`)

export const getMessages = async(page,size)=>
    axios.get(`${BASE}/message/${page}/${size}`)

export const getMessagesReverse = async(page,size)=>
    axios.get(`${BASE}/messageReverse/${page}/${size}`)   

export const getMessagesPopular = async(page,size)=>
    axios.get(`${BASE}/messagePopular/${page}/${size}`)  
    
export const getMessagesTopic = async(page,size,topic)=>
    axios.get(`${BASE}/messageTopic/${page}/${size}/${topic}`)   
    
export const getMessagesSearch = async(content)=>
    axios.get(`${BASE}/messageSearch/${content}`) 

export const postMessage = async(name, photo, writerId, writerRole, tag, content, img)=>
    axios.post(`${BASE}/message`,{
        "name": name,
        "photo": photo,
        "writerId": writerId,
        "writerRole": writerRole,
        "tag": tag,
        "content":content,
        "img": img
    },{headers: {'x-access-token' :sessionStorage.getItem('token')}})

export const editMessage = async(id,content)=>
    axios.put(`${BASE}/message/${id}`,{"content":content},{headers: {'x-access-token' :sessionStorage.getItem('token')}})

export const postComment = async(id,comment)=>
    axios.put(`${BASE}/messageComment/${id}`,comment,{headers: {'x-access-token' :sessionStorage.getItem('token')}})

export const deleteMessage = async(id)=>
    axios.delete(`${BASE}/message/${id}`)

export const likeMessage = async(messageId, peopleId)=>
    axios.put(`${BASE}/messageLike/${messageId}`,{'id':peopleId},{headers: {'x-access-token' :sessionStorage.getItem('token')}})

export const dislikeMessage = async(messageId, peopleId)=>
    axios.put(`${BASE}/messageDislike/${messageId}`,{'id':peopleId},{headers: {'x-access-token' :sessionStorage.getItem('token')}})

export const unReadMessageAmount = async()=>
    axios.get(`${BASE}/messageUnreadAmount/${sessionStorage.getItem('userid')}/${sessionStorage.getItem('auth')}`,{headers: {'x-access-token' :sessionStorage.getItem('token')}})

export const getMyPosts = async()=>
    axios.get(`${BASE}/messageMyPosts/${sessionStorage.getItem('userid')}`,
    {headers: {'x-access-token' :sessionStorage.getItem('token')}})

export const getOnePost = async(id)=>
    axios.get(`${BASE}/message/${id}`,
    {headers: {'x-access-token' :sessionStorage.getItem('token')}})