import React, { useState, useEffect } from 'react';
import { withToastManager } from 'react-toast-notifications';
import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import useLocalStorage from '../../enhancers/useLocalStorage';
import { toInteger } from 'lodash';

import {
  createVariety,
  deleteVariety,
  updateVariety,
} from '../../graphql/variety';
import {
  Button,
  Form,
  Card,
  CardBody,
  CardTitle,
  CardSubtitle,
} from 'reactstrap';

import VarietiesTable from './VarietiesTable';
import EditForm from './Form/EditForm';
import BaseForm from './Form/BaseForm';

const GET_VARIETIES = gql`
  {
    allVarieties {
      id
      grow_time
      flower_time
      variety
      notes
    }
  }
`;

const VarietiesPage = ({ toastManager }) => {
  const { loading, data } = useQuery(GET_VARIETIES, {
    fetchPolicy: 'network-only',
  });
  const [isEditing, setEditing] = useState(false);
  const [editData, setEditData] = useState({});
  const [tableData, setTableData] = useState([]);
  const [inputs, setInputs] = useLocalStorage('varietyInputs', {
    varietyName: '',
    flowerTime: '',
    growTime: '',
    varietyNotes: '',
  });

  const clearForm = () => {
    setInputs({
      varietyName: '',
      flowerTime: '',
      growTime: '',
      varietyNotes: '',
    });
  };

  const handleInputChange = e =>
    setInputs({ ...inputs, [e.target.name]: e.target.value });

  const handleDeleteVariety = (id, varietyName) => {
    deleteVariety({ id })
      .then(() => {
        const newTableData = tableData.filter(row => row.id !== id);
        setTableData(newTableData);
        toastManager.add('Deleted variety ' + varietyName + '.', {
          appearance: 'success',
          autoDismiss: true,
          pauseOnHover: false,
        });
      })
      .catch(e => {
        toastManager.add(e.message, {
          appearance: 'error',
          autoDismiss: true,
          pauseOnHover: false,
        });
      });
  };

  const handleOpenEdit = rowId => {
    const selectedRow = tableData.find(row => row.id === rowId);
    setEditing(true);
    setEditData(selectedRow);
  };

  const handleSaveEdit = (event, data) => {
    event.preventDefault();
    const variables = {
      id: data.id,
      variety: data.varietyName,
      flower_time: toInteger(data.flowerTime),
      grow_time: toInteger(data.growTime),
      notes: data.varietyNotes,
    };

    updateVariety(variables).then(() => {
      const newTableData = tableData.map(row =>
        variables.id === row.id ? variables : row
      );

      toastManager.add('Updated variety.', {
        appearance: 'success',
        autoDismiss: true,
        pauseOnHover: false,
      });
      setEditing(false);
      setTableData(newTableData);
    });
  };

  const handleCancelEdit = () => setEditing(false);

  const handleSubmitForm = event => {
    event.preventDefault();
    const variables = {
      variety: inputs.varietyName,
      flower_time: toInteger(inputs.flowerTime),
      grow_time: toInteger(inputs.growTime),
      notes: inputs.varietyNotes,
    };
    createVariety(variables)
      .then(data => {
        setTableData([...tableData, data.data.createVariety]);

        toastManager.add('Created new variety.', {
          appearance: 'success',
          autoDismiss: true,
          pauseOnHover: false,
        });
        clearForm();
      })
      .catch(e => {
        if (
          e.message.includes('duplicate key value violates unique constraint')
        ) {
          toastManager.add('This variety name already exist.', {
            appearance: 'error',
            autoDismiss: true,
            pauseOnHover: false,
          });
        } else {
          toastManager.add(e.message, {
            appearance: 'error',
            autoDismiss: true,
            pauseOnHover: true,
          });
        }
      });
  };

  useEffect(() => {
    if (!loading) {
      setTableData(data.allVarieties);
    }
  }, [loading, data]);

  return (
    <div>
      {isEditing ? (
        <EditForm
          targetData={editData}
          handleSaveEdit={handleSaveEdit}
          handleCancelEdit={handleCancelEdit}
        />
      ) : (
        <Card>
          <CardBody>
            <CardTitle>
              <h1>New Variety</h1>
            </CardTitle>
            <CardSubtitle>Add your new varieties here.</CardSubtitle>
            <Form className="mt-2" onSubmit={handleSubmitForm}>
              <BaseForm
                handleInputChange={handleInputChange}
                varietyName={inputs.varietyName}
                flowerTime={inputs.flowerTime}
                growTime={inputs.growTime}
                varietyNotes={inputs.varietyNotes}
              />
              <Button color="primary" className="w-100">
                Submit
              </Button>
            </Form>
          </CardBody>
        </Card>
      )}
      <VarietiesTable
        data={tableData}
        loading={loading}
        handleDeleteVariety={handleDeleteVariety}
        handleOpenEdit={handleOpenEdit}
      />
    </div>
  );
};

export default withToastManager(VarietiesPage);
