import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { logout } from "../features/auth/authSlice";

function DashBoard() {
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.auth);

  const [couples, setCouples] = useState(null);
  const [newMenu, setNewMenu] = useState(false);
  const [editMenu, setEditMenu] = useState({
    active: false,
    editing: {},
  });
  const [phonesAmount, setPhonesAmount] = useState(1);

  const [formData, setFormData] = useState({
    name: "",
    desc: "",
    phones: [""],
  });

  const changeFormData = (e, i) => {
    if (e.target.name === "phone[]") {
      let formState = { ...formData };
      formState.phones[i] = e.target.value;
      setFormData((prevState) => ({
        ...prevState,
        phones: formState.phones,
      }));
    } else {
      setFormData((prevState) => ({
        ...prevState,
        [e.target.name]: e.target.value,
      }));
    }
  };

  const changeEditData = (e) => {
    setEditMenu((prevState) => ({
      ...prevState,
      editing: {
        ...prevState.editing,
        [e.target.name]: e.target.value,
      },
    }));
  };

  useEffect(() => {
    const config = {
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    };
    axios.get("/api/dnd/all", config).then((res) => {
      setCouples(res.data);
    });
  }, []);

  const add = () => {
    setPhonesAmount((prev) => prev + 1);
    setFormData((prev) => ({ ...prev, phones: [...prev.phones.slice(), ""] }));
  };

  const sub = () => {
    if (phonesAmount > 1) {
      setPhonesAmount((prev) => prev - 1);
      setFormData((prev) => ({
        ...prev,
        phones: [...prev.phones.slice(0, -1)],
      }));
    }
  };

  const create = () => {
    const config = {
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    };
    const coupleData = {
      name: formData.name,
      desc: formData.desc,
    };
    for (let i = 0; i < formData.phones.length; i++) {
      const url = formData.phones[i];
      coupleData[`phone${i}`] = url;
    }

    axios
      .post("/api/dnd/newCouple", coupleData, config)
      .then(() => window.location.replace(false))
      .catch((error) => {
        const message =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();
        toast.error(message);
      });
  };

  const update = () => {
    const config = {
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    };
    const coupleData = {
      ...editMenu.editing,
      desc: editMenu.editing.description,
    };
    delete coupleData.phones;

    axios
      .put(`api/dnd/updateCouple/${editMenu.editing._id}`, coupleData, config)
      .then(() => window.location.replace(false))
      .catch((error) => {
        const message =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();
        toast.error(message);
      });
  };

  const del = () => {
    const config = {
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    };

    axios
      .delete(`api/dnd/deleteCouple/${editMenu.editing._id}`, config)
      .then(() => window.location.replace(false))
      .catch((error) => {
        const message =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();
        toast.error(message);
      });
  };

  return (
    <div className="dashboard">
      <button onClick={() => dispatch(logout())}>Logout</button>
      <button onClick={() => setNewMenu((prev) => !prev)}>New</button>
      {newMenu && (
        <form>
          <p>New</p>
          <input
            type="text"
            name="name"
            placeholder="Klantnaam"
            value={formData.name}
            onChange={(e) => changeFormData(e)}
          />
          <br />
          <input
            type="text"
            name="desc"
            placeholder="Beschrijving"
            value={formData.desc}
            onChange={(e) => changeFormData(e)}
          />
          <br />
          {[...Array(phonesAmount)].map((el, i) => (
            <div key={i}>
              <input
                type="text"
                value={formData.phones[i]}
                name="phone[]"
                placeholder={"URL" + i}
                onChange={(e) => changeFormData(e, i)}
              />
              <br />
            </div>
          ))}
          {/* <input type="text" name="phone[]" placeholder="Beschrijving" /> */}
          <br />
          <button type="button" onClick={add}>
            Add
          </button>
          <button type="button" onClick={sub}>
            Remove
          </button>
          <button type="button" onClick={create}>
            Create
          </button>
        </form>
      )}
      {editMenu.active && (
        <div>
          <form>
            <p>Update</p>
            <input
              type="text"
              name="name"
              placeholder="Klantnaam"
              value={editMenu.editing.name}
              onChange={changeEditData}
            />
            <br />
            <input
              type="text"
              name="description"
              placeholder="Beschrijving"
              value={editMenu.editing.description}
              onChange={changeEditData}
            />
            <br />
            {editMenu.editing.phones.map((url, i) => (
              <div key={i}>
                <input
                  type="text"
                  value={editMenu.editing["phone" + i]}
                  name={"phone" + i}
                  placeholder={"URL" + i}
                  onChange={changeEditData}
                />
                <br />
              </div>
            ))}
            <br />
            <button type="button" onClick={() => update()}>
              Change
            </button>
            <button type="button" onClick={() => del()}>
              Delete
            </button>
            <button
              type="button"
              onClick={() => setEditMenu({ active: false, editing: {} })}
            >
              Collapse
            </button>
          </form>
        </div>
      )}
      {couples && (
        <table>
          <thead>
            <tr>
              <th>Klantnaam</th>
              <th>Koppeling</th>
              <th>Beschrijving</th>
              <th>URLS</th>
            </tr>
          </thead>
          <tbody>
            {couples.map((couple) => (
              <tr key={couple._id}>
                <th>{couple.name}</th>
                <th>{`https://website.website.nl/api/dnd/toggle/${couple._id}/<toggle>`}</th>
                <th>{couple.description}</th>
                {couple.phones.map((url) => (
                  <th key={url}>{url}</th>
                ))}
                <th>
                  <button
                    onClick={() => {
                      const editData = { ...couple };
                      for (let i = 0; i < couple.phones.length; i++) {
                        const url = couple.phones[i];
                        editData[`phone${i}`] = url;
                      }
                      setEditMenu({ active: true, editing: editData });
                    }}
                  >
                    Change
                  </button>
                </th>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default DashBoard;
