import React, { useState , useEffect} from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit"
const CreateUser = () => {
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    phone: "",
  });
  const [users, setUsers] = useState([]);
  const [editIndex, setEditIndex] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const storedUsers = localStorage.getItem("users");
    if (storedUsers) {
      setUsers(JSON.parse(storedUsers));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("users", JSON.stringify(users));
  }, [users]);

 
  const handleInput = (e) => {
    const { name, value } = e.target;
    setUserData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
 
  const handleSubmit = (e) => {
    e.preventDefault();
    if (isEditing && editIndex !== null) {
      setUsers((prevUsers) => {
        const updatedUsers = [...prevUsers];
        updatedUsers[editIndex] = { ...userData };
        return updatedUsers;
      });
      setEditIndex(null);
      setIsEditing(false);
    } else {
      const newUser = { ...userData };
      setUsers((prevUsers) => [...prevUsers, newUser]);
    }
    setUserData({
      name: "",
      email: "",
      phone: "",
    });
  };
  const handleEdit = (index) => {
    const userToEdit = users[index];
    setUserData({...userToEdit});
    setEditIndex(index);
    setIsEditing(true);
  };
  const handleDelete = (index) => {
    setUsers((prevUsers) => {
      const updatedUsers = [...prevUsers];
      updatedUsers.splice(index, 1);
      return updatedUsers;
    });
  };
  return (
    <div className="flex flex-col sm:flex-row">
      <div
        className="flex min-h-full flex-1 flex-col justify-center px-6 py-12  lg:px-8 
      "
      >
        <div className="sm:mx-auto sm:w-full sm:max-w-sm ">
          <h2
            className=" text-center text-xl font-bold leading-9 tracking-tight text-white 
              border border-blue-500 bg-indigo-600 rounded-md"
          >
            Create user card
          </h2>
        </div>

        <div
          className="mt-5 sm:mx-auto sm:w-full sm:max-w-sm border border-blue-700 p-5 
             rounded-md"
        >
          <form className="space-y-6 " onSubmit={handleSubmit}>
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Your Name
              </label>
              <div className="mt-2">
                <input
                  id="name"
                  name="name"
                  type="text"
                  value={userData.name}
                  onChange={handleInput}
                  autoComplete="name"
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow- 
                  sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 
                  focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Email address
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  onChange={handleInput}
                  value={userData.email}
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow- 
                  sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 
                  focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="phone"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Phone
                </label>
              </div>
              <div className="mt-2">
                <input
                  id="phone"
                  name="phone"
                  type="text"
                  inputMode="numeric"
                  pattern="[0-9]*"
                  value={userData.phone}
                  onChange={handleInput}
                  required
                  autoComplete="current-password"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow- 
                  sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 
                  focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 
                text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 
                focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset- 
                2 focus-visible:outline-indigo-600"
              >
                Create user
              </button>
            </div>
          </form>
        </div>
      </div>
      <div className="flex-1 ml-8 mt-12">
        <h2
          className="text-xl font-bold leading-9 tracking-tight text-white border border- 
          blue-500 text-center bg-indigo-600 rounded-md "
        >
          User List
        </h2>
        {users.length > 0 ? (
          <ul className="mt-4 border border-blue-700 rounded-md p-2">
            {users.map((user, index) => (
              <li
                key={index}
                className="text-gray-700 bg-gray-300 rounded-md text-center 
                              flex justify-between mt-1"
              >
                <div className="mt-5 ml-10">
                  <span className="cursor-pointer" onClick={()=>handleEdit(index)}>
                    <EditIcon />
                  </span>
                </div>
                <div>
                  <span className="font-semibold">Name: </span>
                  {user.name}
                  <br />
                  <span className="font-semibold">Email: </span>
                  {user.email}
                  <br />
                  <span className="font-semibold">Phone: </span>
                  {user.phone}
                </div>
                <div className="mt-5">
                  <span className="cursor-pointer" onClick={()=>handleDelete(index)}>
                    <DeleteIcon />
                  </span>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <div className="border border-blue-700 text-center p-2 rounded-md mt-3">
            <p>No users</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CreateUser;
