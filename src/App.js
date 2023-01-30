import styled from "@emotion/styled";
import { useEffect, useMemo, useState } from "react";
import { getUsers } from "./services/users-sessions";
import { useSortBy, useTable } from "react-table";

const Row = styled.div`
  display:flex;
  gap: 20px;
  border: 1px solid black;
`
const Table = styled.table`
`
const TableHead = styled.thead`
`
const TableRow = styled.tr`
`
const TableHeader = styled.th`
`
const TableBody = styled.tbody`
`
const TableData = styled.td`
`
const Button = styled.button`
`

function App() {
  const [users, setUsers] = useState([])
  const [correctedUsers, setCorrectedUsers] = useState([])
  useEffect(() => {
    getUsers()
      .then(response => {
        setUsers(response.results)
        console.log(response.results)
      })
      .catch(console.log)
    
  }, [])

  useEffect(()=>{
    console.log("users", users)
    let usersFilter = []
    users.map(user=>{
      usersFilter.push({
        name: user.name.first,
        lastname: user.name.last,
        age: user.dob.age,
        gender: user.gender === "female" ? "F" : "M", 
        email: user.email,
        nationality: user.nat ,
        image: user.picture.thumbnail
      })
    })
    
    setCorrectedUsers(usersFilter)
  },[users])

  const userData = useMemo(()=>[...correctedUsers], [correctedUsers])
  const userColumns = useMemo(()=>correctedUsers[0] ? 
                      Object.keys(correctedUsers[0]).map(key =>{
                        if(key === "image"){
                          return{
                              Header: key,
                              accessor: key,
                              Cell: ({value})=> <img src={value}/>,
                              maxWidth: 100
                          }
                          
                        }
                        return {Header:key.toUpperCase(), accessor:key};
  }):[],[correctedUsers])

  const tableInstance = useTable({columns:userColumns, data: userData}, useSortBy)

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow} = tableInstance;

  const isEven = (index) => index%2==0

  return <Table {...getTableProps()}>
    <TableHead>
      {headerGroups.map((headerGroup) =>(
        <TableRow {...headerGroup.getHeaderGroupProps()}>
          {headerGroup.headers.map(column =>(
            <TableHeader {...column.getHeaderProps(column.getSortByToggleProps())} >
              {column.render("Header")}
              {column.isSorted ? (column.isSortedDesc ? "▽" : "△") : ""}
            </TableHeader>
          ))}
        </TableRow>
      ))}
    </TableHead>
    <TableBody {...getTableBodyProps()}>
      {rows.map((row, index)=>{
        prepareRow(row)

        return(
          <TableRow {...row.getRowProps()} style={{background: `${isEven(index) ? "#3b7db3": "white"}`}}>
            {row.cells.map((cell, index)=>(
              <TableData {...cell.getCellProps()}>
                {cell.render("Cell")}
              </TableData>
            ))}
            
          </TableRow>
        )

      })}
    </TableBody>
  </Table>

  // return (
  //   users ? users.map(user => {
  //     // console.log("asd",correctedUsers)
  //     return  <Row>
  //               <h1>{user.name.first}</h1>
  //               <h1>{user.name.last}</h1>
  //               <h1>{user.dob.age}</h1>
  //               <h1>{ user.gender == "female" ? "F" : "M" }</h1>
  //               <h1>{user.email}</h1>
  //               <h1>{user.nat}</h1>
  //               <img src={user.picture.thumbnail} />
  //             </Row>
  //   }) : null
  // );
}

export default App;
