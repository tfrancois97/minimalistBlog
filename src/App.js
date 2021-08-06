import './App.css'
import React from 'react'
import { useTable } from 'react-table'

function Table({ columns, data }) {
  // Use the state and functions returned from useTable to build your UI
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = useTable({
    columns,
    data,
  })

  // Render the UI for your table
  return (
    <table {...getTableProps()}>
      <thead>
        {headerGroups.map(headerGroup => (
          <tr {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map(column => (
              <th {...column.getHeaderProps()}>{column.render('Header')}</th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody {...getTableBodyProps()}>
        {rows.map((row, i) => {
          prepareRow(row)
          return (
            <tr {...row.getRowProps()}>
              {row.cells.map(cell => {
                return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
              })}
            </tr>
          )
        })}
      </tbody>
    </table>
  )
}

function App() {
  const columns = React.useMemo(
    () => [
      {
        Header: 'Minimalist-blog',
        columns : [
          {
            Header: 'Post title',
            accessor: 'postTitle',
          },
          {
            Header: 'Number of  comments',
            accessor: 'numberComment',
          },
        ],
      },
    ],
    []
  )

  const data = [
    {
      postTitle:'test1',
      numberComment:'123',
    },
    {
      postTitle:'test2',
      numberComment:'2',
    }
  ]
  return (
    <div className="App">
      <Table columns={columns} data={data} />
      <div className="TableNavigation">
        <button>
          PREVIOUS PAGE
        </button>
        <button>
          NEXT PAGE
        </button>

      </div>
    </div>
  );
}

export default App;
