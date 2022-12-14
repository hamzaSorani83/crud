import React, { useEffect, useState } from 'react'
import axios from '../../axiosInstance/axios'
import { Link } from 'react-router-dom';
import { Spinner2 } from '../'

export interface User {
  id: string;
  name: string;
  email: string;
  mobile: string;
}

const ListUser = () => {
  const [users, setUsers] = useState<User[]>();
  const [page, setPage] = useState(25);
  const [message, setMessage] = useState<string>();
  const [success, setSuccess] = useState(false);
  const [disabledButton, setDisabledButtons] = useState(false)
  
  const getUsers = () => {
    axios.get('user.php?last_id=' + page )
      .then(res => {
        setUsers(res.data);
      }).catch(err => {
        console.log(err);
      }).finally(() => {
      })
  }
  
  useEffect(() => {
    getUsers();
    window.addEventListener('scroll', () => {
      if (window.innerHeight + document.documentElement.scrollTop >= document.documentElement.offsetHeight) {
        setPage(page + 25);
      }
    })
  }, [page]);
  
  const deleteUser = (id: string) => {
    setDisabledButtons(true);
    axios.delete('user.php?id=' + id)
      .then(res => {
        const data = JSON.parse(JSON.stringify(res.data));
        setMessage(data.message);
        setSuccess(data.status);
        getUsers();
      }).catch(err => {
        console.log(err);
      }).finally(() => {
        setDisabledButtons(false);
      })
  }
  return (
    <div className="flex flex-col mb-92">
      {message &&
        <div className={["Alert", success ? "AlertSuccess" : "AlertDanger",].join(" ")}>
          {message}
        </div>
      }
      <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div className="py-4 inline-block min-w-full sm:px-6 lg:px-8">
          <div className="overflow-hidden">
            <table className="Table table-auto">
              <thead className="Thead">
                <tr>
                  <th scope="col" className="Table-Th">
                    #
                  </th>
                  <th scope="col" className="Table-Th">
                    Name
                  </th>
                  <th scope="col" className="Table-Th">
                    Email
                  </th>
                  <th scope="col" className="Table-Th">
                    Mobile
                  </th>
                  <th scope="col" className="Table-Th">
                    Actions
                  </th>
                </tr>
              </thead >
              <tbody>
                {users && users.map(user => {
                  return (
                    <tr className="Table-Tr " key={user.id}>
                      <td className="Table-Td">
                      {user.id}
                      </td>
                      <td className="Table-Td">
                        {user.name}
                      </td>
                      <td className="Table-Td">
                      {user.email}
                      </td>
                      <td className="Table-Td">
                      {user.mobile}
                      </td>
                      <td className='Table-Actions'>
                        <Link
                          to={`/user/${user.id}/edit`}
                          className="Btn BtnPrimary">Edit</Link>
                        <button
                          onClick={() => deleteUser(user.id)}
                          className={['Btn BtnDanger', disabledButton ? 'disabled' : ''].join(" ")}>Delete</button>
                      </td>
                    </tr >
                  )
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <Spinner2 />
    </div>
  )
}

export default ListUser