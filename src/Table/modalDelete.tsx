import React, {useState, useEffect} from 'react'

import { Button, Modal, Notification } from 'rsuite';

import axios from 'axios'

import './modal.scss'

interface IProps {
    modalDel?:boolean,
    setModalDel?:any,
    setPage?:any,
    setDisplayLength?:any,
    flagSubmit?:boolean,
    setFlagSubmit?:any,
    idEdit?:string
}

const ModalDel:React.FC<IProps> = (props:IProps) => {

    const [loading, setLoading] = useState<boolean>(false)

    const [formValue, setFormValue] = useState<object>({})

    const [userName, setUserName] = useState<string>('')

    const handleSubmit = () => {
      setLoading(true)
            axios({
          method: 'DELETE',
          url: 'https://60f0525cf587af00179d3e8f.mockapi.io/hellohealth/users/' + props.idEdit,
          data: JSON.stringify(formValue),
        headers: {
          'Content-Type': 'application/json',
        }
        })
          .then((res) => {
            // console.log(res.data)
            props.setFlagSubmit(!props.flagSubmit)
            props.setModalDel(false)
            Notification.success({
              title: 'Success',
              placement: 'bottomEnd',
              description: 'Deleted successfully !',
              duration: 3000
            });
            
          })
          .catch((err) => {
            console.log(err)
            // let title = 'Error'
            // let decs = 'Something wrong ! Please check again !'
            // openError({ title, decs })
          })
    }

    useEffect(() => {
     axios({
          method: 'GET',
          url: 'https://60f0525cf587af00179d3e8f.mockapi.io/hellohealth/users/' + props.idEdit,
        headers: {
          'Content-Type': 'application/json',
        }
        })
          .then((res) => {
            // console.log(res.data)
            // let tmpdata = res.data.filter((v:any,i:any) => {
            //   const start = displayLength * (page - 1);
            //   const end = start + displayLength;
            //   return i >= start && i < end;
            // })
            // console.log(tmpdata)
            // setData(res.data)
            // setShowData(tmpdata)
            setFormValue({
              name:res.data.name,
              email:res.data.email,
              position:res.data.position
            })
            setUserName(res.data.name)
          })
          .catch((err) => {
            console.log(err)
            // let title = 'Error'
            // let decs = 'Something wrong ! Please check again !'
            // openError({ title, decs })
          })
    }, [props.idEdit])

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

    return (
        <div>
        <Modal show={props.modalDel} size="md" onHide={() => {props.setModalDel(false)}}>
          <Modal.Header>
            <Modal.Title>Delete User</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div>
              Are you sure to delete user <strong>{userName}</strong> ?
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button appearance="primary" onClick={() => {handleSubmit()}} loading={loading}>
              Yes
            </Button>
            <Button appearance="subtle" onClick={() => {props.setModalDel(false)}}>
              No
            </Button>
          </Modal.Footer>
        </Modal>
        </div>
    )
}

export default ModalDel