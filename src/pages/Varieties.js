import React from 'react';
import { withToastManager } from 'react-toast-notifications';
import { createVariety, getVarieties, deleteVariety } from '../graphql/variety';
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

import VarietiesTable from '../components/VarietiesTable';

class VarietiesPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      tableData: [],
      varietyName: this.getLocalStorageItem('varietyName'),
      flowerTime: this.getLocalStorageItem('flowerTime'),
      growTime: this.getLocalStorageItem('growTime'),
      varietyNotes: this.getLocalStorageItem('varietyNotes'),
    };
  }
  getLocalStorageItem(item) {
    return localStorage.getItem('varietyForm-' + item) || '';
  }

  handleInputChange = e => {
    localStorage.setItem('varietyForm-' + e.target.name, e.target.value);
    this.setState({ [e.target.name]: e.target.value });
  };

  getTableData = () => {
    getVarieties().then(result => {
      this.setState({
        isLoading: false,
        tableData: result.data.allVarieties,
      });
    });
  };

  handleDeleteVariety = (id, varietyName) => {
    console.log('Deleting ', id);
    deleteVariety({ id }).then(() => {
      const newTableData = this.state.tableData.filter(row => row.id !== id);
      this.setState({
        tableData: newTableData,
      });
      this.props.toastManager.add('Deleted variety ' + varietyName + '.', {
        appearance: 'success',
        autoDismiss: true,
        pauseOnHover: false,
      });
    });
  };

  handleSubmit = event => {
    event.preventDefault();
    const variables = {
      variety: this.state.varietyName,
      flower_time: parseInt(this.state.flowerTime),
      grow_time: parseInt(this.state.growTime),
      notes: this.state.varietyNotes,
    };
    createVariety(variables)
      .then(data => {
        this.setState(
          {
            tableData: [data.data.createVariety, ...this.state.tableData],
          },
          this.props.toastManager.add('Created new variety.', {
            appearance: 'success',
            autoDismiss: true,
            pauseOnHover: false,
          })
        );
      })
      .catch(e => {
        if (
          e.message.includes('duplicate key value violates unique constraint')
        ) {
          this.props.toastManager.add('This variety name already exist.', {
            appearance: 'error',
            autoDismiss: true,
            pauseOnHover: false,
          });
        } else {
          this.props.toastManager.add(e.message, {
            appearance: 'error',
            autoDismiss: true,
            pauseOnHover: true,
          });
        }
      });
  };

  componentDidMount() {
    this.getTableData();
  }

  render() {
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
        <VarietiesTable
          data={this.state.tableData}
          isLoading={this.state.isLoading}
          handleDeleteVariety={this.handleDeleteVariety}
        />
        {/* <Button onClick={() => handleQuery()}>Query</Button> */}
      </div>
    );
  }
}

export default withToastManager(VarietiesPage);
