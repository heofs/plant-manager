import React from 'react';
import PropTypes from 'prop-types';
import ReactTable from 'react-table';
import styled from 'styled-components';

const StyledReactTable = styled(ReactTable)`
  margin-top: 1em;
`;

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
    maxWidth: 500,
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
];

const VarietiesTable = ({ data, isLoading }) => {
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
};

export default VarietiesTable;
