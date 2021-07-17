import React, {useState, useEffect} from 'react'

import { Button, Table } from 'rsuite';

import axios from 'axios'

import ModalNew from './modalNew'

import ModalEdit from './modalEdit'

import ModalDel from './modalDelete'

import './table.scss'

interface IProps {
    
}

const { Column, HeaderCell, Cell, Pagination } = Table;

interface IAction {
  dataKey?:any,
  rowData?:any
}

const TableCon:React.FC<IProps> = (props:IProps) => {

    const [data, setData] = useState<IProps[]>([])

    const [page, setPage] = useState<number>(1)

    const [displayLength, setDisplayLength] = useState<number>(10)

    const [showData, setShowData] = useState<IProps[]>([])

    const [loading, setLoading] = useState<boolean>(true)

    const [modalNew, setModalNew] = useState<boolean>(false)

    const [flagSubmit, setFlagSubmit] = useState<boolean>(false)

    const [modalEdit, setModalEdit] = useState<boolean>(false)

    const [idEdit, setIdEdit] = useState<string>('')

    const [modalDel, setModalDel] = useState<boolean>(false)

    useEffect(() => {
        axios({
            method: 'GET',
            url: 'https://60f0525cf587af00179d3e8f.mockapi.io/hellohealth/users',
          })
            .then((res) => {
              let tmpdatares = res.data.reverse()
              let tmpdata = tmpdatares.filter((v:any,i:any) => {
                const start = displayLength * (page - 1);
                const end = start + displayLength;
                return i >= start && i < end;
              })
              setData(res.data)
              setShowData(tmpdata) 
              setLoading(false)  
            })
            .catch((err) => {
              console.log(err)
              // let title = 'Error'
              // let decs = 'Something wrong ! Please check again !'
              // openError({ title, decs })
            })
    }, [page, displayLength, flagSubmit])

  //   useEffect(() => {
  //     axios({
  //         method: 'POST',
  //         url: 'https://60f0525cf587af00179d3e8f.mockapi.io/hellohealth/users',
  //         data: JSON.stringify({
  //           email: 'asd',
  //           position: 'asd',
  //           name:'asd'
  //         }),
  //       headers: {
  //         'Content-Type': 'application/json',
  //       }
  //       })
  //         .then((res) => {
  //           console.log(res.data)
  //           let tmpdata = res.data.filter((v:any,i:any) => {
  //             const start = displayLength * (page - 1);
  //             const end = start + displayLength;
  //             return i >= start && i < end;
  //           })
  //           console.log(tmpdata)
  //           setData(res.data)
  //           setShowData(tmpdata)   
  //         })
  //         .catch((err) => {
  //           console.log(err)
  //           // let title = 'Error'
  //           // let decs = 'Something wrong ! Please check again !'
  //           // openError({ title, decs })
  //         })
  // }, [page, displayLength])

    const ActionCell:React.FC<IAction> = (props:IAction) => {
      return (
        <Cell {...props} style={{ padding: '6px 0' }}>
          <Button
            appearance="link"
            size="sm"
            onClick={() => {
              setIdEdit(props.rowData.id)
              setModalEdit(true)
            }}
          >
            Edit
            {/* {rowData.status === 'EDIT' ? 'Save' : 'Edit'} */}
          </Button>
          <Button
            appearance="link"
            size="sm"
            onClick={() => {
              setIdEdit(props.rowData.id)
              setModalDel(true)
            }}
          >
            Delete
            {/* {rowData.status === 'EDIT' ? 'Save' : 'Edit'} */}
          </Button>
        </Cell>
      );
    };

    return (
        <div>
        <div className="newusercon">
          <div>
          <Button appearance="primary" onClick={() => setModalNew(true)}>New User</Button>
          </div>
        </div>
        <div className="tablecon">
        <Table 
          loading={loading} 
          data={showData} 
          autoHeight
          bordered
          cellBordered
          //affixHeader
        >
          <Column width={50} align="center">
            <HeaderCell>Id</HeaderCell>
            <Cell dataKey="id" />
          </Column>

          <Column flexGrow={1}>
            <HeaderCell>Name</HeaderCell>
            <Cell dataKey="name" />
          </Column>

          <Column flexGrow={1}>
            <HeaderCell>Email</HeaderCell>
            <Cell dataKey="email" />
          </Column>

          <Column flexGrow={1}>
            <HeaderCell>Position</HeaderCell>
            <Cell dataKey="position" />
          </Column>

          <Column width={150}>
            <HeaderCell>Action</HeaderCell>
            <ActionCell dataKey="id" rowData/>
          </Column>
        </Table>
        <Pagination
          lengthMenu={[
            {
              value: 10,
              label: 10
            },
            {
              value: 20,
              label: 20
            }
          ]}
          activePage={page}
          displayLength={displayLength}
          total={data.length}
          onChangePage={(e) => {
              setLoading(true)
              setPage(e)
          }}
          onChangeLength={(e) => {
            setLoading(true)
            setDisplayLength(e)
        }}
        />
        </div>   
        <ModalNew 
          setDisplayLength={setDisplayLength} 
          setPage={setPage} 
          modalNew={modalNew} 
          setModalNew={setModalNew} 
          flagSubmit={flagSubmit} 
          setFlagSubmit={setFlagSubmit}/>
        <ModalEdit 
          idEdit={idEdit} 
          setDisplayLength={setDisplayLength} 
          setPage={setPage} 
          modalEdit={modalEdit} 
          setModalEdit={setModalEdit} 
          flagSubmit={flagSubmit} 
          setFlagSubmit={setFlagSubmit}/>
        <ModalDel
          idEdit={idEdit} 
          setDisplayLength={setDisplayLength} 
          setPage={setPage} 
          modalDel={modalDel} 
          setModalDel={setModalDel} 
          flagSubmit={flagSubmit} 
          setFlagSubmit={setFlagSubmit}/>
        </div>
    )
}

export default TableCon