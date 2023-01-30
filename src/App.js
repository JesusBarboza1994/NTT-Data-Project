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
  border: 1px solid white;
  font-style: normal;
  font-weight: 400;
  font-size: 20px;
  line-height: 140%;
  width:100%;
  text-align: center;
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
                              Header: key.toUpperCase(),
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

  return(
    <>
      <h1 style={{textAlign: "center"}}>Tabla de Usuarios</h1>
      <Table {...getTableProps()}>
        <TableHead>
          {headerGroups.map((headerGroup) =>(
            <TableRow {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map(column =>(
                <TableHeader {...column.getHeaderProps(column.getSortByToggleProps())} >
                  {column.render("Header")}
                  {column.isSorted ? (column.isSortedDesc ? "▲" : "▼") : ""}
                </TableHeader>
              ))}
            </TableRow>
          ))}
        </TableHead>
        <TableBody {...getTableBodyProps()}>
          {rows.map((row, index)=>{
            prepareRow(row)

            return(
              <TableRow {...row.getRowProps()} style={{background: `${isEven(index) ? "#3b7db3": "white"}`, opacity:0.75}}>
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
    </> )

}

export default App;
