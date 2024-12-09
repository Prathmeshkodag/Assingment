import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FetchUserTable } from '../../Redux/UsertableSLice';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass, faUser} from '@fortawesome/free-solid-svg-icons';
import NewUser from '../NewUser/NewUser';
import { Link } from 'react-router-dom';
function UserTable() {

    // Get the userTable state from Redux store
    const userTable = useSelector((state) => state.UserTable.userTable);
    const dispatch = useDispatch();

    // Local state for search query and filtered data
    const [searchQuery, setSearchQuery] = useState("");
    const [filteredData, setFilteredData] = useState(userTable);

    // local State for Open Pop up Model TO Add new User 
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    // Dispatch FetchUserTable action to fetch data on component mount
    useEffect(() => {
        dispatch(FetchUserTable('https://jsonplaceholder.typicode.com/users'));
    }, [dispatch]);


    // Handle search when input value change  filter data with name or email by using array filter method or toLowerCase methoda
    // and toUpperCase method
    const handleSearchChange = (e) => {

        // store user input value from serach box to query veriable
        const query = e.target.value.toLowerCase();
        setSearchQuery(query);

        // Filter userTable based on  user name or email with array filter
        const filtered = userTable.filter((item) =>
            item.name.toLowerCase().includes(query) || item.email.toLowerCase().includes(query)
        );
        setFilteredData(filtered);
    };

    // Handle search button click to filter data with name or email by using array filter method or toLowerCase methoda
    // and toUpperCase method
    const handleSearchClick = () => {
        // Filter userTable based on  user name or email with array filter
        const filtered = userTable.filter((item) =>
            item.name.toLowerCase().includes(searchQuery) || item.email.toLowerCase().includes(searchQuery)
        );
        setFilteredData(filtered);
    };

    // Update filteredData whenever userTable changes
    useEffect(() => {
        setFilteredData(userTable);
    }, [userTable]);

//  store specific user information in SessionStorage to Get in UserTab show in useProfile
    const handleUserClick = (user) => {
        sessionStorage.setItem('selectedUser', JSON.stringify(user));
    };


    return (
        <>
            <div className="flex flex-col items-center min-h-screen bg-gray-100 p-4">
                <div className="w-full max-w-4xl flex items-center justify-between mb-4">
                    <button className="bg-blue-500 text-white px-4 py-2 rounded shadow hover:bg-blue-600" onClick={handleOpen}>
                        Add
                    </button>
                    <div className="flex items-center space-x-2">
                        <input
                            type="text"
                            placeholder="Search by name or email..."
                            value={searchQuery}
                            onChange={handleSearchChange}
                            className="border border-gray-300 px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                        />
                        <button className="bg-green-500 text-white px-4 py-2 rounded shadow hover:bg-green-600" onClick={handleSearchClick}>
                            <FontAwesomeIcon icon={faMagnifyingGlass} />
                        </button>
                    </div>
                </div>

                {/* User  Table */}
                <div className="w-full max-w-4xl overflow-x-auto H-screen">
                    <table className="table-auto border-collapse border border-slate-400 bg-white shadow-md rounded-md w-full text-sm">
                        <thead>
                            <tr>
                                <th className="border border-slate-300 px-2 py-1">Sr.No</th>
                                <th className="border border-slate-300 px-2 py-1">Name</th>
                                <th className="border border-slate-300 px-2 py-1">Email</th>
                                <th className="border border-slate-300 px-2 py-1">Phone</th>
                                <th className="border border-slate-300 px-2 py-1">Company Name</th>
                                <th className="border border-slate-300 px-2 py-1">User Tab</th>


                            </tr>
                        </thead>
                        <tbody>
                            {filteredData.length > 0 ? (
                                filteredData.slice().sort((a, b) => a.name.localeCompare(b.name)).map((item, index) => (
                                    <tr key={index}>
                                        <td className="border border-slate-300 px-2 py-1">{index + 1}</td>
                                        <td className="border border-slate-300 px-2 py-1">{item.name}</td>
                                        <td className="border border-slate-300 px-2 py-1">{item.email}</td>
                                        <td className="border border-slate-300 px-2 py-1">{item.phone}</td>
                                        <td className="border border-slate-300 px-2 py-1">{item.company?.name || 'N/A'}</td>
                                        <td className="border border-slate-300 px-2 py-1" style={{ cursor: 'pointer' }}><Link to='/UserTab' style={{ textDecoration: 'none',border:'none' }}><FontAwesomeIcon icon={faUser} onClick={() => handleUserClick(item)} /></Link></td>


                                    </tr>
                                ))
                            ) : (
                                // user ternory operator for if date nat for to use message to ui 
                                <tr>
                                    <td colSpan="4" className="border border-slate-300 px-2 py-1 text-center">
                                        No user found.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            <NewUser open={open} handleClose={handleClose}/>
        </>
    );
}

export default UserTable;
