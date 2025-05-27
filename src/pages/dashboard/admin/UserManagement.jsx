import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Select from 'react-select';

const roleOptions = [
  { value: '', label: 'All' },
  { value: 'tourist', label: 'Tourist' },
  { value: 'tour-guide', label: 'Tour Guide' },
  { value: 'admin', label: 'Admin' }
];

export default function ManageUsers() {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState('');
  const [selectedRole, setSelectedRole] = useState(roleOptions[0]);

  useEffect(() => {
    const fetchUsers = async () => {
      const params = {};
      if (search) params.search = search;
      if (selectedRole.value) params.role = selectedRole.value;

      const res = await axios.get('http://localhost:5000/users', { params });
      setUsers(res.data);
    };
    fetchUsers();
  }, [search, selectedRole]);

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Manage Users</h2>
      <div className="flex gap-4 mb-4">
        <input
          type="text"
          placeholder="Search by name/email"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border p-2 rounded w-1/3"
        />
        <Select
          options={roleOptions}
          value={selectedRole}
          onChange={setSelectedRole}
          className="w-1/4"
        />
      </div>
      <table className="table-auto w-full border">
        <thead>
          <tr className="bg-gray-100">
            <th className="p-2 border">Name</th>
            <th className="p-2 border">Email</th>
            <th className="p-2 border">Role</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user._id}>
              <td className="p-2 border">{user.name}</td>
              <td className="p-2 border">{user.email}</td>
              <td className="p-2 border">{user.role}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
