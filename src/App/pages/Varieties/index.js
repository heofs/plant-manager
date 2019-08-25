import React, { useState, useEffect } from 'react';
import gql from 'graphql-tag';
import { useQuery } from '@apollo/react-hooks';
import { useToasts } from 'react-toast-notifications';
import { useLocalStorage } from 'enhancers/useLocalStorage';
import { toInteger } from 'lodash';
import {
  Button,
  Form,
  Card,
  CardBody,
  CardTitle,
  CardSubtitle,
} from 'reactstrap';

import {
  createVariety,
  deleteVariety,
  updateVariety,
} from '../../../graphql/variety';

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

const VarietiesPage = () => {
  const { loading, data } = useQuery(GET_VARIETIES, {
    fetchPolicy: 'network-only',
  });
  const { addToast } = useToasts();
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
        addToast('Deleted variety ' + varietyName + '.', {
          appearance: 'success',
          autoDismiss: true,
        });
      })
      .catch(e => {
        addToast(e.message, {
          appearance: 'error',
          autoDismiss: true,
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

      addToast('Updated variety.', {
        appearance: 'success',
        autoDismiss: true,
      });
      setEditing(false);
      setTableData(newTableData);
    });
  };

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
        addToast('Created new variety.', {
          appearance: 'success',
          autoDismiss: true,
        });
        clearForm();
      })
      .catch(e => {
        if (e.message.includes('duplicate key value')) {
          addToast('This variety name already exist.', {
            appearance: 'error',
            autoDismiss: true,
          });
        } else {
          addToast(e.message, {
            appearance: 'error',
            autoDismiss: true,
          });
        }
      });
  };

  useEffect(() => {
    if (!loading && data && data.allVarieties) {
      setTableData(data.allVarieties);
    }
  }, [loading, data]);

  return (
    <div>
      {isEditing ? (
        <EditForm
          targetData={editData}
          handleSaveEdit={handleSaveEdit}
          handleCancelEdit={() => setEditing(false)}
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

export default VarietiesPage;
