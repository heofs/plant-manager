import React from 'react';
import PropTypes from 'prop-types';
import ReactTable from 'react-table';
import styled from 'styled-components';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import TableButton from 'components/TableButton';

const StyledReactTable = styled(ReactTable)`
  margin-top: 1em;
`;
const VarietiesTable = ({
  data,
  loading,
  handleDeleteVariety,
  handleOpenEdit,
}) => {
  const columns = [
    {
      Header: () => (
        <div
          style={{
            textAlign: 'left',
          }}
        >
          Name
        </div>
      ),
      accessor: 'variety',
      minWidth: 160,
      sortable: true,
    },
    {
      Header: () => (
        <div
          style={{
            textAlign: 'left',
          }}
        >
          Flower time
        </div>
      ),
      accessor: 'flower_time',
    },
    {
      Header: () => (
        <div
          style={{
            textAlign: 'left',
          }}
        >
          Grow time
        </div>
      ),
      accessor: 'grow_time',
    },
    {
      Header: () => (
        <div
          style={{
            textAlign: 'left',
          }}
        >
          Notes
        </div>
      ),
      accessor: 'notes',
      sortable: false,
    },
    {
      Header: 'Actions',
      // id: 'click-me-button',
      accessor: 'id',
      sortable: false,
      maxWidth: 100,
      Cell: ({ value }) => (
        <div
          style={{
            textAlign: 'center',
          }}
        >
          <TableButton
            width={'65%'}
            color={'#007bff'}
            onClick={e => {
              handleOpenEdit(value);
            }}
          >
            Edit
          </TableButton>
          <TableButton
            width={'25%'}
            color={'#dc3545'}
            onClick={e => {
              const selectedRow = data.find(row => row.id === value) || '';
              const varietyName = selectedRow.variety;
              Swal.fire({
                title: 'Do you want to delete ' + varietyName + '?',
                text: 'This is permanent',
                type: 'question',
                confirmButtonText: 'Delete',
                showCloseButton: true,
                showCancelButton: true,
              }).then(result => {
                if (result.value) {
                  handleDeleteVariety(value, varietyName);
                }
              });
            }}
          >
            ✕
          </TableButton>
        </div>
      ),
    },
  ];

  return (
    <StyledReactTable
      data={data}
      columns={columns}
      defaultPageSize={10}
      loading={loading}
    />
  );
};

VarietiesTable.propTypes = {
  data: PropTypes.array.isRequired,
  loading: PropTypes.bool.isRequired,
  handleDeleteVariety: PropTypes.func.isRequired,
  handleOpenEdit: PropTypes.func.isRequired,
};

export default VarietiesTable;
