import React from 'react';
import { withApollo } from 'react-apollo';
import { gql } from 'apollo-boost';
import {
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  Card,
  CardBody,
  CardTitle,
  CardSubtitle,
  Col,
  Row,
} from 'reactstrap';
import ReactTable from 'react-table';
import 'react-table/react-table.css';
import styled from 'styled-components';

const StyledReactTable = styled(ReactTable)`
  margin-top: 1em;
`;

class VarietiesPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      tableData: null,
      varietyName: this.getLocalStorageItem('varietyName'),
      flowerTime: this.getLocalStorageItem('flowerTime'),
      growTime: this.getLocalStorageItem('growTime'),
      varietyNotes: this.getLocalStorageItem('varietyNotes'),
    };
  }
  getLocalStorageItem(item) {
    return localStorage.getItem('varietyForm-' + item) || '';
  }
  getTableData = () => {
    this.props.client
      .query({
        query: gql`
          {
            allVarieties {
              id
              variety
            }
          }
        `,
      })
      .then(result => {
        this.setState({
          isLoading: false,
        });
      });
  };

  insertVariety = () => {
    this.props.client
      .query({
        query: gql`
          {
            allVarieties {
              id
              variety
            }
          }
        `,
      })
      .then(result => console.log(result));
  };

  handleInputChange = e => {
    localStorage.setItem('varietyForm-' + e.target.name, e.target.value);
    this.setState({ [e.target.name]: e.target.value });
  };

  handleSubmit = event => {
    console.log(this.state);
    event.preventDefault();
  };

  componentDidMount() {
    this.getTableData();
  }

  render() {
    const data = [
      {
        id: 1,
        name: 'Tomato',
        flowerTime: 50,
        growTime: 40,
        notes: 'some notes here',
      },
    ];
    const columns = [
      {
        Header: 'Name',
        accessor: 'name',
        maxWidth: 500,
        sortable: true,
      },
      {
        Header: 'Flower time',
        accessor: 'flowerTime',
      },
      {
        Header: 'Grow time',
        accessor: 'growTime',
      },
      {
        Header: 'Notes',
        accessor: 'notes',
        sortable: false,
      },
    ];
    return (
      <div>
        <Card>
          <CardBody>
            <CardTitle>
              <h1>Varieties</h1>
            </CardTitle>
            <CardSubtitle>Add your new varieties here.</CardSubtitle>
            <Form className="mt-2" onSubmit={this.handleSubmit}>
              <Row>
                <Col xs={12} md={6}>
                  <FormGroup>
                    <Label for="varietyName">Name</Label>
                    <Input
                      type="text"
                      name="varietyName"
                      id="varietyName"
                      placeholder="Name of your variety"
                      value={this.state.varietyName}
                      onChange={this.handleInputChange}
                      data-message-required="This field is required."
                    />
                  </FormGroup>
                </Col>
                <Col xs={12} md={6}>
                  <FormGroup>
                    <Label for="flowerTime">Flower time</Label>
                    <Input
                      type="number"
                      name="flowerTime"
                      id="flowerTime"
                      placeholder="Days of flowering"
                      value={this.state.flowerTime}
                      onChange={this.handleInputChange}
                    />
                  </FormGroup>
                  <FormGroup>
                    <Label for="growTime">Grow time</Label>
                    <Input
                      type="number"
                      name="growTime"
                      id="growTime"
                      placeholder="Days of growing"
                      value={this.state.growTime}
                      onChange={this.handleInputChange}
                    />
                  </FormGroup>
                </Col>
              </Row>
              <FormGroup>
                <Label for="varietyNotes">Notes</Label>
                <Input
                  type="textarea"
                  name="varietyNotes"
                  id="varietyNotes"
                  value={this.state.varietyNotes}
                  onChange={this.handleInputChange}
                />
              </FormGroup>
              <Button>Submit</Button>
            </Form>
          </CardBody>
        </Card>
        <StyledReactTable
          data={data}
          columns={columns}
          defaultPageSize={10}
          loading={this.state.isLoading}
        />
        {/* <Button onClick={() => handleQuery()}>Query</Button> */}
      </div>
    );
  }
}

export default withApollo(VarietiesPage);
