import React, {useState} from 'react'

import { Container, Header, Content, Footer, Sidebar, Sidenav, Nav } from 'rsuite';

import './container.scss'

import CounterCon from '../Counter/counter'

import TableCon from '../Table/table'

interface ContainerProps {
    name?:string;
}

const headerStyles = {
    padding: 20,
    fontSize: 16,
    backgroundColor: 'rgb(0, 140, 132)',
    color: ' #fff'
  };

const ContainerCon:React.FC<ContainerProps> = (props:ContainerProps) => {
    const [page, setPage] = useState<string>('Increase')
    return (
        <div>
            <div className="show-container">
            <Container>
            <Sidebar
            style={{ display: 'flex', flexDirection: 'column' }}
            // width={expand ? 260 : 56}
            collapsible
          >
            <Sidenav appearance="subtle" onSelect={(e) => {
                // console.log(e)
                setPage(e)
            }}>
              <Sidenav.Header>
                {/* <div >
                  <Icon icon="logo-analytics" size="lg" style={{ verticalAlign: 0 }} />
                  <span style={{ marginLeft: 12 }}> BRAND</span>
                </div> */}
                <div style={headerStyles}>HHG Test Challenge</div>
              </Sidenav.Header>
              <Sidenav.Body>
                <Nav>
                    <Nav.Item eventKey="Increase">
                    Counter
                  </Nav.Item>
                  <Nav.Item eventKey="Table">
                    Table
                  </Nav.Item>
                </Nav>
              </Sidenav.Body>
            </Sidenav>
            {/* <NavToggle expand={expand} onChange={this.handleToggle} /> */}
          </Sidebar>

          <Container>
            <Header>
              {(() => {
                  switch(page)
                  {
                      case 'Increase':
                          return (
                              <>
                              <h3>Counter</h3>
                              </>
                          )
                    case 'Table':
                        return (
                            <>
                            <h3>Table</h3>
                            </>
                        )
                  }
              })()}
            </Header>
            <Content>
                {(() => {
                  switch(page)
                  {
                      case 'Increase':
                          return (
                              <>
                              <CounterCon />
                              </>
                          )
                    case 'Table':
                        return (
                            <>
                            <TableCon />
                            </>
                        )
                  }
              })()}
            </Content>
            <Footer>@Copyright 2021 Binh Xuan Nguyen</Footer>
          </Container>
    </Container>
            </div>      
        </div>
    )
}

ContainerCon.defaultProps = {
    name: 'test'
}

export default ContainerCon