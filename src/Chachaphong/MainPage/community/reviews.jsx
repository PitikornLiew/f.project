import { useState, useEffect } from 'react';
import DataTable from 'react-data-table-component';
import axios from 'axios';
import { Fab } from '@mui/material';
import { Add } from '@mui/icons-material';
import './reviews.css';


const columns = [
    {
        name: 'ID',
        selector: row => row.id,
        sortable: true,
        width: '80px',
        cell: row => <div className="col-id">{row.id}</div>
      },
      {
        name: 'Name',
        selector: row => row.product_name,
        sortable: true,
        width: '150px',
        cell: row => (
          <div title={row.product_name} className="col-name">
            {row.product_name}
            
          </div>
        ),
      },
      {
        name: 'Rating',
        selector: row => row.rating,
        sortable: true,
        width: '100px',
        cell: row => <div className="col-rating">{row.rating}</div>
      },
      {
        name: 'Comment',
        selector: row => row.comment,
        sortable: true,
        width: '150px',
        cell: row => <div className="col-comment">{row.comment}</div>
      },
      {
        name: 'Image_url',
        selector: row => row.image_url,
        cell: row => (
          <div style={{ border: '5px solid #ccc', padding: '5px' }} className="col-image_url">
            <img src={row.image_url} width={100} alt={row.name} />
          </div>
        ),
        width: '150px'
      }
];


export default function Reviews() {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [totalRows, setTotalRows] = useState(0);
    const [page, setPage] = useState(1);
    const [perPage, setPerPage] = useState(10);
    const [sortColumn, setSortColumn] = useState(' ');
    const [sortColumnDir, setSortColumnDir] = useState(' ');
    const [search, setSearch] = useState(' ');

    const [showPopup, setShowPopup] = useState(false);
    const handleClick = () => {
        setShowPopup(true);
    };

    const fetchData = async () => {
        setLoading(true);

        var url = `http://localhost:5003/api/reviews?page=${page}&per_page=${perPage}`;
        const response = await axios.get(url);
        
        if (search) {
            url += `&search=${search}`;
        }
        if (sortColumn) {
            url += `&sort_column=${sortColumn}&sort_direction=${sortColumnDir}`;
        }
        
        setData(response.data.data);
        setTotalRows(response.data.total);
        setLoading(false);
    };

    const handlePageChange = page => {
        setPage(page);
    };

    const handlePerRowsChange = async (newPerPage, page) => {
        setPerPage(newPerPage);
    };

    const handleSort = (column, sortDirection) => {
        setSortColumn(column.name);
        setSortColumnDir(sortDirection);
    };
    const handleSearchChange = (event) => {
        setSearch(event.target.value);
    };

    const handleSearchSubmit = (event) => {
        event.preventDefault();
        setSearch(search.trim());
        fetchData();
    }

    useEffect(() => {
        fetchData();
    }, [page, perPage, sortColumn, sortColumnDir, search]);

    return (
        <div className="reviews-container">
            <form onSubmit={handleSearchSubmit}>
                <label>
                    Search:
                    <input type="text" name="search" className="search-bar" onChange={handleSearchChange} />
                </label>
                <input type="submit" value="Submit" className="search-submit" />
            </form>
            <DataTable
                title="Attraction"
                columns={columns}
                data={data}
                progressPending={loading}
                pagination
                paginationServer
                paginationTotalRows={totalRows}
                onChangeRowsPerPage={handlePerRowsChange}
                onChangePage={handlePageChange}
                onSort={handleSort}
            />
            {/* botton add post */}
            <div id="fab-container">
                <Fab color="secondary" aria-label="add" onClick={handleClick}>
                    <Add onClick={() => setShowPopup(false)} />
                </Fab>
            </div>

            {/* popup when u click add post */}
            <div>
                {showPopup && (
                    <div className="popup">
                        <div>Add some text</div>
                        <button onClick={() => setShowPopup(false)}>Close Popup</button>
                    </div>
                )}
            </div>
        </div>
    );
}