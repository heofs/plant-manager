import React from 'react';
import PropTypes from 'prop-types';
import ReactTable from 'react-table';
import styled from 'styled-components';
import Swal from 'sweetalert2/dist/sweetalert2.js';

const TableButton = styled.button`
  font-size: 1rem;
  height: 100%;
  margin-right: 0.2em;
  width: ${props => props.width};
  background-color: ${props => props.color};
  border-color: ${props => props.color};
  border: 1px solid transparent;
  color: white;
  text-align: center;
  vertical-align: middle;
  border-radius: 0.25rem;
  padding: 0;
  transition: color 0.15s ease-in-out, background-color 0.15s ease-in-out,
    border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
`;

const StyledReactTable = styled(ReactTable)`
  margin-top: 1em;
`;
const VarietiesTable = ({
  data,
  isLoading,
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
      loading={isLoading}
    />
  );
};

VarietiesTable.propTypes = {
  data: PropTypes.array.isRequired,
  isLoading: PropTypes.bool.isRequired,
  handleDeleteVariety: PropTypes.func.isRequired,
  handleOpenEdit: PropTypes.func.isRequired,
};

export default VarietiesTable;
