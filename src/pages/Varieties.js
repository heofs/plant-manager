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

class VarietiesPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
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
    // getTableData();
  }

  render() {
    console.log(this.getLocalStorageItem(''));
    return (
      <div>
        <Card>
          <CardBody>
            <CardTitle>
              <h1>Varieties</h1>
            </CardTitle>
            <CardSubtitle>Add your new varieties here.</CardSubtitle>
            <Form onSubmit={this.handleSubmit}>
              <Row>
                <Col xs={6}>
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
                <Col xs={6}>
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

        {/* <Button onClick={() => handleQuery()}>Query</Button> */}
      </div>
    );
  }
}

export default withApollo(VarietiesPage);
