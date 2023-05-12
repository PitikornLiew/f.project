import React from 'react';
import { useState, useEffect } from 'react';
import DataTable from 'react-data-table-component';
import axios from 'axios';
import { Fab } from '@mui/material';
import { Add } from '@mui/icons-material';
import './community.css'

const columns = [
    {
        name: 'Brand',
        selector: row => row.id,
        sortable: true,
        width: '100px'
    },

    {
        name: 'Product',
        selector: row => row.product_name,
        sortable: true,
        width: '550px'
    },

    {
        name: 'Type',
        selector: row => row.product_type,
        sortable: true,
        width: '150px'
    },

    {
        name: 'Price',
        selector: row => row.product_price,
        sortable: true,
        width: '150px'
    },

    {
        name: 'Detail',
        selector: row => row.product_detail,
        sortable: true,
        width: '150px'
    },

    {
        name: 'Photo',
        selector: row => row.image_product,
        cell: row => <img src={row.image_product} width={100} alt={row.name}></img>,
        width: '150px'
    }

];

export default function Official() {

    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [totalRows, setTotalRows] = useState(0);
    const [page, setPage] = useState(1);
    const [perPage, setPerPage] = useState(10);
    const [sortColumn, setSortColumn] = useState(' ');
    const [sortColumnDir, setSortColumnDir] = useState(' ');
    const [search, setSearch] = useState(' ');

    const fetchData = async () => {
        setLoading(true);

        var url = `http://localhost:5003/api/product?page=${page}&per_page=${perPage}`;
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
        <div className="reviews-container" >
            {/* search */}
            <form onSubmit={handleSearchSubmit}>
                <label>
                    Search:
                    <input type="text" name="search" onChange={handleSearchChange} />
                </label>
                <input type="submit" value="Submit" />
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

        </div>
    );
}