import React, {useState, useEffect, useRef} from 'react'

import { Button, Modal, FormControl, Form, FormGroup, ControlLabel, Notification,  Schema  } from 'rsuite';

import axios from 'axios'

import './modal.scss'

import './modal.scss'

interface IProps {
    modalEdit?:boolean,
    setModalEdit?:any,
    setPage?:any,
    setDisplayLength?:any,
    flagSubmit?:boolean,
    setFlagSubmit?:any,
    idEdit?:string
}

const ModalEdit:React.FC<IProps> = (props:IProps) => {

    const [loading, setLoading] = useState<boolean>(false)

    const [formValue, setFormValue] = useState<object>({})

    const rsFormReference:any = useRef(null)

    const { StringType } = Schema.Types
  
    const model = Schema.Model({
      name: StringType().isRequired('This field required.'),
      email: StringType().isRequired('This field required.'),
      position: StringType().isRequired('This field required.'),
    })

    const handleSubmit = () => {
      if (rsFormReference.current.check()) {
      setLoading(true)
            axios({
          method: 'PUT',
          url: 'https://60f0525cf587af00179d3e8f.mockapi.io/hellohealth/users/' + props.idEdit,
          data: JSON.stringify(formValue),
        headers: {
          'Content-Type': 'application/json',
        }
        })
          .then((res) => {
            console.log(res.data)
            props.setFlagSubmit(!props.flagSubmit)
            props.setModalEdit(false)
            Notification.success({
              title: 'Success',
              placement: 'bottomEnd',
              description: 'Updated successfully !',
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
        <Modal show={props.modalEdit} size="md" onHide={() => {props.setModalEdit(false)}}>
          <Modal.Header>
            <Modal.Title>Edit User</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form
              fluid
              onChange={(formValue) => {
                  // console.log(formValue)
                  setFormValue(formValue)
              }}
              formValue={formValue}
              model={model}
              ref={rsFormReference}
            >
              <FormGroup>
                <ControlLabel className="required">Name</ControlLabel>
                <FormControl name="name" />
                {/* <HelpBlock>Required</HelpBlock> */}
              </FormGroup>
              <FormGroup>
                <ControlLabel className="required">Email</ControlLabel>
                <FormControl name="email" type="email" />
                {/* <HelpBlock>Required</HelpBlock> */}
              </FormGroup>
              <FormGroup>
                <ControlLabel className="required">Position</ControlLabel>
                <FormControl name="position" />
              </FormGroup>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button appearance="primary" onClick={() => {handleSubmit()}} loading={loading}>
              Save
            </Button>
            <Button appearance="subtle" onClick={() => {props.setModalEdit(false)}}>
              Cancel
            </Button>
          </Modal.Footer>
        </Modal>
        </div>
    )
}

export default ModalEdit