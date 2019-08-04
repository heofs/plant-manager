import React from 'react';
import { withToastManager } from 'react-toast-notifications';
import {
  createVariety,
  getVarieties,
  deleteVariety,
  updateVariety,
} from '../graphql/variety';
import {
  Button,
  Form,
  Card,
  CardBody,
  CardTitle,
  CardSubtitle,
} from 'reactstrap';

import VarietiesTable from '../components/VarietiesTable';
import EditForm from '../components/VarietyForm/EditForm';
import BaseForm from '../components/VarietyForm/BaseForm';

class VarietiesPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      isEditing: false,
      editData: {},
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
  clearForm() {
    localStorage.removeItem('varietyForm-varietyName');
    localStorage.removeItem('varietyForm-flowerTime');
    localStorage.removeItem('varietyForm-growTime');
    localStorage.removeItem('varietyForm-varietyNotes');
    this.setState({
      varietyName: '',
      flowerTime: '',
      growTime: '',
      varietyNotes: '',
    });
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

  handleOpenEdit = rowId => {
    const selectedRow = this.state.tableData.find(row => row.id === rowId);
    this.setState({
      isEditing: true,
      editData: selectedRow,
    });
  };

  handleSaveEdit = (event, data) => {
    event.preventDefault();
    const variables = {
      id: data.id,
      variety: data.varietyName,
      flower_time: parseInt(data.flowerTime),
      grow_time: parseInt(data.growTime),
      notes: data.varietyNotes,
    };

    updateVariety(variables).then(() => {
      const newTableData = this.state.tableData.map(row =>
        variables.id === row.id ? variables : row
      );

      this.props.toastManager.add('Updated variety.', {
        appearance: 'success',
        autoDismiss: true,
        pauseOnHover: false,
      });

      this.setState({
        isEditing: false,
        tableData: newTableData,
      });
    });
  };

  handleCancelEdit = e => {
    this.setState({
      isEditing: false,
    });
  };

  handleSubmitForm = event => {
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
        this.clearForm();
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
        {this.state.isEditing ? (
          <EditForm
            targetData={this.state.editData}
            handleSaveEdit={this.handleSaveEdit}
            handleCancelEdit={this.handleCancelEdit}
          />
        ) : (
          <Card>
            <CardBody>
              <CardTitle>
                <h1>New Variety</h1>
              </CardTitle>
              <CardSubtitle>Add your new varieties here.</CardSubtitle>
              <Form className="mt-2" onSubmit={this.handleSubmitForm}>
                <BaseForm
                  handleInputChange={this.handleInputChange}
                  varietyName={this.state.varietyName}
                  flowerTime={this.state.flowerTime}
                  growTime={this.state.growTime}
                  varietyNotes={this.state.varietyNotes}
                />
                <Button color="primary" className="w-100">
                  Submit
                </Button>
              </Form>
            </CardBody>
          </Card>
        )}
        <VarietiesTable
          data={this.state.tableData}
          isLoading={this.state.isLoading}
          handleDeleteVariety={this.handleDeleteVariety}
          handleOpenEdit={this.handleOpenEdit}
        />
        {/* <Button onClick={() => handleQuery()}>Query</Button> */}
      </div>
    );
  }
}

export default withToastManager(VarietiesPage);
