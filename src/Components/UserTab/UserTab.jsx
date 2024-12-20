import React,{ useState,useEffect} from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';


function UserTab(){
   const [userdata, setUserdata] = useState();
  //  below code get user details from sessionStorage and store to state veraible setUserdata
  // and user state to show specific user data in  profile section
   useEffect(()=>{
    const data=sessionStorage.getItem('selectedUser');
    setUserdata(JSON.parse(data));
    console.log(userdata);
   },[])

    const user = {
      // below code use for store specific data with speficic name or use conditional  OR operator  for data or null value
        id: 1,
        name:userdata?.name||'not found',
        username: userdata?.username||'not found',
        email: userdata?.email||'not found',
        address: {
          street: userdata?.address?.street||'not found',
          suite: userdata?.address?.suite||'not found',
          
          zipcode: userdata?.address?.zipcode||'not found',
          geo: {
            lat: "-37.3159",
            lng: "81.1496",
          },
        },
        phone: userdata?.phone||'not found',
        website: userdata?.website||'not found',
        company: {
          name: userdata?.company?.name||'',
          catchPhrase: "Multi-layered client-server neural-net",
          bs: "harness real-time e-markets",
        },
      };
      
    return(
        <>
          
           <div className="flex justify-center items-center min-h-screen bg-gray-100">
           <div className="cursor-pointer absolute top-4 left-4" onClick={() => window.history.back(-1)}><FontAwesomeIcon icon={faArrowLeft} /></div>
      <div className="max-w-lg w-full bg-white rounded-lg shadow-lg p-6">
        <div className="text-center mb-4">
          <h2 className="text-2xl font-semibold text-gray-800">{user.name}</h2>
          <p className="text-sm text-gray-600">{user.username}</p>
        </div>
        
        
        <div className="mb-4">
          <h3 className="text-lg font-semibold text-gray-700">Contact Info</h3>
          <p className="text-sm text-gray-600">Email: {user.email}</p>
          <p className="text-sm text-gray-600">Phone: {user.phone}</p>
          <p className="text-sm text-gray-600">Website: 
            <a href={`http://${user.website}`} target="_blank" rel="noopener noreferrer" className="text-blue-500">
              {user.website}
            </a>
          </p>
        </div>

        <div className="mb-4">
          <h3 className="text-lg font-semibold text-gray-700">Address</h3>
          <p className="text-sm text-gray-600">Street: {user.address.street}</p>
          <p className="text-sm text-gray-600">Suite: {user.address.suite}</p>
          <p className="text-sm text-gray-600">Zipcode: {user.address.zipcode}</p>
          <p className="text-sm text-gray-600">
            Location: Lat {user.address.geo.lat}, Lng {user.address.geo.lng}
          </p>
        </div>

        <div className="mb-4">
          <h3 className="text-lg font-semibold text-gray-700">Company</h3>
          <p className="text-sm text-gray-600">Company Name: {user.company.name}</p>
          <p className="text-sm text-gray-600">Catchphrase: {user.company.catchPhrase}</p>
          <p className="text-sm text-gray-600">BS: {user.company.bs}</p>
        </div>
      </div>
    </div>
        </>
    )
};

export default UserTab
